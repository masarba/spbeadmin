<template>
  <div class="login-container">
    <div class="login-card">
      <div class="text-center mb-4">
        <img src="@/assets/images/logopoltek.png" alt="Logo Politeknik" class="logo-img mb-3">
        <h2 class="mb-1">SPBE-SCAN</h2>
        <p class="text-muted">Sistem Audit Keamanan SPBE</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-envelope"></i>
            </span>
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="form.email"
              required
              placeholder="Masukkan email"
            >
          </div>
        </div>

        <div class="mb-4">
          <label for="password" class="form-label">Password</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="fas fa-lock"></i>
            </span>
            <input
              :type="showPassword ? 'text' : 'password'"
              class="form-control"
              id="password"
              v-model="form.password"
              required
              placeholder="Masukkan password"
            >
            <button 
              type="button" 
              class="btn btn-outline-secondary" 
              @click="togglePassword"
            >
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
        </div>

        <button 
          type="submit" 
          class="btn btn-primary w-100" 
          :disabled="loading"
        >
          <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
          {{ loading ? 'Memproses...' : 'Login' }}
        </button>
        
        <div class="text-center mt-3">
          <small class="text-muted">
            <i class="fas fa-shield-alt me-1"></i>
            Akun admin dilindungi dengan Two-Factor Authentication
          </small>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import AdminService from '@/http/services/AdminService'

export default {
  name: 'AdminLogin',
  setup() {
    const router = useRouter()
    const $q = useQuasar()
    const loading = ref(false)
    const showPassword = ref(false)

    const form = ref({
      email: '',
      password: ''
    })

    const togglePassword = () => {
      showPassword.value = !showPassword.value
    }

    const validateForm = () => {
      if (!form.value.email || !form.value.password) {
        $q.notify({
          type: 'warning',
          message: 'Email dan password harus diisi',
          position: 'top-right',
          timeout: 2000
        })
        return false
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.value.email)) {
        $q.notify({
          type: 'warning',
          message: 'Format email tidak valid',
          position: 'top-right',
          timeout: 2000
        })
        return false
      }
      
      return true
    }

    const handleLogin = async () => {
      if (!validateForm()) {
        return
      }
      
      try {
        loading.value = true
        console.log('Attempting admin login with:', { email: form.value.email })
        
        // Clear any existing temporary data and 2FA verification flag
        localStorage.removeItem('temp_google2fa_secret')
        localStorage.removeItem('temp_email')
        localStorage.removeItem('user_email')
        localStorage.removeItem('2fa_verified')
        
        const response = await AdminService.login(form.value)
        console.log('Admin login response:', response)
        
        if (!response.user || response.user.role !== 'admin') {
          throw new Error('Akses ditolak. Hanya admin yang dapat mengakses halaman ini.')
        }

        // Save token and user data
        if (response.authorization?.token) {
          localStorage.setItem('token', response.authorization.token)
          localStorage.setItem('user', JSON.stringify(response.user))
          
          // Set authorization header for subsequent requests
          AdminService.setAuthHeader(response.authorization.token)
          
          // Check if 2FA verification is required
          if (response.requires_2fa) {
            console.log('Admin requires 2FA verification')
            
            // Save data needed for 2FA verification
            localStorage.setItem('temp_google2fa_secret', response.google2fa_secret)
            localStorage.setItem('temp_email', form.value.email)
            localStorage.setItem('user_email', form.value.email)
            
            $q.notify({
              type: 'info',
              message: 'Silakan masukkan kode 2FA untuk melanjutkan',
              position: 'top-right',
              timeout: 3000
            })
            
            // Redirect to 2FA verification page
            await router.push('/admin/verify-2fa')
            return
          }
          
          // Check if 2FA setup is required
          if (response.requires_setup_2fa) {
            console.log('Admin needs to setup 2FA')
            
            $q.notify({
              type: 'warning',
              message: 'Anda perlu mengatur 2FA untuk keamanan akun',
              position: 'top-right',
              timeout: 3000
            })
            
            // Redirect to 2FA setup page
            await router.push('/admin/setup-2fa')
            return
          }
          
          // If no 2FA required, go directly to dashboard
          console.log('Admin login successful, redirecting to dashboard')
          
          $q.notify({
            type: 'positive',
            message: 'Login berhasil',
            position: 'top-right',
            timeout: 2000
          })
          
          await router.push('/admin/dashboard')
        } else {
          throw new Error('Token tidak ditemukan dalam response')
        }

      } catch (error) {
        console.error('Login error:', error)
        
        // Handle different error types
        let errorMessage = 'Gagal login'
        
        if (error.response?.status === 401) {
          errorMessage = 'Email atau password salah'
        } else if (error.response?.status === 403) {
          errorMessage = 'Akses ditolak. Akun Anda tidak memiliki izin admin'
        } else if (error.response?.status === 429) {
          errorMessage = 'Terlalu banyak percobaan login. Silakan coba lagi nanti'
        } else if (error.response?.status === 500) {
          errorMessage = 'Terjadi kesalahan server. Silakan coba lagi'
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message
        } else if (error.message) {
          errorMessage = error.message
        }
        
        // Clear all tokens and user data on error
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        localStorage.removeItem('temp_google2fa_secret')
        localStorage.removeItem('temp_email')
        localStorage.removeItem('user_email')
        localStorage.removeItem('refresh_token')
        localStorage.removeItem('2fa_verified')
        
        // Clear authorization header
        AdminService.setAuthHeader(null)
        
        $q.notify({
          type: 'negative',
          message: errorMessage,
          position: 'top-right',
          timeout: 3000
        })
      } finally {
        loading.value = false
      }
    }

    // Clean up any existing session data when component mounts
    onMounted(() => {
      // Clear any existing tokens and temporary data
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('temp_google2fa_secret')
      localStorage.removeItem('temp_email')
      localStorage.removeItem('user_email')
      // Also clear 2FA verification flag
      localStorage.removeItem('2fa_verified')
      localStorage.removeItem('redirect_to')
      localStorage.removeItem('refresh_token')
      
      // Clear authorization header
      AdminService.setAuthHeader(null)
      
      console.log('Admin login page loaded, session cleared')
    })

    return {
      form,
      loading,
      showPassword,
      handleLogin,
      togglePassword,
      validateForm
    }
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 1rem;
}

.login-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, .15);
  width: 100%;
  max-width: 400px;
}

.logo-img {
  width: 100px;
  height: auto;
  margin: 0 auto;
}

.login-form {
  margin-top: 2rem;
}

.form-label {
  font-weight: 500;
  color: #2c3e50;
}

.input-group-text {
  background: #f8f9fa;
  border-right: none;
}

.input-group .form-control {
  border-left: none;
}

.input-group .form-control:focus {
  border-color: #dee2e6;
  box-shadow: none;
}

.input-group .btn-outline-secondary {
  border-color: #dee2e6;
}

.input-group .btn-outline-secondary:hover {
  background-color: #f8f9fa;
}

.btn-primary {
  background: #5e72e4;
  border-color: #5e72e4;
  font-weight: 500;
  padding: 0.75rem;
}

.btn-primary:hover {
  background: #324cdd;
  border-color: #324cdd;
}

.btn-primary:disabled {
  background: #5e72e4;
  border-color: #5e72e4;
  opacity: 0.65;
}
</style>
