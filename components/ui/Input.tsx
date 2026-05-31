'use client'

import React, { useId, useState } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  rightIcon?: React.ReactNode
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, label, rightIcon, error, className = '', ...props }, ref) => {
    const id = useId()
    const isPassword = type === 'password'
    const [showPassword, setShowPassword] = useState(false)
    const resolvedType = isPassword && showPassword ? 'text' : type

    return (
      <div className={`flex flex-col gap-1.5 w-full text-left ${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="text-[12px] font-semibold text-yye-gray uppercase tracking-[0.05em]"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          <input
            id={id}
            ref={ref}
            type={resolvedType}
            className={[
              'w-full px-4 py-3 rounded-[10px] border bg-white outline-none transition-all font-sans text-sm text-yye-dark placeholder:text-gray-400',
              isPassword || rightIcon ? 'pr-11' : '',
              error
                ? 'border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-400/20'
                : 'border-yye-green/[0.18] focus:border-yye-green focus:ring-1 focus:ring-yye-green/[0.15]',
            ].join(' ')}
            {...props}
          />

          {(isPassword || rightIcon) && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5">
              {isPassword ? (
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-gray-400 hover:text-yye-green focus:outline-none transition-colors duration-200"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    /* EyeOff */
                    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    /* Eye */
                    <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'

export { Input }
