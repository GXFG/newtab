<template>
  <div id="bookmark">
    <div class="bookmark__row" v-for="(rowData, rowIndex) in keyBoardRowList" :key="rowIndex">
      <button
        class="row__item"
        :class="{'row__item--active': item.key === currSelect}"
        :title="item.url"
        v-for="item in rowData"
        :key="item.key"
        @click="onOpenBookmark(item.url)"
      >
        <p class="item__key">{{ `${item.key.toUpperCase()}` }}</p>
        <div class="item__img">
          <img v-if="item.icon" :src="item.icon" alt="" />
        </div>
        <p class="item__label">{{ item.label }}</p>
        <div v-if="['f', 'j'].includes(item.key)" class="item__cursor"></div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, computed } from 'vue';
import * as config from '../config/config';

export default {
  name: 'Bookmark',
  setup() {
    const state = reactive({
      bookmarkList: [] as any,
      bookmarkKeyToIndexMap: {},
      currSelect: '',
    });

    const initBookmarkListData = () => {
      config.KEYBOARD_KEY.forEach((key, index) => {
        state.bookmarkList.push({
          key,
          url: '',
        });
        state.bookmarkKeyToIndexMap[key] = index;
      });

      for (const item of config.MY_BOOKMARK) {
        const _index = state.bookmarkKeyToIndexMap[item.key];
        const _domain = item.url.split('/')[2];
        let _label = '';
        let _icon = '';
        if (!_domain.includes(':')) {
          // 非本地地址
          const tempSplitList = _domain.split('.');
          _label = tempSplitList[tempSplitList.length - 2];  // 默认label为主域名去掉后缀
          _icon = `http://${_domain}/favicon.ico`;
        }
        state.bookmarkList[_index] = {
          label: _label,
          icon: _icon,
          ...item,
        };
      }

    };
    initBookmarkListData();

    const keyBoardRowList = computed(() => {
      return [
        state.bookmarkList.slice(0, 10),
        state.bookmarkList.slice(10, 19),
        state.bookmarkList.slice(19),
      ];
    });

    const onOpenBookmark = (url: string) => {
      if (url.length === 0) {
        return;
      }
      window.open(url);
    };

    // 监听键盘按键
    let timer = null as any;
    document.onkeydown = function (e: KeyboardEvent) {
      if (!config.KEYBOARD_KEY.includes(e.key)) {
        return;
      }
      const _index = state.bookmarkKeyToIndexMap[e.key];
      const _url = state.bookmarkList[_index].url;
      if (_url.length === 0) {
        return;
      }
      if (e.key === state.currSelect) {
        onOpenBookmark(_url);
      } else {
        state.currSelect = e.key;
        clearTimeout(timer)
        timer = setTimeout(() => {
          state.currSelect = '';
        }, config.PRESS_INTERVAL_TIME)
      }
    };


    return {
      ...toRefs(state),
      keyBoardRowList,
      onOpenBookmark,
    };
  },
};
</script>

<style scoped>
#bookmark {
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
  padding: 3px;
  width: 50px;
  height: 50px;
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
