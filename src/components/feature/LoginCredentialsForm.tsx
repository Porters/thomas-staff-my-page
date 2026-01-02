import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Input } from '../common/Input'
import { Button } from '../common/Button'

interface LoginCredentialsFormProps {
  handleLoginSubmit: any
  onLoginSubmit: any
  registerLogin: any
  loginErrors: any
  loginMutation: any
}

export const LoginCredentialsForm: React.FC<LoginCredentialsFormProps> = ({
  handleLoginSubmit,
  onLoginSubmit,
  registerLogin,
  loginErrors,
  loginMutation,
}) => {
  const { t } = useTranslation()

  return (
    <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="flex flex-col gap-6">
      <Input
        label={t('email')}
        type="email"
        {...registerLogin('username', { required: t('required') })}
        error={loginErrors.username?.message}
        placeholder={t('emailPlaceholder')}
      />
      <Input
        label={t('password')}
        type="password"
        showPasswordToggle
        {...registerLogin('password', { required: t('required') })}
        error={loginErrors.password?.message}
      />
      {loginMutation.isError && (
        <p className="text-sm text-red-600 dark:text-red-400">{t('error')}</p>
      )}
      <div className="flex flex-col gap-4 items-center">
        <Button
          type="submit"
          className="w-full"
          style={{ color: 'white' }}
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? `${t('loading')}` : t('login')}
        </Button>
        <Link to="/forgot-password" className="text-xs font-medium text-green-600 hover:opacity-80">
          {t('forgotPassword')}
        </Link>
      </div>
    </form>
  )
}
