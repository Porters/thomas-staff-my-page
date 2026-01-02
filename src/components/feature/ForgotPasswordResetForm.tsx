import { Input, Button, Alert } from '@/components';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface Props {
  onSubmit: (data: any) => void;
  registerReset: any;
  resetErrors: any;
  resetMutation: any;
  handleResetSubmit: any;
  password: string;
}

export const ForgotPasswordResetForm: React.FC<Props> = ({
  onSubmit,
  registerReset,
  resetErrors,
  resetMutation,
  handleResetSubmit,
  password,
}) => {
  const { t } = useTranslation();
  return (
    <form onSubmit={handleResetSubmit(onSubmit)} className="flex flex-col gap-6">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {t('enterNewPassword')}
      </p>
      <Input
        label={t('newPassword')}
        type="password"
        showPasswordToggle
        {...registerReset('password', {
          required: t('required'),
          minLength: { value: 8, message: t('passwordMinLength') },
        })}
        error={resetErrors.password?.message}
      />
      <Input
        label={t('confirmPassword')}
        type="password"
        showPasswordToggle
        {...registerReset('confirmPassword', {
          required: t('required'),
          validate: (value: string) => value === password || t('passwordsDoNotMatch'),
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
  );
}
