'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { SectionHeader } from '@/components/ui/section-header';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useAutoRotate } from '@/hooks/use-auto-rotate';
import { useInView } from '@/hooks/use-in-view';
import { MobileFeatureAccordion } from '@/components/ui/mobile-feature-accordion';
import {
  ANIMATION,
  TRANSITION,
  IMAGES,
  BADGE_TEXT,
  BUTTON_TEXT,
  FONT,
  CONTAINER_MAX_WIDTH,
  ROW_HEIGHT,
  AUTO_ROTATE_INTERVAL,
  INDIVIDUAL_SECTION,
} from '@/lib/constants';

/** Feature data structure */
interface Feature {
  id: number;
  title: string;
  description: string;
  image: string;
  /** Desktop only: width in px for the feature image frame */
  desktopImageWidth: number;
}

/** Features with corresponding images and desktop frame widths */
const FEATURES: Feature[] = [
  {
    id: 1,
    title: 'Instant payments',
    description: 'Send money to other Juno users in seconds—no waiting, no hassle.',
    image: IMAGES.featureInstantPayments,
    desktopImageWidth: 370,
  },
  {
    id: 2,
    title: 'Exchange in 30+ currencies',
    description:
      'Convert at transparent rates with real-time pricing and no hidden fees.',
    image: IMAGES.featureExchange,
    desktopImageWidth: 350,
  },
  {
    id: 3,
    title: 'Fast account creation',
    description:
      'Open your account in minutes with a simple, guided onboarding flow.',
    image: IMAGES.featureFastAccount,
    desktopImageWidth: 330,
  },
  {
    id: 4,
    title: 'Dedicated account manager',
    description:
      'One point of contact who knows your goals and helps you make the most of your account.',
    image: IMAGES.featureDedicatedManager,
    desktopImageWidth: 370,
  },
  {
    id: 5,
    title: 'Withdraw',
    description: 'Move your money out when you need it, with flexible options worldwide.',
    image: IMAGES.featureWithdraw,
    desktopImageWidth: 360,
  },
  {
    id: 6,
    title: 'Accept payments',
    description: 'Get paid from anyone, anywhere—receiving funds is simple and secure.',
    image: IMAGES.featureAcceptPayments,
    desktopImageWidth: 370,
  },
];

/**
 * Features section with auto-rotating feature list
 * Desktop: Dark theme with clickable/hoverable features and corresponding images
 * Mobile: Vertical accordion with image appearing below active card
 */
const FeaturesSection = () => {
  const [sectionRef, isSectionInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const { active: activeFeature, isPaused, handleClick: handleFeatureClick } = useAutoRotate({
    itemCount: FEATURES.length,
    interval: AUTO_ROTATE_INTERVAL + 1000,
    externalPaused: !isSectionInView,
  });

  const currentFeature =
    FEATURES.find((f) => f.id === activeFeature) || FEATURES[0];

  return (
    <section ref={sectionRef} className="relative bg-juno-900 px-3 py-16 md:px-6 lg:py-24 lg:px-6">
      <DotPattern color="#ffffff" />

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <SectionHeader
            badge={BADGE_TEXT.individual}
            title={INDIVIDUAL_SECTION.headline}
            action={<GetStartedButton href="/open-account" variant="light" label={BUTTON_TEXT.openAccount} />}
            theme="dark"
          />
        </div>

        {/* Mobile Header: subtitle 24px to title, title 32px to button; tablet: max-w 600px */}
        <div className="flex w-full flex-col items-center text-center lg:hidden md:mx-auto md:max-w-[600px]">
          <span
            className={cn(
              'w-fit rounded border border-juno-700 bg-white/[0.08] px-1.5 py-1 text-[13px] text-juno-300',
              FONT.mono
            )}
          >
            {BADGE_TEXT.individual}
          </span>
          <h2 className={cn('mt-[24px] text-[44px] leading-[48px] lg:leading-[1.13] text-white', FONT.serif)}>
            {INDIVIDUAL_SECTION.headline}
          </h2>
          <GetStartedButton
            href="/open-account"
            variant="light"
            label={BUTTON_TEXT.openAccount}
            className="mt-8 w-full md:w-auto"
          />
        </div>

        {/* Desktop: Content Box */}
        <div className="mt-16 hidden h-[602px] overflow-hidden rounded-md border border-juno-700 bg-white/[0.04] lg:flex">
          {/* Left: Feature List */}
          <div className="flex w-[520px] shrink-0 flex-col justify-start pt-8 pb-10 px-10">
            <FeatureList
              features={FEATURES}
              activeId={activeFeature}
              isPaused={isPaused}
              onFeatureClick={handleFeatureClick}
              isExternallyPaused={!isSectionInView}
            />
          </div>

          {/* Right: Image Area */}
          <div className="relative flex-1 border-l border-juno-700">
            <FeatureImage feature={currentFeature} />
          </div>
        </div>

        {/* Mobile/tablet: 40px gap between Open Account button and 6-point accordion */}
        <div className="mt-10 overflow-hidden rounded-md border border-juno-700 bg-white/[0.04] lg:mt-16 lg:hidden">
          <MobileFeatureAccordion
            features={FEATURES}
            activeId={activeFeature}
            isPaused={isPaused}
            onFeatureClick={handleFeatureClick}
            theme="dark"
            backgroundImage={IMAGES.individualBg}
            isExternallyPaused={!isSectionInView}
          />
        </div>
      </div>
    </section>
  );
};
FeaturesSection.displayName = 'FeaturesSection';

/** Feature list with active/inactive states */
const FeatureList = ({
  features,
  activeId,
  isPaused,
  onFeatureClick,
  isExternallyPaused,
}: {
  features: Feature[];
  activeId: number;
  isPaused: boolean;
  onFeatureClick: (id: number) => void;
  isExternallyPaused: boolean;
}) => (
  <div className="flex w-full flex-col">
    {features.map((feature) => (
      <FeatureItem
        key={feature.id}
        feature={feature}
        isActive={feature.id === activeId}
        isPaused={isPaused}
        onClick={() => onFeatureClick(feature.id)}
        isExternallyPaused={isExternallyPaused}
      />
    ))}
  </div>
);

/** Individual feature item with expand/collapse animation */
const FeatureItem = ({
  feature,
  isActive,
  isPaused,
  onClick,
  isExternallyPaused,
}: {
  feature: Feature;
  isActive: boolean;
  isPaused: boolean;
  onClick: () => void;
  isExternallyPaused: boolean;
}) => (
  <button
    onClick={onClick}
    className="group w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
    aria-pressed={isActive}
  >
    {/* Container - 1 line = shorter row (~128px), 2 lines = taller row (~164px) */}
    <motion.div
      animate={{
        height: isActive
          ? (feature.description.length > 50 ? ROW_HEIGHT.activeTwoLines : ROW_HEIGHT.activeOneLine)
          : ROW_HEIGHT.inactive,
      }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col justify-center overflow-hidden pt-6 pb-6"
    >
      {/* Title - smooth size/color in both directions */}
      <motion.h3
        animate={{
          fontSize: isActive ? '28px' : '20px',
          lineHeight: isActive ? '32px' : '24px',
          color: isActive ? '#FFFFFF' : 'var(--juno-gray-400)',
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          FONT.serif,
          !isActive && 'group-hover:text-juno-300'
        )}
      >
        {feature.title}
      </motion.h3>

      {/* Description slot - height animates in sync with row so center stays stable (no jump) */}
      <motion.div
        animate={{
          height: isActive
            ? (feature.description.length > 50 ? 56 : 36)
            : 0,
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="overflow-hidden"
      >
        <motion.p
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{
            duration: isActive ? 0.4 : 0.35,
            delay: isActive ? 0.1 : 0,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="mt-3 text-[15px] leading-[22.5px] text-juno-300 lg:text-base lg:leading-normal"
        >
          {feature.description}
        </motion.p>
      </motion.div>
    </motion.div>

    {/* Progress bar – same duration as auto-rotate interval */}
    <ProgressBar
      isActive={isActive}
      isPaused={isPaused}
      isExternallyPaused={isExternallyPaused}
      featureId={feature.id}
      bgColor="bg-juno-700"
      fillColor="bg-white"
    />
  </button>
);

/** Right side image area with individual-bg.jpg, 3px blur, 12% darkening (Desktop) */
const FeatureImage = ({ feature }: { feature: Feature }) => (
  <>
    {/* Background image - individual-bg.jpg */}
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={IMAGES.individualBg}
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]" />
    </div>

    {/* Centered image/card - desktop: per-feature width */}
    <div className="absolute inset-0 flex items-center justify-center p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ ...TRANSITION, duration: ANIMATION.medium }}
          className="relative h-[400px] shrink-0"
          style={{ width: feature.desktopImageWidth }}
        >
          <Image
            src={feature.image}
            alt={feature.title}
            fill
            className="object-contain drop-shadow-2xl"
            priority
          />
        </motion.div>
      </AnimatePresence>
    </div>
  </>
);

export { FeaturesSection };
