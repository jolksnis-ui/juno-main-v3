'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { FONT } from '@/lib/constants';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Error message to display below input */
  error?: string;
}

/**
 * Minimalist input with top border styling
 * Supports focus, error, and disabled states
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        <input
          type={type}
          className={cn(
            'h-16 w-full border-t bg-transparent p-3 text-base text-juno-900 outline-none transition-colors',
            FONT.mono,
            'placeholder:text-juno-400',
            'disabled:cursor-not-allowed disabled:opacity-50',
            !error && 'border-juno-400 focus:border-juno-900',
            error && 'border-red-600 focus:border-red-600',
            className
          )}
          style={error ? { borderColor: '#dc2626' } : undefined}
          ref={ref}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-600" role="alert">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input, type InputProps };
