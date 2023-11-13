<script lang="ts" setup>
import {RouterView} from 'vue-router'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import TheSider from '@/components/TheSider.vue'
</script>

<template>
  <div class="h-screen bg-white flex flex-col">
    <TheHeader></TheHeader>

    <TheSider></TheSider>

    <div class="p-4 sm:ml-64">
      <div class="p-4 mt-14">
        <div class="max-w-4xl">
          <RouterView/>
        </div>

        <TheFooter></TheFooter>
      </div>
    </div>
  </div>
</template>
