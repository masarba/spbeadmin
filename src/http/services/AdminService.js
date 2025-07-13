import axios from 'axios'

const BASE_URL = 'https://spbebackend-production.up.railway.app/api/admin'

// Konfigurasi interceptor untuk menambahkan token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      // Pastikan format Bearer token sesuai
      config.headers.Authorization = `Bearer ${token.replace('Bearer ', '')}`
    }
    config.headers['Accept'] = 'application/json'
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor untuk menangani response error termasuk token expired
axios.interceptors.response.use(
  (response) => {
    return response
  }, 
  (error) => {
    // Cek jika error 401 (Unauthorized) atau pesan token expired/invalid
    if (
      error.response && 
      (error.response.status === 401 || 
       error.response?.data?.message?.toLowerCase().includes('token') ||
       error.response?.data?.message?.toLowerCase().includes('unauthenticated'))
    ) {
      console.log('Token expired atau tidak valid. Melakukan logout otomatis...')
      
      // Hapus token dan data user dari local storage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('2fa_verified')
      localStorage.removeItem('temp_google2fa_secret')
      localStorage.removeItem('temp_email')
      localStorage.removeItem('user_email')
      
      // Hapus header Authorization
      delete axios.defaults.headers.common['Authorization']
      
      // Redirect ke halaman login
      window.location.href = '/admin/login'
    }
    
    return Promise.reject(error)
  }
)

const AdminService = {
  // Auth
  setAuthHeader(token) {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token.replace('Bearer ', '')}`
    } else {
      delete axios.defaults.headers.common['Authorization']
    }
  },

  async login(credentials) {
    try {
      const response = await axios.post(`${BASE_URL}/login`, credentials)
      console.log('Login response:', response.data) // Debug response
      return response.data
    } catch (error) {
      console.error('Login error details:', error.response?.data) // Debug error
      throw error
    }
  },

  async logout() {
    const response = await axios.post(`${BASE_URL}/logout`)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('2fa_verified')
    localStorage.removeItem('temp_google2fa_secret')
    localStorage.removeItem('temp_email')
    localStorage.removeItem('user_email')
    this.setAuthHeader(null)
    return response.data
  },

  // Dashboard
  async getDashboardData() {
    const response = await axios.get(`${BASE_URL}/dashboard`)
    return response.data
  },

  async getDashboardStatistics() {
    const response = await axios.get(`${BASE_URL}/dashboard/statistics`)
    return response.data
  },

  async getActiveUsers() {
    const response = await axios.get(`${BASE_URL}/dashboard/active-users`)
    return response.data
  },

  // User Management
  async getAllUsers() {
    const response = await axios.get(`${BASE_URL}/users`)
    return response.data
  },

  async getAuditors() {
    const response = await axios.get(`${BASE_URL}/users/auditors`)
    return response.data
  },

  async getAuditees() {
    const response = await axios.get(`${BASE_URL}/users/auditees`)
    return response.data
  },

  async getUserById(id) {
    const response = await axios.get(`${BASE_URL}/users/${id}`)
    return response.data
  },

  async createUser(userData) {
    const response = await axios.post(`${BASE_URL}/users`, userData)
    return response.data
  },

  async updateUser(id, userData) {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData)
    return response.data
  },

  async deleteUser(id) {
    const response = await axios.delete(`${BASE_URL}/users/${id}`)
    return response.data
  },

  // Audit Management
  async getAllAudits() {
    const response = await axios.get(`${BASE_URL}/audits`)
    return response.data
  },

  async getPendingAudits() {
    const response = await axios.get(`${BASE_URL}/audits/pending`)
    return response.data
  },

  async getCompletedAudits() {
    const response = await axios.get(`${BASE_URL}/audits/completed`)
    return response.data
  },

  async getAuditById(id) {
    const response = await axios.get(`${BASE_URL}/audits/${id}`)
    return response.data
  },

  async updateAudit(id, auditData) {
    const response = await axios.put(`${BASE_URL}/audits/${id}`, auditData)
    return response.data
  },

  async deleteAudit(id) {
    const response = await axios.delete(`${BASE_URL}/audits/${id}`)
    return response.data
  },

  async assignAuditor(auditId, auditorId) {
    const response = await axios.post(`${BASE_URL}/audits/${auditId}/assign`, {
      auditor_id: auditorId
    })
    return response.data
  },

  async getAuditStatistics() {
    const response = await axios.get(`${BASE_URL}/audits/statistics`)
    return response.data
  },

  // Settings Management
  async getSettings() {
    const response = await axios.get(`${BASE_URL}/settings`)
    return response.data
  },

  async updateSettings(settings) {
    const response = await axios.put(`${BASE_URL}/settings`, settings)
    return response.data
  },

  // Two-Factor Authentication
  async setup2FA() {
    try {
      const response = await axios.post(`https://spbebackend-production.up.railway.app/api/auth/setup-2fa`, {})
      return response.data
    } catch (error) {
      console.error('Setup 2FA error:', error.response?.data)
      throw error
    }
  },

  async activate2FA(data) {
    try {
      const response = await axios.post(`https://spbebackend-production.up.railway.app/api/auth/verify-2fa`, {
        otp: data.otp,
        google2fa_secret: data.google2fa_secret || data.secret,
        email: data.email
      })
      return response.data
    } catch (error) {
      console.error('Activate 2FA error:', error.response?.data)
      throw error
    }
  },

  async verify2FA(data) {
    try {
      const response = await axios.post(`https://spbebackend-production.up.railway.app/api/auth/verify-2fa`, data)
      return response.data
    } catch (error) {
      console.error('Verify 2FA error:', error.response?.data)
      throw error
    }
  }
}

export default AdminService