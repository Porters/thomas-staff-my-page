import { forwardRef, useState } from 'react'
import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  showPasswordToggle?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', type = 'text', showPasswordToggle = false, ...props }, ref) => {
    const [visible, setVisible] = useState(false)
    const isPassword = type === 'password'
    const inputType = isPassword && showPasswordToggle ? (visible ? 'text' : 'password') : type

    return (
      <div className="w-full relative">
        {label && (
          <label className="block text-xs text-gray-400 dark:text-gray-500 mb-1">{label}</label>
        )}
        <input
          ref={ref}
          type={inputType}
          className={`w-full h-10 px-2 py-1 bg-[#F8F9FB] dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs ${
            error ? 'ring-2 ring-red-500 dark:ring-red-400' : ''
          } ${className}`}
          {...props}
        />
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none"
            style={{ top: '20px', height: '40px' }}
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? 'Hide password' : 'Show password'}
          >
            {visible ? (
              // Eye open SVG
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              // Eye closed SVG
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.462A9.956 9.956 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.956 9.956 0 01-4.043 5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
              </svg>
            )}
          </button>
        )}
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
