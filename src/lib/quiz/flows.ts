// Quiz Flows Configuration - Based on sub.astroline.today analysis

import { QuizFlow, QuizStepType, TransitionConfig, PaywallConfig, SpecialOffer } from './types';

// ============================================
// PREDEFINED QUIZ FLOWS
// ============================================

export const QUIZ_FLOWS: Record<string, QuizFlow> = {
  // Default astrology flow
  default: {
    id: 'default',
    name: 'Astrology Report',
    description: 'Complete astrology reading based on your birth chart',
    welcomeScreen: 'WELCOME_DEFAULT',
    genderScreen: 'GENDER_DEFAULT',
    steps: [
      'GENDER_DEFAULT',
      'BIRTHDAY',
      'BIRTHTIME',
      'BIRTHPLACE',
      'TRANSITION_SUN',
      'RELATIONSHIP_STATUS',
      'FUTURE_GOALS',
      'TRANSITION_HOROSCOPE',
      'COLORS',
      'ELEMENT',
      'TRANSITION_BIRTH_CHART_ANIMATION',
      'EMAIL',
      'MAILING_CHECKBOX',
      'REPORT_LOADER',
      'PAYWALL_PRESUMMARY',
      'PAYWALL_MAIN',
    ],
    afterPurchaseFlow: [
      'UPSELL_GUIDES',
      'UPSELL_COMPATIBILITY',
      'UPSELL_BIRTH_CHART',
      'UPSELL_ASTROLOGER_PACK',
    ],
  },

  // Soulmate finding flow
  soulmate: {
    id: 'soulmate',
    name: 'Find Your Soulmate',
    description: 'Discover your cosmic soulmate match',
    welcomeScreen: 'WELCOME_SOULMATE',
    genderScreen: 'GENDER_SOULMATE',
    steps: [
      'GENDER_SOULMATE',
      'BIRTHDAY',
      'BIRTHTIME',
      'BIRTHPLACE',
      'TRANSITION_SUN',
      'RELATIONSHIP_STATUS',
      'TRANSITION_SOULMATE_LEAD_BY',
      'SOULMATE_AGE_GROUP',
      'SOULMATE_APPEARANCE',
      'SOULMATE_NOTICE_FIRST',
      'SOULMATE_LEAD_BY',
      'TRANSITION_SOULMATE_STRUGGLE',
      'SOULMATE_BIGGEST_STRUGGLE',
      'SOULMATE_KIND_OF_CONNECTION',
      'SOULMATE_DRAWN_TO_ENERGY',
      'TRANSITION_SOULMATE_REVEALS_PATH',
      'SOULMATE_LOVE_SIGNAL',
      'SOULMATE_FEELINGS_IN_RELATIONSHIP',
      'SOULMATE_MAIN_WORRY',
      'SOULMATE_CREATE_FUTURE',
      'TRANSITION_SOULMATE_TRUST_PILOT',
      'EMAIL',
      'REPORT_LOADER',
      'TRANSITION_SOULMATE_PORTRAIT_READY',
      'PAYWALL_PRESUMMARY',
      'PAYWALL_MAIN',
    ],
    afterPurchaseFlow: [
      'UPSELL_COMPATIBILITY',
      'UPSELL_BIRTH_CHART',
      'UPSELL_MOON',
      'UPSELL_ASTROLOGER_PACK',
    ],
  },

  // Palm reading flow
  palm_reading: {
    id: 'palm_reading',
    name: 'Palm Reading',
    description: 'AI-powered palm analysis',
    welcomeScreen: 'WELCOME_PALM',
    genderScreen: 'GENDER_DEFAULT',
    steps: [
      'GENDER_DEFAULT',
      'BIRTHDAY',
      'TRANSITION_SUN',
      'YOUR_NAME',
      'TRANSITION_PALM_PREPARATION',
      'PALM_READING_UPLOAD',
      'TRANSITION_HEAD_HEART',
      'RELATIONSHIP_STATUS',
      'FUTURE_GOALS',
      'TRANSITION_HAND_DARK',
      'EMAIL',
      'REPORT_LOADER',
      'PAYWALL_PRESUMMARY',
      'PAYWALL_MAIN',
    ],
    afterPurchaseFlow: [
      'UPSELL_BIRTH_CHART',
      'UPSELL_COMPATIBILITY',
      'UPSELL_ASTROLOGER_PACK',
    ],
  },

  // Moon cycle flow
  moon: {
    id: 'moon',
    name: 'Moon Phase Reading',
    description: 'Discover your lunar personality',
    welcomeScreen: 'WELCOME_MOON',
    genderScreen: 'GENDER_DEFAULT',
    steps: [
      'GENDER_DEFAULT',
      'BIRTHDAY',
      'BIRTHTIME',
      'BIRTHPLACE',
      'TRANSITION_MOON_PHASE',
      'RELATIONSHIP_STATUS',
      'MOON_NOTICE_PARTNER',
      'MOON_MATTERS_MOST',
      'TRANSITION_MOON_DARK',
      'MOON_LACK_PAST',
      'MOON_TIME_APART',
      'TRANSITION_USER_MOON_PHASE',
      'PARTNER_BIRTHDAY',
      'TRANSITION_PARTNER_MOON_PHASE',
      'MOON_PARTNER_COMPATIBILITY',
      'TRANSITION_MOON_ZODIAC',
      'EMAIL',
      'REPORT_LOADER',
      'PAYWALL_PRESUMMARY',
      'PAYWALL_MAIN',
    ],
    afterPurchaseFlow: [
      'UPSELL_COMPATIBILITY',
      'UPSELL_BIRTH_CHART',
      'UPSELL_SOULMATE',
      'UPSELL_ASTROLOGER_PACK',
    ],
  },

  // Human Design flow
  human_design: {
    id: 'human_design',
    name: 'Human Design',
    description: 'Discover your unique human design',
    welcomeScreen: 'WELCOME_HUMAN_DESIGN',
    genderScreen: 'GENDER_DEFAULT',
    steps: [
      'GENDER_DEFAULT',
      'BIRTHDAY',
      'BIRTHTIME',
      'BIRTHPLACE',
      'TRANSITION_HUMAN_DESIGN_ANIMATION',
      'HUMAN_DESIGN_ENERGY_FLOW',
      'TRANSITION_HUMAN_DESIGN_BODY_CENTER',
      'HUMAN_DESIGN_ACT_GROUP',
      'UNDERSTAND_BETTER',
      'BODY_DECISIONS',
      'TRANSITION_BIRTH_CHART_ANIMATION',
      'EMAIL',
      'REPORT_LOADER',
      'PAYWALL_PRESUMMARY',
      'PAYWALL_MAIN',
    ],
    afterPurchaseFlow: [
      'UPSELL_BIRTH_CHART',
      'UPSELL_COMPATIBILITY',
      'UPSELL_ASTROLOGER_PACK',
    ],
  },

  // Witch Type flow
  witch_type: {
    id: 'witch_type',
    name: 'Discover Your Witch Type',
    description: 'Find your magical archetype',
    welcomeScreen: 'WELCOME_WITCH_TYPE',
    genderScreen: 'GENDER_WITCHES',
    steps: [
      'GENDER_WITCHES',
      'BIRTHDAY',
      'BIRTHTIME',
      'BIRTHPLACE',
      'TRANSITION_BIRTH_CHART',
      'WITCH_WHERE_COMFORTABLE',
      'WITCH_BIGGEST_SHIFTS',
      'TRANSITION_WITCH_POTENTIAL',
      'WITCH_TYPE_FEEL',
      'WITCH_TYPE_DRAWS',
      'WITCH_MAGICAL_TOOL',
      'TRANSITION_WITCH_POWER_CHANNELS',
      'VISIONS_DREAMS',
      'EMAIL',
      'REPORT_LOADER',
      'PAYWALL_PRESUMMARY',
      'PAYWALL_MAIN',
    ],
    afterPurchaseFlow: [
      'UPSELL_BIRTH_CHART',
      'UPSELL_MOON',
      'UPSELL_ASTROLOGER_PACK',
    ],
  },

  // Astrocartography flow
  astrocartography: {
    id: 'astrocartography',
    name: 'Astrocartography',
    description: 'Find your power places on Earth',
    welcomeScreen: 'WELCOME_ASTROCARTOGRAPHY',
    genderScreen: 'GENDER_ASTROCARTOGRAPHY',
    steps: [
      'GENDER_ASTROCARTOGRAPHY',
      'BIRTHDAY',
      'BIRTHTIME',
      'BIRTHPLACE',
      'LIVING_PLACE',
      'TRANSITION_STORIES_ASTROCARTOGRAPHY',
      'ASTROCARTOGRAPHY_INTEREST_PLACES',
      'ASTROCARTOGRAPHY_ENERGY_PLACES',
      'ASTROCARTOGRAPHY_CHALLENGES_PLACES',
      'TRANSITION_MAP_HAND',
      'FUTURE_GOALS',
      'EMAIL',
      'REPORT_LOADER',
      'PAYWALL_PRESUMMARY',
      'PAYWALL_MAIN',
    ],
    afterPurchaseFlow: [
      'UPSELL_BIRTH_CHART',
      'UPSELL_COMPATIBILITY',
      'UPSELL_ASTROLOGER_PACK',
    ],
  },

  // Tarot flow
  tarot: {
    id: 'tarot',
    name: 'Tarot Reading',
    description: 'Discover what the cards say',
    welcomeScreen: 'WELCOME_TAROT',
    genderScreen: 'GENDER_TAROT',
    steps: [
      'GENDER_TAROT',
      'BIRTHDAY',
      'TRANSITION_SUN',
      'RELATIONSHIP_STATUS',
      'TRANSITION_CARDS_SAY',
      'TAROT_CARDS',
      'TRANSITION_ANIMATION_TAROT',
      'FUTURE_GOALS',
      'COLORS',
      'EMAIL',
      'REPORT_LOADER',
      'PAYWALL_PRESUMMARY',
      'PAYWALL_MAIN',
    ],
    afterPurchaseFlow: [
      'UPSELL_BIRTH_CHART',
      'UPSELL_PALM_READING',
      'UPSELL_COMPATIBILITY',
      'UPSELL_ASTROLOGER_PACK',
    ],
  },

  // Compatibility flow (requires partner data)
  compatibility: {
    id: 'compatibility',
    name: 'Compatibility Report',
    description: 'Check your cosmic compatibility',
    welcomeScreen: 'WELCOME_DEFAULT',
    genderScreen: 'GENDER_DEFAULT',
    steps: [
      'GENDER_DEFAULT',
      'BIRTHDAY',
      'BIRTHTIME',
      'BIRTHPLACE',
      'TRANSITION_USER_CARD',
      'PARTNER_BIRTHDAY',
      'PARTNER_BIRTHTIME',
      'PARTNER_BIRTHPLACE',
      'TRANSITION_PARTNER_CARD',
      'TRANSITION_COMPATIBILITY',
      'RELATIONSHIP_STATUS',
      'FUTURE_GOALS',
      'TRANSITION_PLANETS',
      'EMAIL',
      'REPORT_LOADER',
      'PAYWALL_PRESUMMARY',
      'PAYWALL_MAIN',
    ],
    afterPurchaseFlow: [
      'UPSELL_BIRTH_CHART',
      'UPSELL_MOON',
      'UPSELL_ASTROLOGER_PACK',
    ],
  },
};

// ============================================
// TRANSITION SCREEN CONFIGURATIONS
// ============================================

export const TRANSITION_CONFIGS: Record<string, TransitionConfig> = {
  TRANSITION_SUN: {
    type: 'TRANSITION_SUN',
    title: 'Analyzing your Sun sign...',
    subtitle: 'Your core personality is being revealed',
    animationType: 'loader',
    duration: 3000,
    showProgress: true,
    progressSteps: [
      'Reading birth data...',
      'Calculating Sun position...',
      'Analyzing personality traits...',
    ],
  },
  TRANSITION_BIRTH_CHART_ANIMATION: {
    type: 'TRANSITION_BIRTH_CHART_ANIMATION',
    title: 'Creating your natal chart...',
    subtitle: 'Mapping the celestial positions at your birth',
    animationType: 'planets',
    duration: 5000,
    showProgress: true,
    progressSteps: [
      'Positioning planets...',
      'Calculating houses...',
      'Analyzing aspects...',
      'Generating insights...',
    ],
  },
  TRANSITION_SOULMATE_PORTRAIT_READY: {
    type: 'TRANSITION_SOULMATE_PORTRAIT_READY',
    title: 'Your soulmate portrait is ready!',
    subtitle: 'Based on 847 cosmic parameters',
    animationType: 'story',
    duration: 4000,
  },
  TRANSITION_MOON_PHASE: {
    type: 'TRANSITION_MOON_PHASE',
    title: 'Calculating your Moon phase...',
    subtitle: 'Your emotional blueprint is being analyzed',
    animationType: 'loader',
    duration: 3500,
    showProgress: true,
    progressSteps: [
      'Determining lunar cycle...',
      'Analyzing emotional patterns...',
      'Mapping intuitive abilities...',
    ],
  },
  TRANSITION_PALM_PREPARATION: {
    type: 'TRANSITION_PALM_PREPARATION',
    title: 'Preparing palm analysis...',
    subtitle: 'Our AI is ready to read your destiny',
    animationType: 'hand',
    duration: 2500,
  },
  TRANSITION_HEAD_HEART: {
    type: 'TRANSITION_HEAD_HEART',
    title: 'Analyzing head & heart lines...',
    subtitle: 'Your intellectual and emotional paths',
    animationType: 'hand',
    duration: 4000,
    showProgress: true,
    progressSteps: [
      'Tracing head line...',
      'Reading heart line...',
      'Calculating intersections...',
    ],
  },
  TRANSITION_WITCH_POTENTIAL: {
    type: 'TRANSITION_WITCH_POTENTIAL',
    title: 'Awakening your magical potential...',
    subtitle: 'The ancient wisdom is calling',
    animationType: 'story',
    duration: 3500,
  },
  TRANSITION_HUMAN_DESIGN_ANIMATION: {
    type: 'TRANSITION_HUMAN_DESIGN_ANIMATION',
    title: 'Mapping your energy centers...',
    subtitle: 'Your unique design is being calculated',
    animationType: 'loader',
    duration: 4500,
    showProgress: true,
    progressSteps: [
      'Analyzing energy type...',
      'Determining strategy...',
      'Mapping defined centers...',
      'Calculating profile...',
    ],
  },
};

// ============================================
// PAYWALL CONFIGURATIONS
// ============================================

export const DEFAULT_PAYWALL_CONFIG: PaywallConfig = {
  type: 'main',
  title: 'Unlock Your Full Report',
  subtitle: 'Get personalized insights based on your cosmic blueprint',
  products: [
    {
      id: 'weekly_trial',
      productId: 'astroline_weekly_trial',
      title: '7-Day Trial',
      subtitle: 'Then $9.99/week',
      price: 1.99,
      currency: 'USD',
      activePrice: '$1.99',
      notActivePrice: '$9.99',
      discount: '80%',
      trialDays: 7,
      billingPeriod: 'weekly',
    },
    {
      id: 'monthly',
      productId: 'astroline_monthly',
      title: 'Monthly',
      subtitle: 'Best Value',
      price: 19.99,
      currency: 'USD',
      activePrice: '$19.99',
      notActivePrice: '$39.99',
      discount: '50%',
      billingPeriod: 'monthly',
    },
    {
      id: 'yearly',
      productId: 'astroline_yearly',
      title: 'Yearly',
      subtitle: 'Most Popular',
      price: 49.99,
      currency: 'USD',
      activePrice: '$49.99',
      notActivePrice: '$119.99',
      discount: '58%',
      billingPeriod: 'yearly',
    },
  ],
  selectedProductIndex: 1,
  showTimer: true,
  timerDuration: 1800, // 30 minutes
  showMoneyBackGuarantee: true,
  showTrustIndicators: true,
  showTestimonials: true,
};

export const PRESUMMARY_PAYWALL_CONFIG: PaywallConfig = {
  type: 'presummary',
  title: 'Your Personalized Report is Ready!',
  subtitle: "Here's what we discovered about you...",
  products: DEFAULT_PAYWALL_CONFIG.products,
  selectedProductIndex: 1,
  showTimer: true,
  timerDuration: 900, // 15 minutes
  showMoneyBackGuarantee: true,
  showTrustIndicators: true,
  showTestimonials: false,
};

// ============================================
// SPECIAL OFFERS (UPSELLS)
// ============================================

export const SPECIAL_OFFERS: Record<string, SpecialOffer> = {
  compatibility_offer: {
    enabled: true,
    type: 'popup',
    title: 'Special Compatibility Offer',
    subtitle: 'Discover your cosmic match',
    buttonText: 'Get 75% Off Now',
    skipButtonText: 'No thanks, continue',
    discountTimer: 1800,
    product: {
      id: 'compatibility_report',
      productId: 'astroline_compatibility',
      title: 'Compatibility Report',
      subtitle: 'Full relationship analysis',
      price: 9.99,
      currency: 'USD',
      activePrice: '$9.99',
      notActivePrice: '$39.99',
      discount: '75%',
    },
    successModalEnabled: true,
    autoRedirectEnabled: false,
  },
  birth_chart_offer: {
    enabled: true,
    type: 'popup',
    title: 'Your Birth Chart Analysis',
    subtitle: 'Deep dive into your natal chart',
    buttonText: 'Unlock for $12.99',
    skipButtonText: 'Maybe later',
    discountTimer: 1200,
    product: {
      id: 'birth_chart_report',
      productId: 'astroline_birth_chart',
      title: 'Birth Chart Report',
      subtitle: 'Complete natal chart analysis',
      price: 12.99,
      currency: 'USD',
      activePrice: '$12.99',
      notActivePrice: '$49.99',
      discount: '74%',
    },
    successModalEnabled: true,
    autoRedirectEnabled: false,
  },
  astrologer_pack_offer: {
    enabled: true,
    type: 'fullscreen',
    title: '1-on-1 Astrologer Consultation',
    subtitle: 'Talk to a professional astrologer',
    buttonText: 'Get 30 Minutes Free',
    skipButtonText: 'Skip this offer',
    product: {
      id: 'astrologer_pack',
      productId: 'astroline_astrologer_30min',
      title: '30 Minutes Consultation',
      subtitle: '+15 minutes free',
      price: 49.99,
      currency: 'USD',
      activePrice: '$49.99',
      notActivePrice: '$99.99',
      discount: '50%',
    },
    successModalEnabled: true,
    autoRedirectEnabled: false,
  },
  no_funds_offer: {
    enabled: true,
    type: 'popup',
    title: "We understand - here's a special deal",
    subtitle: 'Limited time offer just for you',
    buttonText: 'Get 90% Off',
    skipButtonText: 'No thanks',
    discountTimer: 600, // 10 minutes
    product: {
      id: 'no_funds_weekly',
      productId: 'astroline_weekly_discount',
      title: 'Weekly Access',
      subtitle: 'Try for just $0.99',
      price: 0.99,
      currency: 'USD',
      activePrice: '$0.99',
      notActivePrice: '$9.99',
      discount: '90%',
      trialDays: 7,
      billingPeriod: 'weekly',
    },
    successModalEnabled: true,
    autoRedirectEnabled: false,
  },
};

// ============================================
// DATA COLLECTION POINTS
// ============================================

export const DATA_COLLECTION_STEPS: QuizStepType[] = [
  'EMAIL',
  'YOUR_NAME',
  'BIRTHDAY',
  'BIRTHTIME',
  'BIRTHPLACE',
  'LIVING_PLACE',
  'PARTNER_BIRTHDAY',
  'PARTNER_BIRTHTIME',
  'PARTNER_BIRTHPLACE',
  'PALM_READING_UPLOAD',
  'FACE_READING_UPLOAD',
  'MAILING_CHECKBOX',
];

// Steps that blur background to show value preview
export const BLUR_PREVIEW_STEPS: QuizStepType[] = [
  'EMAIL',
  'PAYWALL_PRESUMMARY',
  'TRANSITION_MAP_HAND',
  'TRANSITION_SOULMATE_PORTRAIT_READY',
];

// Steps that can be skipped
export const SKIPPABLE_STEPS: QuizStepType[] = [
  'BIRTHTIME',
  'LIVING_PLACE',
  'PARTNER_BIRTHTIME',
  'MAILING_CHECKBOX',
  'SURVEY',
];

// ============================================
// PSYCHOLOGY TRIGGERS
// ============================================

export const SOCIAL_PROOF_DATA = {
  users_count: {
    type: 'users_count' as const,
    value: '2,847,392 users',
    icon: 'users',
  },
  rating: {
    type: 'rating' as const,
    value: '4.8/5',
    icon: 'star',
  },
  trust_pilot: {
    type: 'trust_pilot' as const,
    value: 'Excellent on Trustpilot',
    icon: 'shield',
  },
};

export const VALUE_PROPOSITIONS = [
  {
    icon: 'sparkles',
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms analyze 1000+ cosmic parameters',
  },
  {
    icon: 'lock',
    title: '100% Confidential',
    description: 'Your data is encrypted and never shared',
  },
  {
    icon: 'refresh',
    title: 'Daily Updates',
    description: 'Fresh insights based on current planetary positions',
  },
  {
    icon: 'award',
    title: 'Expert Astrologers',
    description: 'Reports reviewed by professional astrologers',
  },
];

export const MONEY_BACK_GUARANTEE = {
  title: '14-Day Money Back Guarantee',
  description: "If you're not satisfied, we'll refund your purchase. No questions asked.",
  icon: 'shield-check',
};
