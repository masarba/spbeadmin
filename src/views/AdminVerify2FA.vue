<template>
  <div class="verify-2fa-container">
    <div class="verify-header">
      <img 
        src="@/assets/logopoltek.png" 
        alt="Logo Politeknik" 
        class="logo"
      />
      <h2>SISAKAMBE ADMIN</h2>
      <p>Enter your OTP code from Google Authenticator</p>
      <div class="requirement-note">
        <i class="fas fa-exclamation-circle"></i> 
        OTP verification is required before proceeding to the dashboard
      </div>
    </div>

    <div class="verify-content">
      <div v-if="error" class="error-message">
        {{ error }}
      </div>

      <div class="otp-input-container">
        <input
          v-model="otp"
          type="text"
          class="otp-input"
          placeholder="Enter 6-digit code"
          maxlength="6"
          autocomplete="off"
          autofocus
        />
      </div>

      <div class="button-container">
        <button
          class="verify-button"
          @click="verifyCode"
          :disabled="loading || !otp || otp.length < 6"
        >
          <span v-if="loading" class="loading-spinner"></span>
          <span v-else>Verify</span>
        </button>

        <button
          class="back-button"
          @click="backToLogin"
          :disabled="loading"
        >
          Back to login
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, onBeforeRouteLeave } from 'vue-router'
import { useQuasar } from 'quasar'
import AdminService from '@/http/services/AdminService'

export default {
  name: 'AdminVerify2FA',
  setup() {
    const router = useRouter()
    const $q = useQuasar()
    
    const loading = ref(false)
    const error = ref(null)
    const otp = ref('')
    const userEmail = ref('')
    const verificationCompleted = ref(false)
    
    // Handler for browser navigation attempts
    const handleBeforeUnload = (event) => {
      if (!verificationCompleted.value && localStorage.getItem('2fa_verified') !== 'true') {
        // Cancel the event and show a confirmation dialog
        event.preventDefault();
        event.returnValue = 'You need to complete 2FA verification before leaving this page.';
        return 'You need to complete 2FA verification before leaving this page.';
      }
    };
    
    // Vue Router navigation guard for this component
    onBeforeRouteLeave((to, from, next) => {
      // If verification is not completed and not going to an allowed page
      if (!verificationCompleted.value && 
          localStorage.getItem('2fa_verified') !== 'true' &&
          to.path !== '/admin/login' &&
          !to.meta.verify2FA) {
        // Show notification
        $q.notify({
          message: "You must verify your 2FA code before accessing other pages.",
          type: "warning",
          position: "top-right",
          timeout: 3000
        });
        // Prevent navigation
        return next(false);
      }
      // Allow navigation otherwise
      return next();
    });
    
    onMounted(() => {
      // Add event listener for browser navigation attempts
      window.addEventListener('beforeunload', handleBeforeUnload);
      
      // Get email from localStorage that was saved during login
      userEmail.value = localStorage.getItem('temp_email') || localStorage.getItem('user_email') || ''
      
      // Check if required data is available
      const secret = localStorage.getItem('temp_google2fa_secret')
      
      if (!secret || !userEmail.value) {
        console.error('Missing required 2FA data')
        error.value = 'Data verifikasi 2FA tidak lengkap. Silakan login kembali.'
      }
    })
    
    // Remove event listener when component unmounts
    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    });
    
    // Function to verify 2FA code
    const verifyCode = async () => {
      if (!otp.value || otp.value.length !== 6) {
        $q.notify({
          message: "Please enter a valid 6-digit code",
          type: "warning",
          position: "top-right"
        })
        return
      }

      if (!userEmail.value) {
        $q.notify({
          message: "User email not found. Please try logging in again.",
          type: "negative",
          position: "top-right"
        })
        return
      }

      try {
        loading.value = true
        error.value = null
        
        // Get data from localStorage
        const secret = localStorage.getItem('temp_google2fa_secret')
        
        if (!secret) {
          throw new Error('Data verifikasi tidak lengkap. Silakan login kembali.')
        }
        
        console.log('Verifying 2FA code')
        const response = await AdminService.verify2FA({
          otp: otp.value,
          email: userEmail.value,
          google2fa_secret: secret
        })
        
        console.log('2FA verification successful')
        
        // Update token with new one from verification response
        if (response.access_token) {
          localStorage.setItem('token', response.access_token)
          if (response.refresh_token) {
            localStorage.setItem('refresh_token', response.refresh_token)
          }
          // Set authorization header for subsequent requests
          AdminService.setAuthHeader(response.access_token)
        }
        
        // Set flag in localStorage indicating 2FA is verified - critical for admin route access
        localStorage.setItem('2fa_verified', 'true')
        console.log('2FA verification successful - flag set in localStorage')
        
        // Mark verification as completed to allow navigation
        verificationCompleted.value = true
        
        // Clean up temporary data
        localStorage.removeItem('temp_google2fa_secret')
        localStorage.removeItem('temp_email')
        localStorage.removeItem('user_email')
        localStorage.removeItem('redirect_to')
        
        $q.notify({
          message: "Verification successful!",
          type: "positive",
          position: "top-right"
        })
        
        verificationCompleted.value = true
        
        // Redirect to dashboard
        await router.push('/admin/dashboard')
      } catch (err) {
        console.error('2FA verification error:', err)
        error.value = err.response?.data?.error || err.message || 'Invalid verification code'
        
        $q.notify({
          message: error.value,
          type: "negative",
          position: "top-right"
        })
      } finally {
        loading.value = false
      }
    }
    
    // Function to go back to login
    const backToLogin = async () => {
      // Clean up all authentication and 2FA data
      localStorage.removeItem('temp_google2fa_secret')
      localStorage.removeItem('temp_email')
      localStorage.removeItem('user_email')
      localStorage.removeItem('redirect_to')
      localStorage.removeItem('token')
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('user')
      localStorage.removeItem('2fa_verified')
      
      // Redirect to login page
      await router.push('/admin/login')
    }
    
    return {
      loading,
      error,
      otp,
      userEmail,
      verificationCompleted,
      verifyCode,
      backToLogin
    }
  }
}
</script>

<style scoped>
.verify-2fa-container {
  max-width: 400px;
  margin: 80px auto;
  text-align: center;
  padding: 30px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.verify-header {
  margin-bottom: 30px;
}

.logo {
  max-height: 80px;
  margin-bottom: 20px;
}

h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
  color: #333;
}

.verify-header p {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
}

.requirement-note {
  background-color: #fff3cd;
  color: #856404;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  margin-top: 15px;
  display: inline-block;
}

.requirement-note i {
  margin-right: 5px;
}

.verify-content {
  text-align: center;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 20px;
  font-size: 14px;
}

.otp-input-container {
  margin-bottom: 25px;
}

.otp-input {
  width: 100%;
  padding: 15px;
  font-size: 20px;
  letter-spacing: 6px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: border-color 0.3s;
}

.otp-input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.button-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.verify-button {
  width: 100%;
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.verify-button:hover:not([disabled]) {
  background-color: #45a049;
}

.verify-button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.back-button {
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  padding: 8px;
  text-decoration: underline;
  transition: color 0.3s;
}

.back-button:hover:not([disabled]) {
  color: #333;
}

.back-button:disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>
