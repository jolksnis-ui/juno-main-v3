'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthLayout } from '@/components/layout/auth-layout';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { AppLink } from '@/components/ui/app-link';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

/** Same in-frame transition as login → 2FA */
const CONTENT_TRANSITION = {
  duration: 0.7,
  ease: [0.76, 0, 0.24, 1] as const,
};

/**
 * Contact Support page (2FA flow).
 * Reached from login page (2FA step) via "Contact Support" link.
 * "Back to verification" returns to login page with 2FA step.
 */
export default function ContactSupportPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitSupportRequest = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    router.push('/');
  };

  return (
    <AuthLayout>
      <AnimatePresence mode="wait">
        {isSuccess && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={CONTENT_TRANSITION}
            className="flex flex-col"
          >
              <div className="mb-9 flex flex-col gap-4 lg:mb-9">
                <Image
                  src="/images/LogIn/lucide_check-line.svg"
                  alt=""
                  width={32}
                  height={32}
                  className="shrink-0"
                />
                <h1 className={cn('text-[28px] leading-[32px] text-juno-900 lg:text-[34px] lg:leading-[38px]', FONT.serif)}>
                  A member of our team will be in touch.
                </h1>
              </div>

              <GetStartedButton
                type="button"
                variant="dark"
                label="Close"
                onClick={handleClose}
                className="w-full"
              />
            </motion.div>
          )}

        {!isSuccess && (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={CONTENT_TRANSITION}
          >
              <div className="mb-9 lg:mb-9">
                <h1 className={cn('text-[28px] leading-[32px] text-juno-900 lg:text-[34px] lg:leading-[38px]', FONT.serif)}>
                  Contact Support
                </h1>
                <p className="mt-3 text-base text-juno-700 lg:mt-3">
                  If you are having issues signing in via 2FA submit a support request by clicking below and a member of our
                  team will be in touch.
                </p>
              </div>

              <GetStartedButton
                type="button"
                variant="dark"
                label="Submit Support Request"
                isLoading={isSubmitting}
                loadingLabel="Submitting..."
                onClick={onSubmitSupportRequest}
                className="w-full"
              />

              <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center text-sm font-normal text-juno-500 lg:mt-8">
                <span>Can&apos;t complete verification?</span>
                <AppLink
                  href="/login?step=2fa"
                  className={cn(
                    FONT.mono,
                    'cursor-pointer border-b border-transparent font-normal text-juno-900 transition-colors hover:border-juno-900 hover:text-juno-700'
                  )}
                >
                  Back to verification
                </AppLink>
              </p>
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
