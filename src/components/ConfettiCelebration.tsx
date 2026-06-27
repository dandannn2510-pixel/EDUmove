'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  startX: number; // percentage width
  startY: number; // percentage height
  size: number;
  color: string;
  shape: 'circle' | 'rect' | 'triangle';
  xPattern: number[];
  yPattern: number[];
  duration: number;
  delay: number;
}

const COLORS = [
  'bg-emerald-400', 'bg-cyan-400', 'bg-amber-400', 'bg-rose-400',
  'bg-purple-400', 'bg-pink-400', 'bg-sky-400', 'bg-lime-400'
];

const SHAPES: ('circle' | 'rect' | 'triangle')[] = ['circle', 'rect', 'triangle'];

export default function ConfettiCelebration() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 80 }).map((_, i) => {
      const isLeft = Math.random() > 0.5;
      const startX = isLeft ? Math.random() * 15 : 85 + Math.random() * 15;
      const startY = 100;

      // Shoot up and then fall down
      const shootUpDistance = -(350 + Math.random() * 350); // pixels up
      const lateralDistance = (isLeft ? 1 : -1) * (150 + Math.random() * 250); // move towards center/other side
      const fallDistance = 600 + Math.random() * 400; // fall down past viewport
      
      const xPattern = [0, lateralDistance, lateralDistance + (Math.random() * 100 - 50)];
      const yPattern = [0, shootUpDistance, shootUpDistance + fallDistance];

      return {
        id: i,
        startX,
        startY,
        size: 8 + Math.random() * 12,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
        xPattern,
        yPattern,
        duration: 2.5 + Math.random() * 2.5,
        delay: Math.random() * 0.4
      };
    });
    setParticles(generated);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[150] w-full h-full">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            left: `${p.startX}%`,
            top: `${p.startY}%`,
            scale: 0.1,
            opacity: 1,
            rotate: 0,
            x: 0,
            y: 0
          }}
          animate={{
            x: p.xPattern,
            y: p.yPattern,
            opacity: [1, 1, 0.9, 0],
            scale: [0.1, 1.2, 1, 0.5],
            rotateX: [0, 360 * (1 + Math.random() * 3)],
            rotateY: [0, 360 * (1 + Math.random() * 3)],
            rotateZ: [0, 360 * (1 + Math.random() * 2)]
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: 'easeOut'
          }}
          className={`absolute ${p.color} shadow-sm`}
          style={{
            width: p.size,
            height: p.shape === 'rect' ? p.size * 0.6 : p.size,
            borderRadius: p.shape === 'circle' ? '50%' : p.shape === 'triangle' ? '0' : '2px',
            clipPath: p.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
          }}
        />
      ))}
    </div>
  );
}
