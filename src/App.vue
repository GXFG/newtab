<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Bookmark from './components/Bookmark.vue';
import DigitalWatch from './components/DigitalWatch.vue';
</script>

<template>
  <Bookmark />
  <DigitalWatch />
</template>

<style>
@media (prefers-color-scheme: dark) {
  :root {
    --main-bg-color: #35363a;
    --bookmark-item-bg-color-default: #bdc3c7;
    --bookmark-item-bg-color-active: #ecf0f1;
    --text-color-main: #fff;
    --text-color-watch: #ecf0f1;
  }
}

@media (prefers-color-scheme: light) {
  :root {
    --main-bg-color: #fff;
    --bookmark-item-bg-color-default: #ccc;
    --bookmark-item-bg-color-active: #fff;
    --text-color-main: #2c3e50;
    --text-color-watch: #2c3e50;
  }
}

body {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-size: 14px;
  color: var(--text-color-main);
  background-color: var(--main-bg-color);
}
</style>
