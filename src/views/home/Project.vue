<script setup lang="ts">
import { computed } from 'vue'
import Progression from '@/components/Progression.vue'
import InputFile from '@/components/InputFile.vue'
import { IconLabel } from '@/components/common'
import { useProjectStore } from '@/stores/project'
const project = useProjectStore()

const cover = computed<string | undefined>(() =>
  project.cover ? URL.createObjectURL(project.cover) : undefined
)

function clear() {
  if (!confirm('这会将当前项目清空，且删除浏览器本地缓存！')) return

  localStorage.clear()
  location.reload()
}
</script>

<template>
  <h2>Project (WIP)</h2>

  <img :src="cover" alt="" />

  <Progression />

  <section class="buttons">
    <input-file />
    <button @click="clear" class="warn">
      <icon-label icon="close0" text="清空工作区" />
    </button>
  </section>
</template>

<style scoped>
img {
  border-radius: 8px;
}

.buttons {
  display: flex;
  gap: 1rem;
}
</style>
