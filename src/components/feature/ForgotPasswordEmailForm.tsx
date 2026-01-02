import { Input, Button, Alert } from '@/components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React from 'react'

interface Props {
  onSubmit: (data: any) => void
  registerEmail: any
  emailErrors: any
  emailMutation: any
  handleEmailSubmit: any
}

export const ForgotPasswordEmailForm: React.FC<Props> = ({
  onSubmit,
  registerEmail,
  emailErrors,
  emailMutation,
  handleEmailSubmit,
}) => {
  const { t } = useTranslation()
  return (
    <form onSubmit={handleEmailSubmit(onSubmit)} className="flex flex-col gap-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">{t('forgotPasswordInstruction')}</p>
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
      {emailMutation.isError && <Alert variant="error">{t('emailNotFound')}</Alert>}
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
  )
}
