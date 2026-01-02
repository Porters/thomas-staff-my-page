import { useTranslation } from 'react-i18next'
import React from 'react'
import { UserTypeToggle } from './UserTypeToggle'
import { LoginCredentialsForm } from './LoginCredentialsForm'
import { OtpVerificationForm } from './OtpVerificationForm'

interface AuthFormProps {
  step: 'credentials' | 'otp'
  userType: 'staff' | 'staffingAgency'
  setUserType: (type: 'staff' | 'staffingAgency') => void
  handleLoginSubmit: any
  onLoginSubmit: any
  registerLogin: any
  loginErrors: any
  loginMutation: any
  triggerLogin: () => void
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

export const AuthForm: React.FC<AuthFormProps> = ({
  step,
  userType,
  setUserType,
  handleLoginSubmit,
  onLoginSubmit,
  registerLogin,
  loginErrors,
  loginMutation,
  triggerLogin,
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
    <div className="w-full max-w-xs md:w-[320px] flex flex-col gap-6 px-4 md:px-0">
      <h2 className="text-base font-bold text-center text-black dark:text-white">
        {step === 'credentials' ? t('login') : t('verifyOtp')}
      </h2>
      {step === 'otp' && (
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          {t('otpInstruction')}
        </p>
      )}
      {step === 'credentials' && (
        <UserTypeToggle userType={userType} onUserTypeChange={setUserType} />
      )}
      {step === 'credentials' ? (
        <LoginCredentialsForm
          handleLoginSubmit={handleLoginSubmit}
          onLoginSubmit={onLoginSubmit}
          registerLogin={registerLogin}
          loginErrors={loginErrors}
          loginMutation={loginMutation}
          triggerLogin={triggerLogin}
        />
      ) : (
        <OtpVerificationForm
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
      )}
    </div>
  )
}
