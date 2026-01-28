'use client';

import { useRef, useState, useCallback, type ReactNode, type MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface MagicBentoCardProps {
  children: ReactNode;
  className?: string;
  /**
   * Spotlight color on hover
   * @default 'rgba(147, 51, 234, 0.15)'
   */
  spotlightColor?: string;
  /**
   * Size of the spotlight effect
   * @default 400
   */
  spotlightSize?: number;
  /**
   * Whether to show border glow on hover
   * @default true
   */
  borderGlow?: boolean;
  /**
   * Delay for staggered animations
   */
  delay?: number;
}

export function MagicBentoCard({
  children,
  className,
  spotlightColor = 'rgba(147, 51, 234, 0.15)',
  spotlightSize = 400,
  borderGlow = true,
  delay = 0,
}: MagicBentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-background-secondary/50 backdrop-blur-sm',
        'border border-white/10',
        'transition-all duration-300',
        borderGlow && isHovered && 'border-accent/30 shadow-glow',
        className
      )}
      style={{
        transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
      }}
    >
      {/* Spotlight effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(${spotlightSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

interface MagicBentoGridProps {
  children: ReactNode;
  className?: string;
  /**
   * Number of columns at different breakpoints
   * @default { sm: 1, md: 2, lg: 4 }
   */
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  /**
   * Gap between cards
   * @default 'md'
   */
  gap?: 'sm' | 'md' | 'lg';
}

const gapStyles = {
  sm: 'gap-3 sm:gap-4',
  md: 'gap-4 sm:gap-5 lg:gap-6',
  lg: 'gap-5 sm:gap-6 lg:gap-8',
};

export function MagicBentoGrid({
  children,
  className,
  columns = { sm: 1, md: 2, lg: 4 },
  gap = 'md',
}: MagicBentoGridProps) {
  const gridCols = cn(
    columns.sm === 1 && 'grid-cols-1',
    columns.sm === 2 && 'grid-cols-2',
    columns.md === 2 && 'sm:grid-cols-2',
    columns.md === 3 && 'sm:grid-cols-3',
    columns.lg === 3 && 'lg:grid-cols-3',
    columns.lg === 4 && 'lg:grid-cols-4',
    columns.lg === 5 && 'lg:grid-cols-5'
  );

  return (
    <div className={cn('grid', gridCols, gapStyles[gap], className)}>
      {children}
    </div>
  );
}

// Feature card variant with icon and text
interface MagicBentoFeatureProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  className?: string;
  delay?: number;
}

export function MagicBentoFeature({
  icon,
  title,
  description,
  badge,
  className,
  delay = 0,
}: MagicBentoFeatureProps) {
  return (
    <MagicBentoCard className={cn('p-6', className)} delay={delay}>
      {badge && (
        <span className="absolute top-3 right-3 px-2 py-1 text-xs font-medium rounded-full bg-accent/20 text-accent">
          {badge}
        </span>
      )}
      
      <div className="mb-4">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-cosmic/20 flex items-center justify-center text-accent"
        >
          {icon}
        </motion.div>
      </div>

      <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
        {title}
      </h3>

      <p className="text-sm text-text-secondary leading-relaxed">
        {description}
      </p>
    </MagicBentoCard>
  );
}

// Step card variant for "How It Works" section
interface MagicBentoStepProps {
  stepNumber: number;
  icon: ReactNode;
  title: string;
  description: string;
  duration?: string;
  className?: string;
  delay?: number;
}

export function MagicBentoStep({
  stepNumber,
  icon,
  title,
  description,
  duration,
  className,
  delay = 0,
}: MagicBentoStepProps) {
  return (
    <MagicBentoCard className={cn('p-6 group', className)} delay={delay}>
      {/* Step number */}
      <div className="absolute top-4 left-4">
        <span className="text-4xl font-bold text-white/5 group-hover:text-accent/10 transition-colors">
          {String(stepNumber).padStart(2, '0')}
        </span>
      </div>

      {/* Duration badge */}
      {duration && (
        <span className="absolute top-4 right-4 px-2 py-1 text-xs font-medium rounded-full bg-white/5 text-text-secondary">
          {duration}
        </span>
      )}

      <div className="pt-8">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent to-cosmic flex items-center justify-center text-white mb-4 shadow-glow"
        >
          {icon}
        </motion.div>

        <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors">
          {title}
        </h3>

        <p className="text-text-secondary">
          {description}
        </p>
      </div>
    </MagicBentoCard>
  );
}
