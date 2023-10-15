# 后端.?node

<script setup>
import IndexLinks from '/~/IndexLink/indexLinks.vue'
import { getSidebar } from '../../.vitepress/configs/sidebar.ts'

const DATA = getSidebar('/Backend/')
</script>
<style src="/~/MNavLink/index.scss"></style>

<IndexLinks :list="DATA"/>
