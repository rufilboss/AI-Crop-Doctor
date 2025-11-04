import React, { createContext, useContext, useState, useEffect } from 'react'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from '../locales/en.json'
import haTranslations from '../locales/ha.json'
import yoTranslations from '../locales/yo.json'
import igTranslations from '../locales/ig.json'
import pidginTranslations from '../locales/pidgin.json'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    ha: { translation: haTranslations },
    yo: { translation: yoTranslations },
    ig: { translation: igTranslations },
    pidgin: { translation: pidginTranslations }
  },
  lng: localStorage.getItem('language') || 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
})

interface LanguageContextType {
  language: string
  changeLanguage: (lang: string) => void
  availableLanguages: { code: string; name: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState(i18n.language)

  const availableLanguages = [
    { code: 'en', name: 'English' },
    { code: 'ha', name: 'Hausa' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'ig', name: 'Igbo' },
    { code: 'pidgin', name: 'Pidgin English' }
  ]

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, availableLanguages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

