'use client';

import { AnimatePresence } from 'framer-motion';
import { useQuizStore } from '@/hooks/useQuizStore';

// Import all step components
import { GenderStep } from './steps/GenderStep';
import { BirthDateStep } from './steps/BirthDateStep';
import { BirthTimeStep } from './steps/BirthTimeStep';
import { BirthPlaceStep } from './steps/BirthPlaceStep';
import { RelationshipStep } from './steps/RelationshipStep';
import { GoalsStep } from './steps/GoalsStep';
import { ColorStep } from './steps/ColorStep';
import { ElementStep } from './steps/ElementStep';
import { CalculatingStep } from './steps/CalculatingStep';
import { AstroResultStep } from './steps/AstroResultStep';
// PalmUploadStep temporarily disabled - uncomment when palm analysis is fixed
// import { PalmUploadStep } from './steps/PalmUploadStep';
import { EmailStep } from './steps/EmailStep';
import { PaywallStep } from './steps/PaywallStep';

const stepComponents: Record<number, React.ComponentType> = {
  1: GenderStep,
  2: BirthDateStep,
  3: BirthTimeStep,
  4: BirthPlaceStep,
  5: RelationshipStep,
  6: GoalsStep,
  7: ColorStep,
  8: ElementStep,
  9: CalculatingStep,
  10: AstroResultStep,
  // 11: PalmUploadStep, // Temporarily disabled - palm analysis not working
  11: EmailStep,
  12: PaywallStep,
};

export function QuizContainer() {
  const { currentStep } = useQuizStore();
  const StepComponent = stepComponents[currentStep];

  if (!StepComponent) {
    return (
      <div className="text-center text-text-secondary">
        Крок {currentStep} не знайдено
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <StepComponent key={currentStep} />
    </AnimatePresence>
  );
}

