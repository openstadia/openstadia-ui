<script setup lang="ts">
const props = defineProps<{
  checked: boolean
  text?: string
}>()

const emit = defineEmits<{
  (e: 'update:checked', checked: boolean): void
}>()
</script>

<template>
  <label class="relative inline-flex items-center cursor-pointer">
    <input type="checkbox" value="" class="sr-only peer" :checked="checked"
           @change="emit('update:checked', $event.target.checked)"/>
    <div
        class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
    ></div>
    <span v-if="props.text" class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{{ props.text }}</span>
  </label>
</template>
