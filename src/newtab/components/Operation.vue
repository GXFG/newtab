<template>
  <div id="setting">
    <!-- 入口 -->
    <button
      class="fixed right-2 top-50vh z-10 flex flex-col justify-center items-center"
      m="2"
      title="设置"
      @click="toggleIsSettingMode()"
    >
      <span v-if="isSettingMode">
        <mdi:chevron-right-circle class="icon__main" />
      </span>
      <span v-else>
        <ic:baseline-settings class="icon__main" />
      </span>
    </button>
    <!-- 弹窗 -->
    <div class="setting__modal" :class="{ '!right-0': isSettingMode }">
      <!-- tab -->
      <ul class="modal__tab">
        <li
          v-for="tab of SETTING_TAB_LIST"
          :key="tab.value"
          class="tab__item"
          :class="{ 'tab__item--active': tab.value === currTab }"
          @click="onChangeTab(tab.value)"
        >
          {{ tab.label }}
        </li>
      </ul>
      <!-- 通用 -->
      <div v-show="currTab === 1" class="modal__generic">
        <button class="generic__btn" @click="uploadSetting()">
          <mdi:cloud-upload class="icon__main" />
          <span>备份设置</span>
        </button>
        <button class="generic__btn" @click="downloadSetting()">
          <mdi:cloud-download class="icon__main" />
          <span>下载设置</span>
        </button>
        <p class="generic__desc">
          上次备份时间：{{ syncTime }}
        </p>
      </div>
      <!-- 书签 -->
      <ul v-show="currTab === 2" class="modal__bookmarks">
        <li v-for="key of KEYBOARD_KEY" :key="key" class="bookmarks__item">
          <div class="item__key">
            <span>{{ `${key.toUpperCase()}` }}</span>
          </div>
          <!-- 存在配置的书签 -->
          <div v-if="globalState.setting.bookmarks[key]" class="item__content">
            <div v-for="field of ['url', 'label', 'icon']" :key="field" class="content__input">
              <p class="input__label">
                {{ field }}
              </p>
              <input
                v-model="globalState.setting.bookmarks[key][field as keyof typeof SETTING_BOOKMARK_FIELD_MAP]"
                class="input__main"
                type="text"
                :placeholder="SETTING_BOOKMARK_FIELD_MAP[field as keyof typeof SETTING_BOOKMARK_FIELD_MAP].placeholder"
              />
            </div>
            <div class="content__icon">
              <ri:delete-bin-6-line class="icon__main" title="删除" @click="onDeleteKey(key)" />
            </div>
          </div>
          <!-- 创建 -->
          <div v-else class="item__content">
            <div class="content__icon">
              <zondicons:add-solid class="icon__main" title="创建" @click="onAddKey(key)" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { SETTING_TAB_LIST, SETTING_BOOKMARK_FIELD_MAP, KEYBOARD_KEY, uploadSetting, downloadSetting, globalState, isSettingMode, toggleIsSettingMode } from '@/logic'

const currTab = ref(1)

const onChangeTab = (value: number) => {
  currTab.value = value
}

const syncTime = computed(() => {
  return dayjs(globalState.setting.lastSyncTimestamp).format('YYYY-MM-DD HH:mm:ss')
})

const onAddKey = (key: string) => {
  globalState.setting.bookmarks[key] = {
    url: '',
    label: '',
    icon: '',
  }
}

const onDeleteKey = (key: string) => {
  delete globalState.setting.bookmarks[key]
}

</script>

<style scoped>
#setting {
  user-select: none;
  .icon__main {
    font-size: 16px;
  }
  .setting__modal {
    z-index: 2;
    position: fixed;
    top: 5vh;
    right: -540px;
    padding: 10px;
    width: 550px;
    height: 90vh;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    background-color: var(--bg-operation-main);
    transition: all 0.3s ease;
    overflow-y: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .modal__tab {
      display: flex;
      justify-content: center;
      align-items: center;
      .tab__item {
        margin: 3px 10px;
        padding: 10px 30px;
        border-radius: 3px;
        background-color: var(--bg-operation-item);
        cursor: pointer;
      }
      .tab__item--active {
        background-color: var(--bg-operation-key) !important;
      }
    }
    .modal__generic {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .generic__btn {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 8px;
      }
      .generic__desc {
        margin: 8px;
      }
    }
    .modal__bookmarks {
      .bookmarks__item {
        display: flex;
        align-items: center;
        margin: 13px 0;
        background-color: var(--bg-operation-item);
        border-radius: 3px;
        .item__key {
          flex: 0 0 auto;
          width: 30px;
          height: 41px;
          font-size: 16px;
          line-height: 41px;
          text-align: center;
          background-color: var(--bg-operation-key);
          border-top-left-radius: 3px;
          border-bottom-left-radius: 3px;
        }
        .item__content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          .content__icon {
            cursor: pointer;
          }
          .content__input {
            display: flex;
            align-items: center;
            margin-right: 10px;
            &:nth-of-type(1) {
              .input__main {
                width: 160px;
              }
            }
            &:nth-of-type(2) {
              .input__main {
                width: 90px;
              }
            }
            &:nth-of-type(3) {
              .input__main {
                width: 90px;
              }
            }
            .input__label {
              padding-right: 5px;
            }
            .input__main {
              padding: 0 5px;
              width: 120px;
              height: 25px;
              color: var(--text-color-main-reverse);
              background-color: var(--bg-operation-input);
              border-radius: 3px;
            }
          }
        }
      }
    }
  }
}
</style>
