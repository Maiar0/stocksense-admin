<template>
  <th class="table-header">
    <div class="flex flex-col">
      <span>{{ label }}</span>
      <input
        v-model="searchQuery"
        class="filter-input"
        placeholder="Search..."
        @input="filterData"
      />
    </div>
  </th>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  label: String, // Column display name (e.g., "Email")
  field: String, // Field name in dataset (e.g., "email")
  data: Array, // Full dataset passed from UserTable.vue
  resolver: Function, //Custom function to ensure look up in nested objects
});

const emit = defineEmits(["updateData"]);

const showInput = ref(false); // Controls whether filter input is visible
const searchQuery = ref(""); // Stores user’s search input

const filteredData = computed(() => {
  if (!searchQuery.value.trim()) return props.data; // If empty, return full dataset

  return props.data.filter((item) => {
    const value = props.resolver ? props.resolver(item) : item[props.field]; // Use resolver if provided
    return value
      ?.toString()
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase().trim());
  });
});

watch(filteredData, (newData) => {
  emit("updateData", newData);
});

const toggleInput = () => {
  showInput.value = !showInput.value;
};
</script>
