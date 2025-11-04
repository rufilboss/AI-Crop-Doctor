import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../context/LanguageContext'
import { Sprout, History, Home as HomeIcon, Camera, BookOpen } from 'lucide-react'

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const { language, changeLanguage, availableLanguages } = useLanguage()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-lg shadow-lg group-hover:shadow-xl transition-all">
                <Sprout className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                AI Crop Doctor
              </span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/')
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <HomeIcon className="w-4 h-4 inline mr-2" />
                {t('nav.home')}
              </Link>
              <Link
                to="/detect"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/detect')
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Camera className="w-4 h-4 inline mr-2" />
                {t('nav.detect')}
              </Link>
              <Link
                to="/history"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/history')
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <History className="w-4 h-4 inline mr-2" />
                {t('nav.history')}
              </Link>
              <Link
                to="/recommendations"
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive('/recommendations')
                    ? 'bg-primary-100 text-primary-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                {t('nav.recommendations')}
              </Link>
            </nav>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <select
                value={language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none bg-white"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Crop Doctor</h3>
              <p className="text-gray-400">
                {t('footer.description')}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.quick_links')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/detect" className="hover:text-white transition-colors">
                    {t('nav.detect')}
                  </Link>
                </li>
                <li>
                  <Link to="/history" className="hover:text-white transition-colors">
                    {t('nav.history')}
                  </Link>
                </li>
                <li>
                  <Link to="/recommendations" className="hover:text-white transition-colors">
                    {t('nav.recommendations')}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
              <p className="text-gray-400">
                {t('footer.support_text')}
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Crop Doctor. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout

