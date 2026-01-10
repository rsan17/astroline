'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'strong' | 'interactive';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant;
  selected?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'bg-white/5 backdrop-blur-sm border border-white/10',
  strong: 'bg-white/[0.08] backdrop-blur-md border border-white/15',
  interactive: 'bg-white/[0.02] border border-white/5 cursor-pointer hover:border-white/20 hover:bg-white/[0.05] transition-all duration-500',
};

export function Card({
  children,
  variant = 'default',
  selected = false,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn(
        variantClasses[variant],
        'rounded-2xl p-6',
        selected && 'border-accent/50 bg-accent/10 ring-1 ring-accent/20',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
