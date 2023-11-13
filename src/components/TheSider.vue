<script lang="ts" setup>
import {RouterLink} from 'vue-router'
import IconHome from '@/components/icons/IconHome.vue'
import IconApp from '@/components/icons/IconApp.vue'
import IconServer from "@/components/icons/IconServer.vue";

interface MenuItem {
  name: string
  link: string
  icon?: any
}

const items: MenuItem[] = [
  {
    name: 'Home',
    link: '/',
    icon: IconHome
  },
  {
    name: 'Apps',
    link: '/apps',
    icon: IconApp
  },
  {
    name: 'Settings',
    link: '/settings',
    icon: IconServer
  },
]
</script>

<template>
  <aside
      id="logo-sidebar"
      aria-label="Sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="item of items" :key="item.name">
          <RouterLink
              :to="item.link"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
          >
            <component
                :is="item.icon"
                class="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
            ></component>
            <span class="ml-3">{{ item.name }}</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
