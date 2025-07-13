// src/stores/alertStore.js
import { defineStore } from 'pinia';

export const useAlertStore = defineStore('alertStore', {
  state: () => ({
    showAlert: false,
    alertMessage: '',
    alertType: 'success', // Jenis alert: 'success' atau 'danger'
    alertIcon: ''
  }),
  actions: {
    showSuccessAlert(message) {
      this.showAlert = true;
      this.alertMessage = message;
      this.alertType = 'success';
      this.alertIcon = 'ni ni-check-bold ni-lg';
    },
    showErrorAlert(message) {
      this.showAlert = true;
      this.alertMessage = message;
      this.alertType = 'danger';
      this.alertIcon = 'fa fa-close fa-sm';
    },
    hideAlert() {
      this.showAlert = false;
      this.alertMessage = '';
    },
  },
});
