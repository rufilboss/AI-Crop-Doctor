import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { BookOpen, CheckCircle, AlertTriangle, Info } from 'lucide-react'

const Recommendations: React.FC = () => {
  const { t } = useTranslation()

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center space-x-3 mb-8">
          <BookOpen className="w-10 h-10 text-primary-600" />
          <div>
            <h1 className="text-4xl font-bold text-gray-900">{t('recommendations.title')}</h1>
            <p className="text-gray-600">{t('recommendations.subtitle')}</p>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="w-5 h-5 text-primary-600" />
            <h2 className="text-xl font-semibold">{t('recommendations.general.title')}</h2>
          </div>
          <p className="text-gray-700 mb-6">{t('recommendations.general.description')}</p>

          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-900 mb-1">{t('recommendations.general.tip1.title')}</h3>
                  <p className="text-green-800 text-sm">{t('recommendations.general.tip1.description')}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">{t('recommendations.general.tip2.title')}</h3>
                  <p className="text-blue-800 text-sm">{t('recommendations.general.tip2.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Recommendations

