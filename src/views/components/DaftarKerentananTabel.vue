<template>
    <div class="card p-5 mb-3">
      <div class="row align-items-center">
        <div class="col-sm-8">
          <div class="form">
            <form @submit.prevent="handleSearch">
              <h5 class="mb-3">Cari Kerentanan</h5>
              <div class="mb-3">
                <label for="CariKerentanan" class="form-label">Masukkan Nama Kerentanan :</label>
                <input type="text" class="form-control" id="CariKerentanan" placeholder="Cross Site Scripting" v-model="searchQuery">
              </div>
              <button type="submit" class="btn btn-primary"><i class="ni ni-zoom-split-in"></i> Cari</button>
            </form>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="card p-1">
            <div class="card-header font-weight-bold m-0 p-1 text-center">
              Jumlah Kerentanan Terdaftar Saat Ini :
            </div>
            <div class="text-center" style="font-size: xx-large; font-weight: bold;">
              {{ totalKerentanan }} <i class="fas fa-database text-danger"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card p-3 mb-1">
      <h5 class="card-header">Daftar Kerentanan Terbaru</h5>
  
      <div class="card-body">
        <router-link to="/RegisEditKerentanan">
          <button type="button" class="btn btn-primary"><i class="ni ni-fat-add"></i> Tambahkan Kerentanan Baru</button>
        </router-link>
        
        <div class="table-responsive">
          <div v-if="loading">
            <div class="card-body">Memuat data...</div>
          </div>
          <div v-else>
            <table class="table">
              <thead>
                <tr>
                  <th class="col">No</th>
                  <th class="col">Nama Kerentanan</th>
                  <th class="col">Severity</th>
                  <th class="col">Deskripsi</th>
                  <th class="col">Impact</th>
                  <th class="col">Rekomendasi</th>
                  <th class="col">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(kerentanan, index) in filteredKerentanans" :key="kerentanan.id">
                  <td>{{ index + 1 }}</td>
                  <td>{{ kerentanan.title }}</td>
                  <td>{{ kerentanan.severity }}</td>
                  <td>{{ kerentanan.desc }}</td>
                  <td>{{ kerentanan.impact }}</td>
                  <td>{{ kerentanan.recommendation }}</td> 
                  <td>
                    <router-link :to="{ name: 'KerentananEdit', params: { id: kerentanan.id }}">
                      <button class="btn btn-icon btn-info" type="button" style="margin-right: 10px;">
                        <span class="btn-inner--icon"><i class="ni ni-settings"></i></span>
                        <span class="btn-inner--text"> Edit</span>
                      </button>
                    </router-link>
                    <button class="btn btn-icon btn-danger" type="button">
                      <span class="btn-inner--icon"><i class="ni ni-fat-remove"></i></span>
                      <span class="btn-inner--text"> Hapus</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref, computed } from "vue";
  import { useKerentananStore } from '../../stores/kerentananStore';
  
  const kerentananStore = useKerentananStore();
  const loading = ref(true); // State to track loading
  const totalKerentanan = computed(() => kerentananStore.kerentanans.length);
  const searchQuery = ref("");  // Variabel untuk menyimpan query pencarian
  
  // Computed property untuk memfilter kerentanan berdasarkan pencarian
  const filteredKerentanans = computed(() => {
    if (searchQuery.value.trim() === "") {
      return kerentananStore.kerentanans;
    }
    return kerentananStore.kerentanans.filter((kerentanan) =>
      kerentanan.title.toLowerCase().includes(searchQuery.value.toLowerCase())  // Filter berdasarkan nama kerentanan
    );
  });
  
  const handleSearch = () => {
    // Tidak ada logika tambahan di sini karena pencarian menggunakan v-model yang otomatis memfilter
  };
  
  onMounted(async () => {
    await kerentananStore.fetchKerentanans();
    loading.value = false; 
  });
  </script>
  