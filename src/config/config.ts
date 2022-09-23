// 书签内按键触发间隔
export const PRESS_INTERVAL_TIME = 200;

// 键盘布局
export const KEYBOARD_KEY = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];

/**
 * 书签配置
 * {
 *   key: 键盘按键
 *   url: 地址
 *   label?: 展示文案
 *   icon?: 展示图片
 * }
 */
export const MY_BOOKMARK = [
  // 第一行
  {
    key: 'q',
    url: 'https://github.com',
  },
  {
    key: 'w',
    url: 'https://www.v2ex.com',
  },
  {
    key: 'e',
    url: 'https://juejin.cn',
  },
  {
    key: 'r',
    url: 'https://www.zhihu.com',
  },
  {
    key: 't',
    url: 'https://time.geekbang.org/dashboard/course',
    icon: 'https://static001.geekbang.org/static/time/icon/favicon-32x32.jpg',
  },
  {
    key: 'u',
    url: 'https://macwk.com/soft/all/p1',
  },
  // 第二行
  {
    key: 'j',
    url: 'https://stackblitz.com/',
  },
  {
    key: 'k',
    url: 'https://www.naiveui.com/zh-CN/light/components/button',
  },
  {
    key: 'l',
    url: 'https://icones.js.org/collection/all',
  },
  // 第三行
  {
    key: 'b',
    url: 'https://t.bilibili.com',
  },
  {
    key: 'n',
    url: 'https://www.youku.com',
  },
  {
    key: 'm',
    url: 'https://v.qq.com',
    label: 'tencent',
  },
];
