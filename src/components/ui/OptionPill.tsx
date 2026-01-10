'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface OptionPillProps {
  icon?: React.ReactNode;
  label: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

export function OptionPill({
  icon,
  label,
  description,
  selected = false,
  onClick,
  disabled = false,
}: OptionPillProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: disabled ? 1 : 1.01 }}
      whileTap={{ scale: disabled ? 1 : 0.99 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center gap-3 sm:gap-4 w-full text-left px-5 py-4 sm:px-6 sm:py-5 rounded-xl',
        'bg-white/[0.02] border border-white/5',
        'hover:bg-white/[0.05] hover:border-white/10',
        'cursor-pointer transition-all duration-500',
        selected && 'border-accent/50 bg-accent/10',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {icon && <span className="text-2xl flex-shrink-0">{icon}</span>}
      <div className="flex-1">
        <span className="text-white/90 font-medium">{label}</span>
        {description && (
          <p className="text-sm text-white/40 mt-0.5 font-light">{description}</p>
        )}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 rounded-full bg-accent flex items-center justify-center"
        >
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}
