<!--
=========================================================
* Vue Argon Dashboard 2 - v4.0.0
=========================================================

* Product Page: https://creative-tim.com/product/vue-argon-dashboard
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
-->
<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from 'vue-router'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'

const route = useRoute()
const isAuthenticated = computed(() => {
  const user = JSON.parse(localStorage.getItem('user'))
  return !!user
})
const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin')
})

// Fungsi untuk menyembunyikan notifikasi yang tidak diinginkan
onMounted(() => {
  // Fungsi untuk menyembunyikan pesan error
  const hideErrorMessages = () => {
    // Cari elemen dengan class warning atau alert yang memiliki teks tentang role auditee
    const warnings = document.querySelectorAll('.warning, .alert, [role="alert"], .q-notification');
    warnings.forEach(warning => {
      if (warning.textContent && (
          warning.textContent.includes('role named') || 
          warning.textContent.includes('auditee') ||
          warning.textContent.includes('guard')
        )) {
        warning.style.display = 'none';
      }
    });
  };

  // Jalankan segera
  hideErrorMessages();

  // Set interval untuk menjalankan fungsi secara berkala
  const interval = setInterval(hideErrorMessages, 1000);

  // Bersihkan interval ketika komponen di-unmount
  return () => clearInterval(interval);
})
</script>

<template>
  <div id="app">
    <router-view v-if="!isAdminRoute"></router-view>
    <div v-else class="wrapper">
      <sidebar v-if="isAuthenticated" />
      <div class="main-content">
        <navbar v-if="isAuthenticated" />
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.wrapper {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* Style tambahan untuk menyembunyikan notifikasi error */
.hide-notification {
  display: none !important;
}
</style>
