<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white">
    <div class="container-fluid">
      <span class="navbar-brand">SPBE-SCAN Admin</span>
      <div class="d-flex align-items-center">
        <span class="me-3">{{ userName }}</span>
        <button class="btn btn-outline-danger btn-sm" @click="handleLogout">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'Navbar',
  setup() {
    const router = useRouter()
    
    const userName = computed(() => {
      const user = JSON.parse(localStorage.getItem('user'))
      return user?.name || ''
    })

    const handleLogout = () => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      router.push('/')
    }

    return {
      userName,
      handleLogout
    }
  }
}
</script>

<style scoped>
.navbar {
  padding: 1rem;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, .1);
}
</style> 