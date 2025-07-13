import { createApp } from "vue"; // Import Vue library
import App from "./App.vue"; // Main App component
import store from "./store"; // Vuex store
import router from "./router"; // Vue Router
import "./assets/css/nucleo-icons.css"; // Custom styles
import "./assets/css/nucleo-svg.css"; // Custom styles
import ArgonDashboard from "./argon-dashboard"; // Dashboard components
import { Quasar, Notify, Loading } from 'quasar'; // Import Quasar components/plugins
import 'quasar/dist/quasar.css'; // Quasar styles
import setupInterceptors from './setupInterceptors'; // Axios interceptor setup

import { createPinia } from 'pinia'; // Import Pinia

// Set up Axios interceptors globally for handling JWT tokens
setupInterceptors();

// Kustomisasi plugin Notify untuk menyembunyikan pesan error tertentu
const notifyDefaultConfig = {
  position: 'top-right',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
};

Notify.setDefaults(notifyDefaultConfig);

// Override metode Notify untuk menyaring pesan error tertentu
const originalNotify = Notify.create;
Notify.create = (opts) => {
  // Jika pesan mengandung 'auditee' atau 'role', jangan tampilkan notifikasi
  if (typeof opts === 'string') {
    if (opts.includes('auditee') || opts.includes('role') || opts.includes('guard')) {
      return { dismiss: () => {} }; // Return dummy notify object
    }
  } else if (opts.message) {
    if (opts.message.includes('auditee') || opts.message.includes('role') || opts.message.includes('guard')) {
      return { dismiss: () => {} }; // Return dummy notify object
    }
  }
  
  // Lanjutkan dengan Notify asli jika tidak ada filter yang cocok
  return originalNotify(opts);
};

// Create Vue app instance
const appInstance = createApp(App);

// Initialize Pinia
const pinia = createPinia();

// Use Vuex store, Pinia, router, and Argon Dashboard
appInstance.use(store); // Vuex store
appInstance.use(pinia); // Pinia store
appInstance.use(router); // Vue Router
appInstance.use(ArgonDashboard); // Argon Dashboard

// Use Quasar with its plugins (Notify and Loading)
appInstance.use(Quasar, {
  plugins: {
    Notify,    // Quasar Notify plugin for notifications
    Loading    // Quasar Loading plugin for showing loading spinners
  }
});

// Tambahkan CSS global untuk menyembunyikan notifikasi pesan error
const style = document.createElement('style');
style.innerHTML = `
  .q-notification:has-text("role"), 
  .q-notification:has-text("auditee"),
  .q-notification:has-text("guard"),
  .warning[role="alert"],
  div.warning {
    display: none !important;
  }
`;
document.head.appendChild(style);

// Mount the app instance
appInstance.mount("#app");
