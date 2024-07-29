import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航->', link: '/nav/' },
  {
    text: '随笔记',
    link: '/随笔记/随笔.md',

    /* items: [
      {
        text: '随笔档案',
        link: '/notes/index.md'
      },
      {
        text: '油猴',
        link: '/notes/油猴API文档.md'
      },
      {
        text: 'vite转换md',
        link: '/notes/vue3中使用vite转换md为.vue组件.md'
      },
    ] */
  },
  {
    text: '前端物语',
    items: [
      {
        text: 'HTML',
        link: '/HTML/'
      },
      {
        text: 'CSS',
        link: '/CSS/'
      },
      {
        text: 'JavaScript',
        link: '/JavaScript/index.md'
      },
      {
        text: 'TypeScript',
        link: '/TypeScript/'
      },
      {
        text: 'Vue',
        link: '/Vue/'
      },
      {
        text: 'React',
        link: '/React/'
      },
      {
        text: 'uni-app',
        link: '/uni-app/index'
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
    text: '工具物语',
    items: [
      {
        text: 'lodash',
        link: '/Tools/lodash'
      },
      {
        text: 'axios',
        link: '/Tools/axios'
      }
    ]
  },
  {
    text: '后端.?node',
    items: [
      {
        text: 'Node.js',
        link: '/Backend/'
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
      }
    ]
  },
  {
    text: '杂七杂八的知识或工具',
    items: [
      {
        text: 'Git',
        link: '/Miscellaneous/git/git.md'
      },
      {
        text: 'github自动化部署',
        link: '/Miscellaneous/git/github自动化部署.md'
      },
      {
        text: 'Puppeteer',
        link: '/Miscellaneous/Puppeteer'
      },
      {
        text: 'VitePress',
        link: '/Miscellaneous/vitepress.md'
      },
      {
        text: '浏览器知识',
        link: '/Miscellaneous/浏览器知识.md'
      },
      {
        text: '表情符号',
        link: '/Miscellaneous/表情符号.md'
      },
    ]
  }
]
