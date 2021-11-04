import { reactive } from 'vue'

export const state = reactive({
  setting: {
    bookmark: [
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
      },
      {
        key: 'l',
        url: 'http://jarvisx.quickconnect.cn',
        label: 'nas-qc',
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
    ],
  },
})
