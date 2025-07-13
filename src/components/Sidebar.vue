<template>
  <div class="sidebar">
    <div class="sidebar-wrapper">
      <div class="logo">
        <img src="@/assets/images/logopoltek.png" alt="Logo Politeknik" class="logo-img mb-2">
        <h4 class="mb-0">SPBE-SCAN</h4>
        <small class="text-muted">Admin Panel</small>
      </div>
      <ul class="nav">
        <li class="nav-item">
          <router-link to="/admin/dashboard" class="nav-link" active-class="active">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/users" class="nav-link" active-class="active">
            <i class="fas fa-users"></i>
            <span>Manajemen Pengguna</span>
          </router-link>
        </li>
        <li class="nav-item mt-auto">
          <a href="#" class="nav-link text-danger" @click="handleLogout">
            <i class="fas fa-sign-out-alt"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Sidebar',
  setup() {
    const router = useRouter()

    const handleLogout = () => {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      router.push('/')
    }

    return {
      handleLogout
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 260px;
  background: #fff;
  box-shadow: 0 0 2rem 0 rgba(136, 152, 170, .15);
  min-height: 100vh;
  position: sticky;
  top: 0;
}

.sidebar-wrapper {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.logo {
  padding: 1rem;
  text-align: center;
  border-bottom: 1px solid #eee;
  margin-bottom: 1rem;
}

.logo-img {
  width: 80px;
  height: auto;
  margin: 0 auto;
}

.logo h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-top: 0.5rem;
}

.nav {
  margin: 0;
  padding: 0;
  list-style: none;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.nav-item {
  margin: 0.25rem 0;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  color: #525f7f;
  text-decoration: none;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.nav-link:hover, .nav-link.active {
  background: #f8f9fa;
  color: #5e72e4;
}

.nav-link i {
  width: 1.25rem;
  margin-right: 0.75rem;
  text-align: center;
}

.nav-link span {
  font-weight: 500;
}

.text-danger {
  color: #dc3545 !important;
}

.text-danger:hover {
  background: #fff5f5 !important;
  color: #dc3545 !important;
}
</style> 