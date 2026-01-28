'use client';

import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { cn } from '@/lib/utils';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

interface GalaxyBackgroundProps {
  className?: string;
  starCount?: number;
  enableParallax?: boolean;
  intensity?: 'low' | 'medium' | 'high';
}

const COLORS = {
  white: 'rgba(255, 255, 255, ',
  purple: 'rgba(147, 51, 234, ',
  blue: 'rgba(59, 130, 246, ',
  gold: 'rgba(251, 191, 36, ',
};

function GalaxyBackgroundComponent({
  className,
  starCount = 150,
  enableParallax = true,
  intensity = 'medium',
}: GalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Adjust star count based on intensity
  const adjustedStarCount = {
    low: Math.floor(starCount * 0.5),
    medium: starCount,
    high: Math.floor(starCount * 1.5),
  }[intensity];

  // Initialize stars
  const initStars = useCallback((width: number, height: number) => {
    const stars: Star[] = [];
    const colorKeys = Object.keys(COLORS) as (keyof typeof COLORS)[];

    for (let i = 0; i < adjustedStarCount; i++) {
      const colorKey = colorKeys[Math.floor(Math.random() * colorKeys.length)];
      // More white stars, fewer colored ones
      const finalColor = Math.random() > 0.7 ? COLORS[colorKey] : COLORS.white;
      
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.3 + 0.1,
        color: finalColor,
      });
    }
    starsRef.current = stars;
  }, [adjustedStarCount]);

  // Animation loop
  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.clearRect(0, 0, width, height);

    const stars = starsRef.current;
    const { x: mouseX, y: mouseY } = mouseRef.current;
    const parallaxStrength = enableParallax && !isMobile ? 0.02 : 0;

    for (const star of stars) {
      // Parallax effect based on mouse position
      const parallaxX = (mouseX - width / 2) * parallaxStrength * star.speed;
      const parallaxY = (mouseY - height / 2) * parallaxStrength * star.speed;

      // Twinkle effect
      const twinkle = Math.sin(Date.now() * 0.001 * star.speed + star.x) * 0.3 + 0.7;
      const currentOpacity = star.opacity * twinkle;

      // Draw star with glow
      ctx.beginPath();
      ctx.arc(
        star.x + parallaxX,
        star.y + parallaxY,
        star.size,
        0,
        Math.PI * 2
      );
      ctx.fillStyle = `${star.color}${currentOpacity})`;
      ctx.fill();

      // Add glow for larger stars
      if (star.size > 1.5) {
        ctx.beginPath();
        ctx.arc(
          star.x + parallaxX,
          star.y + parallaxY,
          star.size * 2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `${star.color}${currentOpacity * 0.2})`;
        ctx.fill();
      }

      // Slowly move stars
      if (!isReducedMotion) {
        star.y += star.speed * 0.1;
        if (star.y > height) {
          star.y = 0;
          star.x = Math.random() * width;
        }
      }
    }

    if (!isReducedMotion) {
      animationRef.current = requestAnimationFrame(() => animate(ctx, width, height));
    }
  }, [enableParallax, isMobile, isReducedMotion]);

  // Setup canvas and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    // Check for mobile/touch device
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      
      ctx.scale(dpr, dpr);
      
      initStars(rect.width, rect.height);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mouse tracking for parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (enableParallax && !isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Start animation
    const rect = container.getBoundingClientRect();
    animate(ctx, rect.width, rect.height);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, enableParallax, initStars, isMobile]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 overflow-hidden pointer-events-none',
        className
      )}
    >
      {/* Static gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 20% 40%, rgba(147, 51, 234, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 75% 70%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
            radial-gradient(ellipse 70% 50% at 50% 50%, rgba(126, 34, 206, 0.08) 0%, transparent 60%)
          `,
        }}
      />

      {/* Canvas for stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0"
      />

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

export const GalaxyBackground = memo(GalaxyBackgroundComponent);
