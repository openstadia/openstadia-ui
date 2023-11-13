<script lang="ts" setup>
import {onMounted, ref, unref} from 'vue'
import {getHub, setHub} from "@/apis/hub";
import Toggle from "@/components/shared/OsToggle.vue";
import OsButton from "@/components/shared/OsButton.vue";
import type {Hub} from "@/models/hub";
import OsInput from "@/components/shared/OsInput.vue";


const hubEnabled = ref<boolean>(false)
const hubAddr = ref<string>("")
const hubToken = ref<string>("")

onMounted(async () => {
  const hub = await getHub()

  hubEnabled.value = hub.enabled
  hubAddr.value = hub.addr
  hubToken.value = hub.token
})

const onUpdate = async () => {
  const updatedHub: Hub = {
    enabled: unref(hubEnabled),
    addr: unref(hubAddr),
    token: unref(hubToken)
  }

  await setHub(updatedHub)
}
</script>

<template>
  <h2 class="mb-6 text-2xl font-bold">Settings</h2>

  <Toggle v-model:checked="hubEnabled" text="Hub Enabled" class="mb-6"></Toggle>

  <form>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
      <OsInput v-model="hubAddr" input-id="hub_addr" label="Hub Address"></OsInput>

      <OsInput v-model="hubToken" input-id="hub_token" label="Hub Token"></OsInput>
    </div>

    <OsButton @click="onUpdate" text="Update" type="default"></OsButton>
  </form>
</template>
