'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'strong' | 'interactive';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: CardVariant;
  selected?: boolean;
}

const variantClasses: Record<CardVariant, string> = {
  default: 'glass',
  strong: 'glass-strong',
  interactive: 'card-interactive',
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
        selected && 'card-selected',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

