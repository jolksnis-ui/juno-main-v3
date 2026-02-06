'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { SingaporeTime } from '@/components/ui/singapore-time';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import {
  TRANSITION,
  FONT,
  HERO_VIDEO_URL,
  BUTTON_TEXT,
  CONTAINER_MAX_WIDTH,
} from '@/lib/constants';

/**
 * Full-viewport hero section with dramatic fade-in animation
 * Mobile: centered layout with time below headline
 * Desktop: left-aligned with time on the right
 */
const HeroSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const videoContainerRef = useRef<HTMLDivElement>(null);

  /**
   * Parallax inside the hero video block:
   * the container scrolls normally, while the video shifts slightly inside it.
   */
  const { scrollYProgress } = useScroll({
    target: videoContainerRef,
    offset: ['start end', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <motion.section className="flex min-h-[100svh] w-full flex-col bg-juno-25 lg:min-h-[800px]">
      {/* Top: Headline + Singapore Time – tablet: max-w 600px; desktop: original full container */}
      <header className="w-full px-3 pb-6 pt-[96px] md:px-6 md:pt-[100px] lg:px-6 lg:pb-9 lg:pt-36">
        <div
          className="mx-auto flex flex-col items-center gap-2 text-center md:!max-w-[600px] lg:!max-w-[1392px] lg:flex-row lg:flex-wrap lg:items-end lg:justify-between lg:gap-6 lg:text-left"
          style={{ maxWidth: CONTAINER_MAX_WIDTH }}
        >
          <ScrollReveal mode="slide" className="w-[696px] max-w-full">
            <h1
              className={cn(
                'text-[52px] leading-[56px] text-juno-900 lg:text-[72px] lg:leading-[76px]',
                FONT.serif
              )}
            >
              Payment services,
              <br />
              Redefined.
            </h1>
          </ScrollReveal>

          {/* Time: below headline on mobile, right side on desktop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...TRANSITION, delay: 0.5 }}
          >
            <SingaporeTime />
          </motion.div>
        </div>
      </header>

      {/* Middle: Hero Video */}
      <div
        ref={videoContainerRef}
        className="relative min-h-[280px] flex-1 overflow-hidden lg:min-h-[560px]"
      >
        <motion.video
          className="pointer-events-none absolute inset-0 size-full object-cover will-change-transform"
          style={{
            y: prefersReducedMotion ? 0 : videoY,
            scale: 1.12, // prevent edges showing during parallax shift
          }}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden="true"
        >
          <source src={HERO_VIDEO_URL} type="video/mp4" />
        </motion.video>
      </div>

      {/* Bottom: Description + CTA – tablet: max-w 600px; desktop: original full container */}
      <footer className="w-full bg-juno-25 px-3 pb-12 pt-8 md:px-6 lg:px-6 lg:pb-16 lg:pt-12">
        <div
          className="mx-auto flex flex-col items-center gap-8 text-center md:!max-w-[600px] lg:!max-w-[1392px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left"
          style={{ maxWidth: CONTAINER_MAX_WIDTH }}
        >
          <p className="w-[696px] max-w-full text-base leading-normal text-juno-800 lg:text-lg">
            We provide a highly personalised service to corporate entities,
            institutions and high net worth individuals, including secure,
            competitive and discrete execution of cross-border payments and
            settlement services.
          </p>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ...TRANSITION, delay: 0.7 }}
            className="w-full md:w-auto lg:w-auto"
          >
            <GetStartedButton
              href="/open-account"
              label={BUTTON_TEXT.openAccount}
              className="w-full md:w-auto lg:w-auto"
            />
          </motion.div>
        </div>
      </footer>
    </motion.section>
  );
};
HeroSection.displayName = 'HeroSection';

export { HeroSection };
