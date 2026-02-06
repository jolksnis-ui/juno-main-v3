'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_SRC } from '@/lib/constants';

export const Preloader = () => {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip splash when landing directly on auth pages (only on initial load)
    const isAuthPath =
      pathname === '/login' ||
      pathname === '/open-account' ||
      pathname.startsWith('/open-account/');
    if (isAuthPath) {
      setIsLoading(false);
      return;
    }

    // Total animation duration control (extended for drama)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500); // 3.5s total duration

    return () => clearTimeout(timer);
    // Run only on mount so navigating back to home doesn't re-trigger preloader
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center bg-[#18181B]"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 1.2,
              ease: [0.76, 0, 0.24, 1], // Custom smooth bezier (similar to quartOut)
            },
          }}
        >
          <div className="relative flex flex-col items-center">
            {/* Logo — тот же junomoney, что в хедере; белая инверсия для тёмного фона */}
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <Image
                src={LOGO_SRC}
                alt="Juno Money"
                width={130}
                height={24}
                priority
                className="h-[40px] w-auto brightness-0 invert sm:h-[24px] lg:h-[40px]"
              />
            </motion.div>

            {/* Elegant loading line - animating left to right */}
            <div className="mt-8 h-[1px] w-[140px] overflow-hidden bg-white/10 sm:mt-5 sm:w-[85px] lg:mt-8 lg:w-[140px]">
              <motion.div
                className="h-full w-full bg-white/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                style={{ originX: 0 }}
                transition={{ delay: 1.0, duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
