'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-accent hover:bg-accent-light text-white font-medium px-6 py-3 sm:px-8 sm:py-4 rounded-full transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed',
  secondary: 'border border-white/20 text-white/80 hover:bg-white/5 hover:border-white/30 hover:text-white px-4 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-300',
  ghost: 'text-white/60 hover:text-white hover:bg-white/5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all duration-300',
};

export function Button({
  children,
  variant = 'primary',
  isLoading = false,
  icon,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={cn(
        variantClasses[variant],
        'flex items-center justify-center gap-2',
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : icon ? (
        <span className="text-xl">{icon}</span>
      ) : null}
      {children}
    </motion.button>
  );
}
