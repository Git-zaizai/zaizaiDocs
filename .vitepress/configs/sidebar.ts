import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/notes/': [
    {
      text: '随笔',
      link: '/notes/随笔.md'
    },
    {
      text: 'vue3中使用vite转换md为vue组件',
      link: '/notes/vue3中使用vite转换md为vue组件.md'
    },
    {
      text: '小程序随笔',
      link: '/notes/小程序随笔.md'
    },
    {
      text: '油猴API文档',
      link: '/notes/油猴API文档.md'
    }
  ],
  '/HTML/': [
    {
      text: 'HTML *',
      items: [{ text: '常用语义化标签', link: '/HTML/常用语义化标签.md' }]
    }
  ],
  '/CSS/': [
    {
      text: 'CSS *',
      items: [
        { text: 'CSS', link: '/CSS/css' },
        { text: 'SCSS', link: '/CSS/scss' }
      ]
    }
  ],
  '/JavaScript/': [
    {
      text: 'JavaScript 基础',
      collapsed: true,
      items: [
        {
          text: 'JavaScript基础-开篇',
          link: '/JavaScript/JavaScript基础-01.md'
        },
        {
          text: 'JavaScript基础-2篇',
          link: '/JavaScript/JavaScript基础-02.md'
        },
        {
          text: 'JavaScript基础-3篇',
          link: '/JavaScript/JavaScript基础-03.md'
        },
        {
          text: 'JavaScript基础-4篇',
          link: '/JavaScript/JavaScript基础-04.md'
        },
        {
          text: 'JavaScript基础-5篇',
          link: '/JavaScript/JavaScript基础-05.md'
        },
        {
          text: 'JavaScript基础-6篇',
          link: '/JavaScript/JavaScript基础-06.md'
        }
      ]
    },
    {
      text: 'ES6+',
      items: [
        {
          text: 'ES6-11',
          link: '/JavaScript/es6-11'
        },
        {
          text: 'ESNext',
          link: '/JavaScript/esnext.md'
        },
      ]
    },
    {
      text: 'JS知识',
      items: [
        {
          text: '数据类型',
          link: '/JavaScript/数据类型.md'
        },
        {
          text: '数据类型的拷贝',
          link: '/JavaScript/数据类型的拷贝.md'
        },
        {
          text: '类型转换',
          link: '/JavaScript/类型转换.md'
        },
        {
          text: '原型和原型链',
          link: '/JavaScript/原型和原型链.md'
        },
        {
          text: '继承',
          link: '/JavaScript/继承.md'
        }
      ]
    },
    { text: 'AJAX', link: '/JavaScript/AJAX' },
    { text: 'jQuery', link: '/JavaScript/jQuery' }
  ],
  '/TypeScript/': [
    {
      text: 'TypeScript *',
      items: [
        { text: '开始', link: '/TypeScript/开始' },
        { text: '简介', link: '/TypeScript/简介.md' },
        { text: '基础', link: '/TypeScript/基础.md' },
        { text: '进阶', link: '/TypeScript/进阶.md' },
        { text: '工程', link: '/TypeScript/工程.md' },
        { text: 'tsconfig.json配置', link: '/TypeScript/tsconfig.json配置' },
      ]
    },
    {
      text: 'TS体操',
      items: [
        {
          text: '实用工具类型',
          link: '/TypeScript/实用工具类型.md'
        },
        {
          text: '综合',
          link: '/TypeScript/TS体操.md'
        }
      ]
    }
  ],
  '/Buildtools/': [
    {
      text: '构建工具',
      items: [
        { text: 'Webpack', link: '/Buildtools/Webpack.md' },
        { text: 'Vite', link: '/Buildtools/Vite.md' }
      ]
    },
    {
      text: '工程化',
      items: [
        { text: 'Monorepo', link: '/Buildtools/Monorepo.md' },
        { text: 'Rollup', link: '/Buildtools/Rollup.md' }
      ]
    }
  ],
  '/Vue/': [
    {
      text: 'Vue 全家桶',
      items: [
        { text: 'Vue3', link: '/Vue/Vue3' },
        { text: 'Vue2', link: '/Vue/Vue2' },
        {
          text: 'Vue Router',
          items: [
            { text: 'Vue Router', link: '/Vue/vuerouter' },
            { text: 'Vue Router 4', link: '/Vue/vuerouter4' }
          ]
        },
        { text: 'Vuex', link: '/Vue/Vuex' },
        { text: 'Pinia', link: '/Vue/Pinia' }
      ]
    },
    {
      text: 'Vue 工具库',
      items: [{ text: 'VueUse', link: 'VueUse' }]
    }
  ],
  '/React/': [
    {
      text: 'React 全家桶',
      items: [
        { text: 'React', link: '/React/react' },
        { text: 'react Router', link: '/React/reactRouter' },
        { text: 'hox', link: '/React/hox' },
      ]
    }
  ],
  '/uni-app/': [
    {
      text: 'uni-app *',
      items: [{ text: 'uni-app 基础', link: '/uni-app/uni-app基础' }]
    }
  ],
  // 工具物语
  '/Tools/': [
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
    }
  ],
  '/Backend/': [
    {
      text: '后端.?node',
      items: [
        { text: 'Node', link: '/Backend/Node' },
        {
          text: 'Koa 系列',
          items: [{ text: 'koa2 中间件', link: '/Backend/Koa2中间件' }]
        },
        { text: 'express', link: '/Backend/express' }
      ]
    },
    {
      text: '数据库',
      items: [
        { text: 'Mongodb', link: '/Backend/Mongodb' },
        { text: 'MySQL', link: '/Backend/MySQL' }
      ]
    }
  ],
  '/Miscellaneous/': [
    {
      text: '杂七杂八的知识或工具系列',
      items: [
        {
          text: 'Git系列',
          items: [
            { text: 'git', link: '/Miscellaneous/git/git.md' },
            { text: 'git命令合集', link: '/Miscellaneous/git/git命令合集.md' },
            {
              text: 'git命令合集-加强版',
              link: '/Miscellaneous/git/git命令合集-加强版.md'
            },
            {
              text: 'github自动化部署',
              link: '/Miscellaneous/git/github自动化部署.md'
            }
          ]
        }
      ]
    },
    {
      text: '浏览器知识',
      link: '/Miscellaneous/浏览器知识.md'
    }
  ]
}

export function getSidebar(
  params: string
): NonNullable<DefaultTheme.Config['sidebar']> {
  return sidebar[params]
}
