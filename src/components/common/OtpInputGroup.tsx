import React from 'react'

interface OtpInputGroupProps {
  otp: string[]
  otpInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
  onOtpChange: (index: number, value: string) => void
  onOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void
  onOtpPaste: (e: React.ClipboardEvent) => void
}

export const OtpInputGroup: React.FC<OtpInputGroupProps> = ({
  otp,
  otpInputRefs,
  onOtpChange,
  onOtpKeyDown,
  onOtpPaste,
}) => {
  return (
    <div className="flex justify-center gap-2">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            otpInputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => onOtpChange(index, e.target.value)}
          onKeyDown={(e) => onOtpKeyDown(index, e)}
          onPaste={index === 0 ? onOtpPaste : undefined}
          className="w-12 h-12 text-center text-xl font-semibold rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          placeholder="•"
        />
      ))}
    </div>
  )
}
