<script setup lang="ts">
const props = defineProps<{
  type: string
  size?: string
}>()

const query: Record<string, string> = {
  folder: 'icon-folder-open',
  project: 'icon-project',
  code: 'icon-code',
  info: 'icon-info-circle',
  read: 'icon-read',
  set: 'icon-setting',
  search: 'icon-search',
  edit: 'icon-edit',
  check: 'icon-check-circle',
  unit: 'icon-deploymentunit',
  plus: 'icon-plus',
  close0: 'icon-close-circle',
  aim: 'icon-aim',
  zip: 'icon-file-zip-fill',
  out: 'icon-logout',
  download: 'icon-cloud-download',
  export: 'icon-export',
  warn: 'icon-warning-circle',
  error: 'icon-error',
  experiment: 'icon-experiment',
}
</script>

<template>
  <span
    class="iconfont"
    :style="{ fontSize: `${size || 16}px`, lineHeight: 1 }"
    :class="query[props.type]"
  ></span>
</template>
