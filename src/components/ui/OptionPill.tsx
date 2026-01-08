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
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'option-pill w-full text-left',
        selected && 'option-pill-selected',
        disabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      {icon && <span className="text-2xl flex-shrink-0">{icon}</span>}
      <div className="flex-1">
        <span className="text-text-primary font-medium">{label}</span>
        {description && (
          <p className="text-sm text-text-secondary mt-0.5">{description}</p>
        )}
      </div>
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-5 h-5 rounded-full bg-accent flex items-center justify-center"
        >
          <svg className="w-3 h-3 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}

