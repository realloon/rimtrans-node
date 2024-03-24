<script setup lang="ts">
import EditList from '@/components/EditList.vue'
import { useSettingStore } from '@/stores/setting'
const setting = useSettingStore()
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
  </main>
</template>

<style scoped></style>
