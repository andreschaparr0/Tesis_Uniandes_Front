import api from '../config/api'

export const cvService = {
  async uploadCV(file) {
    const formData = new FormData()
    formData.append('cv_file', file)
    
    const response = await api.post('/cvs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async getAllCVs(skip = 0, limit = 100) {
    const response = await api.get('/cvs', {
      params: { skip, limit }
    })
    return response.data
  },

  async getCVById(id) {
    const response = await api.get(`/cvs/${id}`)
    return response.data
  },

  async searchCVs(name) {
    const response = await api.get(`/cvs/search/${name}`)
    return response.data
  },

  async deleteCV(id) {
    const response = await api.delete(`/cvs/${id}`)
    return response.data
  },

  async getCVAnalyses(cvId) {
    const response = await api.get(`/cvs/${cvId}/analyses`)
    return response.data
  }
}

