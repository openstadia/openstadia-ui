<script lang="ts" setup>
import {useRouter} from 'vue-router'
import type {App} from "@/models/app";
import OsButton from "@/components/shared/OsButton.vue";

const props = defineProps<{
  app: App
}>()

const router = useRouter()

const onConnect = () => {
  router.push({
    name: 'connect',
    query: {app_id: props.app.id}
  })
}

const onSettings = () => {
  router.push({
    name: 'app_settings',
    params: {id: props.app.id}
  })
}
</script>

<template>
  <div
      class="p-2 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
  >
    <div class="flex items-center space-x-2">
      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
          {{ props.app.name }}
        </p>
      </div>

      <OsButton @click="onConnect" text="Connect" type="default"></OsButton>

      <OsButton @click="onSettings" text="Settings" type="alternative"></OsButton>
    </div>
  </div>
</template>
