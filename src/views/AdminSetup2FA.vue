<template>
  <div class="setup-container">
    <div class="header-area"></div>
    <div class="content-area">
      <div class="setup-card">
        <h2 class="card-title">Setup Two-Factor Authentication</h2>
        
        <p class="card-subtitle">
          Scan the QR code below with your authenticator app:
        </p>

        <div class="qr-container">
          <canvas ref="qrCanvas" width="200" height="200"></canvas>
        </div>

        <div class="input-container">
          <input
            v-model="verificationCode"
            @input="onCodeInput"
            type="text"
            class="code-input"
            placeholder="Enter verification code"
            maxlength="6"
          />
        </div>

        <button 
          @click="verify2FA" 
          class="verify-button"
          :disabled="isLoading || !verificationCode || verificationCode.length !== 6"
        >
          <span v-if="isLoading">Loading...</span>
          <span v-else>Verify 2FA</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import QRious from 'qrious';
import AdminService from '@/http/services/AdminService';

const router = useRouter();
const $q = useQuasar();

const verificationCode = ref('');
const qrCanvas = ref(null);
const secret = ref('');
const isLoading = ref(false);
const userEmail = ref(''); // Add variable to store user email
const setupCompleted = ref(false); // Track if setup has been completed

// Handler for navigation attempts
const handleBeforeUnload = (event) => {
  if (!setupCompleted.value && localStorage.getItem('2fa_verified') !== 'true') {
    // Cancel the event and show a confirmation dialog
    event.preventDefault();
    event.returnValue = 'You need to complete 2FA setup before leaving this page.';
    return 'You need to complete 2FA setup before leaving this page.';
  }
};

onMounted(async () => {
  // Add event listener for attempted browser navigation
  window.addEventListener('beforeunload', handleBeforeUnload);
  
  try {
    // Check if user is already logged in and has completed 2FA
    const token = localStorage.getItem('token');
    const twoFAVerified = localStorage.getItem('2fa_verified');
    
    // Get user email from localStorage
    userEmail.value = localStorage.getItem('user_email') || localStorage.getItem('temp_email') || '';
    
    // If no token, redirect to login
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    // If 2FA is already verified, go to dashboard
    if (twoFAVerified === 'true') {
      setupCompleted.value = true; // Mark as completed if already verified
      router.push('/admin/dashboard');
      return;
    }
    
    // If no email found, try to get it from user data in localStorage
    if (!userEmail.value) {
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          const user = JSON.parse(userData);
          if (user.email) {
            userEmail.value = user.email;
          }
        } catch (e) {
          console.error('Failed to parse user data:', e);
        }
      }
    }
    
    // Otherwise, get 2FA setup info
    const response = await AdminService.setup2FA();
    
    if (response && response.secret) {
      secret.value = response.secret;
      
      // Generate QR code
      setTimeout(() => {
        if (qrCanvas.value && response.qr_code_url) {
          try {
            new QRious({
              element: qrCanvas.value,
              value: response.qr_code_url,
              size: 200,
              background: 'white',
              foreground: 'black',
              level: 'M'
            });
            console.log('QR code generated successfully');
          } catch (error) {
            console.error("Error generating QR code:", error);
            $q.notify({
              message: "Failed to generate QR code. Please refresh the page.",
              type: "negative",
              position: "top-right",
            });
          }
        }
      }, 500); // Small delay to ensure canvas is mounted
    }
  } catch (error) {
    console.error("Error setting up 2FA:", error);
    $q.notify({
      message: "Failed to setup 2FA. Please try again.",
      type: "negative",
      position: "top-right",
    });
    
    // Generate test QR code for development
    secret.value = 'JBSWY3DPEHPK3PXP';
    setTimeout(() => {
      if (qrCanvas.value) {
        try {
          new QRious({
            element: qrCanvas.value,
            value: 'otpauth://totp/SISAKAMBE:admin@test.com?secret=JBSWY3DPEHPK3PXP&issuer=SISAKAMBE',
            size: 200,
            background: 'white',
            foreground: 'black',
            level: 'M'
          });
        } catch (error) {
          console.error("Error generating test QR code:", error);
        }
      }
    }, 500);
  }
});

// Input handler to clean up the verification code (only numbers)
const onCodeInput = () => {
  // Filter non-numeric characters
  verificationCode.value = verificationCode.value.replace(/[^0-9]/g, '');
};

// Remove event listener on component unmount
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', handleBeforeUnload);
});

const verify2FA = async () => {
  try {
    // Basic input validation
    if (!verificationCode.value || verificationCode.value.length !== 6) {
      $q.notify({
        message: "Please enter a valid 6-digit verification code.",
        type: "negative",
        position: "top-right",
      });
      return;
    }

    // Check if the secret is available
    if (!secret.value) {
      $q.notify({
        message: "2FA setup information is missing. Please refresh the page.",
        type: "negative",
        position: "top-right",
      });
      return;
    }
    
    // Set loading state
    isLoading.value = true;
    
    // Check if email is available
    if (!userEmail.value) {
      $q.notify({
        message: "User email is missing. Please try logging in again.",
        type: "negative",
        position: "top-right",
      });
      isLoading.value = false;
      return;
    }

    // Make API call to verify and activate 2FA
    await AdminService.activate2FA({
      otp: verificationCode.value,
      google2fa_secret: secret.value,
      email: userEmail.value
    });

    // Set flag in localStorage indicating 2FA is set up
    localStorage.setItem('2fa_verified', 'true');
    
    // Mark setup as completed to allow navigation
    setupCompleted.value = true;

    $q.notify({
      message: "Two-factor authentication setup successfully!",
      type: "positive",
      position: "top-right",
    });
    
    // Redirect to dashboard after successful setup
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 1000);
    
  } catch (error) {
    console.error("Error verifying 2FA:", error);
    const errorMessage = error.response?.data?.message || "Failed to verify 2FA.";
    $q.notify({
      message: errorMessage,
      type: "negative",
      position: "top-right",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.setup-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
}

.header-area {
  height: 250px;
  background-color: #2ecc71;
  width: 100%;
}

.content-area {
  flex: 1;
  margin-top: -150px;
  display: flex;
  justify-content: center;
}

.setup-card {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-title {
  font-size: 22px;
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
}

.card-subtitle {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
}

.qr-container {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  padding: 10px;
}

.qr-container canvas {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
}

.input-container {
  margin: 20px 0;
}

.code-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

.verify-button {
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 0;
  width: 100%;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.verify-button:hover {
  background-color: #218838;
}

.verify-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}
</style>
