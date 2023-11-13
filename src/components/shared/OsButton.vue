<script setup lang="ts">
const props = defineProps<{
  text: string
  type: 'default' | 'alternative'
}>()

const classes = {
  'default': 'px-5 py-2.5 text-sm font-medium rounded-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800',
  'alternative': "py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
}

</script>

<template>
  <button type="button"
          :class="[classes[props.type]]">
    {{ props.text }}
  </button>
</template>

<style scoped>

</style>
