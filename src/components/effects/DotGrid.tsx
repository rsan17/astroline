'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';

interface DotGridProps {
  className?: string;
  /**
   * Size of each dot in pixels
   * @default 1
   */
  dotSize?: number;
  /**
   * Gap between dots in pixels
   * @default 24
   */
  gap?: number;
  /**
   * Color of the dots (any valid CSS color)
   * @default 'rgba(147, 51, 234, 0.15)'
   */
  color?: string;
  /**
   * Fade mask shape
   * @default 'ellipse'
   */
  maskShape?: 'ellipse' | 'radial' | 'none';
  /**
   * Whether to animate the dots on hover
   * @default false
   */
  animated?: boolean;
}

function DotGridComponent({
  className,
  dotSize = 1,
  gap = 24,
  color = 'rgba(147, 51, 234, 0.15)',
  maskShape = 'ellipse',
  animated = false,
}: DotGridProps) {
  const maskStyles: Record<string, string> = {
    ellipse: 'radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 100%)',
    radial: 'radial-gradient(circle at 50% 50%, black 30%, transparent 80%)',
    none: 'none',
  };

  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        animated && 'transition-opacity duration-500 opacity-60 hover:opacity-100',
        className
      )}
      style={{
        backgroundImage: `radial-gradient(${color} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${gap}px ${gap}px`,
        maskImage: maskStyles[maskShape],
        WebkitMaskImage: maskStyles[maskShape],
      }}
    />
  );
}

export const DotGrid = memo(DotGridComponent);

// Preset variants for common use cases
export function DotGridSubtle({ className, ...props }: Omit<DotGridProps, 'color' | 'gap'>) {
  return (
    <DotGrid
      className={className}
      color="rgba(147, 51, 234, 0.08)"
      gap={32}
      {...props}
    />
  );
}

export function DotGridDense({ className, ...props }: Omit<DotGridProps, 'gap'>) {
  return (
    <DotGrid
      className={className}
      gap={16}
      {...props}
    />
  );
}

export function DotGridCosmic({ className, ...props }: Omit<DotGridProps, 'color'>) {
  return (
    <DotGrid
      className={className}
      color="rgba(59, 130, 246, 0.12)"
      {...props}
    />
  );
}
