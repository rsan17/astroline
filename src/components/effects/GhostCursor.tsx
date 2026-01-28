'use client';

import { useEffect, useRef, useState, memo } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GhostCursorProps {
  /**
   * Color of the cursor trail
   * @default 'rgba(147, 51, 234, 0.5)'
   */
  color?: string;
  /**
   * Size of the main cursor dot
   * @default 8
   */
  size?: number;
  /**
   * Size of the trailing ring
   * @default 32
   */
  trailSize?: number;
  /**
   * Whether to show only on hover over interactive elements
   * @default false
   */
  interactiveOnly?: boolean;
}

function GhostCursorComponent({
  color = 'rgba(147, 51, 234, 0.6)',
  size = 8,
  trailSize = 32,
  interactiveOnly = false,
}: GhostCursorProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Motion values for smooth cursor following
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Spring physics for the trailing ring
  const springConfig = { damping: 25, stiffness: 300 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a touch device
    const checkTouchDevice = () => {
      setIsTouchDevice(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches
      );
    };

    checkTouchDevice();

    // Don't render on touch devices
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Track interactive elements for hover state
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer');

      setIsHoveringInteractive(!!isInteractive);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleElementHover);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleElementHover);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  // Don't render on touch devices
  if (isTouchDevice) return null;

  // If interactiveOnly, only show when hovering interactive elements
  const shouldShow = interactiveOnly ? isHoveringInteractive : isVisible;

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        ref={cursorRef}
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference',
          'transition-opacity duration-200'
        )}
        style={{
          x: cursorX,
          y: cursorY,
          width: isHoveringInteractive ? size * 1.5 : size,
          height: isHoveringInteractive ? size * 1.5 : size,
          backgroundColor: color,
          opacity: shouldShow ? 1 : 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Trailing ring */}
      <motion.div
        className={cn(
          'fixed top-0 left-0 pointer-events-none z-[9998] rounded-full',
          'border border-current transition-all duration-200'
        )}
        style={{
          x: trailX,
          y: trailY,
          width: isHoveringInteractive ? trailSize * 1.5 : trailSize,
          height: isHoveringInteractive ? trailSize * 1.5 : trailSize,
          borderColor: color,
          opacity: shouldShow ? 0.5 : 0,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}

export const GhostCursor = memo(GhostCursorComponent);

// Simplified variant that only shows a subtle glow
export function GhostCursorGlow() {
  return <GhostCursor color="rgba(147, 51, 234, 0.3)" size={6} trailSize={40} />;
}

// Interactive-only variant
export function GhostCursorInteractive() {
  return <GhostCursor interactiveOnly />;
}
