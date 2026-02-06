'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './header';

/** Auth routes where header should not appear */
const AUTH_ROUTES = ['/login', '/open-account', '/forgot-password', '/two-factor-authentication'];

/** Routes where header should use dark theme */
const DARK_HEADER_ROUTES = ['/corporate-account', '/about'];

/**
 * Conditionally renders Header based on current route
 * Animates in/out when navigating between auth and main pages
 */
export function HeaderWrapper() {
  const pathname = usePathname();

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const isDark = DARK_HEADER_ROUTES.includes(pathname);

  return (
    <AnimatePresence mode="wait">
      {!isAuthRoute && (
        <motion.div
          key="header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          <Header isDark={isDark} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
