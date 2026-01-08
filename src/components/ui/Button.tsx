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
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
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
      whileHover={{ scale: disabled || isLoading ? 1 : 1.05 }}
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

