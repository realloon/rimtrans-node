<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '../common'
</script>

<template>
  <section>
    <RouterLink to="/setting"
      ><button><icon type="set" /></button
    ></RouterLink>
    <button><icon type="search" /></button>
  </section>
</template>

<style scoped>
section {
  margin: -16px;
  border-top: 1px solid var(--border);
  padding: 8px;
  display: flex;
  gap: 8px;
}

button {
  box-sizing: border-box;
  border: 0;
  width: 48px;
  height: 24px;
  border-radius: 8px;
  cursor: pointer;
  background-color: var(--page);
  opacity: 0.5;
  transition: 0.2s;

  & > span {
    font-size: 16px;
  }

  &:hover {
    opacity: 1;
    outline: 2px solid #5c95ba;
  }
}
</style>
