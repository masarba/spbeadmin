<template>
  <div class="auditee-dashboard">
    <div class="header">
      <h1>Dashboard Auditee</h1>
      <p>Selamat datang di panel auditee SPBE-SCAN</p>
    </div>
    
    <div class="dashboard-content">
      <div class="card">
        <h2>Permintaan Audit</h2>
        <p>Lihat status permintaan audit Anda</p>
        <button class="btn btn-primary">Lihat Detail</button>
      </div>
      
      <div class="card">
        <h2>Dokumen</h2>
        <p>Kelola dokumen-dokumen Anda</p>
        <button class="btn btn-primary">Kelola Dokumen</button>
      </div>
      
      <div class="card">
        <h2>Profil</h2>
        <p>Update informasi profil Anda</p>
        <button class="btn btn-primary">Edit Profil</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuditeeDashboard',
  data() {
    return {
      user: null
    }
  },
  mounted() {
    // Ambil data user dari localStorage
    const userStr = localStorage.getItem('user')
    if (userStr) {
      this.user = JSON.parse(userStr)
    }
  }
}
</script>

<style scoped>
.auditee-dashboard {
  padding: 2rem;
}

.header {
  margin-bottom: 2rem;
}

.header h1 {
  color: #2c3e50;
  font-weight: 600;
}

.dashboard-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.card h2 {
  font-size: 1.25rem;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.btn {
  margin-top: 1rem;
}
</style> 