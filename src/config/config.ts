import iconDsm from '../assets/dsm.ico';

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
    url: 'https://github.com/cmd-cv?direction=desc&sort=updated&tab=stars',
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
    url: 'http://192.168.1.55:10010',
    label: 'AiraNg',
    icon: 'https://ariang.mayswind.net/latest/favicon.ico',
  },
  {
    key: 'k',
    url: 'https://192.168.1.55:5556',
    label: 'nas-ip',
    icon: iconDsm,
  },
  {
    key: 'l',
    url: 'http://jarvisx.quickconnect.cn',
    label: 'nas-qc',
    icon: iconDsm,
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
