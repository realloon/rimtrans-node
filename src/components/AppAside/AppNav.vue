<script setup lang="ts">
import { computed } from 'vue'
import SubNav from './SubNav.vue'
import { Icon, IconLabel } from '../'
import { useProjectStore } from '@/stores/project'
const project = useProjectStore()

const text = computed(() => project.about.name || 'Workspace')
</script>

<template>
  <nav class="menu">
    <router-link class="project-wrapper" to="/">
      <Icon type="project" />
      <span class="project-name">{{ text }}</span>
    </router-link>

    <div v-show="project.hasProject">
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
    </div>
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
