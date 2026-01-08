'use client';

import { useState, useEffect, useCallback, Children, cloneElement, isValidElement } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselProps {
  children: React.ReactNode;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function Carousel({
  children,
  autoPlay = false,
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  className,
}: CarouselProps) {
  const items = Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  const goTo = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, next]);

  // Swipe handling
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      prev();
    } else if (info.offset.x < -threshold) {
      next();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className={cn('relative', className)}>
      {/* Carousel content */}
      <div className="overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="cursor-grab active:cursor-grabbing"
          >
            {items[currentIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows */}
      {showArrows && items.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:border-accent/50 transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5 text-text-secondary" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center hover:border-accent/50 transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5 text-text-secondary" />
          </motion.button>
        </>
      )}

      {/* Dots */}
      {showDots && items.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                i === currentIndex ? 'bg-accent w-6' : 'bg-white/20 hover:bg-white/40 w-2'
              )}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Carousel item wrapper (optional)
interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

export function CarouselItem({ children, className }: CarouselItemProps) {
  return <div className={cn('w-full', className)}>{children}</div>;
}

