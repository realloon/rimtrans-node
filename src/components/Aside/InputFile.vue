<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@/components/common'
import { useAboutStore } from '@/stores/about'

import { loadFile } from '@/helper/InputFile'

const aboutStore = useAboutStore()
const projectName = computed(() => aboutStore.about.name)
</script>

<template>
  <section :class="!projectName && 'warn'">
    <div class="input-label">
      <icon :type="projectName ? 'project' : 'folder'" />
      <span class="project-name">{{ projectName || '点击上传文件' }}</span>
    </div>

    <input @change="loadFile" type="file" accept=".zip, .rnp" />
  </section>
</template>

<style scoped>
section {
  position: relative;
  margin: 0 -8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  transition: 0.2s;

  &.warn {
    outline-offset: -2px;
    outline: 2px solid gray;
  }
}

/* show */
.input-label {
  display: flex;
  gap: 0.5em;
  align-items: center;
}

.project-name {
  height: 24px; /* line-height */
  flex-grow: 1;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
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
