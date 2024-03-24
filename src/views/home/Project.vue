<script setup lang="ts">
import Progression from '@/components/Progression.vue'
import InputFile from '@/components/InputFile.vue'
import { IconLabel } from '@/components/common'

function clear() {
  if (!confirm('这会将当前项目清空，且删除浏览器本地缓存！')) return

  localStorage.clear()
  location.reload()
}
</script>

<template>
  <h2>Project (WIP)</h2>

  <Progression />

  <section class="buttons">
    <input-file />
    <button @click="clear">
      <icon-label icon="close0" text="清空工作区" />
    </button>
  </section>
</template>

<style scoped>
.buttons {
  display: flex;
  gap: 1rem;

  & > button {
    outline: 2px solid transparent;
    outline-offset: -2px;
    transition: 0.4s;
    &:hover {
      color: var(--warn);
      outline-color: var(--warn);
    }
  }
}
</style>
