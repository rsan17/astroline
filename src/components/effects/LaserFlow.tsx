'use client';

import { memo, forwardRef, type ReactNode } from 'react';
import { motion, type MotionProps, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LaserFlowButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: ReactNode;
  /**
   * Variant of the laser effect
   * @default 'purple'
   */
  variant?: 'purple' | 'cosmic' | 'gold' | 'rainbow';
  /**
   * Size of the button
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Whether the button is in loading state
   */
  isLoading?: boolean;
  /**
   * Icon to display before text
   */
  leftIcon?: ReactNode;
  /**
   * Icon to display after text
   */
  rightIcon?: ReactNode;
  /**
   * Whether to show the laser effect only on hover
   * @default false
   */
  hoverOnly?: boolean;
}

const variantColors = {
  purple: {
    gradient: 'linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.5) 20%, rgba(168, 85, 247, 0.6) 50%, rgba(147, 51, 234, 0.5) 80%, transparent 100%)',
    glow: 'rgba(147, 51, 234, 0.4)',
    border: 'rgba(147, 51, 234, 0.3)',
  },
  cosmic: {
    gradient: 'linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.5) 20%, rgba(147, 51, 234, 0.6) 50%, rgba(59, 130, 246, 0.5) 80%, transparent 100%)',
    glow: 'rgba(59, 130, 246, 0.4)',
    border: 'rgba(59, 130, 246, 0.3)',
  },
  gold: {
    gradient: 'linear-gradient(90deg, transparent 0%, rgba(251, 191, 36, 0.5) 20%, rgba(245, 158, 11, 0.6) 50%, rgba(251, 191, 36, 0.5) 80%, transparent 100%)',
    glow: 'rgba(251, 191, 36, 0.4)',
    border: 'rgba(251, 191, 36, 0.3)',
  },
  rainbow: {
    gradient: 'linear-gradient(90deg, transparent 0%, rgba(147, 51, 234, 0.4) 15%, rgba(59, 130, 246, 0.5) 35%, rgba(34, 197, 94, 0.5) 50%, rgba(251, 191, 36, 0.5) 65%, rgba(239, 68, 68, 0.4) 85%, transparent 100%)',
    glow: 'rgba(147, 51, 234, 0.3)',
    border: 'rgba(255, 255, 255, 0.2)',
  },
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5',
  xl: 'px-10 py-5 text-xl gap-3',
};

const LaserFlowButtonComponent = forwardRef<HTMLButtonElement, LaserFlowButtonProps>(
  (
    {
      children,
      className,
      variant = 'purple',
      size = 'md',
      isLoading,
      leftIcon,
      rightIcon,
      hoverOnly = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const colors = variantColors[variant];
    const motionProps: MotionProps = {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
    };

    return (
      <motion.button
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center font-semibold rounded-full',
          'bg-background-secondary/80 text-white overflow-hidden',
          'border border-white/10 backdrop-blur-sm',
          'transition-all duration-300',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
          sizeStyles[size],
          className
        )}
        style={{
          borderColor: colors.border,
        }}
        disabled={disabled || isLoading}
        {...motionProps}
        {...props}
      >
        {/* Laser flow effect */}
        <span
          className={cn(
            'absolute inset-0 pointer-events-none',
            hoverOnly ? 'opacity-0 group-hover:opacity-100' : 'opacity-100',
            'transition-opacity duration-300'
          )}
          style={{
            background: colors.gradient,
            backgroundSize: '200% 100%',
            animation: 'laser-flow 9s linear infinite',
          }}
        />

        {/* Glow effect on hover */}
        <span
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            boxShadow: `inset 0 0 30px ${colors.glow}`,
          }}
        />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-inherit">
          {isLoading ? (
            <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
          ) : (
            <>
              {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
              {children}
              {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
            </>
          )}
        </span>
      </motion.button>
    );
  }
);

LaserFlowButtonComponent.displayName = 'LaserFlowButton';

export const LaserFlowButton = memo(LaserFlowButtonComponent);

// Simple laser flow line decoration
interface LaserFlowLineProps {
  className?: string;
  variant?: 'purple' | 'cosmic' | 'gold' | 'rainbow';
  direction?: 'horizontal' | 'vertical';
}

export function LaserFlowLine({
  className,
  variant = 'purple',
  direction = 'horizontal',
}: LaserFlowLineProps) {
  const colors = variantColors[variant];
  const isHorizontal = direction === 'horizontal';

  return (
    <div
      className={cn(
        'pointer-events-none',
        isHorizontal ? 'h-px w-full' : 'w-px h-full',
        className
      )}
      style={{
        background: colors.gradient,
        backgroundSize: isHorizontal ? '200% 100%' : '100% 200%',
        animation: `laser-flow 9s linear infinite`,
      }}
    />
  );
}
