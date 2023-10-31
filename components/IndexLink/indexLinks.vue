<script setup lang="ts">
import { computed, defineOptions } from 'vue';
import { slugify } from '@mdit-vue/shared';
import type { DefaultTheme } from 'vitepress';
import IndexLink from './indexLink.vue';
import { sideBarDeep } from '../utlis';

defineOptions({
  name: 'IndexLinks',
});

const props = defineProps<{
  list: DefaultTheme.SidebarItem[];
  titles?: string[];
}>();

const data = sideBarDeep(props.list);

const formatTitle = (str: string) => {
  return slugify(str ?? '标题');
};
</script>

<template>
  <div v-for="(item, index) in data" :key="item.text">
    <h2 :id="formatTitle(item.text)" tabindex="-1">
      {{ titles ? titles[index] : item.text }}
      <a class="header-anchor" :href="`#${formatTitle(item.text)}`" aria-hidden="true"></a>
    </h2>
    <div class="m-nav-links" v-if="item?.items.length">
      <index-link v-for="isl in item.items" :key="isl.text" v-bind="isl" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.m-nav-links {
  --m-nav-gap: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--m-nav-gap);
}

@each $media, $size in (500px: 140px, 640px: 155px, 768px: 175px, 960px: 200px, 1440px: 240px) {
  @media (min-width: $media) {
    .m-nav-links {
      grid-template-columns: repeat(auto-fill, minmax($size, 1fr));
    }
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    --m-nav-gap: 20px;
  }
}
</style>
