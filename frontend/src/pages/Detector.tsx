import React, { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Camera, Upload, Loader2, X, CheckCircle } from 'lucide-react'
import { detectionAPI } from '../services/api'
import toast from 'react-hot-toast'
import { useLanguage } from '../context/LanguageContext'

const Detector: React.FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [cropType, setCropType] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [results, setResults] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLVideoElement>(null)
  const [showCamera, setShowCamera] = useState(false)

  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
    setShowCamera(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageSelect(e.target.files[0])
    }
  }

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (cameraRef.current) {
        cameraRef.current.srcObject = stream
        setShowCamera(true)
      }
    } catch (error) {
      toast.error(t('camera.error'))
    }
  }

  const capturePhoto = () => {
    if (cameraRef.current) {
      const canvas = document.createElement('canvas')
      canvas.width = cameraRef.current.videoWidth
      canvas.height = cameraRef.current.videoHeight
      const ctx = canvas.getContext('2d')
      if (ctx && cameraRef.current) {
        ctx.drawImage(cameraRef.current, 0, 0)
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' })
            handleImageSelect(file)
            // Stop camera
            const stream = cameraRef.current?.srcObject as MediaStream
            stream?.getTracks().forEach(track => track.stop())
          }
        })
      }
    }
  }

  const handleDetect = async () => {
    if (!selectedImage) {
      toast.error(t('detection.no_image'))
      return
    }

    setIsProcessing(true)
    try {
      const formData = new FormData()
      formData.append('file', selectedImage)
      if (cropType) {
        formData.append('crop_type', cropType)
      }

      const response = await detectionAPI.fullDetection(formData, language)
      setResults(response.data)
      toast.success(t('detection.success'))
      
      // Navigate to results page after a short delay
      setTimeout(() => {
        navigate('/results', { state: { results: response.data } })
      }, 1000)
    } catch (error: any) {
      toast.error(error.response?.data?.detail || t('detection.error'))
    } finally {
      setIsProcessing(false)
    }
  }

  const clearImage = () => {
    setSelectedImage(null)
    setPreview(null)
    setResults(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{t('detection.title')}</h1>
        <p className="text-gray-600 mb-8">{t('detection.subtitle')}</p>

        {/* Image Upload/Capture */}
        <div className="card mb-6">
          {!preview ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {t('detection.upload_image')}
                </label>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-primary w-full flex items-center justify-center space-x-2 h-32 border-2 border-dashed border-primary-300 bg-primary-50 hover:bg-primary-100"
                >
                  <Upload className="w-6 h-6" />
                  <span>{t('detection.choose_file')}</span>
                </button>
                <input
                  ref={fileInputRef.current}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {/* Camera */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">
                  {t('detection.take_photo')}
                </label>
                <button
                  onClick={handleCameraCapture}
                  className="btn-secondary w-full flex items-center justify-center space-x-2 h-32 border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  <Camera className="w-6 h-6" />
                  <span>{t('detection.open_camera')}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="relative group">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Crop Type Selector (Optional) */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              {t('detection.crop_type')} ({t('common.optional')})
            </label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="input-field"
            >
              <option value="">{t('detection.auto_detect')}</option>
              <option value="maize">{t('crops.maize')}</option>
              <option value="cassava">{t('crops.cassava')}</option>
              <option value="tomato">{t('crops.tomato')}</option>
            </select>
          </div>

          {/* Detect Button */}
          <button
            onClick={handleDetect}
            disabled={!selectedImage || isProcessing}
            className="btn-primary w-full mt-6 flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{t('detection.processing')}</span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5" />
                <span>{t('detection.detect')}</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Results Preview */}
        {results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card bg-green-50 border-green-200"
          >
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">{t('detection.result_preview')}</h3>
                <p className="text-sm text-green-700">
                  {t('detection.crop_detected')}: <strong>{results.crop_type}</strong> |{' '}
                  {t('detection.disease')}: <strong>{results.disease}</strong>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{t('camera.title')}</h3>
              <button
                onClick={() => {
                  const stream = cameraRef.current?.srcObject as MediaStream
                  stream?.getTracks().forEach(track => track.stop())
                  setShowCamera(false)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <video
              ref={cameraRef}
              autoPlay
              className="w-full rounded-lg mb-4"
              playsInline
            />
            <div className="flex space-x-4">
              <button onClick={capturePhoto} className="btn-primary flex-1">
                <Camera className="w-5 h-5 inline mr-2" />
                {t('camera.capture')}
              </button>
              <button
                onClick={() => {
                  const stream = cameraRef.current?.srcObject as MediaStream
                  stream?.getTracks().forEach(track => track.stop())
                  setShowCamera(false)
                }}
                className="btn-secondary flex-1"
              >
                {t('common.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Detector

