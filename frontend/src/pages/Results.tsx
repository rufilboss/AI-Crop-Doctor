import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle, Info, ArrowLeft, Save, Share2 } from 'lucide-react'
import { historyAPI } from '../services/api'
import toast from 'react-hot-toast'

const Results: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const [results, setResults] = useState<any>(null)

  useEffect(() => {
    if (location.state?.results) {
      setResults(location.state.results)
    } else {
      // If no results in state, redirect to detector
      navigate('/detect')
    }
  }, [location.state, navigate])

  if (!results) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{t('results.loading')}</p>
      </div>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100 border-red-300'
      case 'medium':
        return 'text-orange-600 bg-orange-100 border-orange-300'
      case 'low':
        return 'text-yellow-600 bg-yellow-100 border-yellow-300'
      default:
        return 'text-green-600 bg-green-100 border-green-300'
    }
  }

  const getSeverityIcon = (severity: string) => {
    if (severity === 'none' || results.disease === 'healthy') {
      return <CheckCircle className="w-6 h-6" />
    }
    return <AlertTriangle className="w-6 h-6" />
  }

  const handleSave = async () => {
    try {
      await historyAPI.saveDetection({
        crop_type: results.crop_type,
        disease: results.disease,
        confidence: results.confidence,
        severity: results.severity,
        language: localStorage.getItem('language') || 'en'
      })
      toast.success(t('results.saved'))
    } catch (error) {
      toast.error(t('results.save_error'))
    }
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t('results.share_title'),
          text: `${t('results.crop')}: ${results.crop_type} | ${t('results.disease')}: ${results.disease}`,
        })
      } catch (error) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${t('results.crop')}: ${results.crop_type} | ${t('results.disease')}: ${results.disease}`)
      toast.success(t('results.copied'))
    }
  }

  const confidencePercentage = (results.confidence * 100).toFixed(1)

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/detect')}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('common.back')}</span>
          </button>
          <div className="flex space-x-2">
            <button onClick={handleSave} className="btn-secondary flex items-center space-x-2">
              <Save className="w-4 h-4" />
              <span>{t('results.save')}</span>
            </button>
            <button onClick={handleShare} className="btn-secondary flex items-center space-x-2">
              <Share2 className="w-4 h-4" />
              <span>{t('results.share')}</span>
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2 text-gray-900">{t('results.title')}</h1>

        {/* Disease Info Card */}
        <div className={`card border-l-4 ${getSeverityColor(results.severity)}`}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-lg ${getSeverityColor(results.severity)}`}>
                {getSeverityIcon(results.severity)}
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                  {results.recommendations?.disease_name || results.disease}
                </h3>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-600">
                    {t('results.confidence')}: <strong>{confidencePercentage}%</strong>
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(results.severity)}`}>
                    {t(`severity.${results.severity}`)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t('results.crop_type')}</div>
              <div className="text-lg font-semibold capitalize">{results.crop_type}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t('results.confidence')}</div>
              <div className="text-lg font-semibold">{confidencePercentage}%</div>
            </div>
          </div>
        </div>

        {/* Symptoms */}
        {results.recommendations?.symptoms && results.recommendations.symptoms.length > 0 && (
          <div className="card">
            <h4 className="text-xl font-semibold mb-4 flex items-center space-x-2">
              <Info className="w-5 h-5 text-primary-600" />
              <span>{t('results.symptoms')}</span>
            </h4>
            <ul className="space-y-2">
              {results.recommendations.symptoms.map((symptom: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span className="text-gray-700">{symptom}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Treatments */}
        {results.recommendations?.treatments && results.recommendations.treatments.length > 0 && (
          <div className="card">
            <h4 className="text-xl font-semibold mb-4">{t('results.treatments')}</h4>
            <div className="space-y-4">
              {results.recommendations.treatments.map((treatment: any, idx: number) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-lg text-gray-900">{treatment.method}</h5>
                    {treatment.cost && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        treatment.cost === 'low' ? 'bg-green-100 text-green-700' :
                        treatment.cost === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {t(`cost.${treatment.cost}`)}
                      </span>
                    )}
                  </div>
                  {treatment.description && (
                    <p className="text-sm text-gray-600 mb-3">{treatment.description}</p>
                  )}
                  {treatment.steps && treatment.steps.length > 0 && (
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700">
                      {treatment.steps.map((step: string, stepIdx: number) => (
                        <li key={stepIdx}>{step}</li>
                      ))}
                    </ol>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Prevention */}
        {results.recommendations?.prevention && results.recommendations.prevention.length > 0 && (
          <div className="card bg-blue-50 border-blue-200">
            <h4 className="text-xl font-semibold mb-4 text-blue-900">{t('results.prevention')}</h4>
            <ul className="space-y-2">
              {results.recommendations.prevention.map((tip: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-blue-800">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-4">
          <button onClick={() => navigate('/detect')} className="btn-primary flex-1">
            {t('results.detect_again')}
          </button>
          <button onClick={() => navigate('/recommendations')} className="btn-secondary flex-1">
            {t('results.view_full_guide')}
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Results

