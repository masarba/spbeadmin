// src/stores/kerentananStore.js
import { defineStore } from 'pinia';
import api from '../http/api';

export const useKerentananStore = defineStore('kerentananStore', {
  state: () => ({
    kerentanans: [],
    kerentanan: null,
  }),
  actions: {
    // Ambil semua data kerentanan
    async fetchKerentanans() {
      try {
        const response = await api.get('/kamus-kerentanan');
        this.kerentanans = response.data.data || [];
      } catch (error) {
        console.error('Gagal mengambil data kerentanan:', error);
      }
    },
    // Ambil data kerentanan berdasarkan ID
    async fetchKerentananById(id) {
      try {
        const response = await api.get(`/kamus-kerentanan/${id}`);
        this.kerentanan = response.data.data;
        return this.kerentanan;
      } catch (error) {
        console.error('Gagal mengambil data kerentanan:', error);
      }
    },
    // Buat kerentanan baru
    async createKerentanan(newKerentanan) {
      try {
        await api.post('/kamus-kerentanan', newKerentanan);
        this.fetchKerentanans(); // Refresh data setelah menambahkan
      } catch (error) {
        console.error('Gagal menambahkan kerentanan:', error);
      }
    },
    // Update kerentanan berdasarkan ID
    async updateKerentanan(id, updatedKerentanan) {
      try {
        await api.put(`/kamus-kerentanan/${id}`, updatedKerentanan);
        this.fetchKerentanans(); // Refresh data setelah update
      } catch (error) {
        console.error('Gagal mengupdate kerentanan:', error);
      }
    },
    // Hapus kerentanan berdasarkan ID
    async deleteKerentanan(id) {
      try {
        await api.delete(`/kamus-kerentanan/${id}`);
        this.fetchKerentanans(); // Refresh data setelah hapus
      } catch (error) {
        console.error('Gagal menghapus kerentanan:', error);
      }
    },
  },
});
