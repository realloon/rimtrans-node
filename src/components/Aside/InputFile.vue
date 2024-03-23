<script setup lang="ts">
import { IconLabel } from '@/components/common'
import { loadFile } from '@/helper/InputFile'
</script>

<template>
  <section class="card">
    <div class="input-label">
      <icon-label icon="folder" text="加载新项目" />
    </div>

    <input @change="loadFile" type="file" accept=".zip, .rnp" />
  </section>
</template>

<style scoped>
section {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
}

/* real show */
.input-label {
  display: flex;
  gap: 0.5em;
  align-items: center;
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
