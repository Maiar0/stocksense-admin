<template>
  <div class="container-box">
    <h2 class="text-2xl font-semibold mb-4">User Management</h2>

    <table class="table-style">
      <thead>
        <tr>
          <TableHeader
            label="Email"
            field="email"
            :data="users"
            @updateData="filteredUsers = $event"
          />
          <TableHeader
            label="Role"
            field="role"
            :data="users"
            :resolver="(user) => user.user_metadata?.role"
            @updateData="filteredUsers = $event"
          />
          <TableHeader
            label="Organization"
            field="organization_id"
            :data="users"
            :resolver="(user) => user.user_metadata?.organization_id"
            @updateData="filteredUsers = $event"
          />
          <th class="table-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in filteredUsers"
          :key="user?.id"
          class="table-row"
          @click="update(user)"
        >
          <td class="table-cell">{{ user?.email || "No Email" }}</td>
          <td class="table-cell">{{ user?.user_metadata?.role || "User" }}</td>
          <td class="table-cell">
            {{ user?.user_metadata?.organization_id || "0000-0000-0000" }}
          </td>
          <td class="table-cell text-center">
            <button @click="deleteUser(user.id)" class="button button-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ItemEdit
      v-if="selectedUser"
      :item="selectedUser"
      @updateItem="updateUser"
      @closeEdit="selectedUser = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DatabaseService from "../services/DatabaseService.js";
import TableHeader from "./TableHeader.vue";
import ItemEdit from "./ItemEdit.vue";

const users = ref([]);
const filteredUsers = ref([]);
const selectedUser = ref(null);

const fetchUsers = async () => {
  try {
    const data = await DatabaseService.getUsers();
    if (!data.users || !Array.isArray(data.users)) {
      throw new Error("Invalid response format");
    }

    users.value = data.users;
    filteredUsers.value = users.value;
  } catch (error) {
    console.error("Failed to fetch users:", error);
    users.value = []; // Prevents UI crashes if fetching fails
  }
};

const deleteUser = async (id) => {
  if (confirm("Are you sure you want to delete this user?")) {
    try {
      await DatabaseService.deleteUser(id);
      users.value = users.value.filter((user) => user.id !== id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};

const update = (user) => {
  selectedUser.value = user;
};

const updateUser = async (updatedItem) => {
  const index = users.value.findIndex((user) => user.id === updatedItem.id);
  if (index !== -1) {
    users.value[index] = { ...updatedItem };
  }
  filteredUsers.value = [...users.value]; // Refresh filtered list

  try {
    await DatabaseService.updateUser(updatedItem.id, updatedItem);
  } catch (error) {
    console.error("Error updating user:", error);
  }

  selectedUser.value = null; // Close the modal
};

onMounted(fetchUsers);
</script>
