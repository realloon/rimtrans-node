<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useNodesStore } from '@/stores/nodes'
const { categories } = useNodesStore()
</script>
<template>
  <nav class="sub-menu">
    <router-link
      v-for="category in categories"
      :key="category"
      :to="`/defs/${category}`"
      >{{ category }}</router-link
    >
  </nav>
</template>

<style scoped>
.sub-menu {
  margin: -4px 8px 8px;
}

.sub-menu a {
  text-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  line-height: 1rem;
  font-weight: bold;
  padding: 8px;
  border-radius: 4px;
  outline-offset: -1.5px;
  transition: background-color 0.2s;

  &:hover {
    outline: 3px solid var(--panel);
  }

  &.router-link-active {
    background-color: var(--panel);
  }
}
</style>
