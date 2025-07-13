<template>
  <div class="dashboard">
    <!-- Welcome Section -->
    <div class="welcome-section mb-4">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <img src="@/assets/images/logopoltek.png" alt="Logo Politeknik" class="logo me-4">
          <div>
            <h1 class="dashboard-title mb-0">SPBE-SCAN</h1>
            <p class="text-muted mb-0">Sistem Audit Keamanan SPBE</p>
          </div>
        </div>
        <div class="text-end">
          <p class="mb-0 text-muted">{{ currentDate }}</p>
          <p class="mb-0 mt-1">Selamat datang, <strong>{{ currentUser.username }}</strong></p>
        </div>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="row g-4 mb-4">
      <div class="col-12 col-md-6 col-lg-3">
        <div class="stat-card">
          <div class="stat-card-body">
            <div class="stat-card-icon bg-primary-subtle">
              <i class="fas fa-users"></i>
            </div>
            <div class="stat-card-info">
              <h3 class="stat-card-number">{{ stats.total_users || 0 }}</h3>
              <p class="stat-card-label">Total Pengguna</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="stat-card">
          <div class="stat-card-body">
            <div class="stat-card-icon bg-success-subtle">
              <i class="fas fa-user-check"></i>
            </div>
            <div class="stat-card-info">
              <h3 class="stat-card-number">{{ stats.total_audits || 0 }}</h3>
              <p class="stat-card-label">Total Audit</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="stat-card">
          <div class="stat-card-body">
            <div class="stat-card-icon bg-info-subtle">
              <i class="fas fa-clock"></i>
            </div>
            <div class="stat-card-info">
              <h3 class="stat-card-number">{{ stats.pending_audits || 0 }}</h3>
              <p class="stat-card-label">Audit Pending</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 col-lg-3">
        <div class="stat-card">
          <div class="stat-card-body">
            <div class="stat-card-icon bg-warning-subtle">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-card-info">
              <h3 class="stat-card-number">{{ stats.completed_audits || 0 }}</h3>
              <p class="stat-card-label">Audit Selesai</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="row g-4">
      <!-- Recent Activities -->
      <div class="col-12 col-lg-8">
        <div class="content-card h-100">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="content-title">Aktivitas Terbaru</h2>
            <button class="btn btn-outline-primary btn-sm" @click="refreshActivities">
              <i class="fas fa-sync-alt me-1"></i> Refresh
            </button>
          </div>
          
          <div class="activities-list" v-if="!loading && activities.length > 0">
            <div class="activity-item" v-for="activity in activities" :key="activity.id">
              <div class="activity-icon" :class="getActivityIconClass(activity.type)">
                <i :class="getActivityIcon(activity.type)"></i>
              </div>
              <div class="activity-content">
                <p class="activity-text mb-1">{{ activity.description }}</p>
                <small class="activity-time text-muted">{{ formatDate(activity.created_at) }}</small>
              </div>
            </div>
          </div>

          <div class="text-center py-4" v-else-if="loading">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>

          <div class="text-center py-4" v-else>
            <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
            <p class="text-muted">Tidak ada aktivitas terbaru</p>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="col-12 col-lg-4">
        <div class="content-card h-100">
          <h2 class="content-title mb-4">Statistik Cepat</h2>
          
          <div class="quick-stats">
            <div class="quick-stat-item">
              <div class="quick-stat-icon bg-success-subtle">
                <i class="fas fa-check-circle"></i>
              </div>
              <div class="quick-stat-info">
                <h4>{{ stats.completed_audits || 0 }}</h4>
                <p>Audit Selesai</p>
              </div>
            </div>

            <div class="quick-stat-item">
              <div class="quick-stat-icon bg-warning-subtle">
                <i class="fas fa-clock"></i>
              </div>
              <div class="quick-stat-info">
                <h4>{{ stats.pending_audits || 0 }}</h4>
                <p>Audit Pending</p>
              </div>
            </div>

            <div class="quick-stat-item">
              <div class="quick-stat-icon bg-info-subtle">
                <i class="fas fa-users"></i>
              </div>
              <div class="quick-stat-info">
                <h4>{{ stats.total_users || 0 }}</h4>
                <p>Total Pengguna</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import AdminService from '@/http/services/AdminService'
import { useQuasar } from 'quasar'

export default {
  name: 'AdminDashboard',
  setup() {
    const $q = useQuasar()
    const loading = ref(false)
    const activities = ref([])
    const stats = ref({
      total_users: 0,
      total_audits: 0,
      pending_audits: 0,
      completed_audits: 0
    })
    
    const currentUser = computed(() => {
      return JSON.parse(localStorage.getItem('user') || '{}')
    })

    const currentDate = computed(() => {
      return new Date().toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    })

    const fetchDashboardData = async () => {
      try {
        loading.value = true
        const response = await AdminService.getDashboardData()
        if (response.status === 'success' && response.data) {
          stats.value = {
            total_users: response.data.total_users || 0,
            total_audits: response.data.total_audits || 0,
            pending_audits: response.data.pending_audits || 0,
            completed_audits: response.data.completed_audits || 0
          }
          activities.value = response.data.activities || []
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
        $q.notify({
          type: 'negative',
          message: 'Gagal memuat data dashboard',
          position: 'top-right'
        })
      } finally {
        loading.value = false
      }
    }

    const refreshActivities = async () => {
      try {
        const response = await AdminService.getDashboardData()
        activities.value = response.activities || []
        $q.notify({
          type: 'positive',
          message: 'Aktivitas berhasil diperbarui',
          position: 'top-right'
        })
      } catch (error) {
        console.error('Error refreshing activities:', error)
        $q.notify({
          type: 'negative',
          message: 'Gagal memperbarui aktivitas',
          position: 'top-right'
        })
      }
    }

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short'
      })
    }

    const getActivityIcon = (type) => {
      const icons = {
        login: 'fas fa-sign-in-alt',
        logout: 'fas fa-sign-out-alt',
        create: 'fas fa-plus-circle',
        update: 'fas fa-edit',
        delete: 'fas fa-trash-alt',
        audit: 'fas fa-clipboard-check'
      }
      return icons[type] || 'fas fa-info-circle'
    }

    const getActivityIconClass = (type) => {
      const classes = {
        login: 'bg-success-subtle',
        logout: 'bg-secondary-subtle',
        create: 'bg-primary-subtle',
        update: 'bg-info-subtle',
        delete: 'bg-danger-subtle',
        audit: 'bg-warning-subtle'
      }
      return classes[type] || 'bg-secondary-subtle'
    }

    onMounted(() => {
      fetchDashboardData()
    })

    return {
      loading,
      activities,
      stats,
      currentUser,
      currentDate,
      refreshActivities,
      formatDate,
      getActivityIcon,
      getActivityIconClass
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 2rem;
  background: #f8f9fa;
  min-height: 100vh;
}

.dashboard-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2c3e50;
}

.welcome-section {
  background: #fff;
  padding: 1.5rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.date-time {
  font-size: 0.9rem;
  color: #6c757d;
}

.stat-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-card-body {
  padding: 1.5rem;
  display: flex;
  align-items: center;
}

.stat-card-icon {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.stat-card-icon i {
  font-size: 1.5rem;
  color: #2c3e50;
}

.stat-card-info {
  flex: 1;
}

.stat-card-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.stat-card-label {
  color: #6c757d;
  margin-bottom: 0;
  font-size: 0.875rem;
}

.content-card {
  background: #fff;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.content-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
}

.activities-list {
  max-height: 500px;
  overflow-y: auto;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem 0;
  border-bottom: 1px solid #e9ecef;
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.activity-icon i {
  font-size: 1rem;
  color: #2c3e50;
}

.activity-content {
  flex: 1;
}

.activity-text {
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.activity-time {
  font-size: 0.75rem;
}

.quick-stats {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quick-stat-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 0.75rem;
}

.quick-stat-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
}

.quick-stat-icon i {
  font-size: 1.25rem;
  color: #2c3e50;
}

.quick-stat-info h4 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.quick-stat-info p {
  color: #6c757d;
  margin-bottom: 0;
  font-size: 0.875rem;
}

/* Utility classes for background colors */
.bg-primary-subtle { background-color: rgba(13, 110, 253, 0.1); }
.bg-success-subtle { background-color: rgba(25, 135, 84, 0.1); }
.bg-info-subtle { background-color: rgba(13, 202, 240, 0.1); }
.bg-warning-subtle { background-color: rgba(255, 193, 7, 0.1); }
.bg-danger-subtle { background-color: rgba(220, 53, 69, 0.1); }
.bg-secondary-subtle { background-color: rgba(108, 117, 125, 0.1); }

.logo {
  height: 60px;
  width: auto;
  object-fit: contain;
}
</style> 