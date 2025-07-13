import axios from 'axios'

const api = axios.create({
    baseURL: "https://spbebackend-production.up.railway.app/api/auth",
    headers: {
        'Content-Type': 'application/json',
      },
})

export default api