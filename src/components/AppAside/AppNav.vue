<script setup lang="ts">
import SubNav from './SubNav.vue'
import { Icon, IconLabel } from '../'
import { useProjectStore } from '@/stores/project'
const project = useProjectStore()
</script>

<template>
  <nav>
    <router-link class="project-wrapper" to="/">
      <Icon type="project" />
      <span class="project-name">{{ project.projectName || 'WorkSpace' }}</span>
    </router-link>

    <div class="menu" :class="project.projectName && 'show'">
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

.menu {
  transform: scaleY(0);
  transform-origin: top center;
  transition: 0.4s;

  &.show {
    transform: scaleY(1);
  }
}
</style>
