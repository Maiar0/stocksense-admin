<template>
  <div class="container-box">
    <h2 class="table-title">Item Management</h2>
    <table class="table-style">
      <thead>
        <tr>
          <TableHeader
            label="ID"
            field="id"
            :data="items"
            @updateData="filteredItems = $event"
          />
          <TableHeader
            label="Item ID"
            field="item_id"
            :data="items"
            @updateData="filteredItems = $event"
          />
          <TableHeader
            label="Item Name"
            field="item_name"
            :data="items"
            @updateData="filteredItems = $event"
          />
          <TableHeader
            label="Quantity"
            field="quantity"
            :data="items"
            @updateData="filteredItems = $event"
          />
          <TableHeader
            label="Location"
            field="location"
            :data="items"
            @updateData="filteredItems = $event"
          />
          <TableHeader
            label="Alert Level"
            field="alert_level"
            :data="items"
            @updateData="filteredItems = $event"
          />
          <TableHeader
            label="Organization ID"
            field="organization_id"
            :data="items"
            @updateData="filteredItems = $event"
          />
          <TableHeader
            label="Database ID"
            field="database_id"
            :data="items"
            @updateData="filteredItems = $event"
          />
          <TableHeader
            label="Database Name"
            field="database_name"
            :data="items"
            @updateData="filteredItems = $event"
          />
          <th class="table-header">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in filteredItems"
          :key="item?.id"
          class="table-row"
          @click="update(item)"
        >
          <td class="table-cell">{{ item?.id }}</td>
          <td class="table-cell">{{ item?.item_id }}</td>
          <td class="table-cell">{{ item?.item_name }}</td>
          <td class="table-cell">{{ item?.quantity }}</td>
          <td class="table-cell">{{ item?.location }}</td>
          <td class="table-cell">{{ item?.alert_level }}</td>
          <td class="table-cell">{{ item?.organization_id }}</td>
          <td class="table-cell">{{ item?.database_id }}</td>
          <td class="table-cell">{{ item?.database_name }}</td>
          <td class="table-cell text-center">
            <button @click="deleteItem(item.id)" class="button button-danger">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <ItemEdit
      v-if="selectedItem"
      :item="selectedItem"
      @updateItem="updateItem"
      @closeEdit="selectedItem = null"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import DatabaseService from "../services/DatabaseService.js";
import TableHeader from "./TableHeader.vue";
import ItemEdit from "./ItemEdit.vue";

const items = ref([]);
const filteredItems = ref([]);
const selectedItem = ref(null);

const fetchItems = async () => {
  try {
    items.value = await DatabaseService.getItems();
    filteredItems.value = items.value;
    sortFilteredListById();
  } catch (error) {
    console.error("Failed to fetch items:", error);
  }
};

const deleteItem = async (id) => {
  if (confirm("Are you sure you want to delete this item?")) {
    try {
      await DatabaseService.deleteItem(id);
      items.value = items.value.filter((item) => item.id !== id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }
};

const sortFilteredListById = () => {
  filteredItems.value.sort((a, b) => a.id - b.id);
};

const update = (item) => {
  selectedItem.value = item;
};

const updateItem = async (updatedItem) => {
  const index = items.value.findIndex((item) => item.id === updatedItem.id);
  if (index !== -1) {
    items.value[index] = { ...updatedItem };
  }
  filteredItems.value = [...items.value]; // Refresh filtered list

  try {
    await DatabaseService.updateItem(updatedItem.id, updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
  }

  selectedItem.value = null; // Close the modal
};

onMounted(fetchItems);
</script>
