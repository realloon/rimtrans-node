<script setup lang="ts">
import Progression from '@/components/Progression.vue'
import InputFile from '@/components/InputFile.vue'

function clear() {
  const isConfirm = confirm('这会将当前项目清空，且删除浏览器本地缓存！')
  if (!isConfirm) return
  localStorage.clear()
  location.reload()
}
</script>

<template>
  <h2>Project (WIP)</h2>

  <div>
    <Progression />

    <input-file />

    <section class="card clear">
      <button @click="clear">清空工作区</button>
    </section>
  </div>
</template>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.clear {
  width: fit-content;

  & button {
    padding: 0;
    border: none;
    background-color: inherit;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
