---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
layoutClass: 'm-home-layout'

hero:
  name: '崽崽'
  text: '前端囧途'
  tagline: 记录做切图崽的囧途
  image:
    src: /logo.png
    alt: 崽崽前端囧途
  actions:
    - theme: brand
      text: 前端物语
      link: /notes/随笔.md
    - theme: alt
      text: 导航->
      link: /nav/

features:
  - icon: 🛩️
    title: 导航
    details: 各种网页链接<br /> 有啥看看别
    link: /nav/
    linkText: 导航
  - icon: 📖
    title: 随笔档案
    details: 突然学习到的某个知识<br /> 反正随机写的记录
    link: /notes/
    linkText: 随笔档案
  - icon: 📘
    title: 前端物语
    details: 前端技术笔记或者笔记<br />学习其中的小技巧和冷知识
    link: /JavaScript/
    linkText: 前端物语
  # - icon: 💡
  #   title: 后端.?node
  #   details: 在工作中学到的一切<small>（常用库/工具/奇淫技巧等）</small><br />配合 CV 大法来更好的摸鱼
  #   link: /Backend/
  #   linkText: 后端.?node
  # - icon: 🐞
  #   title: 杂七杂八的知识或工具
  #   details: 杂七杂八的<br />总有一些让你意想不到的问题
  #   link: /Miscellaneous/
  #   linkText: 杂七杂八的知识或工具
  # - icon: 💯
  #   title: 吾志所向，一往无前。
  #   details: '<small class="bottom-small"> 一个想躺平的小开发 </small>'
  #   link: https://github.com/Git-zaizai
---


<script setup>
  console.log(/*
 *  ┌─────────────────────────────────────────────────────────────┐
 *  │┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐│
 *  ││Esc│!1 │@2 │#3 │$4 │%5 │^6 │&7 │*8 │(9 │)0 │_- │+= │|\ │`~ ││
 *  │├───┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴───┤│
 *  ││ Tab │ Q │ W │ E │ R │ T │ Y │ U │ I │ O │ P │{[ │}] │ BS  ││
 *  │├─────┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴┬──┴─────┤│
 *  ││ Ctrl │ A │ S │ D │ F │ G │ H │ J │ K │ L │: ;│" '│ Enter  ││
 *  │├──────┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴─┬─┴────┬───┤│
 *  ││ Shift  │ Z │ X │ C │ V │ B │ N │ M │< ,│> .│? /│Shift │Fn ││
 *  │└─────┬──┴┬──┴──┬┴───┴───┴───┴───┴───┴──┬┴───┴┬──┴┬─────┴───┘│
 *  │      │Fn │ Alt │         Space         │ Alt │Win│   HHKB   │
 *  │      └───┴─────┴───────────────────────┴─────┴───┘          │
 *  └─────────────────────────────────────────────────────────────┘
 */)
</script>

<style>
/*爱的魔力转圈圈*/
/* .m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
} */
.m-home-layout .image-src:hover{
  
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
