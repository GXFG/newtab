import { reactive } from 'vue'
import { useToggle, useLocalStorage } from '@vueuse/core'

interface IState {
  setting: {
    lastSyncTimestamp: number
    bookmarks: {
      [key: string]: {
        url: string
        icon?: string
        label?: string
      }
    }
  }
}

export const globalState: IState = reactive({
  setting: {
    lastSyncTimestamp: useLocalStorage('lastSyncTimestamp', 0, { listenToStorageChanges: true }),
    bookmarks: useLocalStorage('bookmarks', {}, { listenToStorageChanges: true }),
  },
})

export const [isSettingMode, toggleIsSettingMode] = useToggle(false)
