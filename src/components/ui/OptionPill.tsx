'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptionPillProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  showConfetti?: boolean;
}

export function OptionPill({
  icon,
  label,
  description,
  selected = false,
  onClick,
  disabled = false,
  showConfetti = true,
}: OptionPillProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: disabled ? 1 : 1.02, y: disabled ? 0 : -2 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'option-pill w-full text-left relative overflow-hidden',
        selected && 'option-pill-selected',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {/* Selection glow effect */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/5 to-transparent pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex items-center gap-3 w-full">
        {icon && (
          <motion.span 
            className="text-2xl flex-shrink-0"
            animate={selected ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {icon}
          </motion.span>
        )}
        <div className="flex-1 min-w-0">
          <span className="text-text-primary font-medium block">{label}</span>
          {description && (
            <p className="text-sm text-text-secondary mt-0.5 truncate">{description}</p>
          )}
        </div>
        
        {/* Checkmark */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 shadow-glow"
            >
              <svg className="w-3.5 h-3.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selection confetti particles */}
      <AnimatePresence>
        {selected && showConfetti && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 1, 
                  scale: 0,
                  x: '50%',
                  y: '50%',
                }}
                animate={{ 
                  opacity: 0, 
                  scale: 1,
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="absolute w-2 h-2 rounded-full pointer-events-none"
                style={{
                  backgroundColor: i % 2 === 0 ? 'rgba(147, 51, 234, 0.8)' : 'rgba(251, 191, 36, 0.8)',
                }}
              />
            ))}
          </>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Color option variant for color selection step
interface ColorOptionProps {
  color: string;
  name: string;
  selected?: boolean;
  onClick?: () => void;
}

export function ColorOption({ color, name, selected, onClick }: ColorOptionProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-300',
        'bg-white/5 border border-white/10',
        selected && 'border-accent/50 bg-accent/10 shadow-glow'
      )}
    >
      <motion.div
        className="w-12 h-12 rounded-full shadow-lg"
        style={{ backgroundColor: color }}
        animate={selected ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
      />
      <span className="text-sm text-text-secondary">{name}</span>
      
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center"
          >
            <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

// Element option variant for element selection step
interface ElementOptionProps {
  element: string;
  icon: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
}export function ElementOption({ element, icon, selected, onClick }: ElementOptionProps) {
  const colors: Record<string, string> = {
    fire: 'from-orange-500/20 to-red-500/20',
    water: 'from-blue-500/20 to-cyan-500/20',
    earth: 'from-green-500/20 to-emerald-500/20',
    air: 'from-sky-500/20 to-indigo-500/20',
  };

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        'relative flex flex-col items-center gap-3 p-6 rounded-2xl transition-all duration-300',
        `bg-gradient-to-br ${colors[element.toLowerCase()] || 'from-white/10 to-white/5'}`,
        'border border-white/10',
        selected && 'border-accent/50 shadow-glow ring-2 ring-accent/20'
      )}
    >
      <motion.div
        className="text-4xl"
        animate={selected ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        {icon}
      </motion.div>
      <span className="text-sm font-medium text-text-primary">{element}</span>
      
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent flex items-center justify-center"
          >
            <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
