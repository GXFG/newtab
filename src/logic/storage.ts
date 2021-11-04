import { useLocalStorage } from '@vueuse/core'
import * as store from './store'

export const storageDemo = useLocalStorage('webext-demo', 'Storage Demo', { listenToStorageChanges: true })

export const saveAllSetting = () => {
  chrome.storage.sync.clear()
  chrome.storage.sync.set({ MyNewTabSetting: JSON.stringify(store.state.setting) }, () => {
    console.log('storage.sync set')
  })
}

export const getAllSetting = () => {
  console.log('获取配置数据中')
  chrome.storage.sync.get(null, (data) => {
    console.log('设置数据获取成功', data)
    // store.state.setting.bookmark = JSON.parse(data.MyNewTabSetting).bookmark || []
  })
}
