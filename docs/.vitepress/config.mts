import { defineConfig } from 'vitepress'

import { head, nav, sidebar } from './configs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  head,

  outDir: '../dist',
  base: process.env.APP_BASE_PATH || '/',
  title: "崽崽哟 | (っ´Ι`)っ",
  // titleTemplate: '崽崽的趣玩系列',
  description: '崽崽的成长之路，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等',
  themeConfig: {
    nav,
    sidebar,

    logo: '/logo.png',
    i18nRouting: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'Copyright © 2019-present maomao'
    },
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
})
