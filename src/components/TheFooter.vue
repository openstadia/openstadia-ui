<script lang="ts" setup>
import IconGithub from '@/components/icons/IconGithub.vue'
</script>

<template>
  <footer>
    <div class="py-2 lg:py-4">
      <div class="flex pt-2 lg:pt-3 justify-between border-t border-gray-400">
        <div class="flex items-baseline">
          <a class="font-title lg:text-s" href="https://www.openstadia.com/">OpenStadia</a>
          <a class="font-utkin ml-2 text-xs text-gray-600" href="https://utkin.tech/"
            >by utkin.tech</a
          >
        </div>

        <div class="flex">
          <a class="text-gray-600 hover:text-gray-400" href="https://github.com/openstadia">
            <span class="sr-only">GitHub</span>
            <IconGithub class="h-6 w-6"></IconGithub>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
