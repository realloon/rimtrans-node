<script setup lang="ts">
import Progression from '@/components/Progression.vue'
import InputFile from '@/components/InputFile'
import { Button } from '@/components/common'
import { useProjectStore } from '@/stores/project'
import { Card } from '@/components/common'

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

  <div class="btns-wrapper">
    <input-file />
    <Button type="warn" disabled>清空工作区</Button>
  </div>
</template>

<style scoped>
.cover {
  width: 100%;

  & > img {
    display: block;
    width: 100%;
  }
}

.btns-wrapper {
  display: flex;
  gap: 1rem;

  button {
    background-color: var(--panel);
  }
}
</style>
