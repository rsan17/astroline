// Quiz Flow Types - Based on sub.astroline.today analysis

// ============================================
// QUIZ STEP TYPES
// ============================================

export type WelcomeScreenType =
  | 'WELCOME_DEFAULT'
  | 'WELCOME_TAROT'
  | 'WELCOME_PALM'
  | 'WELCOME_MOON'
  | 'WELCOME_SOULMATE'
  | 'WELCOME_ASTROCARTOGRAPHY'
  | 'WELCOME_HUMAN_DESIGN'
  | 'WELCOME_WITCH_TYPE'
  | 'WELCOME_BIRTH_CHART';

export type GenderStepType =
  | 'GENDER_DEFAULT'
  | 'GENDER_TAROT'
  | 'GENDER_SOULMATE'
  | 'GENDER_WITCHES'
  | 'GENDER_ASTROCARTOGRAPHY';

export type DataCollectionStepType =
  | 'BIRTHDAY'
  | 'BIRTHTIME'
  | 'BIRTHPLACE'
  | 'YOUR_NAME'
  | 'LIVING_PLACE'
  | 'EMAIL'
  | 'PARTNER_BIRTHDAY'
  | 'PARTNER_BIRTHPLACE'
  | 'PARTNER_BIRTHTIME';

export type QuestionStepType =
  | 'RELATIONSHIP_STATUS'
  | 'FUTURE_GOALS'
  | 'COLORS'
  | 'ELEMENT'
  | 'TAROT_CARDS'
  | 'TYPES_ESOTERICISM'
  // Soulmate questions
  | 'SOULMATE_AGE_GROUP'
  | 'SOULMATE_APPEARANCE'
  | 'SOULMATE_NOTICE_FIRST'
  | 'SOULMATE_LEAD_BY'
  | 'SOULMATE_BIGGEST_STRUGGLE'
  | 'SOULMATE_KIND_OF_CONNECTION'
  | 'SOULMATE_DRAWN_TO_ENERGY'
  | 'SOULMATE_LOVE_SIGNAL'
  | 'SOULMATE_FEELINGS_IN_RELATIONSHIP'
  | 'SOULMATE_MAIN_WORRY'
  | 'SOULMATE_CREATE_FUTURE'
  // Moon questions
  | 'MOON_NOTICE_PARTNER'
  | 'MOON_MATTERS_MOST'
  | 'MOON_LACK_PAST'
  | 'MOON_TIME_APART'
  | 'MOON_PARTNER_COMPATIBILITY'
  // Witch questions
  | 'WITCH_TYPE_FEEL'
  | 'WITCH_TYPE_DRAWS'
  | 'WITCH_MAGICAL_TOOL'
  | 'WITCH_WHERE_COMFORTABLE'
  | 'WITCH_BIGGEST_SHIFTS'
  // Human Design questions
  | 'HUMAN_DESIGN_ENERGY_FLOW'
  | 'HUMAN_DESIGN_ACT_GROUP'
  // Astrocartography questions
  | 'ASTROCARTOGRAPHY_INTEREST_PLACES'
  | 'ASTROCARTOGRAPHY_ENERGY_PLACES'
  | 'ASTROCARTOGRAPHY_CHALLENGES_PLACES'
  // General
  | 'UNDERSTAND_BETTER'
  | 'BODY_DECISIONS'
  | 'VISIONS_DREAMS'
  | 'INFLUENCE_OF_NUMBERS';

export type TransitionStepType =
  | 'TRANSITION_SUN'
  | 'TRANSITION_ASCENDANT'
  | 'TRANSITION_HOROSCOPE'
  | 'TRANSITION_BIRTH_CHART'
  | 'TRANSITION_BIRTH_CHART_ANIMATION'
  | 'TRANSITION_COMPATIBILITY'
  | 'TRANSITION_PLANETS'
  | 'TRANSITION_PLANETS_HOUSES'
  | 'TRANSITION_ELEMENTS'
  | 'TRANSITION_ASC'
  | 'TRANSITION_LOADER_ANIMATION'
  | 'TRANSITION_FINAL_TOUCHES'
  | 'TRANSITION_USER_CARD'
  | 'TRANSITION_PARTNER_CARD'
  | 'TRANSITION_BUBBLE'
  // Palm transitions
  | 'TRANSITION_PALM_PREPARATION'
  | 'TRANSITION_HEAD_HEART'
  | 'TRANSITION_HAND_DARK'
  | 'TRANSITION_MAP_HAND'
  // Soulmate transitions
  | 'TRANSITION_SOULMATE_LEAD_BY'
  | 'TRANSITION_SOULMATE_STRUGGLE'
  | 'TRANSITION_SOULMATE_REVEALS_PATH'
  | 'TRANSITION_SOULMATE_PORTRAIT_READY'
  | 'TRANSITION_SOULMATE_TRUST_PILOT'
  // Moon transitions
  | 'TRANSITION_MOON_PHASE'
  | 'TRANSITION_MOON_DARK'
  | 'TRANSITION_MOON_ZODIAC'
  | 'TRANSITION_USER_MOON_PHASE'
  | 'TRANSITION_PARTNER_MOON_PHASE'
  // Witch transitions
  | 'TRANSITION_WITCH_POTENTIAL'
  | 'TRANSITION_WITCH_POWER_CHANNELS'
  // Stories transitions
  | 'TRANSITION_STORIES_ASTROCARTOGRAPHY'
  | 'TRANSITION_STORIES_BIRTH_CHART'
  | 'TRANSITION_STORIES_PALM_READING'
  | 'TRANSITION_STORIES_PLANETS'
  // Human Design transitions
  | 'TRANSITION_HUMAN_DESIGN_ANIMATION'
  | 'TRANSITION_HUMAN_DESIGN_BODY_CENTER'
  // Tarot transitions
  | 'TRANSITION_CARDS_SAY'
  | 'TRANSITION_ANIMATION_TAROT'
  | 'TRANSITION_TAROT_PALM_READING';

export type SpecialStepType =
  | 'MAGIC_LOADER'
  | 'REPORT_LOADER'
  | 'PALM_READING_UPLOAD'
  | 'FACE_READING_UPLOAD'
  | 'SCRATCH_CARD'
  | 'MAILING_CHECKBOX'
  | 'SURVEY';

export type PaywallStepType =
  | 'PAYWALL_MAIN'
  | 'PAYWALL_PRESUMMARY'
  | 'PAYWALL_SPECIAL_OFFER'
  | 'PAYWALL_NO_FUNDS_OFFER';

export type UpsellStepType =
  | 'UPSELL_GUIDES'
  | 'UPSELL_COMPATIBILITY'
  | 'UPSELL_BIRTH_CHART'
  | 'UPSELL_PALM_READING'
  | 'UPSELL_ASTROCARTOGRAPHY'
  | 'UPSELL_HUMAN_DESIGN'
  | 'UPSELL_WITCH_TYPE'
  | 'UPSELL_MOON'
  | 'UPSELL_SOULMATE'
  | 'UPSELL_ASTROLOGER_PACK'
  | 'UPSELL_COMPLEX_PACK';

export type QuizStepType =
  | WelcomeScreenType
  | GenderStepType
  | DataCollectionStepType
  | QuestionStepType
  | TransitionStepType
  | SpecialStepType
  | PaywallStepType
  | UpsellStepType;

// ============================================
// QUIZ FLOW TYPES
// ============================================

export type FlowType =
  | 'default'
  | 'tarot'
  | 'palm_reading'
  | 'soulmate'
  | 'moon'
  | 'astrocartography'
  | 'human_design'
  | 'witch_type'
  | 'birth_chart'
  | 'compatibility';

export interface QuizFlow {
  id: FlowType;
  name: string;
  description: string;
  welcomeScreen: WelcomeScreenType;
  genderScreen: GenderStepType;
  steps: QuizStepType[];
  afterPurchaseFlow: UpsellStepType[];
}

// ============================================
// USER DATA TYPES
// ============================================

export type Gender = 'female' | 'male' | 'non-binary';

export type RelationshipStatus =
  | 'soulmate'
  | 'engaged'
  | 'married'
  | 'difficult'
  | 'single';

export type Element = 'fire' | 'water' | 'earth' | 'air';

export type PalmLine = 'love' | 'head' | 'life' | 'fate';

export interface UserProfile {
  // Basic info
  name?: string;
  gender?: Gender;
  email?: string;
  
  // Birth data
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;
  birthLat?: number;
  birthLng?: number;
  livingPlace?: string;
  
  // Relationship
  relationshipStatus?: RelationshipStatus;
  
  // Partner data (for compatibility)
  partnerBirthDate?: string;
  partnerBirthTime?: string;
  partnerBirthPlace?: string;
  partnerBirthLat?: number;
  partnerBirthLng?: number;
  partnerGender?: Gender;
  
  // Preferences
  goals?: string[];
  favoriteColor?: string;
  element?: Element;
  typesEsotericism?: string[];
  
  // Calculated astro data
  sunSign?: string;
  moonSign?: string;
  risingSign?: string;
  
  // Palm reading
  palmImageUrl?: string;
  palmReading?: {
    childrenCount: string;
    marriagesCount: string;
    bigChanges: boolean;
    wealthIndicator: string;
  };
  
  // Soulmate preferences
  soulmateAgeGroup?: string;
  soulmateAppearance?: string[];
  soulmateNoticeFirst?: string;
  
  // Marketing
  isMailingSubscribed?: boolean;
  isUnsubscriber?: boolean;
}

// ============================================
// STEP CONFIGURATION
// ============================================

export interface StepConfig {
  type: QuizStepType;
  duration?: number; // for transitions
  isSkippable?: boolean;
  collectsData?: boolean;
  dataField?: keyof UserProfile;
  showBackButton?: boolean;
  blurBackground?: boolean;
  analyticsEvent?: string;
}

export interface TransitionConfig extends StepConfig {
  type: TransitionStepType;
  title: string;
  subtitle?: string;
  animationType: 'loader' | 'progress' | 'story' | 'cards' | 'planets' | 'hand';
  duration: number; // in milliseconds
  showProgress?: boolean;
  progressSteps?: string[];
}

// ============================================
// PAYWALL & PRICING
// ============================================

export interface Product {
  id: string;
  productId: string;
  title: string;
  subtitle?: string;
  price: number;
  currency: string;
  activePrice: string;
  notActivePrice?: string;
  discount?: string;
  trialDays?: number;
  billingPeriod?: 'weekly' | 'monthly' | 'yearly' | 'lifetime';
}

export interface SpecialOffer {
  enabled: boolean;
  type: 'popup' | 'inline' | 'fullscreen';
  title: string;
  subtitle?: string;
  buttonText: string;
  skipButtonText?: string;
  discountTimer?: number; // in seconds
  product: Product;
  successModalEnabled?: boolean;
  autoRedirectEnabled?: boolean;
}

export interface PaywallConfig {
  type: 'main' | 'presummary' | 'special_offer' | 'no_funds';
  title: string;
  subtitle?: string;
  products: Product[];
  selectedProductIndex?: number;
  showTimer?: boolean;
  timerDuration?: number;
  showMoneyBackGuarantee?: boolean;
  showTrustIndicators?: boolean;
  showTestimonials?: boolean;
  specialOffer?: SpecialOffer;
}

// ============================================
// SALES FUNNEL PSYCHOLOGY
// ============================================

export interface SocialProof {
  type: 'users_count' | 'rating' | 'reviews' | 'trust_pilot';
  value: string;
  icon?: string;
}

export interface UrgencyTrigger {
  type: 'countdown' | 'limited_spots' | 'ending_soon' | 'discount_expiring';
  message: string;
  endTime?: number;
  spotsLeft?: number;
}

export interface ValueProposition {
  icon: string;
  title: string;
  description: string;
}

// ============================================
// REMOTE CONFIG (A/B Testing)
// ============================================

export interface RemoteConfig {
  flow: QuizStepType[];
  afterPurchaseFlow: UpsellStepType[];
  presummaryStack: string[];
  landingStack: string[];
  showMailCheckbox: boolean;
  discountTimer: number;
  specialOfferEnabled: boolean;
  reportLoaderAutoRedirect: boolean;
  emailPageViewMode: 'default' | 'blur';
  emailPageBlurComponents: QuizStepType[];
}
