'use client';

import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
  variant?: 'default' | 'circular' | 'rounded';
  animation?: 'pulse' | 'shimmer' | 'none';
}

export function Skeleton({ 
  className, 
  variant = 'default',
  animation = 'pulse' 
}: SkeletonProps) {
  const variantStyles = {
    default: 'rounded-lg',
    circular: 'rounded-full',
    rounded: 'rounded-2xl',
  };

  const animationStyles = {
    pulse: 'animate-pulse',
    shimmer: 'animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent bg-[length:200%_100%]',
    none: '',
  };

  return (
    <div
      className={cn(
        'bg-white/10',
        variantStyles[variant],
        animationStyles[animation],
        className
      )}
    />
  );
}

// Preset skeleton components
export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6 space-y-4">
      <Skeleton className="h-12 w-12 rounded-xl" />
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

export function SkeletonText({ lines = 3 }: { lines?: number }) {
  const widths = ['w-full', 'w-[90%]', 'w-[80%]', 'w-[70%]', 'w-[60%]'];
  return (
    <div className="space-y-3">
      {[...Array(lines)].map((_, i) => (
        <Skeleton 
          key={i} 
          className={cn('h-4', widths[i] || 'w-full')}
        />
      ))}
    </div>
  );
}

export function SkeletonAvatar({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return <Skeleton className={cn(sizeStyles[size])} variant="circular" />;
}

export function SkeletonButton() {
  return <Skeleton className="h-12 w-32 rounded-full" />;
}

