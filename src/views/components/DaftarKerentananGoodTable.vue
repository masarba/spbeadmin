<template>
  <div class="container-fluid py-3 px-0 mb-0">
    <div class="row align-items-end">
      <div class="col">
        <div class="card p-1 m-1">
          <div class="card-header font-weight-bold m-0 p-1 text-center">
            Jumlah Kerentanan
          </div>
          <div class="text-center" style="font-size: xx-large; font-weight: bold;">
            {{ totalKerentanan }} <i class="fas fa-database text-success"></i>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card p-1 m-1">
          <div class="card-header font-weight-bold m-0 p-1 text-center">
            Critical
          </div>
          <div class="text-center" style="font-size: xx-large; font-weight: bold;">
            {{ totalKerentananCritical }} <i class="fas fa-skull-crossbones text-danger"></i>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card p-1 m-1">
          <div class="card-header font-weight-bold m-0 p-1 text-center">
            High
          </div>
          <div class="text-center" style="font-size: xx-large; font-weight: bold;">
            {{ totalKerentananHigh }} <i class="fas fa-exclamation-triangle text-danger"></i>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card p-1 m-1">
          <div class="card-header font-weight-bold m-0 p-1 text-center">
            Medium
          </div>
          <div class="text-center" style="font-size: xx-large; font-weight: bold;">
            {{ totalKerentananMedium }} <i class="fas fa-exclamation-circle text-warning"></i>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card p-1 m-1">
          <div class="card-header font-weight-bold m-0 p-1 text-center">
            Low
          </div>
          <div class="text-center" style="font-size: xx-large; font-weight: bold;">
            {{ totalKerentananLow }} <i class="fas fa-info-circle text-primary"></i>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card p-1 m-1">
          <div class="card-header font-weight-bold m-0 p-1 text-center">
            Info
          </div>
          <div class="text-center" style="font-size: xx-large; font-weight: bold;">
            {{ totalKerentananInfo }} <i class="fas fa-info text-info"></i>
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
          <!-- Tambahkan class datatable ke elemen tabel -->
          <table id="kerentananTable" class="table datatable display">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kerentanan</th>
                <th>Severity</th>
                <th>Deskripsi</th>
                <th>Impact</th>
                <th>Rekomendasi</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(kerentanan, index) in kerentanans" :key="kerentanan.id">
                <td>{{ index + 1 }}</td>
                <td style="min-width:300px; max-width: 300px; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">{{ kerentanan.title }}</td>
                <td>{{ kerentanan.severity }}</td>
                <td style="min-width:400px; max-width: 500px; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">{{ kerentanan.desc }}</td>
                <td style="min-width:400px; max-width: 500px; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">{{ kerentanan.impact }}</td>
                <td style="min-width:400px; max-width: 500px; white-space: normal; word-wrap: break-word; overflow-wrap: break-word;">{{ kerentanan.recommendation }}</td> 
                <td>
                  <router-link :to="{ name: 'KerentananEdit', params: { id: kerentanan.id }}">
                    <button class="btn btn-icon btn-info" type="button" style="margin-right: 10px;">
                      <span class="btn-inner--icon"><i class="ni ni-settings"></i></span>
                      <span class="btn-inner--text"> Edit</span>
                    </button>
                  </router-link>
                  <button class="btn btn-icon btn-danger" type="button" @click="deleteKerentanan(kerentanan.id)">
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
import { onMounted, ref, computed, nextTick } from "vue";
import { useKerentananStore } from '../../stores/kerentananStore';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs5';

const kerentanans = ref([]);
const kerentananStore = useKerentananStore();
const loading = ref(true);
const totalKerentanan = computed(() => kerentananStore.kerentanans.length);
const totalKerentananHigh = computed(() => {
  return kerentanans.value.filter(kerentanan => kerentanan.severity.toLowerCase() === 'high').length;
});
const totalKerentananCritical = computed(() => {
  return kerentanans.value.filter(kerentanan => kerentanan.severity.toLowerCase() === 'critical').length;
});
const totalKerentananMedium = computed(() => {
  return kerentanans.value.filter(kerentanan => kerentanan.severity.toLowerCase() === 'medium').length;
});
const totalKerentananLow = computed(() => {
  return kerentanans.value.filter(kerentanan => kerentanan.severity.toLowerCase() === 'low').length;
});
const totalKerentananInfo = computed(() => {
  return kerentanans.value.filter(kerentanan => kerentanan.severity.toLowerCase() === 'info').length;
});

const deleteKerentanan = async (id) => {
  if (confirm("Apakah Anda yakin ingin menghapus kerentanan ini?")) {
    try {
      await kerentananStore.deleteKerentanan(id);
      kerentanans.value = kerentananStore.kerentanans; // Perbarui daftar kerentanan setelah dihapus
      alert('Kerentanan berhasil dihapus.');
    } catch (error) {
      console.error("Error deleting kerentanan:", error);
      alert('Terjadi kesalahan saat menghapus kerentanan.');
    }
  }
};

// Menginisialisasi DataTables setelah data dimuat
onMounted(async () => {
  await kerentananStore.fetchKerentanans();
  kerentanans.value = kerentananStore.kerentanans;
  loading.value = false;
  await nextTick(); 
  $('#kerentananTable').DataTable({
    pageLength: 10,
    lengthChange: true,
    searching: true,
    destroy: true
  });
});
</script>
