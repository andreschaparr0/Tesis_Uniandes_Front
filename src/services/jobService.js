import api from '../config/api'

export const jobService = {
  async createJob(description) {
    const formData = new FormData()
    formData.append('description', description)
    
    const response = await api.post('/jobs', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  async getAllJobs(skip = 0, limit = 100) {
    const response = await api.get('/jobs', {
      params: { skip, limit }
    })
    return response.data
  },

  async getJobById(id) {
    const response = await api.get(`/jobs/${id}`)
    return response.data
  },

  async searchJobs(title) {
    const response = await api.get(`/jobs/search/${title}`)
    return response.data
  },

  async deleteJob(id) {
    const response = await api.delete(`/jobs/${id}`)
    return response.data
  },

  async getJobAnalyses(jobId) {
    const response = await api.get(`/jobs/${jobId}/analyses`)
    return response.data
  },

  async getTopCandidates(jobId, limit = 10) {
    const response = await api.get(`/jobs/${jobId}/top-candidatos`, {
      params: { limit }
    })
    return response.data
  }
}

