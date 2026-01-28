import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  QuizFlow,
  QuizStepType,
  UserProfile,
  FlowType,
  PaywallConfig,
  SpecialOffer,
} from '@/lib/quiz/types';
import {
  QUIZ_FLOWS,
  DEFAULT_PAYWALL_CONFIG,
  PRESUMMARY_PAYWALL_CONFIG,
  SPECIAL_OFFERS,
  DATA_COLLECTION_STEPS,
  SKIPPABLE_STEPS,
} from '@/lib/quiz/flows';

// ============================================
// ADVANCED QUIZ STATE
// ============================================

interface AdvancedQuizState {
  // Flow configuration
  flowType: FlowType;
  currentFlow: QuizFlow;
  customSteps: QuizStepType[];
  
  // Navigation
  currentStepIndex: number;
  currentStep: QuizStepType;
  stepHistory: number[];
  
  // User data
  userData: UserProfile;
  
  // Loading states
  isCalculating: boolean;
  isGeneratingReport: boolean;
  isTransitioning: boolean;
  transitionProgress: number;
  
  // Paywall state
  paywallConfig: PaywallConfig;
  selectedProductId: string | null;
  isPurchased: boolean;
  purchasedProducts: string[];
  
  // Upsell state
  currentUpsellIndex: number;
  shownUpsells: string[];
  declinedUpsells: string[];
  
  // Special offers
  activeSpecialOffer: SpecialOffer | null;
  specialOfferEndTime: number | null;
  
  // Report
  reportId?: string;
  
  // Timestamps for analytics
  quizStartTime: number;
  stepStartTimes: Record<number, number>;
  
  // Actions
  setFlow: (flowType: FlowType) => void;
  setCustomSteps: (steps: QuizStepType[]) => void;
  
  // Navigation actions
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (index: number) => void;
  skipStep: () => void;
  
  // Data actions
  updateUserData: (data: Partial<UserProfile>) => void;
  
  // State actions
  setCalculating: (value: boolean) => void;
  setGeneratingReport: (value: boolean) => void;
  setTransitioning: (value: boolean, progress?: number) => void;
  
  // Paywall actions
  setPaywallConfig: (config: PaywallConfig) => void;
  selectProduct: (productId: string) => void;
  completePurchase: (productId: string) => void;
  
  // Upsell actions
  showNextUpsell: () => SpecialOffer | null;
  acceptUpsell: (offerId: string) => void;
  declineUpsell: (offerId: string) => void;
  
  // Special offer actions
  activateSpecialOffer: (offer: SpecialOffer, duration: number) => void;
  clearSpecialOffer: () => void;
  
  // Report actions
  setReportId: (id: string) => void;
  
  // Reset
  reset: () => void;
  
  // Computed values
  getTotalSteps: () => number;
  getProgress: () => number;
  isDataCollectionStep: () => boolean;
  isSkippableStep: () => boolean;
  getTimeOnCurrentStep: () => number;
  getTotalQuizTime: () => number;
}

// ============================================
// INITIAL STATE
// ============================================

const initialUserData: UserProfile = {};

const getInitialState = () => ({
  flowType: 'default' as FlowType,
  currentFlow: QUIZ_FLOWS.default,
  customSteps: [] as QuizStepType[],
  currentStepIndex: 0,
  currentStep: QUIZ_FLOWS.default.steps[0],
  stepHistory: [0],
  userData: initialUserData,
  isCalculating: false,
  isGeneratingReport: false,
  isTransitioning: false,
  transitionProgress: 0,
  paywallConfig: PRESUMMARY_PAYWALL_CONFIG,
  selectedProductId: null,
  isPurchased: false,
  purchasedProducts: [] as string[],
  currentUpsellIndex: 0,
  shownUpsells: [] as string[],
  declinedUpsells: [] as string[],
  activeSpecialOffer: null as SpecialOffer | null,
  specialOfferEndTime: null as number | null,
  reportId: undefined,
  quizStartTime: Date.now(),
  stepStartTimes: { 0: Date.now() } as Record<number, number>,
});

// ============================================
// STORE IMPLEMENTATION
// ============================================

export const useAdvancedQuizStore = create<AdvancedQuizState>()(
  persist(
    (set, get) => ({
      ...getInitialState(),

      // ========== Flow Actions ==========
      setFlow: (flowType) => {
        const flow = QUIZ_FLOWS[flowType] || QUIZ_FLOWS.default;
        set({
          flowType,
          currentFlow: flow,
          currentStepIndex: 0,
          currentStep: flow.steps[0],
          stepHistory: [0],
          quizStartTime: Date.now(),
          stepStartTimes: { 0: Date.now() },
        });
      },

      setCustomSteps: (steps) => {
        set({ customSteps: steps });
      },

      // ========== Navigation Actions ==========
      nextStep: () => {
        const { currentFlow, customSteps, currentStepIndex, stepHistory } = get();
        const steps = customSteps.length > 0 ? customSteps : currentFlow.steps;
        const nextIndex = currentStepIndex + 1;
        
        if (nextIndex < steps.length) {
          set({
            currentStepIndex: nextIndex,
            currentStep: steps[nextIndex],
            stepHistory: [...stepHistory, nextIndex],
            stepStartTimes: {
              ...get().stepStartTimes,
              [nextIndex]: Date.now(),
            },
          });
        }
      },

      prevStep: () => {
        const { stepHistory, currentFlow, customSteps } = get();
        if (stepHistory.length > 1) {
          const newHistory = stepHistory.slice(0, -1);
          const prevIndex = newHistory[newHistory.length - 1];
          const steps = customSteps.length > 0 ? customSteps : currentFlow.steps;
          
          set({
            currentStepIndex: prevIndex,
            currentStep: steps[prevIndex],
            stepHistory: newHistory,
          });
        }
      },

      goToStep: (index) => {
        const { currentFlow, customSteps, stepHistory } = get();
        const steps = customSteps.length > 0 ? customSteps : currentFlow.steps;
        
        if (index >= 0 && index < steps.length) {
          set({
            currentStepIndex: index,
            currentStep: steps[index],
            stepHistory: [...stepHistory, index],
            stepStartTimes: {
              ...get().stepStartTimes,
              [index]: Date.now(),
            },
          });
        }
      },

      skipStep: () => {
        const { currentStep } = get();
        if (SKIPPABLE_STEPS.includes(currentStep)) {
          get().nextStep();
        }
      },

      // ========== Data Actions ==========
      updateUserData: (data) => {
        set((state) => ({
          userData: { ...state.userData, ...data },
        }));
      },

      // ========== State Actions ==========
      setCalculating: (value) => set({ isCalculating: value }),
      
      setGeneratingReport: (value) => set({ isGeneratingReport: value }),
      
      setTransitioning: (value, progress = 0) => {
        set({ isTransitioning: value, transitionProgress: progress });
      },

      // ========== Paywall Actions ==========
      setPaywallConfig: (config) => set({ paywallConfig: config }),
      
      selectProduct: (productId) => set({ selectedProductId: productId }),
      
      completePurchase: (productId) => {
        set((state) => ({
          isPurchased: true,
          purchasedProducts: [...state.purchasedProducts, productId],
        }));
      },

      // ========== Upsell Actions ==========
      showNextUpsell: () => {
        const { currentFlow, currentUpsellIndex, shownUpsells, declinedUpsells } = get();
        const afterPurchaseFlow = currentFlow.afterPurchaseFlow;
        
        // Find next upsell that hasn't been shown or declined
        for (let i = currentUpsellIndex; i < afterPurchaseFlow.length; i++) {
          const upsellType = afterPurchaseFlow[i];
          const offerId = upsellType.replace('UPSELL_', '').toLowerCase() + '_offer';
          
          if (!shownUpsells.includes(offerId) && !declinedUpsells.includes(offerId)) {
            const offer = SPECIAL_OFFERS[offerId];
            if (offer?.enabled) {
              set({
                currentUpsellIndex: i + 1,
                shownUpsells: [...shownUpsells, offerId],
                activeSpecialOffer: offer,
              });
              return offer;
            }
          }
        }
        
        return null;
      },

      acceptUpsell: (offerId) => {
        const offer = SPECIAL_OFFERS[offerId];
        if (offer) {
          set((state) => ({
            purchasedProducts: [...state.purchasedProducts, offer.product.productId],
            activeSpecialOffer: null,
          }));
        }
      },

      declineUpsell: (offerId) => {
        set((state) => ({
          declinedUpsells: [...state.declinedUpsells, offerId],
          activeSpecialOffer: null,
        }));
      },

      // ========== Special Offer Actions ==========
      activateSpecialOffer: (offer, duration) => {
        set({
          activeSpecialOffer: offer,
          specialOfferEndTime: Date.now() + duration * 1000,
        });
      },

      clearSpecialOffer: () => {
        set({
          activeSpecialOffer: null,
          specialOfferEndTime: null,
        });
      },

      // ========== Report Actions ==========
      setReportId: (id) => set({ reportId: id }),

      // ========== Reset ==========
      reset: () => {
        set({
          ...getInitialState(),
          quizStartTime: Date.now(),
          stepStartTimes: { 0: Date.now() },
        });
      },

      // ========== Computed Values ==========
      getTotalSteps: () => {
        const { currentFlow, customSteps } = get();
        return customSteps.length > 0 ? customSteps.length : currentFlow.steps.length;
      },

      getProgress: () => {
        const { currentStepIndex } = get();
        const total = get().getTotalSteps();
        return Math.round(((currentStepIndex + 1) / total) * 100);
      },

      isDataCollectionStep: () => {
        const { currentStep } = get();
        return DATA_COLLECTION_STEPS.includes(currentStep);
      },

      isSkippableStep: () => {
        const { currentStep } = get();
        return SKIPPABLE_STEPS.includes(currentStep);
      },

      getTimeOnCurrentStep: () => {
        const { currentStepIndex, stepStartTimes } = get();
        const startTime = stepStartTimes[currentStepIndex] || Date.now();
        return Date.now() - startTime;
      },

      getTotalQuizTime: () => {
        const { quizStartTime } = get();
        return Date.now() - quizStartTime;
      },
    }),
    {
      name: 'astroline-advanced-quiz',
      version: 2, // Increment this to clear old localStorage data on deploy
      migrate: (persistedState, version) => {
        // Clear old data when version changes
        if (version < 2) {
          return {
            flowType: 'default',
            currentStepIndex: 0,
            userData: {},
            isPurchased: false,
            purchasedProducts: [],
            shownUpsells: [],
            declinedUpsells: [],
            reportId: undefined,
            quizStartTime: Date.now(),
          };
        }
        return persistedState;
      },
      partialize: (state) => ({
        flowType: state.flowType,
        currentStepIndex: state.currentStepIndex,
        userData: state.userData,
        isPurchased: state.isPurchased,
        purchasedProducts: state.purchasedProducts,
        shownUpsells: state.shownUpsells,
        declinedUpsells: state.declinedUpsells,
        reportId: state.reportId,
        quizStartTime: state.quizStartTime,
      }),
    }
  )
);

// ============================================
// SELECTOR HOOKS
// ============================================

export const useCurrentStep = () => useAdvancedQuizStore((state) => state.currentStep);
export const useUserData = () => useAdvancedQuizStore((state) => state.userData);
export const useQuizProgress = () => {
  const store = useAdvancedQuizStore();
  return {
    current: store.currentStepIndex + 1,
    total: store.getTotalSteps(),
    percentage: store.getProgress(),
  };
};
export const usePaywallState = () => useAdvancedQuizStore((state) => ({
  config: state.paywallConfig,
  selectedProductId: state.selectedProductId,
  isPurchased: state.isPurchased,
}));
export const useActiveOffer = () => useAdvancedQuizStore((state) => ({
  offer: state.activeSpecialOffer,
  endTime: state.specialOfferEndTime,
}));
