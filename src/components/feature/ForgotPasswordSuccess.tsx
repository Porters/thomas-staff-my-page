import { Button, Alert } from '@/components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import React from 'react'

export const ForgotPasswordSuccess: React.FC = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-6">
      <Alert variant="success">{t('passwordResetSuccess')}</Alert>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        {t('passwordResetSuccessMessage')}
      </p>
      <Link to="/login">
        <Button className="w-full" style={{ color: 'white' }}>
          {t('backToLogin')}
        </Button>
      </Link>
    </div>
  )
}
