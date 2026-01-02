import { Input, Button, Alert } from '@/components'
import { useTranslation } from 'react-i18next'
import React from 'react'

interface Props {
  onSubmit: (data: any) => void
  registerOtp: any
  otpErrors: any
  otpMutation: any
  handleOtpSubmit: any
  email: string
  setStep: (step: string) => void
}

export const ForgotPasswordOtpForm: React.FC<Props> = ({
  onSubmit,
  registerOtp,
  otpErrors,
  otpMutation,
  handleOtpSubmit,
  email,
  setStep,
}) => {
  const { t } = useTranslation()
  return (
    <form onSubmit={handleOtpSubmit(onSubmit)} className="flex flex-col gap-6">
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
      {otpMutation.isError && <Alert variant="error">{t('invalidOtp')}</Alert>}
      <div className="flex gap-4">
        <Button
          variant="secondary"
          onClick={() => setStep('email')}
          className="flex-1"
          type="button"
        >
          {t('back')}
        </Button>
        <Button type="submit" className="flex-1" disabled={otpMutation.isPending}>
          {otpMutation.isPending ? t('loading') : t('verify')}
        </Button>
      </div>
    </form>
  )
}
