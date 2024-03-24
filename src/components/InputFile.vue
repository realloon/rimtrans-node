<script setup lang="ts">
import { IconLabel } from '@/components/common'
import { loadFile } from '@/helper/InputFile'
</script>

<template>
  <button>
    <icon-label icon="folder" text="加载新项目" />

    <input @change="loadFile" type="file" accept=".zip, .rnp" />
  </button>
</template>

<style scoped>
button {
  position: relative;
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

  &::-webkit-file-upload-button {
    display: none;
  }
}
</style>
