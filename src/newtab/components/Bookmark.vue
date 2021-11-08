<template>
  <div>
    <div id="bookmark">
      <div v-for="(rowData, rowIndex) in keyBoardRowList" :key="rowIndex" class="bookmark__row">
        <div
          v-for="item in rowData"
          :key="item.key"
          :title="item.url"
          class="row__item"
          :class="{ 'row__item--active': item.key === state.currSelectKey }"
          @click="onOpenBookmark(item.url)"
        >
          <p class="item__key">
            {{ `${item.key.toUpperCase()}` }}
          </p>
          <div class="item__img">
            <img v-if="item.icon" :src="item.icon" />
          </div>
          <p class="item__label">
            {{ item.label }}
          </p>
          <!-- 按键定位标志F & J -->
          <div v-if="['f', 'j'].includes(item.key)" class="item__cursor"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useLocalStorage, useThrottleFn } from '@vueuse/core'
import { KEYBOARD_KEY, KEY_OF_INDEX, PRESS_INTERVAL_TIME, globalState, sleep, log } from '@/logic'

interface bookmarkList {
  key: string
  url: string
  icon?: string
  label?: string
}

const state = reactive({
  currSelectKey: '',
})

const isInitialized = useLocalStorage('isInitialized', false, { listenToStorageChanges: true })
const localBookmarkList = useLocalStorage('bookmarkList', [] as bookmarkList[], { listenToStorageChanges: true })

const initBookmarkListData = () => {
  if (isInitialized.value) {
    return
  }
  KEYBOARD_KEY.forEach((key: string) => {
    localBookmarkList.value.push({
      key,
      url: '',
    })
  })
  isInitialized.value = true
}
initBookmarkListData()

const keyBoardRowList = computed(() => {
  return [
    localBookmarkList.value.slice(0, 10),
    localBookmarkList.value.slice(10, 19),
    localBookmarkList.value.slice(19),
  ]
})

const mergeBookmarkSetting = useThrottleFn(async() => {
  log('mergeBookmarkSetting')
  if (!isInitialized) {
    await sleep(100)
  }
  for (const key of KEYBOARD_KEY) {
    const item = globalState.setting.bookmarks[key]
    const index = KEY_OF_INDEX[key as keyof typeof KEY_OF_INDEX]
    // 重置没有配置信息的按键
    if (!(item && (item.url || item.label || item.icon))) {
      localBookmarkList.value[index] = {
        ...localBookmarkList.value[index],
        key,
        url: '',
        label: '',
        icon: '',
      }
      continue
    }
    const domain = item.url.split('/')[2]
    let label = ''
    let icon = ''
    if (domain && !domain.includes(':')) {
      // 非本地地址
      const tempSplitList = domain.split('.')
      label = tempSplitList[tempSplitList.length - 2] // 默认label为主域名去掉后缀
      icon = `http://${domain}/favicon.ico`
    }
    localBookmarkList.value[index] = {
      key,
      url: item.url,
      label: item.label ? item.label : label,
      icon: item.icon ? item.icon : icon,
    }
  }
}, 1000)

watch(() => globalState.setting.bookmarks,
  () => {
    mergeBookmarkSetting()
  }, {
    deep: true,
  })

const onOpenBookmark = (url: string) => {
  if (url.length === 0) {
    return
  }
  window.open(url)
}

// 监听键盘按键
let timer = null as any
document.onkeydown = function(e: KeyboardEvent) {
  if (!(e.key in KEY_OF_INDEX)) {
    return
  }
  const index = KEY_OF_INDEX[e.key as keyof typeof KEY_OF_INDEX]
  const url = localBookmarkList.value[index].url
  if (url.length === 0) {
    return
  }
  if (e.key === state.currSelectKey) {
    onOpenBookmark(url)
  } else {
    state.currSelectKey = e.key
    clearTimeout(timer)
    timer = setTimeout(() => {
      state.currSelectKey = ''
    }, PRESS_INTERVAL_TIME)
  }
}

</script>

<style scoped>
#bookmark {
  margin: 30px auto 0 auto;
  .bookmark__row {
    display: flex;
    justify-content: center;
    align-items: center;
    .row__item {
      flex: 0 0 auto;
      position: relative;
      margin: 4px;
      padding: 3px;
      width: 50px;
      height: 50px;
      color: var(--text-color-bookmark);
      font-size: 12px;
      text-align: center;
      border-radius: 5px;
      background-color: var(--bg-bookmark-item-default);
      box-shadow: var(--shadow-bookmark-item) 0px 2px 1px,
        var(--shadow-bookmark-item) 0px 4px 2px,
        var(--shadow-bookmark-item) 0px 8px 4px,
        var(--shadow-bookmark-item) 0px 16px 8px;
      cursor: pointer;

      .item__key {
      }

      .item__img {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2px;
        height: 15px;
      }

      .item__img > img {
        width: 15px;
        height: 15px;
      }

      .item__label {
        margin-top: 3px;
        height: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .item__cursor {
        position: absolute;
        left: 18px;
        bottom: 2px;
        width: 13px;
        border: 1px solid #475569;
      }
    }
    .row__item--active {
      background-color: var(--bg-bookmark-item-active);
    }
  }
  .bookmark__row:nth-child(2) {
    margin-left: -25px;
  }
  .bookmark__row:nth-child(3) {
    margin-left: -85px;
  }
}
</style>
