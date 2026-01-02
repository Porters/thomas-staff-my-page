import { useState } from 'react'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../store/authStore'
import { authService } from '../services/authService'
import { ThemeToggle, LanguageSwitcher, Dialog } from '@/components'

const menuItems = [
  { id: 1, label: 'table', path: '/dashboard/table1' },
  { id: 2, label: 'dynamicForm', path: '/dashboard/form' },
  { id: 3, label: 'table', path: '/dashboard/table2' },
  { id: 4, label: 'table', path: '/dashboard/table3' },
]

export const DashboardPage = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)

  const handleLogoutClick = () => {
    setIsLogoutDialogOpen(true)
  }

  const handleLogout = () => {
    authService.logout()
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors pb-16 lg:pb-0">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="mr-2 lg:mr-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hidden lg:block"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <h1 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white">
              {t('staffManagement')}
            </h1>
          </div>
          <div className="flex items-center gap-2 lg:gap-4">
            <div className="hidden sm:flex items-center gap-2 lg:gap-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
            <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">
              {t('welcome')}, {user?.username}
            </span>
            <button
              onClick={handleLogoutClick}
              className="px-3 lg:px-4 py-1.5 lg:py-2 text-xs lg:text-sm text-white bg-red-600 rounded-md hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              {t('logout')}
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Desktop Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? 'w-64' : 'w-0'
          } bg-white dark:bg-gray-800 shadow-md transition-all duration-300 overflow-hidden hidden lg:block`}
        >
          <nav className="p-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`block px-4 py-2 rounded-md transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {t(item.label)}{' '}
                {item.id === 1 ? '1' : item.id === 3 ? '2' : item.id === 4 ? '3' : ''}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 lg:hidden z-50">
        <div className="flex justify-around items-center h-16">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                location.pathname === item.path
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="text-xs">
                {t(item.label)}{' '}
                {item.id === 1 ? '1' : item.id === 3 ? '2' : item.id === 4 ? '3' : ''}
              </span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Logout Confirmation Dialog */}
      <Dialog
        isOpen={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
        title={t('confirmLogout')}
        size="sm"
        actions={[
          {
            label: t('cancel'),
            onClick: () => setIsLogoutDialogOpen(false),
            variant: 'secondary',
          },
          {
            label: t('logout'),
            onClick: handleLogout,
            variant: 'danger',
          },
        ]}
      >
        <p className="text-gray-600 dark:text-gray-400">{t('logoutMessage')}</p>
      </Dialog>
    </div>
  )
}
