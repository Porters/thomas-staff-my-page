import React from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../common/Button'
import { OtpInputGroup } from '../common/OtpInputGroup'
import { CircularCountdown } from '../common/CircularCountdown'

interface OtpVerificationFormProps {
  otp: string[]
  otpInputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
  handleOtpChange: (index: number, value: string) => void
  handleOtpKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void
  handleOtpPaste: (e: React.ClipboardEvent) => void
  onOtpSubmit: (e: React.FormEvent) => void
  otpMutation: any
  countdown: number
  handleCancelOtp: () => void
}

export const OtpVerificationForm: React.FC<OtpVerificationFormProps> = ({
  otp,
  otpInputRefs,
  handleOtpChange,
  handleOtpKeyDown,
  handleOtpPaste,
  onOtpSubmit,
  otpMutation,
  countdown,
  handleCancelOtp,
}) => {
  const { t } = useTranslation()

  return (
    <form onSubmit={onOtpSubmit} className="flex flex-col gap-6">
      {/* OTP Input Boxes */}
      <OtpInputGroup
        otp={otp}
        otpInputRefs={otpInputRefs}
        onOtpChange={handleOtpChange}
        onOtpKeyDown={handleOtpKeyDown}
        onOtpPaste={handleOtpPaste}
      />

      {/* Countdown Timer */}
      <CircularCountdown countdown={countdown} maxTime={120} />

      {otpMutation.isError && (
        <p className="text-sm text-center text-red-600 dark:text-red-400">{t('error')}</p>
      )}

      <div className="flex gap-4">
        <Button variant="secondary" onClick={handleCancelOtp} className="flex-1" type="button">
          {t('cancel')}
        </Button>
        <Button
          type="submit"
          className="flex-1"
          disabled={otpMutation.isPending || otp.join('').length !== 6 || countdown === 0}
        >
          {otpMutation.isPending ? `${t('loading')}` : t('verifyOtp')}
        </Button>
      </div>
    </form>
  )
}
