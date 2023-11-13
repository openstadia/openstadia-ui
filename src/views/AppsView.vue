<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {getApps} from "@/apis/apps";
import AppItem from "@/components/AppItem.vue";
import type {App} from "@/models/app";

const apps = ref<App[]>([])

onMounted(async () => {
  apps.value = await getApps()
})

</script>

<template>
  <h2 class="text-2xl font-bold">Apps</h2>

  <ul class="mt-6">
    <li v-for="app in apps" :key="app.id" class="pb-2 sm:pb-3">
      <AppItem :app="app"></AppItem>
    </li>
  </ul>
</template>
