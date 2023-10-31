import clone from 'fast-clone'
import { defineConfig } from 'vitepress';
import type { HeadConfig } from 'vitepress';
import { resolve, join } from 'node:path';
import { heads, nav, sidebar } from './configs';

// https://vitepress.dev/reference/site-config
export default () => {
  const pathAlias = (path: string) => resolve(join(__dirname, path).replace(/\\/g, '/'));

  function getBase(): string {
    return '/'
    if (process.env.NODE_ENV?.includes('development')) {
      return '/';
    }
    return '/zaizaiDocs/';
  }

  function upHeadVal(head: HeadConfig[]): HeadConfig[] {
    for (let i = 0; i < head.length; i++) {
      const element = head[i];
      if (element[0] === 'link') {
        element[1].href = getBase() + element[1].href.replace('/', '');
      }
      if (element[0] === 'meta' && element[1].content.includes('/favicon.ico')) {
        element[1].content = getBase() + element[1].content.replace('/', '');
      }
    }

    return head;
  }

  const base = getBase();

  return defineConfig({
    head: upHeadVal(heads),
    base,

    title: '崽崽哟 | (っ´Ι`)っ',
    description: '崽崽的成长之路，包含前端常用知识、源码阅读笔记、各种奇淫技巧、日常提效工具等',

    outDir: 'dist', //构建输出目录
    srcDir: 'docs', //源目录
    cacheDir: '.vite', //缓存文件的目录

    // 当设置为true时，VitePress 不会因死链接而导致构建失败。
    //  当设置为'localhostLinks'时，构建将在死链接上失败，但不会检查localhost链接。
    // ignoreDeadLinks: true,
    cleanUrls: true,
    lastUpdated: true,

    lang: 'zh-CN',
    appearance: 'dark',
    markdown: {
      lineNumbers: true,
      theme: 'one-dark-pro',
    },
    themeConfig: {
      nav,
      sidebar,

      logo: '/logo.png',
      i18nRouting: false,
      /* 右侧大纲配置 */
      outline: {
        level: 'deep',
        label: '本页目录',
      },
      socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
      footer: {
        message: '如有转载或 CV 的请标注本站原文地址',
        copyright: 'Copyright © 2019-present maomao',
      },
      darkModeSwitchLabel: '外观',
      returnToTopLabel: '返回顶部',
      lastUpdatedText: '上次更新',
      docFooter: {
        prev: '上一篇',
        next: '下一篇',
      },
    },
    vite: {
      resolve: {
        alias: [{ find: /\/~/, replacement: pathAlias('../components') }],
      },
    },
  });
};
