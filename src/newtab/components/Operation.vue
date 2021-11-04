<template>
  <div>
    <div class="absolute right-0 bottom-0 m-4">
      <button @click="getAllSetting()">
        <pixelarticons-sliders class="block m-auto text-white text-2xl" />
        get
      </button>
      <button @click="saveAllSetting()">
        <pixelarticons-dashbaord class="block m-auto text-white text-2xl" />
        set
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { saveAllSetting, getAllSetting } from '@/logic'

</script>
