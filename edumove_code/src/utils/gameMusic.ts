'use client';

class KahootMusicSynth {
  public ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private timerId: ReturnType<typeof setTimeout> | null = null;
  private isPlaying = false;
  private bpm = 130;
  private nextNoteTime = 0.0;
  private currentStep = 0;
  private scheduleAheadTime = 0.1;
  private lookahead = 25.0;

  // A minor pentatonic catchy theme (Kahoot-style)
  private melodySeq = [
    69, 0, 72, 74, 76, 0, 74, 72,   // A4, rest, C5, D5, E5, rest, D5, C5
    69, 0, 67, 69, 72, 74, 76, 79,   // A4, rest, G4, A4, C5, D5, E5, G5
    69, 0, 72, 74, 76, 0, 74, 72,   // A4, rest, C5, D5, E5, rest, D5, C5
    81, 79, 76, 74, 72, 69, 67, 69   // A5, G5, E5, D5, C5, A4, G4, A4
  ];

  private bassSeq = [
    45, 45, 48, 48, 50, 50, 48, 48,
    45, 45, 43, 43, 45, 45, 47, 47,
    45, 45, 48, 48, 50, 50, 48, 48,
    57, 57, 55, 55, 52, 52, 50, 45
  ];

  private _isMuted = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('edumove_sound_enabled');
      if (saved === 'false') {
        this._isMuted = true;
      }
    }
  }

  public get isMuted() {
    return this._isMuted;
  }

  public set isMuted(value: boolean) {
    this._isMuted = value;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(value ? 0 : 0.3, this.ctx.currentTime);
    }
  }

  public initCtx() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      
      // Create master gain for soft background volume
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this._isMuted ? 0 : 0.3, this.ctx.currentTime); // Soft background level
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch((err) => console.warn('Failed to resume AudioContext:', err));
    }
  }

  private midiToFreq(note: number): number {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  private playNote(freq: number, startTime: number, duration: number, type: OscillatorType, gainValue: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(gainValue, startTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private playTick(startTime: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(8000, startTime);
    osc.frequency.exponentialRampToValueAtTime(2000, startTime + duration);

    gainNode.gain.setValueAtTime(0.02, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(this.masterGain);

    osc.start(startTime);
    osc.stop(startTime + duration);
  }

  private scheduleNextNote() {
    const secondsPerBeat = 60.0 / this.bpm;
    const stepDuration = secondsPerBeat / 2; // eighth notes

    // Bass note
    const bassMidi = this.bassSeq[this.currentStep % this.bassSeq.length];
    if (bassMidi > 0) {
      this.playNote(this.midiToFreq(bassMidi), this.nextNoteTime, stepDuration * 0.9, 'triangle', 0.12);
    }

    // Melody note
    const melodyMidi = this.melodySeq[this.currentStep % this.melodySeq.length];
    if (melodyMidi > 0) {
      // Play a soft triangle melody note
      this.playNote(this.midiToFreq(melodyMidi), this.nextNoteTime, stepDuration * 0.7, 'triangle', 0.05);
      // Play a very quiet square note to give it a nice 8-bit vibe
      this.playNote(this.midiToFreq(melodyMidi), this.nextNoteTime, stepDuration * 0.3, 'square', 0.015);
    }

    // Percussive clock tick on every beat (steps 0, 2, 4, 6...)
    if (this.currentStep % 2 === 0) {
      this.playTick(this.nextNoteTime, 0.02);
    }

    this.nextNoteTime += stepDuration;
    this.currentStep++;
  }

  public start() {
    if (typeof window === 'undefined') return;
    if (this.isPlaying) return;
    this.initCtx();
    this.isPlaying = true;
    this.currentStep = 0;
    this.nextNoteTime = this.ctx ? this.ctx.currentTime + 0.05 : 0.05;

    const scheduler = () => {
      if (!this.isPlaying || !this.ctx) return;
      while (this.nextNoteTime < this.ctx.currentTime + this.scheduleAheadTime) {
        this.scheduleNextNote();
      }
      this.timerId = setTimeout(scheduler, this.lookahead);
    };
    scheduler();
  }

  public stop() {
    if (!this.isPlaying) return;
    this.isPlaying = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public playCorrectSound() {
    if (typeof window === 'undefined') return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    
    // Play a nice rising major arpeggio
    const notes = [72, 76, 79, 84]; // C5, E5, G5, C6
    notes.forEach((note, index) => {
      const osc = this.ctx!.createOscillator();
      const gainNode = this.ctx!.createGain();
      const freq = this.midiToFreq(note);
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);
      
      gainNode.gain.setValueAtTime(0, now + index * 0.08);
      gainNode.gain.linearRampToValueAtTime(0.2, now + index * 0.08 + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.25);
      
      osc.connect(gainNode);
      gainNode.connect(this.masterGain!);
      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 0.3);
    });
  }

  public playIncorrectSound() {
    if (typeof window === 'undefined') return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    
    // Play a low, descending buzzer sound
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.4);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.25, now + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + 0.4);
    
    // Play a secondary slightly detuned low note to make it buzzier
    const osc2 = this.ctx.createOscillator();
    const gainNode2 = this.ctx.createGain();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(177, now);
    osc2.frequency.linearRampToValueAtTime(87, now + 0.4);
    
    gainNode2.gain.setValueAtTime(0, now);
    gainNode2.gain.linearRampToValueAtTime(0.08, now + 0.05);
    gainNode2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    osc2.connect(gainNode2);
    gainNode2.connect(this.masterGain);
    osc2.start(now);
    osc2.stop(now + 0.4);
  }

  public playTimeoutSound() {
    if (typeof window === 'undefined') return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    
    // Descending warning tones
    const notes = [60, 57, 54]; // C4, A3, F#3
    notes.forEach((note, index) => {
      const osc = this.ctx!.createOscillator();
      const gainNode = this.ctx!.createGain();
      const freq = this.midiToFreq(note);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + index * 0.15);
      
      gainNode.gain.setValueAtTime(0, now + index * 0.15);
      gainNode.gain.linearRampToValueAtTime(0.12, now + index * 0.15 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + index * 0.15 + 0.2);
      
      osc.connect(gainNode);
      gainNode.connect(this.masterGain!);
      osc.start(now + index * 0.15);
      osc.stop(now + index * 0.15 + 0.25);
    });
  }

  public playCountdownTickSound(isGo: boolean = false) {
    if (typeof window === 'undefined') return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(isGo ? 1600 : 800, now);
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.15, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + (isGo ? 0.25 : 0.1));
    
    osc.connect(gainNode);
    gainNode.connect(this.masterGain);
    osc.start(now);
    osc.stop(now + (isGo ? 0.25 : 0.12));
  }

  public playStageClearSound() {
    if (typeof window === 'undefined') return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    
    // Triumphant rising major arpeggio fanfare (C4 -> E4 -> G4 -> C5 -> E5 -> G5 -> C6 -> E6 -> G6 -> C7)
    const notes = [60, 64, 67, 72, 76, 79, 84, 88, 91, 96]; 
    notes.forEach((note, index) => {
      const osc = this.ctx!.createOscillator();
      const gainNode = this.ctx!.createGain();
      const freq = this.midiToFreq(note);
      
      osc.type = index % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.06);
      
      gainNode.gain.setValueAtTime(0, now + index * 0.06);
      gainNode.gain.linearRampToValueAtTime(0.2, now + index * 0.06 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + index * 0.06 + 0.5);
      
      osc.connect(gainNode);
      gainNode.connect(this.masterGain!);
      osc.start(now + index * 0.06);
      osc.stop(now + index * 0.06 + 0.5);
    });

    // Chord backing to reinforce victory feel
    const chord = [72, 76, 79, 84]; // C5 major
    chord.forEach((note) => {
      const osc = this.ctx!.createOscillator();
      const gainNode = this.ctx!.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(this.midiToFreq(note), now + 0.6);
      
      gainNode.gain.setValueAtTime(0, now + 0.6);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.6 + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6 + 1.0);
      
      osc.connect(gainNode);
      gainNode.connect(this.masterGain!);
      osc.start(now + 0.6);
      osc.stop(now + 0.6 + 1.05);
    });
  }

  public playStageFailSound() {
    if (typeof window === 'undefined') return;
    this.initCtx();
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    
    // Sad descending sequence (G4, F#4, F4, D4, B3, Bb3, G3)
    const notes = [67, 66, 65, 62, 59, 58, 55]; 
    notes.forEach((note, index) => {
      const osc = this.ctx!.createOscillator();
      const gainNode = this.ctx!.createGain();
      const freq = this.midiToFreq(note);
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + index * 0.12);
      
      gainNode.gain.setValueAtTime(0, now + index * 0.12);
      gainNode.gain.linearRampToValueAtTime(0.1, now + index * 0.12 + 0.02);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.35);
      
      osc.connect(gainNode);
      gainNode.connect(this.masterGain!);
      osc.start(now + index * 0.12);
      osc.stop(now + index * 0.12 + 0.4);
    });
  }
}

export const gameMusic = new KahootMusicSynth();

if (typeof window !== 'undefined') {
  const initAudioOnGesture = () => {
    gameMusic.initCtx();
    if (gameMusic.ctx && gameMusic.ctx.state === 'running') {
      window.removeEventListener('click', initAudioOnGesture);
      window.removeEventListener('touchstart', initAudioOnGesture);
      window.removeEventListener('keydown', initAudioOnGesture);
    }
  };
  window.addEventListener('click', initAudioOnGesture);
  window.addEventListener('touchstart', initAudioOnGesture);
  window.addEventListener('keydown', initAudioOnGesture);
}
