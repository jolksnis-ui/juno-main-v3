/**
 * Design tokens and constants for Juno Bank
 * Centralized values to eliminate hard-coded magic numbers
 */

/** Animation durations in seconds (for Framer Motion) */
export const ANIMATION = {
  fast: 0.6,
  medium: 0.8,
  slow: 1.2,
} as const;

/** Common transition settings for dramatic feel */
export const TRANSITION = {
  ease: [0.25, 0.1, 0.25, 1.0],
  duration: 1.2,
} as const;

/** Micro-interaction animation durations in seconds */
export const ANIMATION_MICRO = {
  fast: 0.2,
  medium: 0.3,
  slow: 0.4,
} as const;

/** Auto-rotation interval for carousels (ms) */
export const AUTO_ROTATE_INTERVAL = 5000;

/** Update interval for Singapore time display (ms) */
export const TIME_UPDATE_INTERVAL = 60000;

/** Rotation interval for timezone carousel in hero (ms). Longer = more pause between time settled and next city. */
export const TIMEZONE_ROTATION_INTERVAL = 60000;

/** Container max width used across sections */
export const CONTAINER_MAX_WIDTH = '1392px';

/** Max-width values for various components */
export const MAX_WIDTHS = {
  sectionHeader: '600px',
  faqAnswer: '800px',
  leadershipGrid: '1256px',
  section: '1440px',
  email: '600px',
} as const;

/** Component dimensions */
export const DIMENSIONS = {
  buttonHeight: '52px',
  dotPatternSize: '156px',
  singaporeTimeWidth: '275px',
} as const;

/** Row heights for expandable feature lists */
export const ROW_HEIGHT = {
  inactive: 76,
  activeOneLine: 128,
  activeTwoLines: 148,
  securityActive: 210,
  securityInactive: 100,
} as const;

/** Hero video URL - business/corporate theme from Pexels */
export const HERO_VIDEO_URL =
  '/videos/hero.mp4';

/** Font family class names for consistent typography */
export const FONT = {
  serif: 'font-[family-name:var(--font-prata)]',
  mono: 'font-[family-name:var(--font-geist-mono)]',
  sans: 'font-[family-name:var(--font-geist-sans)]',
} as const;

/** Video paths */
export const VIDEOS = {
  animatedCurrencies: '/images/LogIn/Animated Currencies.mp4',
  corporateHero: '/videos/Juno%20Corporate%20page%20asset.mov',
  individualHero: '/videos/Juno%20Individual%20page%20asset.mov',
} as const;

/** Image paths */
export const IMAGES = {
  mobileMockup: '/images/Mobile Mockup.png',
  laptopMockup: '/images/laptop-mockup.png',
  /** Account section (home) – desktop: personal tab */
  accountSectionPersonal: '/images/Individual.png',
  /** Account section (home) – mobile/tablet only: personal tab */
  accountSectionPersonalMobile: '/images/Individual(M).png',
  /** Account section (home) – desktop frame: business tab */
  accountSectionBusiness: '/images/Bussines.png',
  corporateBg: '/images/corporate-bg.jpg',
  contactFormBg: '/images/contact-form-bg.jpg',
  avatarJohn: '/images/avatar-john.jpg',
  valuesDotPattern: '/images/values-dot-pattern.png',
  everydayBankingHero: '/images/everyday-banking-hero.jpg',
  // About page images
  aboutOffice: '/images/about/office-interior.jpg',
  aboutServicePreview: '/images/about/modern-business-building-nanjing-china.jpg',
  visionMockup: '/images/about/vision-mockup.png',
  missionVisionMock: '/images/about/Mission & Vision Mock.png',
  leaderCeo: '/images/about/leader-ceo.jpg',
  leaderCompliance: '/images/about/leader-compliance.jpg',
  leaderCoo: '/images/about/leader-coo.jpg',
  // Individual features images (PNG modals for desktop frame)
  featureInstantPayments: '/images/Individual-features/Instant payments.png',
  featureExchange: '/images/Individual-features/Exchange.png',
  featureFastAccount: '/images/Individual-features/Fast Account Creation.png',
  featureDedicatedManager: '/images/Individual-features/Dedicated account manager.png',
  featureWithdraw: '/images/Individual-features/Withdraw.png',
  featureAcceptPayments: '/images/Individual-features/Accept Payment.png',
  featuresSectionBg: '/images/about/individual features background.png',
  individualBg: '/images/individual-bg.jpg',
  // Corporate features images (PNG modals)
  corpBg: '/images/Corporate-features/Background.png',
  corpTransfer: '/images/Corporate-features/Transfer.png',
  corpExchange: '/images/Corporate-features/FX.png',
  corpFastAccount: '/images/Corporate-features/Account creation.png',
  corpDedicatedManager: '/images/Corporate-features/Support.png',
  corpWithdraw: '/images/Corporate-features/Withdrawal Confirmation.png',
  corpAcceptPayments: '/images/Corporate-features/Accept payments.png',
  corpTransactionHistory: '/images/Corporate-features/transaction history.png',
  // Stepper images (Security section)
  // Desktop SVG wrappers (embed the phone PNGs)
  // Versioned to avoid browser/Next image cache showing older large-canvas asset
  stepperAccountProtection: '/images/Stepper/Account-Protection-20260128-v3.png',
  stepperComplianceKyc: '/images/Stepper/Compliance-KYC-20260128-v3.png',
  stepperSecurePayments: '/images/Stepper/Secure-Payments-20260128-v3.png',
  stepperTrustedInfrastructure: '/images/Stepper/Trusted-infrascrutcture-20260128-v3.png',
  // Stepper images - Mobile versions
  stepperAccountProtectionMobile: '/images/Stepper/AccountProtection(M).png',
  stepperComplianceMobile: '/images/Stepper/Compliance(M).png',
  stepperSecurePaymentsMobile: '/images/Stepper/SecurePay(M).png',
  stepperTrustedInfrastructureMobile: '/images/Stepper/TrustedInfra(M).png',
} as const;

/** Button text constants */
export const BUTTON_TEXT = {
  openAccount: 'Open account',
  getStarted: 'Get Started',
  learnMore: 'Learn more',
} as const;

/** Badge text constants */
export const BADGE_TEXT = {
  corporate: 'For corporate clients',
  individual: 'Tailored for individual clients',
} as const;

/** Section headlines and body for Individual (features) section */
export const INDIVIDUAL_SECTION = {
  headline: 'Payment solutions for individual clients.',
  body: 'Banking that fits your life—send, exchange, and manage your money with clarity and control.',
} as const;

/** Section headlines and body for Corporate section */
export const CORPORATE_SECTION = {
  headline: 'Payment solutions for corporate clients.',
  headlineLine1: 'Payment solutions ',
  headlineLine2: 'for corporate clients.',
  body: 'Built for businesses—payments, FX, and dedicated support so you can focus on growth.',
} as const;

/** Account section (Get the best out of Juno Money) – badge, title, subtitle */
export const ACCOUNT_SECTION = {
  badge: 'Personal and business accounts',
  title: 'Get the best out of\nJuno Money.',
  subtitle:
    'We provide a highly personalised service to corporate entities, institutions and high net worth individuals, including secure, competitive and discrete execution of cross-border payments and settlement services.',
} as const;

/** Security section – badge, title, subtitle */
export const SECURITY_SECTION = {
  badge: 'Built for regulated environments',
  title: 'Security & compliance\nyou can trust',
  subtitle:
    'Juno combines enterprise-grade security features with world-class compliance tooling to help businesses operate safely, securely, and at scale.',
} as const;

/** Validation limits for form fields */
export const VALIDATION_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  phoneMax: 30,
  messageMin: 10,
  messageMax: 5000,
} as const;

/** Header menu icon: burger (closed) and close/X (open) use the same color */
export const MENU_ICON_COLOR = '#3F3F46';

/** Logo: ?v= для сброса кэша после смены на junomoney (Vercel/CDN) */
export const LOGO_SRC = '/images/Header/logo.svg';

/** Email template color palette */
export const EMAIL_COLORS = {
  text: '#18181B',
  textSecondary: '#70707B',
  border: '#E4E4E7',
  background: '#F4F4F5',
  footer: '#A0A0AB',
} as const;
