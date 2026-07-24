'use client'

import React from 'react'

/* ── tiny cn() utility - no clsx/tailwind-merge needed ─────────────── */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/* ── Variant & size maps ─────────────────────────────────────────────
   Color token mapping against the YYE brand guide:
     primary-500  → yye-green (#11A32C)
     primary-600  → yye-green-dark (#0c7d21)
     primary-100  → yye-green/10  (focus ring)
     primary-50   → yye-green/[0.06]
     primary-300  → yye-green/30
     ink-100      → gray-200
     ink-400      → yye-gray (#6b6b6b)
     foreground   → yye-dark (#1E1E1E)
     background-90→ gray-100
     error-*      → Tailwind red-*
   ─────────────────────────────────────────────────────────────────── */

export type ButtonVariant =
  | 'primary'
  | 'primary-ghost'
  | 'secondary-color'
  | 'secondary-gray'
  | 'tertiary-color'
  | 'tertiary-gray'
  | 'link-color'
  | 'link-gray'
  | 'destructive-ghost'
  | 'accent'          // YYE yellow - donate / support CTAs

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const SIZE: Record<ButtonSize, string> = {
  xs: 'h-7 rounded-[8px] px-2.5 py-1 text-xs leading-4',
  sm: 'h-9 rounded-[8px] px-3.5 py-2 text-sm leading-5',
  md: 'h-10 rounded-[8px] px-4 py-2.5 text-sm leading-5',
  lg: 'h-11 rounded-[10px] px-[18px] py-2.5 text-base leading-6',
  xl: 'h-12 rounded-[10px] px-5 py-3 text-base leading-6',
}

const VARIANT: Record<ButtonVariant, string> = {
  'primary':
    'bg-yye-green border border-yye-green text-white shadow-sm ' +
    'hover:bg-yye-green-dark hover:border-yye-green-dark ' +
    'focus-visible:ring-4 focus-visible:ring-yye-green/10',

  'primary-ghost':
    'bg-transparent border border-yye-green text-yye-green shadow-sm ' +
    'hover:bg-yye-green/[0.06] ' +
    'focus-visible:ring-4 focus-visible:ring-yye-green/10',

  'secondary-color':
    'bg-yye-green/[0.06] border border-yye-green/30 text-yye-green shadow-sm ' +
    'hover:bg-yye-green/[0.12] ' +
    'focus-visible:ring-4 focus-visible:ring-yye-green/10',

  'secondary-gray':
    'bg-white border border-gray-200 text-yye-dark shadow-sm ' +
    'hover:bg-gray-50 ' +
    'focus-visible:ring-4 focus-visible:ring-gray-100',

  'tertiary-color':
    'bg-transparent border border-transparent text-yye-green ' +
    'hover:bg-yye-green/[0.06] ' +
    'focus-visible:ring-4 focus-visible:ring-yye-green/10',

  'tertiary-gray':
    'bg-transparent border border-transparent text-yye-gray ' +
    'hover:bg-gray-100 ' +
    'focus-visible:ring-4 focus-visible:ring-gray-100',

  'link-color':
    'bg-transparent text-yye-green hover:text-yye-green-dark ' +
    'h-auto px-0 py-0 rounded-none shadow-none active:scale-100',

  'link-gray':
    'bg-transparent text-yye-gray hover:text-yye-dark ' +
    'h-auto px-0 py-0 rounded-none shadow-none active:scale-100',

  'destructive-ghost':
    'bg-transparent border border-red-500 text-red-500 ' +
    'hover:bg-red-50 ' +
    'focus-visible:ring-4 focus-visible:ring-red-100',

  'accent':
    'bg-yye-yellow border border-yye-yellow text-yye-dark shadow-sm ' +
    'hover:bg-yye-yellow-dark hover:border-yye-yellow-dark ' +
    'focus-visible:ring-4 focus-visible:ring-yye-yellow/20',
}

/** Destructive mode overrides per variant (mirrors compound variants from cva) */
const DESTRUCTIVE_OVERRIDE: Partial<Record<ButtonVariant, string>> = {
  'primary':
    'bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 ' +
    'focus-visible:ring-red-100',
  'primary-ghost':
    'border-red-500 text-red-500 hover:bg-red-50 focus-visible:ring-red-100',
  'secondary-color':
    'bg-red-50 border-red-300 text-red-600 hover:bg-red-100 focus-visible:ring-red-100',
  'secondary-gray':
    'border-red-300 text-red-600 hover:bg-red-50 focus-visible:ring-red-100',
  'tertiary-color':
    'text-red-600 hover:bg-red-50 focus-visible:ring-red-100',
  'tertiary-gray':
    'text-red-600 hover:bg-red-50 focus-visible:ring-red-100',
  'link-color': 'text-red-600 hover:text-red-700',
  'link-gray':  'text-red-600 hover:text-red-700',
}

/* ── Base classes shared by all buttons ─────────────────────────────── */
const BASE =
  'inline-flex items-center cursor-pointer justify-center gap-2 ' +
  'whitespace-nowrap font-semibold transition-all duration-150 ' +
  'active:scale-[0.99] ' +
  'focus-visible:outline-none ' +
  'disabled:pointer-events-none disabled:opacity-60 ' +
  '[&_svg]:pointer-events-none [&_svg]:shrink-0'

/* ── Props ──────────────────────────────────────────────────────────── */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  destructive?: boolean
  fullWidth?: boolean
  /** Render the first child element instead of a <button>, merging styles */
  asChild?: boolean
  iconLeft?: React.ReactNode
  iconRight?: React.ReactNode
}

/* ── Component ───────────────────────────────────────────────────────── */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'lg',
      destructive = false,
      fullWidth = false,
      asChild = false,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref,
  ) => {
    const computed = cn(
      BASE,
      VARIANT[variant],
      destructive ? DESTRUCTIVE_OVERRIDE[variant] : undefined,
      SIZE[size],
      fullWidth ? 'w-full' : undefined,
      className,
    )

    /* ── asChild: merge styles into first child (e.g. <Link>) ── */
    if (asChild && React.isValidElement(children)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const child = React.Children.only(children) as React.ReactElement<any>
      return React.cloneElement(child, {
        ...props,
        // Merge any existing className on the child
        className: cn(child.props.className as string | undefined, computed),
        ref,
      })
    }

    return (
      <button className={computed} ref={ref} {...props}>
        {iconLeft}
        {children}
        {iconRight}
      </button>
    )
  },
)

Button.displayName = 'Button'

export { Button }
