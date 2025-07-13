// src/stores/kerentananStore.js
import { defineStore } from 'pinia';
import api from '../http/api';

export const useDaftarPseStore = defineStore('DaftarPseStore', {
  state: () => ({
    datapses: [],
    datapse: null,
  }),
  actions: {
    async fetchDataPse() {
      try {
        const response = await api.get('/data-pse');
        this.datapses = response.data || [];
      } catch (error) {
        console.error('Gagal mengambil data kerentanan:', error);
      }
    },

    async fetchDataPseById(id) {
      try {
        const response = await api.get(`/data-pse/${id}`);
        this.datapse = response.data;
        return this.datapse;
      } catch (error) {
        console.error('Gagal mengambil data PSE:', error);
      }
    },

    async createDataPse(newPse) {
      try {
        await api.post('/data-pse', newPse);
        this.fetchDataPse(); // Refresh data setelah menambahkan
      } catch (error) {
        console.error('Gagal menambahkan PSE:', error);
      }
    },

    async updateDataPse(id, updatedKerentanan) {
      try {
        await api.put(`/data-pse/${id}`, updatedKerentanan);
        this.fetchDataPse(); // Refresh data setelah update
      } catch (error) {
        console.error('Gagal mengupdate Data PSE:', error);
      }
    },

    async deleteDataPse(id) {
      try {
        await api.delete(`/data-pse/${id}`);
        this.fetchDataPse(); // Refresh data setelah hapus
      } catch (error) {
        console.error('Gagal menghapus Data PSE:', error);
      }
    },
  },
});
