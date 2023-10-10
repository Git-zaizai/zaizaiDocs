import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/HTML/': [
    {
      items: [{ text: 'HTML', link: '/HTML/' }]
    }
  ],
  '/CSS/': [
    {
      text: 'CSS*',
      items: [
        { text: 'CSS', link: '/CSS/' },
        { text: 'SCSS', link: '/CSS/SCSS' }
      ]
    }
  ],
  '/JavaScript/': [
    {
      items: [
        {
          text: 'JavaScript基础',
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
          text: 'ES6',
          items: [
            {
              text: 'ES6-11',
              link: '/JavaScript/es6-11'
            }
          ]
        }
      ]
    },
    { text: 'AJAX', link: '/JavaScript/AJAX' },
    { text: 'jQuery', link: '/JavaScript/jQuery' }
  ],
  '/TypeScript/': [
    {
      items: [{ text: 'TypeScript', link: '/TypeScript/' }]
    }
  ],
  '/Webpack/': [
    {
      items: [{ text: 'Webpack', link: '/Webpack/' }]
    }
  ],
  '/Vite/': [
    {
      items: [{ text: 'Vite', link: '/Vite/' }]
    }
  ],
  '/Vue/': [
    {
      items: [
        { text: 'Vue3', link: '/Vue/Vue3' },
        { text: 'Vue2', link: '/Vue/Vue2' },
        {
          text: 'Vue Router',
          items: [
            { text: 'router3', link: '/Vue/vuerouter3' },
            { text: 'router4', link: '/Vue/vuerouter4' }
          ]
        },
        { text: 'Vuex', link: 'Vuex' },
        { text: 'Pinia', link: 'Pinia' }
      ]
    }
  ],
  '/React/': [
    {
      items: [
        { text: 'React', link: '/React/' },
        { text: 'react Router', link: '/React/reactRouter' },
        { text: 'Redux', link: '/React/Redux' }
      ]
    }
  ],
  '/UniApp/': [
    {
      items: [{ text: 'UniApp', link: '/UniApp/' }]
    }
  ],
  // 工具物语
  '/Tools/': [
    {
      text: '工具物语',
      items: [{ text: 'Tools', link: '/Tools/' }]
    }
  ],
  '/Backend/': [
    {
      text: '后端-不知道叫啥 ...',
      items: [
        { text: 'Node', link: '/Backend/Node' },
        { text: 'Koa', link: '/Backend/Koa' },
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
  ]
}
