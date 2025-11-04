import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Sparkles, Globe, Shield, TrendingUp, Users } from 'lucide-react'

const Home: React.FC = () => {
  const { t } = useTranslation()

  const features = [
    {
      icon: <Camera className="w-8 h-8" />,
      title: t('home.features.detection.title'),
      description: t('home.features.detection.description'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: t('home.features.ai.title'),
      description: t('home.features.ai.description'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: t('home.features.languages.title'),
      description: t('home.features.languages.description'),
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: t('home.features.reliable.title'),
      description: t('home.features.reliable.description'),
      color: 'from-red-500 to-red-600'
    }
  ]

  const stats = [
    { icon: <TrendingUp className="w-6 h-6" />, value: '90%+', label: t('home.stats.accuracy') },
    { icon: <Users className="w-6 h-6" />, value: '10K+', label: t('home.stats.farmers') },
    { icon: <Camera className="w-6 h-6" />, value: '50K+', label: t('home.stats.detections') },
    { icon: <Globe className="w-6 h-6" />, value: '5', label: t('home.stats.languages') }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              🌾 {t('home.badge')}
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-600 via-green-600 to-primary-800 bg-clip-text text-transparent">
            {t('home.title')}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('home.subtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/detect" className="btn-primary text-lg px-8 py-4">
              <Camera className="w-5 h-5 inline mr-2" />
              {t('home.cta.detect')}
            </Link>
            <Link to="/recommendations" className="btn-secondary text-lg px-8 py-4">
              {t('home.cta.learn')}
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
            className="card text-center"
          >
            <div className="text-primary-600 mb-2 flex justify-center">
              {stat.icon}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="py-12"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
          {t('home.features.title')}
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              className="card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} text-white flex items-center justify-center mb-4 shadow-lg`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="card bg-gradient-to-r from-primary-600 to-green-600 text-white text-center py-12"
      >
        <h2 className="text-3xl font-bold mb-4">{t('home.cta_section.title')}</h2>
        <p className="text-lg mb-8 opacity-90">{t('home.cta_section.description')}</p>
        <Link to="/detect" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-block">
          {t('home.cta.start')}
        </Link>
      </motion.section>
    </div>
  )
}

export default Home

