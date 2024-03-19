<script setup lang="ts">
import { useSettingStore } from '@/stores/setting'
const settingStore = useSettingStore()
</script>

<template>
  <main>
    <h2>Setting (WIP)</h2>
    <form>
      <fieldset>
        <legend>提取字段</legend>
        <ul>
          <li v-for="field in settingStore.extractFields">{{ field }}</li>
        </ul>
      </fieldset>
    </form>
  </main>
</template>

<style scoped></style>
