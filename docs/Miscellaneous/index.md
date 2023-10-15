# 杂七杂八的知识或工具 \*

<script setup>
import IndexLinks from '/~/IndexLink/indexLinks.vue'
import { getSidebar } from '../../.vitepress/configs/sidebar.ts'

const DATA = getSidebar('/Miscellaneous/')
</script>
<style src="/~/MNavLink/index.scss"></style>

<IndexLinks :list="DATA"/>
