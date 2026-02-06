import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface QuizData {
  // Step 1: Gender
  gender?: 'female' | 'male' | 'non-binary';
  
  // Step 2: Birth data
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  birthLat?: number;
  birthLng?: number;
  
  // Step 3: Relationship
  relationshipStatus?: string;
  
  // Step 4: Goals
  goals?: string[];
  
  // Step 5: Color
  favoriteColor?: string;
  
  // Step 6: Element
  element?: string;
  
  // Step 7: Calculated astro data
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  modality?: string;
  polarity?: string;
  
  // Step 9: Palm image
  palmImageUrl?: string;
  
  // Step 10: Palm reading results
  palmReading?: {
    childrenCount: string;
    marriagesCount: string;
    bigChanges: boolean;
    wealthIndicator: string;
  };
  
  // Step 11: Email
  email?: string;
}

interface QuizState {
  // Current step (1-13)
  currentStep: number;
  
  // Quiz data
  data: QuizData;
  
  // Loading states
  isCalculating: boolean;
  isGeneratingReport: boolean;
  
  // Report ID after generation
  reportId?: string;
  
  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: Partial<QuizData>) => void;
  setCalculating: (value: boolean) => void;
  setGeneratingReport: (value: boolean) => void;
  setReportId: (id: string) => void;
  reset: () => void;
}

const TOTAL_STEPS = 13;

const initialData: QuizData = {};

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      currentStep: 1,
      data: initialData,
      isCalculating: false,
      isGeneratingReport: false,
      reportId: undefined,

      setStep: (step) => {
        if (step >= 1 && step <= TOTAL_STEPS) {
          set({ currentStep: step });
        }
      },

      nextStep: () => {
        const { currentStep } = get();
        if (currentStep < TOTAL_STEPS) {
          set({ currentStep: currentStep + 1 });
        }
      },

      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 1) {
          set({ currentStep: currentStep - 1 });
        }
      },

      updateData: (newData) => {
        set((state) => ({
          data: { ...state.data, ...newData },
        }));
      },

      setCalculating: (value) => {
        set({ isCalculating: value });
      },

      setGeneratingReport: (value) => {
        set({ isGeneratingReport: value });
      },

      setReportId: (id) => {
        set({ reportId: id });
      },

      reset: () => {
        set({
          currentStep: 1,
          data: initialData,
          isCalculating: false,
          isGeneratingReport: false,
          reportId: undefined,
        });
      },
    }),
    {
      name: 'astroline-quiz',
      version: 2, // Increment this to clear old localStorage data on deploy
      migrate: (persistedState, version) => {
        // Clear old data when version changes (users will restart quiz)
        if (version < 2) {
          return {
            currentStep: 1,
            data: {},
            reportId: undefined,
          };
        }
        return persistedState as { currentStep: number; data: QuizData; reportId?: string };
      },
      partialize: (state) => ({
        currentStep: state.currentStep,
        data: state.data,
        reportId: state.reportId,
      }),
    }
  )
);

// Selector hooks for optimized re-renders
export const useCurrentStep = () => useQuizStore((state) => state.currentStep);
export const useQuizData = () => useQuizStore((state) => state.data);
export const useQuizProgress = () => {
  const currentStep = useQuizStore((state) => state.currentStep);
  return {
    current: currentStep,
    total: TOTAL_STEPS,
    percentage: Math.round((currentStep / TOTAL_STEPS) * 100),
  };
};

