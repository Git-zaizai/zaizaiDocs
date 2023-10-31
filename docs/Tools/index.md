# 工具物语

<script setup>
import IndexLinks from '/~/IndexLink/indexLinks.vue'
import { getSidebar } from '../../.vitepress/configs/sidebar.ts'

const DATA = getSidebar('/Tools/')
</script>
<style src="/~/MNavLink/index.scss"></style>

<IndexLinks :list="DATA"/>