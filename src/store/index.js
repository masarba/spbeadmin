// sharedStore.js
import { createStore } from "vuex";
import api from "../http/api"; // Import the API for HTTP requests

export default createStore({
  state: {
    hideConfigButton: false,
    isPinned: false,
    showConfig: false,
    sidebarType: "bg-white",
    isRTL: false,
    mcolor: "",
    darkMode: false,
    isNavFixed: false,
    isAbsolute: false,
    showNavs: true,
    showSidenav: true,
    showNavbar: true,
    showFooter: true,
    showMain: true,
    layout: "default",
    isLoggedIn: !!localStorage.getItem("token"), // Check if token exists
    token: localStorage.getItem("token"), // Load token from localStorage
    role: localStorage.getItem("role") || null, // Load role from localStorage
    kerentanans: [],  // Store the list of kerentanan (vulnerabilities)
    kerentanan: null,  // Store details of a single kerentanan
  },
  mutations: {
    toggleConfigurator(state) {
      state.showConfig = !state.showConfig;
    },
    sidebarMinimize(state) {
      let sidenav_show = document.querySelector("#app");
      if (state.isPinned) {
        sidenav_show.classList.add("g-sidenav-hidden");
        sidenav_show.classList.remove("g-sidenav-pinned");
        state.isPinned = false;
      } else {
        sidenav_show.classList.add("g-sidenav-pinned");
        sidenav_show.classList.remove("g-sidenav-hidden");
        state.isPinned = true;
      }
    },
    sidebarType(state, payload) {
      state.sidebarType = payload;
    },
    navbarFixed(state) {
      state.isNavFixed = !state.isNavFixed;
    },
    setLogin(state, { token, role }) {
      state.isLoggedIn = true; // Set login status to true
      state.token = token; // Store JWT token
      state.role = role; // Store user role
      localStorage.setItem("token", token); // Save token to localStorage
      localStorage.setItem("role", role); // Save role to localStorage
    },
    logout(state) {
      state.isLoggedIn = false; // Set login status to false
      state.token = null; // Clear JWT token
      state.role = null; // Clear role
      localStorage.removeItem("token"); // Remove token from localStorage
      localStorage.removeItem("role"); // Remove role from localStorage
    },
    // Mutations for kerentanan
    setKerentanans(state, kerentanans) {
      state.kerentanans = kerentanans;
    },
    setKerentanan(state, kerentanan) {
      state.kerentanan = kerentanan;
    },
  },
  actions: {
    login({ commit }, { token, role }) {
      commit("setLogin", { token, role }); // Commit login mutation
    },
    logout({ commit }) {
      commit("logout"); // Commit logout mutation
    },
    toggleSidebarColor({ commit }, payload) {
      commit("sidebarType", payload); // Commit sidebar type mutation
    },
    // Actions for kerentanan
    async fetchKerentanans({ commit }) {
      try {
        const response = await api.get("/kamus-kerentanan");
        commit("setKerentanans", response.data.data); // Commit fetched kerentanans to the state
      } catch (error) {
        console.error("Gagal mengambil data kerentanan:", error);
      }
    },
    async fetchKerentananById({ commit }, id) {
      try {
        const response = await api.get(`/kamus-kerentanan/${id}`);
        commit("setKerentanan", response.data.data); // Commit the fetched kerentanan to the state
      } catch (error) {
        console.error("Gagal mengambil data kerentanan:", error);
      }
    },
    async createKerentanan({ dispatch }, newKerentanan) {
      try {
        await api.post("/kamus-kerentanan", newKerentanan);
        dispatch("fetchKerentanans"); // Fetch the updated list after creation
      } catch (error) {
        console.error("Gagal menambahkan kerentanan:", error);
      }
    },
    async updateKerentanan({ dispatch }, { id, updatedKerentanan }) {
      try {
        await api.put(`/kamus-kerentanan/${id}`, updatedKerentanan);
        dispatch("fetchKerentanans"); // Fetch the updated list after modification
      } catch (error) {
        console.error("Gagal mengupdate kerentanan:", error);
      }
    },
    async deleteKerentanan({ dispatch }, id) {
      try {
        await api.delete(`/kamus-kerentanan/${id}`);
        dispatch("fetchKerentanans"); // Fetch the updated list after deletion
      } catch (error) {
        console.error("Gagal menghapus kerentanan:", error);
      }
    },
  },
  getters: {
    isAuthenticated: (state) => state.isLoggedIn, // Return login status
    userRole: (state) => state.role, // Return the role of the user
    isAdmin: (state) => state.role === "admin", // Check if user is admin
    isUser: (state) => state.role === "user", // Check if user is a regular user
    // Getters for kerentanan
    allKerentanans: (state) => state.kerentanans, // Return all kerentanans
    singleKerentanan: (state) => state.kerentanan, // Return a single kerentanan
  },
});
