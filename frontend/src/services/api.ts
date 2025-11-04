import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cropdoctor_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const detectionAPI = {
  detectCropType: (formData: FormData) =>
    api.post('/api/detect/crop-type', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  detectDisease: (formData: FormData, language?: string) =>
    api.post('/api/detect/disease', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { language },
    }),

  fullDetection: (formData: FormData, language?: string) =>
    api.post('/api/detect/full', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      params: { language },
    }),
}

export const recommendationsAPI = {
  getRecommendations: (cropType: string, disease: string, language?: string) =>
    api.get(`/api/recommendations/${cropType}/${disease}`, {
      params: { language },
    }),
}

export const historyAPI = {
  getHistory: (skip?: number, limit?: number) =>
    api.get('/api/history', { params: { skip, limit } }),
  
  getDetection: (id: number) =>
    api.get(`/api/history/${id}`),
  
  saveDetection: (detection: any) =>
    api.post('/api/history', detection),
  
  deleteDetection: (id: number) =>
    api.delete(`/api/history/${id}`),
}

export const languagesAPI = {
  getLanguages: () => api.get('/api/languages'),
}

export default api

