import { useState, useRef } from 'react'

interface UseOtpInputReturn {
  otp: string[]
  setOtp: React.Dispatch<React.SetStateAction<string[]>>
  otpInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
  handleOtpChange: (index: number, value: string) => void
  handleOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void
  handleOtpPaste: (e: React.ClipboardEvent) => void
  resetOtp: () => void
}

/**
 * Custom hook for managing OTP input logic
 */
export const useOtpInput = (length: number = 6): UseOtpInputReturn => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < length - 1) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, length)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      if (index < length) {
        newOtp[index] = char
      }
    })
    setOtp(newOtp)

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((val) => !val)
    const focusIndex = nextEmptyIndex === -1 ? length - 1 : Math.min(nextEmptyIndex, length - 1)
    otpInputRefs.current[focusIndex]?.focus()
  }

  const resetOtp = () => {
    setOtp(Array(length).fill(''))
    otpInputRefs.current[0]?.focus()
  }

  return {
    otp,
    setOtp,
    otpInputRefs,
    handleOtpChange,
    handleOtpKeyDown,
    handleOtpPaste,
    resetOtp,
  }
}
