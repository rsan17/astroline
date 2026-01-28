'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'strong' | 'interactive' | 'premium';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant;
  selected?: boolean;
  hoverable?: boolean;
  noPadding?: boolean;
  glowColor?: 'accent' | 'gold' | 'purple' | 'pink';
}

const variantClasses: Record<CardVariant, string> = {
  default: 'glass',
  strong: 'glass-strong',
  interactive: 'card-interactive',
  premium: 'glass-premium',
};

const glowClasses: Record<string, string> = {
  accent: 'hover:shadow-[0_0_30px_rgba(78,205,196,0.2)]',
  gold: 'hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]',
  purple: 'hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]',
  pink: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]',
};

export function Card({
  children,
  variant = 'default',
  selected = false,
  hoverable = false,
  noPadding = false,
  glowColor,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={hoverable ? { scale: 1.02, y: -4 } : undefined}
      className={cn(
        variantClasses[variant],
        'rounded-2xl transition-all duration-300',
        !noPadding && 'p-6',
        selected && 'card-selected border-accent/50 shadow-glow',
        hoverable && 'cursor-pointer hover:border-accent/30',
        glowColor && glowClasses[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
