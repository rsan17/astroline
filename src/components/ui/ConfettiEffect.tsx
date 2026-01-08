'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  rotation: number;
  delay: number;
}

interface ConfettiEffectProps {
  isActive: boolean;
  duration?: number;
  particleCount?: number;
  colors?: string[];
  onComplete?: () => void;
}

export function ConfettiEffect({
  isActive,
  duration = 3000,
  particleCount = 50,
  colors = ['#4ECDC4', '#FFD700', '#FF6B6B', '#4FACFE', '#A855F7', '#F59E0B'],
  onComplete,
}: ConfettiEffectProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      // Generate particles
      const newParticles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100, // percentage
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 8,
        rotation: Math.random() * 360,
        delay: Math.random() * 0.5,
      }));

      setParticles(newParticles);
      setIsVisible(true);

      // Clean up after duration
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, particleCount, colors, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              y: -20,
              x: `${particle.x}vw`,
              rotate: 0,
              opacity: 1,
            }}
            animate={{
              y: '110vh',
              rotate: particle.rotation + 720,
              opacity: [1, 1, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              delay: particle.delay,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{
              position: 'absolute',
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Emoji confetti variant
interface EmojiConfettiProps {
  isActive: boolean;
  duration?: number;
  emojis?: string[];
  onComplete?: () => void;
}

export function EmojiConfetti({
  isActive,
  duration = 3000,
  emojis = ['✨', '🌟', '💫', '⭐', '🎉', '🎊'],
  onComplete,
}: EmojiConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; emoji: string; delay: number; rotation: number }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        delay: Math.random() * 0.5,
        rotation: Math.random() * 360,
      }));

      setParticles(newParticles);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isActive, emojis, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200] overflow-hidden">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              y: -50,
              x: `${particle.x}vw`,
              rotate: 0,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              y: '110vh',
              rotate: particle.rotation,
              opacity: [1, 1, 0],
              scale: [0, 1.5, 1],
            }}
            transition={{
              duration: 2.5 + Math.random() * 1.5,
              delay: particle.delay,
              ease: 'easeOut',
            }}
            className="absolute text-2xl md:text-3xl"
          >
            {particle.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// Firework burst effect
interface FireworkBurstProps {
  isActive: boolean;
  x?: number;
  y?: number;
  colors?: string[];
  onComplete?: () => void;
}

export function FireworkBurst({
  isActive,
  x = 50,
  y = 50,
  colors = ['#4ECDC4', '#FFD700', '#FF6B6B'],
  onComplete,
}: FireworkBurstProps) {
  const [particles, setParticles] = useState<Array<{ id: number; angle: number; color: string }>>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const particleCount = 12;
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        angle: (360 / particleCount) * i,
        color: colors[i % colors.length],
      }));

      setParticles(newParticles);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isActive, colors, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[200]">
      <div
        className="absolute"
        style={{
          left: `${x}%`,
          top: `${y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{
              x: Math.cos((particle.angle * Math.PI) / 180) * 100,
              y: Math.sin((particle.angle * Math.PI) / 180) * 100,
              scale: [0, 1, 0.5],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute w-3 h-3 rounded-full"
            style={{ backgroundColor: particle.color }}
          />
        ))}
      </div>
    </div>
  );
}

