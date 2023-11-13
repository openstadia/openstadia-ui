<script setup lang="ts">
const props = defineProps<{
  label: string
  placeholder?: string
  inputId: string
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', text: string): void
}>()
</script>

<template>
  <div>
    <label :for="props.inputId"
           class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >{{ props.label }}</label>
    <input :value="modelValue"
           :id="props.inputId"
           :placeholder="props.placeholder"
           @input="emit('update:modelValue', $event.target.value)"
           type="text"
           class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
           required>
  </div>
</template>
