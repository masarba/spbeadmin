<template>
    <div class="card p-5">
      <h5 class="mb-5">{{ isEdit ? 'Ubah Kerentanan' : 'Tambah Kerentanan' }}</h5>
  
      <argon-alert v-if="alertStore.showAlert" :color="alertStore.alertType" :icon="alertStore.alertIcon" class="mb-3">
        <strong>{{ alertStore.alertType === 'success' ? 'Sukses!' : 'Error!' }}</strong> {{ alertStore.alertMessage }}
      </argon-alert>
  
      <div v-if="loading">Memuat data...</div>
  
      <form v-else @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="title" class="form-label">Nama Kerentanan</label>
          <input type="text" class="form-control" id="title" aria-required="true" placeholder="Cross Site Scripting" v-model="kerentanan.title" required/>
        </div>
        <div class="mb-3">
          <label for="severity" class="form-label">Severity</label>
          <select id="severity" class="form-select" aria-label="severity-options" aria-required="true" v-model="kerentanan.severity" required>
            <option value="" disabled>Pilih Tingkat Severity</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
            <option value="Info">Info</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="deskripsi" class="form-label">Deskripsi</label>
          <textarea id="deskripsi" class="form-control" aria-required="true" placeholder="Ketikkan di sini" v-model="kerentanan.desc" required></textarea>
        </div>
        <div class="mb-3">
          <label for="impact" class="form-label">Impact</label>
          <textarea id="impact" class="form-control" aria-required="true" placeholder="Ketikkan di sini" v-model="kerentanan.impact" required></textarea>
        </div>
        <div class="mb-3">
          <label for="rekomendasi" class="form-label">Rekomendasi</label>
          <textarea id="rekomendasi" class="form-control" aria-required="true" placeholder="Ketikkan di sini" v-model="kerentanan.recommendation" required></textarea>
        </div>
  
        <button type="submit" class="btn btn-primary" style="margin-right: 10px;">
          <i class="ni ni-check-bold"></i> Submit
        </button>
        <router-link to="/DaftarKerentanan">
          <button class="btn btn-icon btn-danger" type="button">
            <span><i class="ni ni-fat-remove"></i></span>
            <span class="btn-inner--text"> Batal</span>
          </button>
        </router-link>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useKerentananStore } from '../../stores/kerentananStore';
  import { useAlertStore } from '../../stores/alertStore'; // Import alert store
  
  const kerentananStore = useKerentananStore();
  const alertStore = useAlertStore(); // Inisialisasi alert store
  const router = useRouter();
  const route = useRoute();
  
  // State kerentanan dan loading
  const kerentanan = ref({
    title: '',
    severity: '',
    desc: '',
    impact: '',
    recommendation: '',
  });
  const loading = ref(true);  // Menandai status loading
  
  // Cek jika di halaman edit
  const isEdit = computed(() => !!route.params.id);
  
  // Ambil data kerentanan jika di halaman edit
  onMounted(async () => {
    if (isEdit.value) {
      const kerentananId = route.params.id;
      try {
        // Ambil data dari respons API
        const fetchedKerentanan = await kerentananStore.fetchKerentananById(kerentananId);
  
        console.log('Data fetched:', fetchedKerentanan); // Pastikan data yang diambil tampil di log
  
        // Periksa jika data undefined
        if (!fetchedKerentanan) {
          alertStore.showErrorAlert('Kerentanan tidak ditemukan.');
          return;
        }
  
        // Update properti kerentanan satu per satu agar Vue mendeteksi perubahan
        kerentanan.value.title = fetchedKerentanan.title;
        kerentanan.value.severity = fetchedKerentanan.severity;
        kerentanan.value.desc = fetchedKerentanan.desc;
        kerentanan.value.impact = fetchedKerentanan.impact;
        kerentanan.value.recommendation = fetchedKerentanan.recommendation;
      } catch (error) {
        console.error('Error fetching data:', error); // Log error
        alertStore.showErrorAlert('Gagal mengambil data kerentanan. Silakan coba lagi.');
      } finally {
        loading.value = false;
      }
    } else {
      loading.value = false;
    }
  });
  
  
  // Handle submit form
  const handleSubmit = async () => {
    try {
      if (!kerentanan.value.title || !kerentanan.value.severity || !kerentanan.value.desc || !kerentanan.value.impact || !kerentanan.value.recommendation) {
        alertStore.showErrorAlert('Semua bidang harus diisi sebelum mengirimkan formulir.');
        return;
      }
  
      if (isEdit.value) {
        await kerentananStore.updateKerentanan(route.params.id, kerentanan.value);
        alertStore.showSuccessAlert('Kerentanan berhasil diperbarui!'); 
      } else {
        await kerentananStore.createKerentanan(kerentanan.value);
        alertStore.showSuccessAlert('Kerentanan berhasil ditambahkan!'); 
      }
  
      // Redirect to daftar kerentanan setelah alert sukses
      router.push('/DaftarKerentanan');
  
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errorMessage = error.response.data.message || 'Data tidak valid. Periksa input dan coba lagi.';
        alertStore.showErrorAlert(errorMessage);
      } else {
        const errorMessage = error.response?.data?.message || 'Terjadi kesalahan. Silakan coba lagi.';
        alertStore.showErrorAlert(errorMessage);
      }
    }
  };
  </script>
  
  <script>
      import ArgonAlert from "@/components/ArgonAlert.vue";
      export default {
        components: {
          ArgonAlert,
        },
      };
  </script>
  