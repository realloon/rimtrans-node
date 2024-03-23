<script setup lang="ts">
import InputFile from './InputFile.vue'
import AppNav from './AppNav.vue'
import ToolBar from './ToolBar.vue'
import { Spacer, Icon } from '../common'
import { RouterLink } from 'vue-router'
import { useAboutStore } from '@/stores/about'
const aboutStore = useAboutStore()
</script>

<template>
  <aside>
    <section>
      <h1>
        <a href="https://github.com/realloon/rimtrans-node">Rimtrans Node</a>
      </h1>
    </section>

    <router-link class="project-wrapper" to="/">
      <Icon type="project" />
      <span class="project-name">{{ aboutStore.about.name }}</span>
    </router-link>

    <app-nav />

    <spacer />

    <ToolBar />
  </aside>
</template>

<style scoped>
aside {
  position: sticky;
  top: 0;
  width: 100%;
  max-width: 240px;
  background-color: var(--panel);
  padding: 16px 24px;
  border-right: 1px solid var(--light-border);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h1 {
  font-size: 1.5rem;
  margin: 0;
}

.project-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 4px 8px;
  margin: 0 -8px;
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
</style>
