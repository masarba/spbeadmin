<template>
  <div class="py-4 container-fluid">
    <!-- Header Section -->
    <div class="row mb-4">
      <div class="col-12">
        <div class="card modern-card">
          <div class="card-body p-4">
            <div class="row align-items-center">
              <div class="col-lg-8">
                <h1 class="display-4 mb-3 gradient-text">Selamat Datang di SPBE-SCAN Auditor</h1>
                <p class="lead text-muted">
                  Sistem Informasi Audit Keamanan Siber yang membantu dalam pelaksanaan audit keamanan teknologi informasi.
                </p>
              </div>
              <div class="col-lg-4 d-flex align-items-center justify-content-end">
                <img src="/images/logopoltek.png" alt="Logo PENS" class="logo-image me-4">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="row">
      <!-- Fungsi Auditor Section -->
      <div class="col-12 col-lg-6 mb-4">
        <div class="card modern-card h-100">
          <div class="card-header pb-0">
            <h3 class="mb-0 gradient-text">Fungsi Auditor</h3>
          </div>
          <div class="card-body">
            <div class="timeline timeline-one-side">
              <div class="timeline-block mb-3">
                <span class="timeline-step">
                  <i class="ni ni-check-bold text-success text-gradient"></i>
                </span>
                <div class="timeline-content">
                  <h6 class="text-dark text-sm font-weight-bold mb-0">Evaluasi Keamanan</h6>
                  <p class="text-secondary font-weight-normal text-xs mt-1 mb-0">
                    Melakukan evaluasi terhadap sistem keamanan teknologi informasi yang ada.
                  </p>
                </div>
              </div>
              <div class="timeline-block mb-3">
                <span class="timeline-step">
                  <i class="ni ni-ruler-pencil text-info text-gradient"></i>
                </span>
                <div class="timeline-content">
                  <h6 class="text-dark text-sm font-weight-bold mb-0">Identifikasi Kerentanan</h6>
                  <p class="text-secondary font-weight-normal text-xs mt-1 mb-0">
                    Mengidentifikasi potensi kerentanan dalam sistem dan infrastruktur TI.
                  </p>
                </div>
              </div>
              <div class="timeline-block mb-3">
                <span class="timeline-step">
                  <i class="ni ni-paper-diploma text-warning text-gradient"></i>
                </span>
                <div class="timeline-content">
                  <h6 class="text-dark text-sm font-weight-bold mb-0">Rekomendasi Perbaikan</h6>
                  <p class="text-secondary font-weight-normal text-xs mt-1 mb-0">
                    Memberikan rekomendasi untuk perbaikan dan peningkatan keamanan.
                  </p>
                </div>
              </div>
              <div class="timeline-block">
                <span class="timeline-step">
                  <i class="ni ni-notification-70 text-danger text-gradient"></i>
                </span>
                <div class="timeline-content">
                  <h6 class="text-dark text-sm font-weight-bold mb-0">Pemantauan Kepatuhan</h6>
                  <p class="text-secondary font-weight-normal text-xs mt-1 mb-0">
                    Memastikan kepatuhan terhadap standar keamanan yang berlaku.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tata Cara Pelaksanaan Section -->
      <div class="col-12 col-lg-6 mb-4">
        <div class="card h-100">
          <div class="card-header pb-0">
            <h3 class="mb-0">Tata Cara Pelaksanaan</h3>
          </div>
          <div class="card-body p-3">
            <div class="nav-wrapper position-relative end-0">
              <div class="p-3 bg-gradient-info border-radius-xl mb-3">
                <h6 class="text-white mb-1">1. Persiapan Audit</h6>
                <p class="text-white text-sm mb-0">
                  • Mengumpulkan informasi awal<br>
                  • Menentukan ruang lingkup audit<br>
                  • Menyiapkan checklist audit
                </p>
              </div>
              <div class="p-3 bg-gradient-success border-radius-xl mb-3">
                <h6 class="text-white mb-1">2. Pelaksanaan Audit</h6>
                <p class="text-white text-sm mb-0">
                  • Melakukan pengujian keamanan<br>
                  • Menganalisis hasil temuan<br>
                  • Dokumentasi bukti audit
                </p>
              </div>
              <div class="p-3 bg-gradient-warning border-radius-xl mb-3">
                <h6 class="text-white mb-1">3. Pelaporan</h6>
                <p class="text-white text-sm mb-0">
                  • Menyusun laporan audit<br>
                  • Presentasi temuan<br>
                  • Memberikan rekomendasi
                </p>
              </div>
              <div class="p-3 bg-gradient-danger border-radius-xl">
                <h6 class="text-white mb-1">4. Tindak Lanjut</h6>
                <p class="text-white text-sm mb-0">
                  • Monitoring implementasi<br>
                  • Evaluasi perbaikan<br>
                  • Peninjauan ulang
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
});
</script>

<style scoped>
.modern-card {
  border: none;
  border-radius: 15px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  background: linear-gradient(to right bottom, #ffffff, #f8f9fa);
}

.modern-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
}

.gradient-text {
  background: linear-gradient(45deg, #1e3c72 0%, #2a5298 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
}

.logo-image {
  height: 140px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 5px 10px rgba(0,0,0,0.1));
  transition: all 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.05);
}

.timeline-step {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: linear-gradient(45deg, #1e3c72 0%, #2a5298 100%);
  border: none;
  box-shadow: 0 5px 10px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
}

.timeline-step i {
  color: white !important;
}

.bg-gradient-info {
  background: linear-gradient(45deg, #2193b0, #6dd5ed);
}

.bg-gradient-success {
  background: linear-gradient(45deg, #11998e, #38ef7d);
}

.bg-gradient-warning {
  background: linear-gradient(45deg, #f2994a, #f2c94c);
}

.bg-gradient-danger {
  background: linear-gradient(45deg, #eb3349, #f45c43);
}

.card-header {
  background: transparent;
  border-bottom: none;
  padding-top: 1.5rem;
}

.timeline-content h6 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.timeline-content p {
  color: #6c757d;
  line-height: 1.6;
}

.border-radius-xl {
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}
</style>
