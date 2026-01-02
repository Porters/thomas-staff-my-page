import React from 'react';
import { useTranslation } from 'react-i18next';

interface UserTypeToggleProps {
  userType: 'staff' | 'staffingAgency';
  onUserTypeChange: (type: 'staff' | 'staffingAgency') => void;
}

export const UserTypeToggle: React.FC<UserTypeToggleProps> = ({ 
  userType, 
  onUserTypeChange 
}) => {
  const { t } = useTranslation();

  return (
    <div className="p-1 bg-[#F8F9FB] dark:bg-gray-800 rounded-full inline-flex">
      <button
        type="button"
        onClick={() => onUserTypeChange('staff')}
        className={`w-[145px] px-4 py-1 rounded-full text-sm font-medium transition-colors ${
          userType === 'staff'
            ? 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            : 'bg-transparent text-gray-600 dark:text-gray-400'
        }`}
      >
        {t('staff')}
      </button>
      <button
        type="button"
        onClick={() => onUserTypeChange('staffingAgency')}
        className={`px-4 py-1 rounded-full text-sm font-bold transition-colors ${
          userType === 'staffingAgency'
            ? 'bg-white dark:bg-gray-700 text-black dark:text-white opacity-20'
            : 'bg-transparent text-gray-600 dark:text-gray-400'
        }`}
      >
        {t('staffingAgency')}
      </button>
    </div>
  );
};
