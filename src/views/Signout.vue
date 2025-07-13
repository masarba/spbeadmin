<script setup>
import { ref } from "vue";
import { onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import Navbar from "@/examples/PageLayout/Navbar.vue";
import { useQuasar } from "quasar";

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const router = useRouter();
const $q = useQuasar();

const isLoading = ref(false);

const signOut = async () => {
  try {
    isLoading.value = true;
    
    // Panggil endpoint logout
    await axios.post("https://spbebackend-production.up.railway.app/api/auth/logout", {}, {
      headers: {
        Authorization: `Bearer ${store.state.token}`
      }
    });

    // Hapus token dan state
    localStorage.removeItem('token');
    await store.dispatch('logout'); // Dispatch action logout di Vuex

    // Notifikasi sukses
    $q.notify({
      message: "Logout berhasil!",
      type: "positive",
      timeout: 3000,
      textColor: "white",
      position: "top-right"
    });

    // Redirect ke halaman login dan hapus history
    router.push("/auditor-login").then(() => {
      // Hapus history navigasi untuk mencegah kembali ke halaman sebelumnya
      window.history.pushState(null, '', router.currentRoute.value.path);
      window.onpopstate = function() {
        window.history.pushState(null, '', "/auditor-login");
      };
    });

  } catch (error) {
    console.error("Logout failed:", error);
    
    // Hapus token dan state jika terjadi error pada API
    localStorage.removeItem('token');
    await store.dispatch('logout');

    // Notifikasi error
    $q.notify({
      message: "Terjadi kesalahan, tetapi Anda telah berhasil logout.",
      type: "warning",
      timeout: 3000,
      textColor: "white",
      position: "top-right"
    });

    // Tetap redirect ke login
    router.push("/auditor-login").then(() => {
      window.history.pushState(null, '', router.currentRoute.value.path);
      window.onpopstate = function() {
        window.history.pushState(null, '', "/auditor-login");
      };
    });
  } finally {
    isLoading.value = false;
  }
};

// Auto logout saat komponen dimount
onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");
  
  // Langsung jalankan proses logout
  signOut();
});

onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});
</script>

<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar
          isBlur="blur border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow"
          v-bind:darkMode="true"
          isBtn="bg-gradient-success"
        />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Signing Out...</h4>
                  <p class="mb-0">Mohon tunggu sebentar.</p>
                </div>
                <div class="card-body">
                  <div class="text-center">
                    <div v-if="isLoading" class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
