<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import IconFullscreen from '@/components/icons/IconFullscreen.vue'
import {initChannel, initRtc} from '@/utils/rtc'
import {initGamepad, initKeyboard, initMouse} from '@/utils/inputs'
import {getApps} from "@/apis/apps";
import type {App} from "@/models/app";
import {sendOffer} from "@/apis/offer";
import type {Offer} from "@/models/offer";
import OsButton from "@/components/shared/OsButton.vue";

const route = useRoute()

const selectedAppId = parseInt(route.query.app_id as string)

const videoRef = ref<HTMLVideoElement | null>(null)
const videoWrapperRef = ref<HTMLDivElement | null>(null)

const apps = ref<App[]>([])

const isConnected = ref(true)

const {sendData, setChannel} = initChannel()

onMounted(async () => {
  apps.value = await getApps()
})

const startVideo = async () => {
  const videoEl = videoRef.value
  if (!videoEl) {
    return
  }

  initGamepad(sendData)
  initKeyboard(sendData)
  initMouse(videoEl, sendData)

  const {sendChannel, setRemoteDescription, getLocalDescription} = initRtc(videoEl, null)
  setChannel(sendChannel)


  const formElements = document.forms['connect'].elements
  const codecType = formElements.type.value
  const bitrate = formElements.bitrate.valueAsNumber * 1_000_000
  const appId = parseInt(formElements.app.value)

  const localDescription = await getLocalDescription()

  const offer: Offer = {
    sdp: localDescription!!.sdp,
    type: localDescription!!.type,
    app_id: appId,
    codec: {type: codecType, bitrate: bitrate}
  }

  const answer = await sendOffer(offer)

  try {
    await setRemoteDescription(answer)
  } catch (e) {
    alert(e)
  }
}

const enterFullScreen = () => {
  if (!document.fullscreenElement) {
    const videoWrapper = videoWrapperRef.value

    if (videoWrapper) {
      videoWrapper.requestFullscreen()
    }
  }
}
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold">Connect</h2>

  <form id="connect">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="type"
        >Select codec</label
        >
        <select
            id="type"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="type"
        >
          <option value="vp8">VP8</option>
          <option value="vp9">VP9</option>
          <option value="openh264">OpenH264</option>
        </select>
      </div>

      <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="bitrate"
        >Select bitrate</label
        >
        <div class="flex">
          <input
              id="bitrate"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              type="number"
              value="10"
          />
          <span class="text-gray-900 text-sm p-2.5 dark:text-white"> Mb/s </span>
        </div>
      </div>
    </div>

    <div class="mb-6">
      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="app"
      >Select apps</label
      >
      <select
          id="app"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="app"
      >
        <option disabled selected value="">None</option>
        <option
            v-for="app in apps"
            :key="app.id"
            :selected="app.id == selectedAppId"
            :value="app.id"
        >
          {{ app.name }}
        </option>
      </select>
    </div>
  </form>

  <OsButton @click="startVideo" text="Start Video" type="default" class="mb-6"></OsButton>

  <div
      ref="videoWrapperRef"
      class="videoWrapper flex justify-center items-center mb-6 max-w-[1000px] bg-gray-600 rounded-lg"
  >
    <video ref="videoRef" autoplay></video>
  </div>

  <button
      v-if="isConnected"
      class="mb-6 text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
      type="button"
      @click="enterFullScreen"
  >
    <IconFullscreen class="w-5 h-5"></IconFullscreen>
    <span class="sr-only">Enter fullscreen</span>
  </button>
</template>

<style scoped>
.videoWrapper:fullscreen video {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.videoWrapper:not(:fullscreen) video {
  width: 100%;
  height: 100%;
}
</style>
