<script setup lang="ts">
import AppNav from './AppNav.vue'
import ToolBar from './ToolBar.vue'
import { Spacer } from '../common'
</script>

<template>
  <aside>
    <section>
      <h1>
        <a href="https://github.com/realloon/rimtrans-node">Rimtrans Node</a>
      </h1>
    </section>

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
</style>
