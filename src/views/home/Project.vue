<script setup lang="ts">
import Progression from '@/components/Progression.vue'
import { IconLabel, InputFile } from '@/components'
import { useProjectStore } from '@/stores/project'

const project = useProjectStore()

function clear() {
  if (!confirm('这会将当前项目清空，且删除浏览器本地缓存！')) return

  localStorage.clear()
}
</script>

<template>
  <h2>Project (WIP)</h2>

  <div class="cover">
    <img :src="project.coverUrl" alt="" />
  </div>

  <Progression />

  <section class="buttons">
    <input-file />
    <button disabled @click="clear" class="warn">
      <icon-label icon="close0" text="清空工作区" />
    </button>
  </section>
</template>

<style scoped>
.cover {
  width: 100%;

  & > img {
    display: block;
    width: 100%;
  }
}

.buttons {
  display: flex;
  gap: 1rem;
}

button:disabled {
  cursor: not-allowed;
}
</style>
