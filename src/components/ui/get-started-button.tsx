'use client';

import { forwardRef } from 'react';
import { AppLink } from '@/components/ui/app-link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BUTTON_TEXT, DIMENSIONS, FONT } from '@/lib/constants';

interface GetStartedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button text - defaults to "Get Started" */
  label?: string;
  /** Visual variant - dark (default) or light */
  variant?: 'dark' | 'light';
  /** When set, renders as a link to this href instead of a button (same look as button, navigates on click) */
  href?: string;
  /** Loading state for form submissions */
  isLoading?: boolean;
  /** Text shown during loading state */
  loadingLabel?: string;
}

/** Button style with sliding chevron animation */
const buttonOrLinkClasses = (
  isLight: boolean,
  className?: string
) =>
  cn(
    'group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-[4px] px-8 text-base font-normal transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    FONT.mono,
    isLight
      ? 'bg-white text-juno-900 focus-visible:ring-juno-900'
      : 'bg-juno-900 text-white focus-visible:ring-white',
    className
  );

const GetStartedButton = forwardRef<HTMLButtonElement, GetStartedButtonProps>(
  (
    {
      className,
      label = BUTTON_TEXT.getStarted,
      variant = 'dark',
      href,
      isLoading = false,
      loadingLabel = 'Sending...',
      disabled,
      ...props
    },
    ref
  ) => {
    const isLight = variant === 'light';
    const displayLabel = isLoading ? loadingLabel : label;
    const contentWithChevron = (
      <>
        <span className="mr-8 transition-opacity duration-500 group-hover:opacity-0">
          {displayLabel}
        </span>
        {!isLoading && (
          <i
            className={cn(
              'absolute bottom-1 right-1 top-1 z-10 grid w-[calc(25%-16px)] place-items-center rounded-[2px] transition-all duration-500 group-hover:w-[calc(100%-0.5rem)] group-active:scale-95',
              isLight ? 'bg-juno-900/10' : 'bg-white/15'
            )}
            aria-hidden="true"
          >
            <ArrowUpRight
              size={22}
              strokeWidth={1.6}
              className={isLight ? 'text-juno-900' : 'text-white'}
            />
          </i>
        )}
      </>
    );

    if (href) {
      return (
        <AppLink
          href={href}
          scroll={false}
          style={{ height: DIMENSIONS.buttonHeight }}
          className={buttonOrLinkClasses(isLight, className)}
        >
          {contentWithChevron}
        </AppLink>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        style={{ height: DIMENSIONS.buttonHeight }}
        className={cn(
          'disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-50',
          buttonOrLinkClasses(isLight, className)
        )}
        {...props}
      >
        {contentWithChevron}
      </button>
    );
  }
);
GetStartedButton.displayName = 'GetStartedButton';

export { GetStartedButton, type GetStartedButtonProps };
