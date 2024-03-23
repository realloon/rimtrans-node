<script setup lang="ts">
import { IconLabel } from '@/components/common'
import { loadFile } from '@/helper/InputFile'
</script>

<template>
  <section>
    <icon-label icon="folder" text="加载新项目" />

    <input @change="loadFile" type="file" accept=".zip, .rnp" />
  </section>
</template>

<style scoped>
section {
  position: relative;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background-color: var(--panel);
}

/* native */
input {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  cursor: pointer;
}
</style>
