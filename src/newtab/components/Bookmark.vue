<template>
  <div id="bookmark">
    <!-- edit -->
    <div v-show="isSettingModalVisible" class="fixed top-0 right-0 z-2 w-80 h-100vh bg-gray-500"></div>
    <div class="bookmark__container">
      <!-- row -->
      <div v-for="(rowData, rowIndex) in keyBoardRowList" :key="rowIndex" class="bookmark__row">
        <div
          v-for="item in rowData"
          :key="item.key"
          class="row__item"
          :class="{ 'row__item--active': item.key === state.currSelectKey }"
          :title="item.url"
          @click="onClickSingleButton(item.key, item.url)"
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
          <div v-show="isSettingMode" class="absolute top-0 right-0 z-1">
            <uil-edit-alt class="block m-auto text-gray-700 text-sm" />
          </div>
          <!-- 定位标志F & J -->
          <div v-if="['f', 'j'].includes(item.key)" class="item__cursor"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useLocalStorage, useToggle } from '@vueuse/core'
import { globalState, isSettingMode, sleep, log } from '@/logic'

// 书签内按键触发间隔
const PRESS_INTERVAL_TIME = 200
// 键盘布局
const KEYBOARD_KEY = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm']
const KEY_OF_INDEX = { q: 0, w: 1, e: 2, r: 3, t: 4, y: 5, u: 6, i: 7, o: 8, p: 9, a: 10, s: 11, d: 12, f: 13, g: 14, h: 15, j: 16, k: 17, l: 18, z: 19, x: 20, c: 21, v: 22, b: 23, n: 24, m: 25 }

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
  KEYBOARD_KEY.forEach((key: string, index: number) => {
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

const mergeBookmarkSetting = async() => {
  if (!isInitialized) {
    await sleep(50)
  }
  for (const key of Object.keys(globalState.setting.bookmarks)) {
    const item = globalState.setting.bookmarks[key]
    const index = KEY_OF_INDEX[key as keyof typeof KEY_OF_INDEX]
    const domain = item.url.split('/')[2]
    let label = ''
    let icon = ''
    if (!domain.includes(':')) {
      // 非本地地址
      const tempSplitList = domain.split('.')
      label = tempSplitList[tempSplitList.length - 2] // 默认label为主域名去掉后缀
      icon = `http://${domain}/favicon.ico`
    }
    localBookmarkList.value[index] = {
      key,
      label,
      icon,
      ...item,
    }
  }
}

// mergeBookmarkSetting()
watch(() => globalState.setting.bookmarks, () => {
  log('mergeBookmarkSetting')
  mergeBookmarkSetting()
})

const onOpenBookmark = (url: string) => {
  if (url.length === 0) {
    return
  }
  window.open(url)
}

const [isSettingModalVisible, toggleSettingModalVisible] = useToggle(false)

const onClickSingleButton = (key: string, url: string) => {
  if (!isSettingMode.value) {
    onOpenBookmark(url)
    return
  }
  if (!isSettingModalVisible.value) {
    toggleSettingModalVisible()
  }
  console.log(isSettingModalVisible.value, key)
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
#bookmark .bookmark__container {
  margin: 30px auto 0 auto;
  width: 560px;
}

#bookmark .bookmark__row {
  display: flex;
}

#bookmark .bookmark__row:nth-child(2) {
  padding-left: 25px;
}

#bookmark .bookmark__row:nth-child(3) {
  padding-left: 52px;
}

#bookmark .bookmark__row .row__item {
  position: relative;
  margin: 3px;
  width: 50px;
  height: 50px;
  color: var(--text-color-bookmark);
  font-size: 12px;
  text-align: center;
  background-color: var(--bookmark-item-bg-color-default);
  border-radius: 5px;
  cursor: pointer;
}

#bookmark .bookmark__row .row__item--active {
  background-color: var(--bookmark-item-bg-color-active);
}

#bookmark .bookmark__row .row__item .item__key {
}

#bookmark .bookmark__row .row__item .item__img {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15px;
}

#bookmark .bookmark__row .row__item .item__img > img {
  width: 15px;
  height: 15px;
}

#bookmark .bookmark__row .row__item .item__label {
  padding: 0 3px;
  height: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#bookmark .bookmark__row .row__item .item__cursor {
  position: absolute;
  left: 18px;
  bottom: 1px;
  width: 13px;
  border: 1px solid #000;
}
</style>
