<template>
  <div>
    <div class="absolute right-0 bottom-0 flex flex-col justify-center items-center" m="4">
      <div
        class="flex flex-col justify-center items-center bg-gray-600 rounded-lg transition"
        :class="isSettingMode ? 'opacity-100' : 'opacity-0'"
        m="y-10px"
        p="4"
      >
        <button class="flex items-center text-white" @click="downloadSetting()">
          <mdi:cloud-download class="text-2xl" />
          <span>download setting</span>
        </button>
        <button class="flex items-center text-white" @click="uploadSetting()">
          <mdi:cloud-upload class="text-2xl" />
          <span>upload setting</span>
        </button>
      </div>
      <button @click="toggleIsSettingMode()">
        <pixelarticons-sliders class="text-white text-2xl" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { uploadSetting, downloadSetting, isSettingMode, toggleIsSettingMode } from '@/logic'
</script>
