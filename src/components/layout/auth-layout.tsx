'use client';

import Image from 'next/image';
import { LOGO_SRC } from '@/lib/constants';
import { AppLink } from '@/components/ui/app-link';
import { DotPattern } from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

interface AuthLayoutProps {
  /** Form content for left panel */
  children: React.ReactNode;
  /** Image for right side of card */
  rightImage?: string;
}

/** Default right-panel image from LogIn folder (all devices) */
const DEFAULT_RIGHT_IMAGE = '/images/LogIn/low-angle-symmetric-shot-old-architecture-with-beautiful-blue-sky-background.jpg';

/**
 * Auth layout matching Figma design
 * Centered card with form on left, image on right (image only on desktop).
 * Card min-height 560px on desktop. Content vertically centered on desktop.
 */
export function AuthLayout({ children, rightImage = DEFAULT_RIGHT_IMAGE }: AuthLayoutProps) {
  return (
    <div className="auth-layout relative flex min-h-screen flex-col items-center overflow-hidden bg-juno-25 px-3 lg:px-0 md:px-6">
      {/* Dot pattern background – same as contact form card */}
      <DotPattern
        color="#18181B"
        size={3}
        dotSize={0.5}
        opacity={0.04}
        className="inset-0"
      />

      {/* Main Card – logo inside for mobile/tablet; desktop: centered card */}
      <div className="auth-main-content relative z-10 mx-auto flex w-full max-w-[1200px] flex-1 flex-col justify-center px-0 pb-0 pt-0 md:px-0 md:pb-0 md:pt-0 lg:flex-none lg:py-32 lg:items-center lg:px-0">
        {/* Logo inside – desktop only; pinned to top within auth-main-content */}
        <AppLink
          href="/"
          aria-label="Back to home"
          className="auth-desktop-only hidden flex-shrink-0 justify-center pt-12"
        >
          <Image
            src={LOGO_SRC}
            alt="Juno Money"
            width={130}
            height={24}
            className="h-6 w-auto"
            priority
          />
        </AppLink>
        {/* Logo inside – mobile/tablet only; 24px top, 40px to card */}
        <AppLink
          href="/"
          aria-label="Back to home"
          className="auth-logo-inner auth-logo-top mb-10 flex flex-shrink-0 justify-center pt-6 lg:hidden"
        >
          <Image
            src={LOGO_SRC}
            alt="Juno Money"
            width={130}
            height={24}
            className="h-6 w-auto"
            priority
          />
        </AppLink>
        {/* Frame wrapper – flex-1 on tablet only centers frame vertically */}
        <div className="auth-frame-wrapper flex w-full flex-col justify-center">
          <div className="flex h-fit w-full flex-col overflow-hidden rounded-md border border-juno-300 bg-white lg:h-auto lg:min-h-[560px] lg:flex-row">
          {/* Left Panel - Form */}
          <div className="flex w-full flex-col justify-center px-4 py-6 md:p-10 lg:w-1/2 lg:p-16">
            {children}
          </div>

          {/* Right Panel - Image only on desktop; hidden on mobile and tablet */}
          <div className="relative hidden shrink-0 lg:block lg:h-auto lg:min-h-[560px] lg:w-1/2">
            <Image
              src={rightImage}
              alt=""
              fill
              className="object-cover auth-panel-image"
              priority
              sizes="(max-width: 1023px) 100vw, 560px"
            />
            <div
              className="pointer-events-none absolute inset-0 z-[1]"
              style={{
                background: 'linear-gradient(to right, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, transparent 85%)',
              }}
              aria-hidden
            />
          </div>
        </div>
        </div>
        {/* Footer inside – tablet only; 24px offset above */}
        <p
          className={cn(
            'hidden flex-shrink-0 text-center text-[13px] leading-normal text-juno-500 md:mt-6 md:block lg:hidden',
            FONT.mono
          )}
        >
          © Juno Money 2025 | All rights reserved.
        </p>
        {/* Footer inside – desktop only; pinned to bottom within auth-main-content */}
        <p className={cn('auth-desktop-only-block hidden w-full pb-6 text-center text-sm leading-normal text-juno-500', FONT.mono)}>
          © Juno Money 2025 | All rights reserved.
        </p>
      </div>

      {/* Footer – mobile and desktop; absolute */}
      <div className="auth-footer-absolute absolute bottom-6 left-1/2 z-10 w-full max-w-[calc(100vw-2rem)] -translate-x-1/2 px-0 md:max-w-[calc(100vw-4rem)] lg:hidden">
        <p className={cn('m-0 text-center text-[13px] leading-normal text-juno-500 lg:text-sm', FONT.mono)}>
          © Juno Money 2025 | All rights reserved.
        </p>
      </div>
    </div>
  );
}
