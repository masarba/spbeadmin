<template>
  <div class="qr-test-container">
    <div class="qr-test-card">
      <h2>QR Code Test</h2>
      <div class="qr-container">
        <canvas ref="qrCanvas" class="qr-code-canvas" width="200" height="200"></canvas>
      </div>
      <button @click="generateTestQR" class="btn btn-primary">Generate Test QR</button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import QRious from 'qrious'

export default {
  name: 'QRTest',
  setup() {
    const qrCanvas = ref(null)
    
    const generateTestQR = () => {
      console.log('Generating test QR...')
      console.log('Canvas element:', qrCanvas.value)
      
      if (qrCanvas.value) {
        try {
          new QRious({
            element: qrCanvas.value,
            value: 'https://github.com/neocotic/qrious',
            size: 200,
            background: 'white',
            foreground: 'black',
            level: 'M'
          })
          console.log('Test QR generated successfully')
        } catch (error) {
          console.error('Error generating test QR:', error)
        }
      } else {
        console.error('Canvas element not found')
      }
    }
    
    onMounted(() => {
      setTimeout(generateTestQR, 500)
    })
    
    return {
      qrCanvas,
      generateTestQR
    }
  }
}
</script>

<style scoped>
.qr-test-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  padding: 1rem;
}

.qr-test-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, .15);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.qr-container {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}

.qr-code-canvas {
  border: 1px solid #dee2e6;
  border-radius: 0.5rem;
  background-color: white;
  padding: 0.5rem;
  display: block;
  margin: 0 auto;
}

.btn {
  background: #5e72e4;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  margin-top: 1rem;
}

.btn:hover {
  background: #324cdd;
}
</style>
