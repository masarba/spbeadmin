import axios from 'axios'

const API_URL = '/api/admin/users'

// Interceptor sudah ditangani di AdminService.js

export const UserService = {
  async getAllUsers() {
    const response = await axios.get(API_URL)
    return response.data
  },

  async getUserById(id) {
    const response = await axios.get(`${API_URL}/${id}`)
    return response.data
  },

  async createUser(userData) {
    const response = await axios.post(API_URL, userData)
    return response.data
  },

  async updateUser(id, userData) {
    const response = await axios.put(`${API_URL}/${id}`, userData)
    return response.data
  },

  async deleteUser(id) {
    const response = await axios.delete(`${API_URL}/${id}`)
    return response.data
  }
} 