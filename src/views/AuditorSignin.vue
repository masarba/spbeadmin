<script setup>
import { ref } from "vue";
import { onBeforeUnmount, onBeforeMount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonSwitch from "@/components/ArgonSwitch.vue";
import ArgonButton from "@/components/ArgonButton.vue";
import { useQuasar } from "quasar";
import logo from "@/assets/img/logopoltek.png";

const body = document.getElementsByTagName("body")[0];
const store = useStore();
const router = useRouter();
const $q = useQuasar();

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const isLoading = ref(false);

const handleSignIn = async () => {
  try {
    isLoading.value = true;
    const response = await axios.post("http://127.0.0.1:8000/api/auth/auditor-login", {
      email: email.value,
      password: password.value,
    });

    const token = response.data.access_token;
    const userRole = response.data.role;

    store.dispatch("login", { token, role: userRole });

    $q.notify({
      message: "Login berhasil!",
      type: "positive",
      icon: false,
      timeout: 3000,
      textColor: "white",
      actions: [{ label: 'OK', color: 'white' }],
      position: "top-right",
    });

    // Redirect ke dashboard
    if (userRole === 'auditor') {
      router.push("/dashboard");
    } else {
      throw new Error("Anda bukan auditor");
    }
  } catch (error) {
    console.error("Login failed:", error);

    const errorMessage = error.response?.data?.message === "The credentials you entered are incorrect."
      ? "Login gagal. Periksa email dan password Anda."
      : error.message || "Login gagal. Terjadi kesalahan.";

    $q.notify({
      message: errorMessage,
      type: "negative",
      icon: false,
      timeout: 3000,
      textColor: "white",
      actions: [{ label: 'OK', color: 'white' }],
      position: "top-right",
    });
  } finally {
    isLoading.value = false;
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

<template>
  <main class="min-vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7">
          <div class="card card-plain">
            <div class="pb-0 card-header text-center">
              <div class="d-flex flex-column align-items-center mb-4">
                <img 
                  :src="logo" 
                  alt="Logo Politeknik" 
                  class="mb-4"
                  style="max-height: 100px; width: auto;"
                />
                <h4 class="font-weight-bolder">SPBE-SCAN AUDITOR</h4>
                <p class="mb-0">Enter your email and password to sign in as auditor</p>
              </div>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleSignIn">
                <div class="mb-3">
                  <argon-input
                    v-model="email"
                    id="email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    size="lg"
                    required
                  />
                </div>
                <div class="mb-3">
                  <argon-input
                    v-model="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    name="password"
                    size="lg"
                    required
                  />
                </div>
                <argon-switch
                  v-model="rememberMe"
                  id="rememberMe"
                  name="remember-me"
                  >Remember me</argon-switch
                >
                <div class="text-center">
                  <argon-button
                    class="mt-4"
                    variant="gradient"
                    color="success"
                    :loading="isLoading"
                    :disabled="isLoading"  
                    size="lg"
                    type="submit"
                    >Sign in</argon-button
                  >
                </div>
              </form>
            </div>
            <div class="px-1 pt-0 text-center card-footer px-lg-2">
              <p class="mx-auto mb-4 text-sm">
                Don't have an auditor account?
                <a
                  href="javascript:;"
                  class="text-success text-gradient font-weight-bold"
                  >Contact Support</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
