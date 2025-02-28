<template>
  <div class="login-container">
    <div class="login-box">
      <h2>StockSense Admin</h2>
      <form @submit.prevent="login">
        <input type="email" v-model="email" placeholder="Email" required />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <button type="submit" :diabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabase from "../supabase";

const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const router = useRouter();

const login = async () => {
  loading.value = true;
  errorMessage.value = "";

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorMessage.value = error.message;
  } else {
    localStorage.setItem("token", data.session.access_token); // Store JWT
    router.push("/dashboard"); // Redirect to dashboard
  }

  loading.value = false;
};
</script>

<style scoped>
/* Centering */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  overflow-x: hidden;
}

/* Box Styling */
.login-box {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
}

/* Form Inputs */
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

/* Button */
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

/* Note */
.note {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
