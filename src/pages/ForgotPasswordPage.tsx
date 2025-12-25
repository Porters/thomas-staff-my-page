import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { Input, Button, Alert } from '../components'
import { authService } from '../services/authService'

type ForgotPasswordStep = 'email' | 'otp' | 'reset' | 'success'

interface EmailForm {
  email: string
}

interface OtpForm {
  otp: string
}

interface ResetPasswordForm {
  password: string
  confirmPassword: string
}

export const ForgotPasswordPage = () => {
  const { t } = useTranslation()
  const [step, setStep] = useState<ForgotPasswordStep>('email')
  const [email, setEmail] = useState('')

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors },
  } = useForm<EmailForm>()

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    formState: { errors: otpErrors },
  } = useForm<OtpForm>()

  const {
    register: registerReset,
    handleSubmit: handleResetSubmit,
    formState: { errors: resetErrors },
    watch,
  } = useForm<ResetPasswordForm>()

  const emailMutation = useMutation({
    mutationFn: async (data: EmailForm) => {
      return await authService.requestPasswordReset(data.email)
    },
    onSuccess: () => {
      setStep('otp')
    },
  })

  const otpMutation = useMutation({
    mutationFn: async (data: OtpForm) => {
      return await authService.verifyPasswordResetOtp(email, data.otp)
    },
    onSuccess: () => {
      setStep('reset')
    },
  })

  const resetMutation = useMutation({
    mutationFn: async (data: ResetPasswordForm) => {
      return await authService.resetPassword(email, data.password)
    },
    onSuccess: () => {
      setStep('success')
    },
  })

  const onEmailSubmit = (data: EmailForm) => {
    setEmail(data.email)
    emailMutation.mutate(data)
  }

  const onOtpSubmit = (data: OtpForm) => {
    otpMutation.mutate(data)
  }

  const onResetSubmit = (data: ResetPasswordForm) => {
    resetMutation.mutate(data)
  }

  const password = watch('password')

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-[#F8F9FB] dark:bg-gray-900 flex items-center justify-center relative transition-colors">
        <div className="text-center">
          <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 mx-auto shadow-lg transition-colors">
            <svg
              className="w-20 h-20 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-2">{t('staffManagement')}</h1>
        </div>
      </div>

      <div className="w-1/2 bg-white dark:bg-gray-900 flex items-center justify-center transition-colors relative">
        <div className="w-[320px] flex flex-col gap-6">
          <h2 className="text-base font-bold text-center text-black dark:text-white">
            {step === 'email' && t('forgotPassword')}
            {step === 'otp' && t('verifyOtp')}
            {step === 'reset' && t('resetPassword')}
            {step === 'success' && t('success')}
          </h2>

          {step === 'email' && (
            <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="flex flex-col gap-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('forgotPasswordInstruction')}
              </p>
              <Input
                label={t('email')}
                type="email"
                {...registerEmail('email', {
                  required: t('required'),
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: t('invalidEmail'),
                  },
                })}
                error={emailErrors.email?.message}
                placeholder={t('emailPlaceholder')}
              />
              {emailMutation.isError && (
                <Alert variant="error">
                  {t('emailNotFound')}
                </Alert>
              )}
              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="w-full"
                  style={{ color: 'white' }}
                  disabled={emailMutation.isPending}
                >
                  {emailMutation.isPending ? t('loading') : t('sendResetLink')}
                </Button>
                <Link
                  to="/login"
                  className="text-sm text-center text-blue-600 dark:text-blue-400 hover:opacity-80"
                >
                  {t('backToLogin')}
                </Link>
              </div>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit(onOtpSubmit)} className="flex flex-col gap-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('otpSentTo')} {email}
              </p>
              <Input
                label={t('otp')}
                {...registerOtp('otp', {
                  required: t('required'),
                  minLength: { value: 6, message: t('otpMustBe6Digits') },
                  maxLength: { value: 6, message: t('otpMustBe6Digits') },
                })}
                error={otpErrors.otp?.message}
                placeholder={t('enterOtp')}
                maxLength={6}
              />
              {otpMutation.isError && (
                <Alert variant="error">
                  {t('invalidOtp')}
                </Alert>
              )}
              <div className="flex gap-4">
                <Button
                  variant="secondary"
                  onClick={() => setStep('email')}
                  className="flex-1"
                >
                  {t('back')}
                </Button>
                <Button type="submit" className="flex-1" disabled={otpMutation.isPending}>
                  {otpMutation.isPending ? t('loading') : t('verify')}
                </Button>
              </div>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handleResetSubmit(onResetSubmit)} className="flex flex-col gap-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('enterNewPassword')}
              </p>
              <Input
                label={t('newPassword')}
                type="password"
                {...registerReset('password', {
                  required: t('required'),
                  minLength: { value: 8, message: t('passwordMinLength') },
                })}
                error={resetErrors.password?.message}
              />
              <Input
                label={t('confirmPassword')}
                type="password"
                {...registerReset('confirmPassword', {
                  required: t('required'),
                  validate: (value) => value === password || t('passwordsDoNotMatch'),
                })}
                error={resetErrors.confirmPassword?.message}
              />
              {resetMutation.isError && (
                <Alert variant="error">
                  {t('resetPasswordError')}
                </Alert>
              )}
              <Button
                type="submit"
                className="w-full"
                style={{ color: 'white' }}
                disabled={resetMutation.isPending}
              >
                {resetMutation.isPending ? t('loading') : t('resetPassword')}
              </Button>
            </form>
          )}

          {step === 'success' && (
            <div className="flex flex-col gap-6">
              <Alert variant="success">
                {t('passwordResetSuccess')}
              </Alert>
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {t('passwordResetSuccessMessage')}
              </p>
              <Link to="/login">
                <Button className="w-full" style={{ color: 'white' }}>
                  {t('backToLogin')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
