<template>
  <div class="absolute top-1/2 left-1/2 text-center transform -translate-x-1/2 -translate-y-1/2 font-round tracking-wider select-none">
    <div class="flex items-baseline">
      <p class="text-8xl">
        {{ time }}
      </p>
      <span class="text-2xl">{{ mid }}</span>
    </div>
    <p class="text-2xl">
      {{ date }}
    </p>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export default {
  name: 'DigitalWatch',
  setup() {
    const state = reactive({
      time: '',
      mid: '',
      date: '',
    })

    const updateTime = () => {
      state.time = dayjs().format('HH:mm:ss')
      state.mid = dayjs().format('a')
      state.date = dayjs().format('YYYY-MM-DD dddd')
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)

    onUnmounted(() => {
      clearInterval(timer)
    })

    return {
      ...toRefs(state),
    }
  },
}
</script>
