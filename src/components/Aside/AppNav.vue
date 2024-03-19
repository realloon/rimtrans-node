<script setup lang="ts">
import SubMenu from './SubMenu.vue'
import { IconLabel } from '../common'
import { useCategoriesStore } from '@/stores/categories'
const categoriesStore = useCategoriesStore()
</script>

<template>
  <nav v-show="categoriesStore.categories.size > 0">
    <RouterLink to="/defs" class="defs">
      <icon-label
        @click="categoriesStore.currentCategory = null"
        icon="read"
        text="Defs"
      />
      <sub-menu />
    </RouterLink>

    <RouterLink to="/about"><icon-label icon="info" text="About" /></RouterLink>

    <RouterLink to="/export"
      ><icon-label icon="export" text="Export"
    /></RouterLink>
  </nav>
</template>

<style scoped>
nav {
  margin: 0 -8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

a {
  font-weight: bold;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover,
  &.router-link-active {
    outline: 1px solid var(--light-border);
  }

  &.router-link-active {
    background-color: var(--page);
  }
}

.defs {
  cursor: unset;

  div {
    width: 100%;
    cursor: pointer;
  }
}
</style>
