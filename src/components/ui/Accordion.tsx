'use client';

import { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// Context
interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  multiple: boolean;
}

const AccordionContext = createContext<AccordionContextValue | undefined>(undefined);

// Root component
interface AccordionProps {
  children: React.ReactNode;
  type?: 'single' | 'multiple';
  defaultValue?: string[];
  className?: string;
}

export function Accordion({
  children,
  type = 'single',
  defaultValue = [],
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>(defaultValue);

  const toggleItem = (value: string) => {
    if (type === 'single') {
      setOpenItems(openItems.includes(value) ? [] : [value]);
    } else {
      setOpenItems(
        openItems.includes(value)
          ? openItems.filter((v) => v !== value)
          : [...openItems, value]
      );
    }
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, multiple: type === 'multiple' }}>
      <div className={cn('space-y-3', className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

// Item component
interface AccordionItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export function AccordionItem({ children, value, className }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const isOpen = context.openItems.includes(value);

  return (
    <div
      className={cn(
        'glass rounded-2xl overflow-hidden transition-all duration-300',
        isOpen && 'ring-1 ring-accent/30',
        className
      )}
      data-state={isOpen ? 'open' : 'closed'}
    >
      {children}
    </div>
  );
}

// Trigger component
interface AccordionTriggerProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export function AccordionTrigger({ children, value, className }: AccordionTriggerProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionTrigger must be used within Accordion');

  const isOpen = context.openItems.includes(value);

  return (
    <button
      onClick={() => context.toggleItem(value)}
      className={cn(
        'w-full px-6 py-5 flex items-center justify-between gap-4 text-left',
        'hover:bg-white/5 transition-colors',
        className
      )}
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-text-primary">{children}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex-shrink-0"
      >
        <ChevronDown className={cn(
          'w-5 h-5 transition-colors',
          isOpen ? 'text-accent' : 'text-text-secondary'
        )} />
      </motion.div>
    </button>
  );
}

// Content component
interface AccordionContentProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

export function AccordionContent({ children, value, className }: AccordionContentProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionContent must be used within Accordion');

  const isOpen = context.openItems.includes(value);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={cn('px-6 pb-5 text-text-secondary leading-relaxed', className)}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

