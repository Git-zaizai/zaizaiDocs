<script setup lang="ts">
defineOptions({
  name: 'IndexLink',
});

const props = defineProps<{
  text?: string;
  link: string;
  isTe?: boolean;
}>();
</script>

<template>
  <a v-if="link" class="m-nav-link" :href="link" rel="noreferrer">
    <article class="box">
      <span v-if="text" class="title">{{ text }}</span>
      <span class="icon-huo-jian">🚀</span>
    </article>
  </a>
</template>

<style lang="scss" scoped>
@keyframes huojian {
  20% {
    transform: translateX(20px);
    opacity: 0;
  }
  40% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

.m-nav-link {
  --m-nav-icon-box-size: 40px;
  --m-nav-icon-size: 24px;
  --m-nav-box-gap: 12px;

  text-decoration: initial;
  display: block;
  border: 1px solid;
  border-radius: 8px;
  height: 100%;
  transition: all 0.25s;
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft-up);

  &:hover {
    box-shadow: var(--vp-shadow-2);
    transform: scale(1.1);
  }

  .icon-huo-jian {
    transition: translateX linear 0.1s, opacity linear 0.1s;
    animation: huojian 3s infinite normal;
    animation-play-state: paused;
    padding-right: 20px;
  }

  &:hover .icon-huo-jian {
    animation-play-state: running;
    transform: rotate(180deg);
  }

  .box {
    display: flex;
    align-items: center;
    padding: var(--m-nav-box-gap);
    &-header {
      display: flex;
      align-items: center;
    }
  }

  .title {
    overflow: hidden;
    flex-grow: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: var(--m-nav-icon-box-size);
    font-size: 14px;
    font-weight: 700;
    color: var(--vp-c-brand);
    padding-left: 10px;
  }
}

@media (max-width: 960px) {
  .m-nav-link {
    --m-nav-icon-box-size: 36px;
    --m-nav-icon-size: 20px;
    --m-nav-box-gap: 8px;

    .title {
      font-size: 14px;
    }
  }
}
</style>
