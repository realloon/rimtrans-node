<script setup lang="ts">
import IconPreview from '@/components/icons/IconPreview.vue'

const model = defineModel<boolean>()

const props = withDefaults(
  defineProps<{
    content: string
    type?: 'normal' | 'icon'
  }>(),
  {
    type: 'normal',
  }
)

const hasLabel = props.content.includes('\\') || props.content.includes('/')
</script>

<template>
  <button
    @click.prevent="model = !model"
    v-if="hasLabel"
    class="preview-button"
    :class="model && 'open'"
  >
    <icon-preview />
    <span :hidden="type === 'icon'">Preview</span>
  </button>
</template>

<style scoped>
.preview-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  cursor: pointer;
  /* closed */
  color: #bebcbc;
  fill: #bebcbc;
}

.open {
  color: var(--black);
  fill: var(--black);
}
</style>
