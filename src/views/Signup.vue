<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="
        background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg');
        background-position: top;
      "
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center mx-auto">
            <h1 class="text-white mb-2 mt-5">Welcome!</h1>
            <p class="text-lead text-white">
              Use these awesome forms to login or create a new account in your
              project for free.
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Register with</h5>
            </div>
            <div class="row px-xl-5 px-sm-4 px-3">
              <div class="mt-2 position-relative text-center">
                <p class="text-sm font-weight-bold mb-2 text-secondary text-border d-inline z-index-2 bg-white px-3">
                  or
                </p>
              </div>
            </div>
            <div class="card-body">
              <form role="form" @submit.prevent="register">
                <input
                  type="text"
                  v-model="username"
                  placeholder="Name"
                  required
                  class="form-control mb-3"
                />
                <input
                  type="email"
                  v-model="email"
                  placeholder="Email"
                  required
                  class="form-control mb-3"
                />
                <input
                  type="password"
                  v-model="password"
                  placeholder="Password"
                  required
                  class="form-control mb-3"
                />
                <input
                  type="password"
                  v-model="passwordConfirmation"
                  placeholder="Confirm Password"
                  required
                  class="form-control mb-3"
                />
                <!-- Automatically setting role as 'pse' -->
                <input type="hidden" v-model="role" value="pse" />

                <div class="form-check mb-3">
                  <input
                    type="checkbox"
                    v-model="agreedToTerms"
                    class="form-check-input"
                    required
                  />
                  <label class="form-check-label">
                    I agree to the
                    <a href="javascript:;" class="text-dark font-weight-bold">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                <div class="text-center">
                  <button type="submit" class="btn btn-dark w-100">
                    Sign up
                  </button>
                </div>
                <p v-if="errorMessage" class="text-danger">{{ errorMessage }}</p>
                <p v-if="successMessage" class="text-success">{{ successMessage }}</p>
              </form>
              <div class="text-center mt-3">
                <p>
                  Already have an account?
                  <router-link to="/signin" class="text-dark font-weight-bold">
                    Sign In
                  </router-link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


<script setup>
import { ref, onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";
import axios from "axios";

const body = document.getElementsByTagName("body")[0];
const store = useStore();

const username = ref("");
const email = ref("");
const password = ref("");
const passwordConfirmation = ref("");
const role = ref("auditor"); // Role is directly set to 'auditor'
const agreedToTerms = ref(false);
const errorMessage = ref("");
const successMessage = ref("");

const register = async () => {
  errorMessage.value = "";
  successMessage.value = "";

  const payload = {
    username: username.value,
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value,
    role: role.value, 
  };

  try {
    const response = await axios.post("https://spbebackend-production.up.railway.app/api/auth/register", payload);

    if (response.data) {
      successMessage.value = "Registration successful!";
    }
  } catch (error) {
    if (error.response && error.response.data) {
      errorMessage.value = error.response.data.message || "Registration failed!";
    } else {
      errorMessage.value = "An error occurred. Please try again.";
    }
  }
};

onBeforeMount(() => {
  store.state.hideConfigButton = true;
  store.state.showNavbar = false;
  store.state.showSidenav = false;
  store.state.showFooter = false;
  body.classList.remove("bg-gray-100");
});

onBeforeUnmount(() => {
  store.state.hideConfigButton = false;
  store.state.showNavbar = true;
  store.state.showSidenav = true;
  store.state.showFooter = true;
  body.classList.add("bg-gray-100");
});
</script>
