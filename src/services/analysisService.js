import api from '../config/api'

export const analysisService = {
  async analyzeCV(cvId, jobId, weights = null) {
    const response = await api.post(`/analyze/${cvId}/${jobId}`, weights)
    return response.data
  },

  async getAllAnalyses(skip = 0, limit = 100) {
    const response = await api.get('/analyses', {
      params: { skip, limit }
    })
    return response.data
  },

  async getAnalysisById(id) {
    const response = await api.get(`/analyses/${id}`)
    return response.data
  },

  async getStatistics() {
    const response = await api.get('/stats')
    return response.data
  },

  async deleteAnalysis(id) {
    const response = await api.delete(`/analyses/${id}`)
    return response.data
  }
}

