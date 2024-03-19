<script setup lang="ts">
import Icon from './Icon.vue'
const props = defineProps<{
  icon: string
  text: string
  size?: string
}>()
</script>

<template>
  <div class="icon-label">
    <icon :type="props.icon" :size="size" />
    <span>{{ props.text }}</span>
  </div>
</template>

<style scoped>
.icon-label {
  width: fit-content;
  display: flex;
  gap: .5em;
  align-items: center;
}
</style>
