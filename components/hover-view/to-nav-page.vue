
<template>
    <transition name="fade" mode="out-in">
        <div v-if="showClass" :class="showClass" class="hover-button" @click="toNavPage">⤴️</div>
    </transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Router } from 'vitepress'
import { sidebar } from '../../.vitepress/configs/sidebar'


const showClass = ref(false);
const props = defineProps<{
    router: Router
}>()

watch(() => props.router.route.path, () => {
    const path = props.router.route.path.split('/').at(1)
    if (props.router.route.path !== `/${path}/`) {
        showClass.value = true
    } else {
        showClass.value = false
    }
})



const toNavPage = () => {
    const path = props.router.route.path.split('/').at(1)
    console.log(path);
    props.router.go(`/${path}/`)
}
</script>
<style scoped lang="scss">
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
    box-shadow: var(--vp-c-brand-1) 0px 0px 10px -2px;
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
    transition: opacity 1s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>