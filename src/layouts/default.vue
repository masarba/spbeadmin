<template>
  <div class="g-sidenav-show">
    <div
      class="min-height-300 position-absolute w-100"
      :class="store.state.isPinned ? 'bg-primary' : 'bg-success'"
    ></div>
    <sidenav
      :custom_class="store.state.isPinned ? 'bg-white' : 'bg-transparent'"
      :class="[store.state.isPinned ? '' : 'bg-white']"
    />
    <main
      class="main-content position-relative border-radius-lg"
      :class="store.state.isPinned ? 'ms-xl-250' : ''"
    >
      <div class="nav-wrapper position-relative end-0">
        <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl">
          <div class="container-fluid py-1 px-3">
            <div class="d-flex align-items-center">
              <img src="@/assets/img/logopoltek.png" alt="Logo Poltek" class="me-2" style="height: 40px;">
              <h3 class="mb-0 text-white">SPBE-SCAN AUDITOR</h3>
            </div>
            <div class="collapse navbar-collapse mt-sm-0 mt-2 me-md-0 me-sm-4" id="navbar">
              <div class="ms-md-auto pe-md-3 d-flex align-items-center">
                <div class="input-group">
                  <span class="input-group-text text-body">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                  <input type="text" class="form-control" placeholder="Cari di sini..." />
                </div>
              </div>
              <ul class="navbar-nav justify-content-end">
                <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
                  <a
                    href="#"
                    class="nav-link text-body p-0"
                    id="iconNavbarSidenav"
                    @click="toggleSidenav"
                  >
                    <div class="sidenav-toggler-inner">
                      <i class="sidenav-toggler-line"></i>
                      <i class="sidenav-toggler-line"></i>
                      <i class="sidenav-toggler-line"></i>
                    </div>
                  </a>
                </li>
                <li class="nav-item px-3 d-flex align-items-center">
                  <a href="#" class="nav-link text-body p-0">
                    <i class="fa fa-cog fixed-plugin-button-nav cursor-pointer"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <div class="container-fluid py-4">
        <router-view />
        <app-footer />
      </div>
    </main>
    <div :class="store.state.isPinned ? 'fixed-plugin ps' : 'fixed-plugin'">
      <div v-if="store.state.isTransparent" class="card shadow-lg">
        <div class="card-header pb-0 pt-3">
          <div class="float-start">
            <h5 class="mt-3 mb-0">Konfigurasi SPBE-SCAN</h5>
            <p>Lihat opsi dashboard kami.</p>
          </div>
          <div class="float-end mt-4">
            <button
              class="btn btn-link text-dark p-0 fixed-plugin-close-button"
              @click="toggleConfigurator"
            >
              <i class="fa fa-close"></i>
            </button>
          </div>
        </div>
        <hr class="horizontal dark my-1" />
        <div class="card-body pt-sm-3 pt-0">
          <div>
            <h6 class="mb-0">Warna Sidebar</h6>
          </div>
          <a href="#" class="switch-trigger background-color">
            <div class="badge-colors my-2 text-start">
              <span
                class="badge filter bg-gradient-primary active"
                data-color="primary"
                @click="sidebarColor"
              ></span>
              <span
                class="badge filter bg-gradient-dark"
                data-color="dark"
                @click="sidebarColor"
              ></span>
              <span
                class="badge filter bg-gradient-info"
                data-color="info"
                @click="sidebarColor"
              ></span>
              <span
                class="badge filter bg-gradient-success"
                data-color="success"
                @click="sidebarColor"
              ></span>
              <span
                class="badge filter bg-gradient-warning"
                data-color="warning"
                @click="sidebarColor"
              ></span>
              <span
                class="badge filter bg-gradient-danger"
                data-color="danger"
                @click="sidebarColor"
              ></span>
            </div>
          </a>
          <div class="mt-3">
            <h6 class="mb-0">Tipe Sidenav</h6>
            <p class="text-sm">Pilih antara 2 tipe sidenav yang berbeda.</p>
          </div>
          <div class="d-flex">
            <button
              class="btn bg-gradient-primary w-100 px-3 mb-2"
              :class="store.state.isPinned ? 'active' : ''"
              @click="store.toggleConfigurator"
            >
              Tetap
            </button>
            <button
              class="btn bg-gradient-primary w-100 px-3 mb-2 ms-2"
              :class="store.state.isPinned ? '' : 'active'"
              @click="store.toggleConfigurator"
            >
              Floating
            </button>
          </div>
          <p class="text-sm d-xl-none d-block mt-2">
            Anda dapat mengubah tipe sidenav hanya pada tampilan desktop.
          </p>
          <div class="mt-3">
            <h6 class="mb-0">Mode Terang / Gelap</h6>
          </div>
          <div class="form-check form-switch ps-0">
            <input
              class="form-check-input mt-1 ms-auto"
              type="checkbox"
              id="dark-version"
              @click="store.toggleConfigurator"
            />
          </div>
          <hr class="horizontal dark my-sm-4" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import Sidenav from "@/examples/Sidenav/index.vue";
import AppFooter from "@/examples/Footer.vue";
import { useStore } from "vuex";

const store = useStore();

onMounted(() => {
  store.state.isTransparent = "bg-transparent";
});

onUnmounted(() => {
  store.state.isTransparent = "bg-white";
});

const toggleSidenav = () => {
  document.body.classList.toggle("g-sidenav-pinned");
  store.toggleSidebarColor();
};

const toggleConfigurator = () => {
  store.state.showConfig = !store.state.showConfig;
  store.state.isTransparent = store.state.showConfig ? "bg-transparent" : "bg-white";
};

const sidebarColor = (e) => {
  e.preventDefault();
  const color = e.target.getAttribute("data-color");
  store.changeSidebarColor(color);
};
</script> 