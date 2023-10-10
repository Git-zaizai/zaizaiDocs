import { defineConfig } from 'vitepress'
import type { HeadConfig } from 'vitepress'
import { heads, nav, sidebar } from './configs'

// https://vitepress.dev/reference/site-config
export default () => {
  function getBase(): string {
    if (process.env.NODE_ENV?.includes('development')) {
      return '/'
    }
    return '/zaizaiDocs/'
  }

  function upHeadVal(head: HeadConfig[]): HeadConfig[] {
    for (let i = 0; i < head.length; i++) {
      const element = head[i]
      if (element[0] === 'link') {
        element[1].href = getBase() + '/favicon.ico'
      }
      if (
        element[0] === 'meta' &&
        element[1].content.includes('/favicon.ico')
      ) {
        element[1].content = getBase() + 'favicon.ico'
      }
    }
    return head
  }

  const base = getBase()

  return defineConfig({
    head: upHeadVal(heads),
    base,

    title: '崽崽哟 | (っ´Ι`)っ',
    description:
      '崽崽的成长之路，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等',

    lastUpdated: true,
    cleanUrls: true,
    lang: 'zh-CN',
    appearance: 'dark',
    outDir: '../dist',
    markdown: {
      lineNumbers: true,
      theme: 'one-dark-pro'
    },
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
}
