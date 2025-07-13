<script setup>
defineProps({
  btnBackground: {
    type: String,
    default: "",
  },
  isBlur: {
    type: String,
    default: "",
  },
  darkMode: {
    type: Boolean,
    default: false,
  },
  isBtn: { type: String, default: "bg-gradient-light" },
});
</script>
<template>
  <!-- Navbar -->
  <nav
    class="absolute top-0 left-0 right-0 z-30 flex flex-wrap items-center px-4 py-2 mx-6 my-4 shadow-soft-2xl rounded-blur bg-white/80 backdrop-blur-2xl backdrop-saturate-200 lg:flex-nowrap lg:justify-start"
    :class="isBlur ? 'shadow-soft-2xl rounded-blur backdrop-blur-2xl bg-white/80 backdrop-saturate-200' : 'shadow-none'"
  >
    <div class="flex items-center justify-between w-full p-0 pl-6 mx-auto flex-wrap-inherit">
      <a
        class="py-2.375 text-xl font-bold mr-4 ml-4 whitespace-nowrap lg:ml-0"
        :class="isBlur ? 'text-slate-700' : 'text-white'"
        href="javascript:;"
      >
        SPBE-SCAN AUDITOR
      </a>
      <button
        class="shadow-none navbar-toggler ms-2"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="mt-2 navbar-toggler-icon">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navigation">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link
              class="nav-link d-flex align-items-center me-2 active"
              aria-current="page"
              to="/dashboard"
            >
              <i
                class="fa fa-chart-pie opacity-6 me-1"
                aria-hidden="true"
                :class="isBlur ? 'text-dark' : 'text-white'"
              ></i>
              Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link me-2" to="/profile">
              <i
                class="fa fa-user opacity-6 me-1"
                aria-hidden="true"
                :class="isBlur ? 'text-dark' : 'text-white'"
              ></i>
              Profile
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link me-2" to="/signup">
              <i
                class="fas fa-user-circle opacity-6 me-1"
                aria-hidden="true"
                :class="isBlur ? 'text-dark' : 'text-white'"
              ></i>
              Sign Up
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link me-2" to="/AuditorSignin">
              <i
                class="fas fa-key opacity-6 me-1"
                aria-hidden="true"
                :class="isBlur ? 'text-dark' : 'text-white'"
              ></i>
              Sign In
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-lg-block d-none">
          <li class="nav-item">
            <a
              href="https://www.creative-tim.com/product/vue-argon-dashboard"
              class="btn btn-sm mb-0 me-1"
              :class="isBtn"
              >Free download</a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>
