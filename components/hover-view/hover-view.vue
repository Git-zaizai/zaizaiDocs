<template>
    <div class="hover-view">
        <hover-button />
        <to-nav-page :router="router" />
    </div>
</template>
<script setup lang="ts">
import { Router } from 'vitepress'
import hoverButton from './hover-button.vue'
import toNavPage from './to-nav-page.vue'

defineExpose({
    name: 'hover-view'
})

const props = defineProps<{
    router: Router
}>()

//@ts-ignore
console.log(import.meta.env);

</script>
<style scoped lang="scss">
.hover-view {
    padding: 1px;
    position: fixed;
    right: 20px;
    bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    z-index: 999;
}
</style>