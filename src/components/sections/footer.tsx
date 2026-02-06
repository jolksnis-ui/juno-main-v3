'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { DotPattern } from '@/components/ui/dot-pattern';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { FadeInView } from '@/components/ui/fade-in-view';
import { AppLink } from '@/components/ui/app-link';
import { CONTAINER_MAX_WIDTH, FONT, BUTTON_TEXT, LOGO_SRC } from '@/lib/constants';

/** Footer link interface */
interface FooterLink {
  label: string;
  href: string;
}

/** Footer section data - two columns as per Figma */
const FOOTER_LINKS: Record<string, FooterLink[]> = {
  Company: [
    { label: 'About us', href: '/about' },
    { label: 'Everyday banking', href: '/everyday-banking' },
    { label: 'Corporate account', href: '/corporate-account' },
    { label: 'Contact us', href: '/contact-us' },
  ],
  Resources: [
    { label: 'Cookie Policy', href: '/cookies' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms and Conditions', href: '/terms-and-conditions' },
  ],
};

/**
 * Full-screen footer section
 * Features "Time is money" headline, navigation links, and legal info
 */
export const Footer = () => {
  return (
    <footer className="relative flex w-full flex-col gap-16 overflow-x-hidden bg-juno-900 px-3 pb-4 pt-14 text-white md:px-6 lg:justify-start lg:items-start lg:gap-[96px] lg:px-6 lg:pt-12 lg:pb-8">
      {/* Background Texture */}
      <DotPattern color="#ffffff" opacity={0.02} />

      {/* Main Content */}
      <div
        className="relative z-10 mx-auto flex w-full flex-col gap-10 lg:gap-12 lg:px-4"
        style={{ maxWidth: CONTAINER_MAX_WIDTH }}
      >
        {/* Top Section: Headline + Description – tablet: max-w 696px, centered */}
        <div className="flex flex-col items-center justify-between gap-6 text-center md:mx-auto md:max-w-[600px] lg:mx-0 lg:max-w-none lg:flex-row lg:items-center lg:gap-0 lg:text-left">
          <FadeInView className={cn('w-full text-[40px] font-light leading-[44px] text-white lg:max-w-[440px] lg:text-[60px] lg:leading-[64px]', FONT.serif)}>
            Time is money.
            <br />
            Save both.
          </FadeInView>

          <FadeInView delay={0.1} className="w-full text-base leading-normal text-juno-300 lg:max-w-[320px]">
            Unlock a world of financial possibilities with us, open an account
            today and start experiencing unparalleled banking solutions tailored
            just for you.
          </FadeInView>
        </div>

        {/* Divider - full width (breakout), dashed, above Open Account */}
        <div className="relative left-1/2 w-screen -translate-x-1/2">
          <div className="border-t border-dashed border-white/10" />
        </div>

        {/* Links Section – Open Account button centered horizontally on mobile/tablet */}
        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-0">
          {/* Link Columns */}
          <div className="flex w-full flex-col gap-10 text-center lg:w-auto lg:flex-row lg:gap-8 lg:text-left">
            {Object.entries(FOOTER_LINKS).map(([category, links], idx) => (
              <FadeInView
                key={category}
                delay={0.2 + idx * 0.1}
                className="flex w-full flex-col gap-6 lg:gap-8 lg:w-[200px]"
              >
                <span className={cn('text-sm text-juno-400', FONT.mono)}>
                  {category}
                </span>
                <ul className="flex flex-col gap-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <AppLink
                        href={link.href}
                        className="text-base text-juno-25 transition-colors hover:text-white/70"
                      >
                        {link.label}
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </FadeInView>
            ))}
          </div>

          {/* Open Account Button */}
          <FadeInView delay={0.4} className="w-full md:w-auto lg:w-auto">
            <GetStartedButton
              href="/open-account"
              label={BUTTON_TEXT.openAccount}
              variant="light"
              className="w-full md:w-auto lg:w-auto"
            />
          </FadeInView>
        </div>
      </div>

      {/* Wrapper: Logo, divider, legal – desktop: same width structure as upper block (max-width, centered, 16px padding) */}
      <div className="relative z-10 mt-4 flex w-full flex-col gap-8 lg:mx-auto lg:max-w-[1392px] lg:w-full lg:px-4">
        {/* Logo */}
        <div className="mx-auto flex w-full flex-col items-center px-0 text-center lg:mx-0 lg:items-start lg:text-left">
          <FadeInView delay={0.5} direction="up" distance={0}>
            <AppLink href="/" aria-label="Juno home" className="inline-flex">
              <Image
                src={LOGO_SRC}
                alt="Juno Money"
                width={130}
                height={32}
                priority
                className="h-8 w-auto brightness-0 invert"
              />
            </AppLink>
          </FadeInView>
        </div>

        {/* Bottom divider – full viewport width */}
        <div
          className="relative left-1/2 w-screen -translate-x-1/2 border-t border-dashed border-white/10"
          style={{ maxWidth: '100vw' }}
          aria-hidden
        />

        {/* Legal text */}
        <div className="mx-auto flex w-full flex-col items-center px-0 text-center lg:mx-0 lg:items-start lg:text-left">
          <div className={cn('flex flex-col gap-6 text-[13px] text-juno-400 lg:text-sm', FONT.mono)}>
            <p>© Juno Money Ltd {new Date().getFullYear()} | All rights reserved.</p>
            <p className="max-w-full leading-normal">
              Juno Money Ltd - (Company Number: 2024801421), with its registered
              office at Suite #229, 6030 88ST NW, Edmonton, Alberta, T6E6G4, Canada.
              Juno Money Ltd is authorised by FINTRAC as a Money Service Business
              (MSB No. M23335654).
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
