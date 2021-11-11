<template>
  <div>
    <Operation />
    <Bookmark />
    <DigitalWatch />
  </div>
</template>

<script setup lang="ts">
import Operation from './components/Operation.vue'
import Bookmark from './components/Bookmark.vue'
import DigitalWatch from './components/DigitalWatch.vue'
import { downloadSetting } from '@/logic'

downloadSetting()

</script>
