<script setup lang="ts">
import SubNav from './SubNav.vue'
import { Icon, IconLabel } from '../common'
import { useNodesStore } from '@/stores/nodes'
import { useAboutStore } from '@/stores/about'
const { categories } = useNodesStore()
const aboutStore = useAboutStore()
</script>

<template>
  <nav class="menu" v-show="categories.size > 0">
    <router-link class="project-wrapper" to="/">
      <Icon type="project" />
      <span class="project-name">{{ aboutStore.about.name }}</span>
    </router-link>

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

.project-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 8px;
  margin: 0 -8px 0.5rem;
  border-radius: 6px;
  transition: 0.2s;

  &:hover {
    background-color: var(--page);
  }

  .project-name {
    padding: 0;
    display: block;
    font-weight: bold;
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
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
