<template>
  <div
    v-if="item"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg w-96 max-h-[80vh] flex flex-col"
    >
      <h2 class="text-2xl font-semibold mb-4">Edit Item</h2>
      <div class="overflow-y-auto max-h-[60vh] pr-2">
        <template v-for="(value, key) in item" :key="key">
          <div v-if="typeof value !== 'object' || value === null" class="mb-4">
            <label class="block font-medium text-gray-700">{{ key }}</label>
            <input
              v-model="updatedValues[key]"
              class="w-full p-2 border border-gray-300 rounded"
              :placeholder="value"
            />
          </div>
          <div v-else class="mb-4">
            <label class="block font-medium text-gray-700">{{ key }}</label>
            <div class="ml-4 border-l-2 pl-2">
              <div
                v-for="(subValue, subKey) in value"
                :key="subKey"
                class="mb-2"
              >
                <label class="block text-gray-600">{{ subKey }}</label>
                <input
                  v-model="updatedValues[key][subKey]"
                  class="w-full p-2 border border-gray-300 rounded"
                  :placeholder="subValue"
                />
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="emitUpdate"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          @click="$emit('closeEdit')"
          class="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import DatabaseService from "../services/DatabaseService.js";

const props = defineProps({
  item: Object, // Receives the item object to edit
});

const emit = defineEmits(["closeEdit", "updateItem"]);

const updatedValues = ref({ ...props.item });

const emitUpdate = () => {
  emit("updateItem", updatedValues.value); // Send updated item to parent
  emit("closeEdit"); // Close modal after emitting update
};
</script>
