<template>
  <div id="setting">
    <!-- modal -->
    <div
      class="setting__modal fixed top-5vh -right-98 z-2 w-100 h-90vh bg-gray-500 bg-opacity-50 rounded-lg transition-all duration-350 ease-in-out"
      :class="{ '!right-0': isSettingMode }"
      p="4"
    >
      <button class="flex items-center" @click="uploadSetting()">
        <mdi:cloud-upload class="text-xl" />
        <span>upload setting</span>
      </button>
      <button class="flex items-center" @click="downloadSetting()">
        <mdi:cloud-download class="text-xl" />
        <span>download setting</span>
      </button>
      <!-- 书签设置 -->
      <div>
        <ul v-for="key of KEYBOARD_KEY" :key="key">
          <li class="flex items-center my-2">
            <p class="mx-2">
              {{ key }}
            </p>
            <div v-if="globalState.setting.bookmarks[key]">
              <p class="m-2">
                {{ globalState.setting.bookmarks[key].url }}
              </p>
              <p class="m-2">
                {{ globalState.setting.bookmarks[key].label }}
              </p>
              <p class="m-2">
                {{ globalState.setting.bookmarks[key].icon }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 入口按钮 -->
    <button
      class="fixed right-2 top-50vh z-10 flex flex-col justify-center items-center"
      m="2"
      title="设置"
      @click="toggleIsSettingMode()"
    >
      <span v-if="isSettingMode">
        <mdi:chevron-right-circle class="text-xl" />
      </span>
      <span v-else>
        <ic:baseline-settings class="text-xl" />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { KEYBOARD_KEY, uploadSetting, downloadSetting, globalState, isSettingMode, toggleIsSettingMode } from '@/logic'

</script>

<style>
#setting {
}
#setting .setting__modal {
}
</style>
