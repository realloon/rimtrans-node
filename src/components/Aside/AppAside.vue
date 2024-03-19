<script setup lang="ts">
import InputFile from './InputFile.vue'
import AppNav from './AppNav.vue'
import ToolBar from './ToolBar.vue'
import { Spacer } from '../common'
</script>

<template>
  <aside>
    <section class="title-wrapper">
      <h1>Rimtrans Node</h1>
    </section>

    <input-file />

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
  background-color:  var(--panel);
  padding: 16px 24px;
  border-right: 1px solid var(--light-border);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.title-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5em;

  h1 {
    font-size: 1.5rem;
    margin: 0;
  }
}
</style>
