<template>
  <div id="clock">
    <div class="clock__time">
      <p class="time__text">
        {{ time }}
      </p>
      <span class="time__mid">{{ mid }}</span>
    </div>
    <p class="clock__date">
      {{ date }}
    </p>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, onUnmounted } from 'vue'
import dayjs from 'dayjs'

export default {
  name: 'DigitalWatch',
  components: {},
  props: {
    demoProps: {
      type: String,
      default: '',
    },
  },
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

<style scoped>
#clock {
  font-family: -apple-system, "Arial Rounded MT Bold", "Rockwell", "Andale Mono", monospace;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: var(--text-color-watch);
  /* text-shadow: 0 0 20px var(--text-color-watch), 0 0 20px rgba(10, 175, 230, 0); */
  text-align: center;
}
#clock .clock__time {
  display: flex;
  align-items: baseline;
}
#clock .clock__time .time__text {
  letter-spacing: 0.03em;
  font-size: 96px;
  padding: 5px 0;
}
#clock .clock__time .time__mid {
  font-size: 20px;
}
#clock .clock__date {
  letter-spacing: 0.05em;
  font-size: 24px;
}
</style>
