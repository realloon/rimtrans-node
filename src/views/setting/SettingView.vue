<script setup lang="ts">
import { EditList } from '@/components'
import { useSettingStore } from '@/stores/setting'
import { useProjectStore } from '@/stores/project'
const setting = useSettingStore()
const project = useProjectStore()

const resetCache = () => {
  if (!confirm('这将清空浏览器保存的全部本地数据！')) return

  project.$reset()
}
</script>

<template>
  <main>
    <h2>Setting (WIP)</h2>
    <form>
      <edit-list
        icon="search1"
        :list="setting.extractFields"
        :header="'提取字段'"
        orderly
      />
    </form>

    <section class="card">
      <button @click="resetCache" class="warn">重置全部缓存</button>
    </section>
  </main>
</template>

<style scoped></style>
