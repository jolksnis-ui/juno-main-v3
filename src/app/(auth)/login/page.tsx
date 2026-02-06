'use client';

import { Suspense, useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthLayout } from '@/components/layout/auth-layout';
import { GetStartedButton } from '@/components/ui/get-started-button';
import { Input } from '@/components/ui/input';
import { AppLink } from '@/components/ui/app-link';
import { loginSchema, type LoginFormValues } from '@/lib/validations';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

const CODE_LENGTH = 6;

function onlyDigit(value: string) {
  const match = value.match(/\d/);
  return match ? match[0] : '';
}

/** Same transition as PageTransition – used for in-frame content change */
const CONTENT_TRANSITION = {
  duration: 0.7,
  ease: [0.76, 0, 0.24, 1] as const,
};

/** Eye icons 22px – default #3F3F46, hover #18181B (all devices) */
function EyeIcon22({ show }: { show: boolean }) {
  const pathShow =
    'M17.5231 10.8063C17.6044 11.075 17.8544 11.25 18.1231 11.25V11.2437C18.2205 11.2447 18.3167 11.2227 18.4039 11.1796C18.4912 11.1364 18.5671 11.0734 18.6255 10.9955C18.6839 10.9177 18.7232 10.8271 18.7401 10.7313C18.7571 10.6354 18.7513 10.5369 18.7231 10.4437C18.7038 10.3812 16.635 3.75 9.99877 3.75C3.36252 3.75 1.29565 10.3812 1.2769 10.45C1.1769 10.7812 1.3644 11.125 1.69565 11.225C2.0269 11.325 2.3769 11.1375 2.4769 10.8063C2.54502 10.5688 4.30752 5 9.9994 5C15.69 5 17.4463 10.5644 17.5231 10.8063ZM7.5019 11.25C7.5019 10.587 7.76529 9.95107 8.23413 9.48223C8.70297 9.01339 9.33886 8.75 10.0019 8.75C10.6649 8.75 11.3008 9.01339 11.7697 9.48223C12.2385 9.95107 12.5019 10.587 12.5019 11.25C12.5019 11.913 12.2385 12.5489 11.7697 13.0178C11.3008 13.4866 10.6649 13.75 10.0019 13.75C9.33886 13.75 8.70297 13.4866 8.23413 13.0178C7.76529 12.5489 7.5019 11.913 7.5019 11.25ZM10.0019 7.5C9.00733 7.5 8.05351 7.89509 7.35025 8.59835C6.64698 9.30161 6.2519 10.2554 6.2519 11.25C6.2519 12.2446 6.64698 13.1984 7.35025 13.9017C8.05351 14.6049 9.00733 15 10.0019 15C10.9965 15 11.9503 14.6049 12.6535 13.9017C13.3568 13.1984 13.7519 12.2446 13.7519 11.25C13.7519 10.2554 13.3568 9.30161 12.6535 8.59835C11.9503 7.89509 10.9965 7.5 10.0019 7.5Z';
  const pathHide =
    'M12.828 13.7125L17.683 18.5669C17.8009 18.6807 17.9587 18.7437 18.1226 18.7423C18.2865 18.7409 18.4432 18.6751 18.5591 18.5593C18.675 18.4434 18.7407 18.2866 18.7422 18.1227C18.7436 17.9589 18.6806 17.801 18.5667 17.6831L2.31674 1.43312C2.25909 1.37343 2.19012 1.32581 2.11387 1.29306C2.03762 1.2603 1.95561 1.24306 1.87262 1.24234C1.78963 1.24162 1.70733 1.25743 1.63052 1.28886C1.55371 1.32028 1.48393 1.36669 1.42525 1.42538C1.36656 1.48406 1.32015 1.55384 1.28873 1.63065C1.2573 1.70746 1.24149 1.78976 1.24221 1.87275C1.24293 1.95574 1.26017 2.03775 1.29293 2.114C1.32568 2.19025 1.3733 2.25922 1.43299 2.31687L4.67674 5.56062C2.18299 7.52937 1.28674 10.4044 1.27424 10.45C1.17424 10.7812 1.36174 11.125 1.69299 11.225C2.02424 11.325 2.37424 11.1375 2.47424 10.8062C2.51987 10.6475 3.32299 8.10437 5.55299 6.4375L7.53737 8.42187C7.14945 8.75953 6.83514 9.17337 6.61396 9.63767C6.39278 10.102 6.26947 10.6068 6.2517 11.1208C6.23392 11.6348 6.32205 12.1469 6.51061 12.6254C6.69918 13.1038 6.98415 13.5384 7.3478 13.9021C7.71146 14.2657 8.14603 14.5507 8.6245 14.7393C9.10297 14.9278 9.61511 15.0159 10.1291 14.9982C10.6431 14.9804 11.1479 14.8571 11.6122 14.6359C12.0765 14.4147 12.4903 14.1004 12.828 13.7125ZM11.9411 12.825C11.7204 13.0965 11.4451 13.3187 11.133 13.4771C10.821 13.6355 10.4792 13.7267 10.1297 13.7446C9.78025 13.7626 9.43089 13.707 9.10425 13.5815C8.77762 13.4559 8.48098 13.2631 8.23354 13.0157C7.98609 12.7683 7.79335 12.4716 7.66779 12.145C7.54222 11.8184 7.48663 11.469 7.5046 11.1195C7.52258 10.77 7.61372 10.4282 7.77214 10.1162C7.93056 9.80417 8.15272 9.52887 8.42424 9.30812L11.9411 12.825ZM9.72049 7.51L11.3661 9.15625C11.6561 9.34562 11.9036 9.59375 12.0936 9.88312L13.7399 11.5294C13.7461 11.4369 13.7495 11.3437 13.7499 11.25C13.7499 10.734 13.6435 10.2235 13.4372 9.75047C13.2309 9.27746 12.9292 8.85213 12.551 8.50107C12.1728 8.15001 11.7262 7.8808 11.2391 7.71026C10.7521 7.53973 10.2351 7.47155 9.72049 7.51ZM6.61862 4.40812L7.58424 5.375C8.36325 5.12116 9.17807 4.99454 9.99737 5C15.688 5 17.4442 10.5644 17.5211 10.8062C17.6024 11.075 17.8524 11.25 18.1211 11.25V11.2437C18.2185 11.2447 18.3146 11.2227 18.4019 11.1796C18.4892 11.1364 18.5651 11.0734 18.6235 10.9955C18.6819 10.9177 18.7212 10.8271 18.7381 10.7313C18.7551 10.6354 18.7493 10.5369 18.7211 10.4437C18.7017 10.3812 16.633 3.75 9.99674 3.75C8.70299 3.75 7.58299 4.00187 6.61799 4.40812';
  return (
    <svg width={22} height={22} viewBox="0 0 20 20" fill="none" className="shrink-0">
      <path d={show ? pathShow : pathHide} fill="currentColor" />
    </svg>
  );
}

/** Fallback while search params are resolving (required for useSearchParams in Next.js) */
function LoginFallback() {
  return (
    <div className="flex min-h-[280px] items-center justify-center text-base text-juno-500">
      Loading...
    </div>
  );
}

/**
 * Inner login content – uses useSearchParams, so must be inside Suspense.
 * After submit, content transitions in-frame to 2FA form (same animation, inside the card).
 * "Contact Support" on 2FA navigates to contact-support page (full page transition).
 */
function LoginContent() {
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [isTwoFactor, setIsTwoFactor] = useState(false);

  useEffect(() => {
    if (searchParams.get('step') === '2fa') setIsTwoFactor(true);
  }, [searchParams]);

  const [code, setCode] = useState<string[]>(Array.from({ length: CODE_LENGTH }, () => ''));
  const [twoFactorSubmitting, setTwoFactorSubmitting] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const isComplete = code.every((c) => c.length === 1);

  const focusIndex = (idx: number) => {
    inputRefs.current[idx]?.focus();
    inputRefs.current[idx]?.select();
  };

  const updateAt = (idx: number, nextValue: string) => {
    setCode((prev) => {
      const next = [...prev];
      next[idx] = nextValue;
      return next;
    });
  };

  const handlePaste = (idx: number, pasted: string) => {
    const digits = pasted.replace(/\D/g, '').slice(0, CODE_LENGTH - idx).split('');
    if (digits.length === 0) return;
    setCode((prev) => {
      const next = [...prev];
      digits.forEach((d, i) => {
        next[idx + i] = d;
      });
      return next;
    });
    focusIndex(Math.min(idx + digits.length, CODE_LENGTH - 1));
  };

  /** Login submit – stay on page, transition content to 2FA inside frame */
  const onSubmit = async (data: LoginFormValues) => {
    console.log('Login attempt:', data);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsTwoFactor(true);
  };

  const onSubmit2FA = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
    setTwoFactorSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('2FA code:', code.join(''));
    } finally {
      setTwoFactorSubmitting(false);
    }
  };

  return (
    <AnimatePresence mode="wait">
        {!isTwoFactor && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={CONTENT_TRANSITION}
          >
              {/* Title + body */}
              <div className="mb-9 lg:mb-9">
                <h1 className={cn('text-[28px] leading-[32px] text-juno-900 lg:text-[34px] lg:leading-[38px]', FONT.serif)}>
                  Log in
                </h1>
                <p className="mt-3 text-base text-juno-700 lg:mt-3">
                  Welcome back! Please enter your details.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col">
                <div className="flex flex-col gap-8 lg:gap-8">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    aria-label="Email address"
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <div className="flex flex-col gap-2">
                    <div
                      className={cn(
                        'flex h-16 w-full items-center border-t bg-transparent p-3 outline-none transition-colors',
                        FONT.mono,
                        'placeholder:text-juno-400',
                        errors.password ? 'border-red-600' : 'border-juno-400 focus-within:border-juno-900'
                      )}
                      style={errors.password ? { borderColor: '#dc2626' } : undefined}
                    >
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete="current-password"
                        className="h-full flex-1 bg-transparent text-base text-juno-900 outline-none placeholder:text-juno-400"
                        {...register('password')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="ml-2 shrink-0 cursor-pointer transition-colors [color:#3F3F46] hover:[color:#18181B]"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        <EyeIcon22 show={!showPassword} />
                      </button>
                    </div>
                    {errors.password && (
                      <span className="text-xs text-red-600" role="alert">
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                </div>

                <GetStartedButton
                  type="submit"
                  variant="dark"
                  label="Log in"
                  isLoading={isSubmitting}
                  loadingLabel="Signing in..."
                  disabled={!isValid}
                  className="mt-8 w-full lg:mt-9"
                />
              </form>

              <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center text-sm font-normal text-juno-500 lg:mt-8">
                <span>Don&apos;t have an account?</span>
                <AppLink
                  href="/open-account"
                  className={cn(
                    FONT.mono,
                    'border-b border-transparent font-normal text-juno-900 transition-colors hover:border-juno-900 hover:text-juno-700'
                  )}
                >
                  Open an account
                </AppLink>
              </p>
          </motion.div>
        )}

        {isTwoFactor && (
          <motion.div
            key="2fa"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={CONTENT_TRANSITION}
          >
              <div className="mb-9 lg:mb-9">
                <h1 className={cn('text-[28px] leading-[32px] text-juno-900 lg:text-[34px] lg:leading-[38px]', FONT.serif)}>
                  Two-factor authentification
                </h1>
                <p className="mt-3 text-base text-juno-700 lg:mt-3">
                  Please open your authenticator app and enter the verification code below.
                </p>
              </div>

              <form onSubmit={onSubmit2FA} noValidate className="flex flex-col">
                <div className="flex flex-col gap-9">
                  <div className="flex w-full items-center justify-center gap-1">
                    {Array.from({ length: CODE_LENGTH }).map((_, idx) => (
                      <div key={idx} className="contents">
                        {idx === 3 && (
                          <span
                            className={cn(
                              'flex-none select-none text-[40px] font-normal leading-none text-juno-400',
                              FONT.sans
                            )}
                            aria-hidden="true"
                          >
                            -
                          </span>
                        )}

                        <div className="flex-1 min-w-0">
                          <input
                            ref={(el) => {
                              inputRefs.current[idx] = el;
                            }}
                            value={code[idx]}
                            onChange={(e) => {
                              const next = onlyDigit(e.target.value);
                              updateAt(idx, next);
                              if (next && idx < CODE_LENGTH - 1) focusIndex(idx + 1);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && !code[idx] && idx > 0) {
                                updateAt(idx - 1, '');
                                focusIndex(idx - 1);
                              }
                              if (e.key === 'ArrowLeft' && idx > 0) focusIndex(idx - 1);
                              if (e.key === 'ArrowRight' && idx < CODE_LENGTH - 1) focusIndex(idx + 1);
                            }}
                            onPaste={(e) => {
                              e.preventDefault();
                              handlePaste(idx, e.clipboardData.getData('text'));
                            }}
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            aria-label={`Verification code digit ${idx + 1}`}
                            maxLength={1}
                            className={cn(
                              'h-16 w-full rounded-[8px] border border-transparent bg-juno-100 px-2 text-center text-[28px] leading-none text-juno-900 outline-none transition-colors',
                              'hover:border-juno-900 focus:border-juno-900 focus:bg-white',
                              FONT.sans
                            )}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <GetStartedButton
                    type="submit"
                    variant="dark"
                    label="Verify code"
                    isLoading={twoFactorSubmitting}
                    loadingLabel="Verifying..."
                    disabled={!isComplete}
                    className="w-full"
                  />
                </div>
              </form>

              <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center text-sm font-normal text-juno-500 lg:mt-8">
                <span>Having issues with 2FA?</span>
                <AppLink
                  href="/two-factor-authentication/contact-support"
                  className={cn(
                    FONT.mono,
                    'cursor-pointer border-b border-transparent font-normal text-juno-900 transition-colors hover:border-juno-900 hover:text-juno-700'
                  )}
                >
                  Contact Support
                </AppLink>
              </p>
          </motion.div>
        )}
      </AnimatePresence>
  );
}

/**
 * Login page – wraps content in Suspense so useSearchParams() is allowed during prerender.
 */
export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<LoginFallback />}>
        <LoginContent />
      </Suspense>
    </AuthLayout>
  );
}
