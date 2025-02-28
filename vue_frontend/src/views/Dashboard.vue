<template>
  <div>
    <h1>Welcome to the Dashboard</h1>
    <button @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import supabase from "../supabase";

const router = useRouter();

const logout = async () => {
  await supabase.auth.signOut();
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
