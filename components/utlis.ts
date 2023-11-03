import type { DefaultTheme } from 'vitepress'

export type Params = DefaultTheme.SidebarItem[]

export type SidebarItem = {
  text: string
  link: string
  items: SidebarItem[]
}

export type SidebarList = SidebarItem[]

export function sideBarDeep(params: Params): SidebarList {
  const clone = structuredClone(params)

  function deep(treeArr: any[]): any[] {
    let res: any[] = []
    for (const iterator of treeArr) {
      const { items, text, link } = iterator
      if (items && items.length) {
        res = res.concat(deep(items))
      }
      res.push({ text, link })
    }
    return res
  }

  let result = clone.map((mv) => {
    if (mv.items?.length) {
      mv.items = deep(mv.items)
      return mv
    }
    return {
      ...mv,
      items: [{ ...mv }]
    }
  })

  result = linkRrplace(result as SidebarList)

  return result as SidebarList
}

export function linkRrplace(list: SidebarList): SidebarList {
  for (const iterator of list) {
    iterator.items.forEach((fv) => {
      if (fv.link) {
        fv.link = fv.link.replace('.md', '')
      }
    })
  }
  return list
}
