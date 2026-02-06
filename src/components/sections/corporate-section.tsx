'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/section-header';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { ProgressBar } from '@/components/ui/progress-bar';
import { useAutoRotate } from '@/hooks/use-auto-rotate';
import { useInView } from '@/hooks/use-in-view';
import { MobileFeatureAccordion } from '@/components/ui/mobile-feature-accordion';
import { ANIMATION, TRANSITION, IMAGES, BADGE_TEXT, FONT, CONTAINER_MAX_WIDTH, ROW_HEIGHT, BUTTON_TEXT, AUTO_ROTATE_INTERVAL, CORPORATE_SECTION } from '@/lib/constants';

/** Corporate feature data structure */
interface CorporateFeature {
  id: number;
  title: string;
  description: string;
  image: string;
}

/** Feature data for corporate clients */
const CORPORATE_FEATURES: CorporateFeature[] = [
  {
    id: 1,
    title: 'Instant payments',
    description: 'Move funds between Juno accounts in seconds so your operations stay on schedule.',
    image: IMAGES.corpTransfer,
  },
  {
    id: 2,
    title: 'Exchange in 30+ currencies',
    description:
      'Hedge and convert in major currencies with transparent rates and full visibility.',
    image: IMAGES.corpExchange,
  },
  {
    id: 3,
    title: 'Fast account creation',
    description:
      'Onboard your business quickly with streamlined verification and minimal paperwork.',
    image: IMAGES.corpFastAccount,
  },
  {
    id: 4,
    title: 'Dedicated account manager',
    description:
      'A single point of contact who understands your business and helps you scale.',
    image: IMAGES.corpDedicatedManager,
  },
  {
    id: 5,
    title: 'Withdraw',
    description:
      'Access your balance when you need it with reliable, flexible withdrawal options.',
    image: IMAGES.corpWithdraw,
  },
  {
    id: 6,
    title: 'Accept payments',
    description:
      'Get paid by clients and partners globally with low fees and fast settlement.',
    image: IMAGES.corpAcceptPayments,
  },
];

/**
 * Corporate section with two-column card layout
 * Desktop: Left image, right interactive feature list with auto-rotation
 * Mobile: Vertical accordion with image appearing below active card
 */
const CorporateSection = () => {
  const [sectionRef, isSectionInView] = useInView<HTMLElement>({ threshold: 0.05 });
  const { active: activeFeature, isPaused, handleClick: handleFeatureClick } = useAutoRotate({
    itemCount: CORPORATE_FEATURES.length,
    interval: AUTO_ROTATE_INTERVAL + 1000,
    externalPaused: !isSectionInView,
  });

  const currentFeature =
    CORPORATE_FEATURES.find((f) => f.id === activeFeature) || CORPORATE_FEATURES[0];

  return (
    <section ref={sectionRef} className="relative bg-juno-50 px-3 py-16 md:px-6 lg:py-24 lg:px-6">
      {/* Subtle background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]">
        <Image
          src={IMAGES.corporateBg}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto" style={{ maxWidth: CONTAINER_MAX_WIDTH }}>
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <ScrollReveal mode="slide">
            <SectionHeader
              badge={BADGE_TEXT.corporate}
              title={
                <>
                  {CORPORATE_SECTION.headlineLine1}
                  <br />
                  {CORPORATE_SECTION.headlineLine2}
                </>
              }
              action={<GetStartedButton href="/open-account" label={BUTTON_TEXT.openAccount} variant="dark" />}
            />
          </ScrollReveal>
        </div>

        {/* Mobile Header: subtitle 24px to title, title 32px to button; tablet: max-w 600px */}
        <div className="flex w-full flex-col items-center text-center lg:hidden md:mx-auto md:max-w-[600px]">
          <span
            className={cn(
              'w-fit rounded border border-juno-200 bg-juno-100 px-1.5 py-1 text-[13px] text-juno-700',
              FONT.mono
            )}
          >
            {BADGE_TEXT.corporate}
          </span>
          <h2 className={cn('mt-[24px] text-[44px] leading-[48px] lg:leading-[1.13] text-juno-900', FONT.serif)}>
            {CORPORATE_SECTION.headline}
          </h2>
          <GetStartedButton
            href="/open-account"
            label={BUTTON_TEXT.openAccount}
            variant="dark"
            className="mt-8 w-full md:w-auto"
          />
        </div>

        {/* Desktop: Two-column card */}
        <div className="mt-16 hidden h-[602px] overflow-hidden rounded-md border border-juno-300 bg-white/56 lg:flex">
          {/* Left: Animated feature image */}
          <FeatureImage feature={currentFeature} />

          {/* Right: Feature list */}
          <FeaturesSide
            activeFeature={activeFeature}
            isPaused={isPaused}
            onFeatureClick={handleFeatureClick}
            isExternallyPaused={!isSectionInView}
          />
        </div>

        {/* Mobile/tablet: 40px gap between Open Account button and 6-point accordion */}
        <div className="mt-10 overflow-hidden rounded-md border border-juno-300 bg-white lg:mt-16 lg:hidden">
          <MobileFeatureAccordion
            features={CORPORATE_FEATURES}
            activeId={activeFeature}
            isPaused={isPaused}
            onFeatureClick={handleFeatureClick}
            theme="light"
            backgroundImage={IMAGES.corporateBg}
            isExternallyPaused={!isSectionInView}
          />
        </div>
      </div>
    </section>
  );
};
CorporateSection.displayName = 'CorporateSection';

/** Left side with animated feature image */
const FeatureImage = ({ feature }: { feature: CorporateFeature }) => (
  <div className="relative flex-1 overflow-hidden border-r border-juno-300">
    {/* Background image - corporate-bg.jpg, no dots */}
    <div className="absolute inset-0 overflow-hidden">
      <Image
        src={IMAGES.corporateBg}
        alt=""
        fill
        className="object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[3px]" />
    </div>

    {/* Centered animated feature icon */}
    <div className="absolute inset-0 flex items-center justify-center py-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={feature.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ ...TRANSITION, duration: ANIMATION.medium }}
          className="relative h-[600px] w-[360px] shrink-0"
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
  </div>
);

/** Right side with interactive feature list */
const FeaturesSide = ({
  activeFeature,
  isPaused,
  onFeatureClick,
  isExternallyPaused,
}: {
  activeFeature: number;
  isPaused: boolean;
  onFeatureClick: (id: number) => void;
  isExternallyPaused: boolean;
}) => (
  <div
    className="flex w-[520px] shrink-0 flex-col justify-start pt-8 pb-10 px-10"
    role="tablist"
    aria-label="Corporate features"
  >
    {CORPORATE_FEATURES.map((feature) => (
      <FeatureItem
        key={feature.id}
        feature={feature}
        isActive={activeFeature === feature.id}
        isPaused={isPaused}
        onClick={() => onFeatureClick(feature.id)}
        isExternallyPaused={isExternallyPaused}
      />
    ))}
  </div>
);

/** Individual feature item with expand/collapse animation on click (Desktop) */
const FeatureItem = ({
  feature,
  isActive,
  isPaused,
  onClick,
  isExternallyPaused,
}: {
  feature: CorporateFeature;
  isActive: boolean;
  isPaused: boolean;
  onClick: () => void;
  isExternallyPaused: boolean;
}) => (
  <button
    onClick={onClick}
    className="group w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-juno-900/50"
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
          color: isActive ? 'var(--juno-gray-900)' : 'var(--juno-gray-700)',
        }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          FONT.serif,
          !isActive && 'group-hover:text-juno-900'
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
          className="mt-3 text-base leading-normal text-juno-700"
          style={{ lineHeight: 1.5 }}
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
      bgColor="bg-juno-300"
      fillColor="bg-juno-900"
    />
  </button>
);

export { CorporateSection };
