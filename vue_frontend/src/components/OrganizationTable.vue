<template>
  <div class="container-box">
    <h2 class="table-title">Organization Management</h2>
    <table class="table-style">
      <thead>
        <tr>
          <TableHeader
            label="ID"
            field="id"
            :data="orgs"
            @updateData="filteredOrgs = $event"
          />
          <TableHeader
            label="Name"
            field="name"
            :data="orgs"
            @updateData="filteredOrgs = $event"
          />
          <TableHeader
            label="Created At"
            field="created_at"
            :data="orgs"
            @updateData="filteredOrgs = $event"
          />
          <th class="table-header">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="org in filteredOrgs"
          :key="org.id"
          class="table-row"
          @click="update(org)"
        >
          <td class="table-cell">{{ org.id }}</td>
          <td class="table-cell">{{ org.name }}</td>
          <td class="table-cell">{{ org.created_at }}</td>
          <td class="table-cell text-center">
            <button @click="deleteOrg(org.id)" class="button button-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ItemEdit
      v-if="selectedOrg"
      :item="selectedOrg"
      @updateItem="updateItem"
      @closeEdit="selectedOrg = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import DatabaseService from "../services/DatabaseService.js";
import TableHeader from "./TableHeader.vue";
import ItemEdit from "./ItemEdit.vue";

const orgs = ref([]);
const filteredOrgs = ref([]);
const selectedOrg = ref(null);

const fetchOrganizations = async () => {
  try {
    orgs.value = await DatabaseService.getOrganizations();
    filteredOrgs.value = orgs.value;
  } catch (error) {
    console.error("Failed to fetch orgs:", error);
  }
};

const deleteOrgs = async (id) => {
  if (confirm("Are you sure you want to delete this Organization?")) {
    try {
      await DatabaseService.deleteOrganization(id);
      orgs.value = orgs.value.filter((org) => org.id !== id);
    } catch (error) {
      console.error("Error deleting Organization:", error);
    }
  }
};

const update = (org) => {
  selectedOrg.value = org;
};

const updateItem = async (updatedItem) => {
  const index = orgs.value.findIndex((org) => org.id === updatedItem.id);
  if (index !== -1) {
    orgs.value[index] = { ...updatedItem };
  }
  filteredOrgs.value = [...orgs.value]; // Refresh filtered list

  try {
    await DatabaseService.updateOrganization(updatedItem.id, updatedItem);
  } catch (error) {
    console.error("Error updating Org:", error);
  }

  selectedOrg.value = null; // Close the modal
};

onMounted(fetchOrganizations);
</script>
