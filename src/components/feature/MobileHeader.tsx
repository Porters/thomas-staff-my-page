
import { LanguageSwitcher } from './LanguageSwitcher';
import img from '@/assets/icon.svg';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const MobileHeader = () => {
  const { t } = useTranslation();
  return (
    <header className="flex md:hidden items-center justify-between px-4 py-3 bg-[#F8F9FB] dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <Link to="/" className="flex items-center gap-2">
        <img width={40} height={40} src={img} alt="Logo Text" />
        <span className="text-lg font-bold">{t('staffManagement')}</span>
      </Link>
      <LanguageSwitcher />
    </header>
  );
};
