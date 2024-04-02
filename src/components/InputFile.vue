<script setup lang="ts">
import { IconLabel } from '@/components'
import loadFile from '@/helper/InputFile'
import { useProjectStore } from '@/stores/project'
const project = useProjectStore()

const handle = (event: Event) => {
  loadFile(event)
}
</script>

<template>
  <button :class="project.projectName ? 'warn' : 'theme'">
    <icon-label icon="folder" text="加载新项目" />
    <input @change="handle" type="file" accept=".zip, .rnp" />
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
