import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航->', link: '/nav/' },
  {
    text: '杂七杂八的笔记',
    link: '/nav/'
  },
  {
    text: '前端物语', items: [
      {
        text: 'HTML',
        link: '/nav/'
      },
      {
        text: 'CSS',
        link: '/nav/'
      },
      {
        text: 'JavaScript',
        link: '/nav/'
      },
      {
        text: 'ES6',
        link: '/nav/'
      },
      {
        text: 'AJAX',
        link: '/nav/'
      },
      {
        text: 'jQuery',
        link: '/nav/'
      },
      {
        text: 'Scss',
        link: '/nav/'
      },
      {
        text: 'TypeScript',
        link: '/nav/'
      },
      {
        text: 'Webpack',
        link: '/nav/'
      },
      {
        text: 'npm/yran/pnpm',
        link: '/nav/'
      },
    ]
  },
  {
    text: '框架', items: [
      {
        text: 'Vue',
        link: '/nav/'
      },
      {
        text: 'React',
        link: '/nav/'
      },
      {
        text: 'UniApp',
        link: '/nav/'
      },
    ]
  },
  {
    text: '工具库',
    items: [
      {
        text: 'Pinia',
        link: '/nav/'
      },
    ]
  },
  {
    text: '后端', items: [
      {
        text: 'Node.js',
        link: '/nav/'
      },
      {
        text: 'Mongodb',
        link: '/nav/'
      },
      {
        text: 'MySQL',
        link: '/nav/'
      },
    ]
  },
  {
    text: '杂七杂八的知识', items: [
      {
        text: 'Git',
        link: '/nav/'
      }
    ]
  }
]
