import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { History as HistoryIcon, Trash2, Calendar, Filter } from 'lucide-react'
import { historyAPI } from '../services/api'
import toast from 'react-hot-toast'

const History: React.FC = () => {
  const { t } = useTranslation()
  const [history, setHistory] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const response = await historyAPI.getHistory()
      setHistory(response.data || [])
    } catch (error) {
      toast.error(t('history.load_error'))
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (window.confirm(t('history.delete_confirm'))) {
      try {
        await historyAPI.deleteDetection(id)
        toast.success(t('history.deleted'))
        loadHistory()
      } catch (error) {
        toast.error(t('history.delete_error'))
      }
    }
  }

  const filteredHistory = filter === 'all' 
    ? history 
    : history.filter(item => item.crop_type === filter)

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">{t('history.loading')}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900 flex items-center space-x-3">
              <HistoryIcon className="w-10 h-10 text-primary-600" />
              <span>{t('history.title')}</span>
            </h1>
            <p className="text-gray-600">{t('history.subtitle')}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="card mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="input-field w-auto"
            >
              <option value="all">{t('history.filter_all')}</option>
              <option value="maize">{t('crops.maize')}</option>
              <option value="cassava">{t('crops.cassava')}</option>
              <option value="tomato">{t('crops.tomato')}</option>
            </select>
          </div>
        </div>

        {/* History List */}
        {filteredHistory.length === 0 ? (
          <div className="card text-center py-12">
            <HistoryIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">{t('history.empty')}</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredHistory.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold capitalize">
                        {item.crop_type}
                      </span>
                      <span className="text-gray-600 text-sm flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1 capitalize">
                      {item.disease.replace(/_/g, ' ')}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>
                        {t('results.confidence')}: <strong>{(item.confidence * 100).toFixed(1)}%</strong>
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.severity === 'high' ? 'bg-red-100 text-red-700' :
                        item.severity === 'medium' ? 'bg-orange-100 text-orange-700' :
                        item.severity === 'low' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {t(`severity.${item.severity}`)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default History

