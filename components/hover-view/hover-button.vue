<template>
    <transition name="fade" mode="out-in">
        <div v-if="showClass" :class="showClass" class="hover-button" @click="bindscroll">🚀</div>
    </transition>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function bindscroll() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentScroll > 0) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, currentScroll - currentScroll / 8);
    }
}

function debounce(func: () => void, delay: number) {
    let timer: any = null;

    return function (...args: any[]) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            // @ts-ignore
            func.apply(this, args);
        }, delay);
    };
}

const showClass = ref(false);

function handleScroll() {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 100) {
        showClass.value = true;
    } else {
        showClass.value = false;
    }
}

onMounted(() => {
    window.addEventListener('scroll', debounce(handleScroll, 200));
});
</script>
  
<style lang="scss" scoped>
.hover-button {
    width: 44px;
    height: 44px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
    border-radius: 50%;
    background-color: var(--vp-button-alt-bg);
    transition: color 0.3s var(--vp-c-text-1), background-color 0.3s, box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s;
    box-shadow: var(--vp-c-brand-1) 0px 0px 8px -2px;
    //   box-shadow: var(--docsearch-modal-shadow);
    cursor: pointer;
    transform: rotate(-43deg);

    &:hover {
        box-shadow: var(--vp-c-brand-1) 0px 0px 7px 0px;
        transform: scale(1.1) rotate(-43deg);
    }
}

.display-enter-active {
    transition: all 0.5s linear;
}

.display-leave-active {
    transition: all 0.5s linear;

    .css,
    .html {
        transition: all 0.5s linear;
    }
}

.display-enter-from {
    opacity: 1;
}

/* fade 消退动画 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
  