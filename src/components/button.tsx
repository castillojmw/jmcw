import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: 'gold' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, variant = 'gold', ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component
        ref={ref}
        className={`px-8 py-4 text-sm font-semibold uppercase tracking-wider transition-all duration-300 border-radius-2 ${
          variant === 'gold'
            ? 'bg-[#c5a466] text-[#0a0a0a] hover:bg-[#d4b484] hover:-translate-y-0.5'
            : 'border border-[#c5a466] text-[#c5a466] bg-transparent hover:bg-[rgba(197,164,102,0.1)]'
        }`}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';
