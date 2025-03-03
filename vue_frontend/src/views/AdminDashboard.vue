<template>
  <div class="dashboard-container">
    <h1>Admin Dashboard</h1>

    <!-- Tab Navigation -->
    <div class="tabs">
      <button
        @click="activeTab = 'users'"
        :class="{ active: activeTab === 'users' }"
      >
        Users
      </button>
      <button
        @click="activeTab = 'organizations'"
        :class="{ active: activeTab === 'organizations' }"
      >
        Organizations
      </button>
      <button
        @click="activeTab = 'items'"
        :class="{ active: activeTab === 'items' }"
      >
        Items
      </button>
    </div>

    <!-- Tab Content -->
    <div class="tab-content">
      <UserTable v-if="activeTab === 'users'" />
      <OrganizationTable v-if="activeTab === 'organizations'" />
      <ItemTable v-if="activeTab === 'items'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import UserTable from "../components/UserTable.vue";
import OrganizationTable from "../components/OrganizationTable.vue";
import ItemTable from "../components/ItemTable.vue";

const activeTab = ref("users"); // Default tab
</script>
