import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航->', link: '/nav/' },
  {
    text: '随笔记', items:[
      {
        text: 'github自动化部署',
        link: '/notes/github自动化部署.md'
      },
    ]
  },
  {
    text: '前端物语', items: [
      {
        text: 'HTML',
        link: '/HTML/'
      },
      {
        text: 'CSS',
        items: [
          { text: 'CSS', link: '/CSS/' },
          { text: 'SCSS', link: '/CSS/SCSS' }
        ]
      },
      {
        text: 'JavaScript',
        link: '/JavaScript/'
      },
      {
        text: 'AJAX',
        link: '/JavaScript/AJAX'
      },
      {
        text: 'jQuery',
        link: '/JavaScript/jQuery'
      },
      {
        text: 'TypeScript',
        link: '/TypeScript/'
      },
      {
        text: 'Webpack',
        link: '/Buildtools/Webpack.md'
      },
      {
        text: 'Vite',
        link: '/Buildtools/Vite.md'
      }
    ]
  },
  {
    text: '框架物语', items: [
      {
        text: 'Vue',
        items: [
          {
            text: 'Vue3',
            link: '/Vue/Vue3.md'
          },
          {
            text: 'Vue2',
            link: '/Vue/Vue2.md'
          },
          {
            text: 'Vue Router',
            link: '/Vue/vuerouter4'
          },
          {
            text: 'Vuex',
            link: '/Vue/Vuex'
          },
          {
            text: 'Pinia',
            link: '/Vue/Pinia'
          },
        ]
      },
      {
        text: 'React',
        items: [
          {
            text: 'React',
            link: '/React/'
          },
          {
            text: 'react Router',
            link: '/React/reactRouter'
          },
          {
            text: 'Redux',
            link: '/React/Redux'
          },
        ]
      },
      {
        text: 'UniApp',
        link: '/UniApp/'
      },
    ]
  },
  {
    text: '工具物语',
    items: [
      {
        text: 'lodash',
        link: '/Tools/lodash'
      },
      {
        text: 'axios',
        link: '/Tools/axios'
      },
    ]
  },
  {
    text: '后端.?node', items: [
      {
        text: 'Node.js',
        link: '/Backend/'
      },
      {
        text: 'Node生态',
        items: [
          {
            text: 'Koa',
            link: '/Backend/Koa'
          },
          {
            text: 'express',
            link: '/Backend/express'
          }
        ]
      },
      {
        text: '数据库',
        items: [
          {
            text: 'Mongodb',
            link: '/Backend/Mongodb'
          },
          {
            text: 'MySQL',
            link: '/Backend/MySQL'
          }
        ]
      },

    ]
  },
  {
    text: '杂七杂八的知识或工具', items: [
      {
        text: 'Git',
        link: '/notes/git.md'
      },
      {
        text: 'npm/yran/pnpm',
        link: '/npm/'
      },
      {
        text: 'Puppeteer',
        link: '/Puppeteer/'
      },
      {
        text: 'vitepress',
        link: '/vitepress/'
      }
    ]
  }
]
