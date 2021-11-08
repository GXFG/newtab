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
      <!-- 通用设置 -->
      <div class="modal__generic">
        <p>{{ syncTime }}</p>
        <button class="flex items-center" @click="uploadSetting()">
          <mdi:cloud-upload class="icon__main" />
          <span>upload setting</span>
        </button>
        <button class="flex items-center" @click="downloadSetting()">
          <mdi:cloud-download class="icon__main" />
          <span>download setting</span>
        </button>
      </div>
      <!-- 书签 -->
      <ul class="modal__bookmarks">
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
                v-model="globalState.setting.bookmarks[key][field as keyof typeof FIELD_LIST]"
                class="input__main"
                type="text"
                :placeholder="FIELD_LIST[field as keyof typeof FIELD_LIST].placeholder"
              />
            </div>
            <div class="content__icon">
              <ri:delete-bin-6-line class="icon__main" @click="onDeleteKey(key)" />
            </div>
          </div>
          <!-- 创建 -->
          <div v-else class="item__content">
            <div class="content__icon">
              <zondicons:add-solid class="icon__main" @click="onAddKey(key)" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { KEYBOARD_KEY, uploadSetting, downloadSetting, globalState, isSettingMode, toggleIsSettingMode } from '@/logic'

const FIELD_LIST = {
  url: {
    label: '地址',
    placeholder: '',
  },
  label: {
    label: '名称',
    placeholder: '默认域名',
  },
  icon: {
    label: '图标',
    placeholder: '默认favicon',
  },
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
  .icon__main {
    font-size: 16px;
  }
  .setting__modal {
    z-index: 2;
    position: fixed;
    top: 5vh;
    right: -590px;
    padding: 10px;
    width: 600px;
    height: 90vh;
    border-radius: 8px;
    background-color: var(--bg-operation-main);
    transition: all 0.3s ease;
    overflow-y: scroll;
    .modal__generic {
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
            margin-right: 10px;
            cursor: pointer;
          }
          .content__input {
            display: flex;
            align-items: center;
            margin-right: 10px;
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
