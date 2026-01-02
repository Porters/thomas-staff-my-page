import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '@/components'
import { MobileHeader } from '../components/feature/MobileHeader'
import { AuthForm } from '../components/feature/AuthForm'
import { useAuthStore } from '../store/authStore'
import img from '../assets/icon.svg'
import type { LoginCredentials, OtpVerification } from '../types'

export const LoginPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const [step, setStep] = useState<'credentials' | 'otp'>('credentials')
  const [username, setUsername] = useState('')
  const [isLoginSumbitting, setIsLoginSubmitting] = useState(false)
  const [userType, setUserType] = useState<'staff' | 'staffingAgency'>('staffingAgency')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [countdown, setCountdown] = useState(120)
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Countdown timer for OTP
  useEffect(() => {
    if (step === 'otp' && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [step, countdown])

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginCredentials>()

  // Removed unused registerOtp, handleOtpSubmit, otpErrors from useForm for OTP

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
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
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    if (!/^\d+$/.test(pastedData)) return

    const newOtp = [...otp]
    pastedData.split('').forEach((char, index) => {
      if (index < 6) {
        newOtp[index] = char
      }
    })
    setOtp(newOtp)

    // Focus the next empty input or the last one
    const nextEmptyIndex = newOtp.findIndex((val) => !val)
    const focusIndex = nextEmptyIndex === -1 ? 5 : Math.min(nextEmptyIndex, 5)
    otpInputRefs.current[focusIndex]?.focus()
  }

  const loginMutation = useMutation({
    mutationFn: async (_credentials: LoginCredentials) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      return { requiresOtp: true }
    },
    onSuccess: (data) => {
      if (data.requiresOtp && step === 'credentials' && isLoginSumbitting) {
        setCountdown(120)
        setOtp(['', '', '', '', '', ''])
        setStep('otp')
        // Focus first input after state update
        setTimeout(() => otpInputRefs.current[0]?.focus(), 0)
      }
    },
  })

  const otpMutation = useMutation({
    mutationFn: async (data: OtpVerification) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      const mockUser = {
        id: '1',
        username: data.username,
        email: `${data.username}@example.com`,
        role: 'admin',
      }
      const mockToken = `mock-token-${Date.now()}`
      localStorage.setItem('authToken', mockToken)
      return { user: mockUser, token: mockToken }
    },
    onSuccess: (data) => {
      setUser(data.user)
      navigate('/dashboard')
    },
  })

  const onLoginSubmit = (data: LoginCredentials) => {
    setUsername(data.username)
    loginMutation.mutate(data)
  }

  const handleCancelOtp = () => {
    setStep('credentials')
    setCountdown(0)
    setOtp(['', '', '', '', '', ''])
    setIsLoginSubmitting(false)
    loginMutation.reset()
  }

  const triggerLogin = () => {
    setIsLoginSubmitting(true)
  }

  const onOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const otpCode = otp.join('')
    if (otpCode.length !== 6) return

    const otpData: OtpVerification = {
      username,
      otp: otpCode,
    }
    otpMutation.mutate(otpData)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <MobileHeader />
      {/* Left side (Logo and Title) for desktop */}
      <div className="hidden md:flex w-1/2 bg-[#F8F9FB] dark:bg-gray-900 items-center justify-center relative transition-colors">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <img width={80} height={80} src={img} alt="Logo Text" />
          </div>
          <h1 className="text-4xl font-bold mb-2">{t('staffManagement')}</h1>
        </div>
      </div>
      {/* Right side (Form) */}
      <div className="flex-1 w-full md:w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center transition-colors relative">
        {/* LanguageSwitcher for desktop */}
        <div className="hidden md:block absolute top-4 right-4">
          <LanguageSwitcher />
        </div>
        <AuthForm
          step={step}
          userType={userType}
          setUserType={setUserType}
          handleLoginSubmit={handleLoginSubmit}
          onLoginSubmit={onLoginSubmit}
          registerLogin={registerLogin}
          loginErrors={loginErrors}
          loginMutation={loginMutation}
          triggerLogin={triggerLogin}
          otp={otp}
          otpInputRefs={otpInputRefs}
          handleOtpChange={handleOtpChange}
          handleOtpKeyDown={handleOtpKeyDown}
          handleOtpPaste={handleOtpPaste}
          onOtpSubmit={onOtpSubmit}
          otpMutation={otpMutation}
          countdown={countdown}
          handleCancelOtp={handleCancelOtp}
        />
      </div>
    </div>
  )
}
