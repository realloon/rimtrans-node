<script setup lang="ts">
import SubNav from './SubNav.vue'
import { IconLabel } from '../common'
import { useNodesStore } from '@/stores/nodes'
const { categories } = useNodesStore()
</script>

<template>
  <nav class="menu" v-show="categories.size > 0">
    <section>
      <RouterLink to="/defs" class="defs">
        <icon-label icon="read" text="Defs" />
      </RouterLink>
      <sub-nav />
    </section>

    <section>
      <RouterLink to="/about">
        <icon-label icon="info" text="About" />
      </RouterLink>
    </section>

    <section>
      <RouterLink to="/export">
        <icon-label icon="export" text="Export" />
      </RouterLink>
    </section>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-direction: column;
}

section {
  margin: 0 -8px;
  border-radius: 6px;
  transition: background-color 0.3s;

  &:has(.router-link-active) {
    background-color: var(--page);
    outline: 1px solid var(--light-border);
  }

  a {
    font-weight: bold;
    display: block;
    padding: 8px;
  }
}
</style>
