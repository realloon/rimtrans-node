<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  text: string
}>()

const html = computed(() => {
  const regex = /<color=(#[a-fA-F0-9]{6})>(.*?)<\/color>/gi

  const convertedText = props.text.replace(regex, (_, color, text) => 
    `<span style="color: ${color};">${text}</span>`
  )

  return convertedText.replace(/\\n/g, '<br />')
})
</script>

<template>
  <div v-html="html" class="preview"></div>
</template>

<style>
.preview {
  padding: 1rem;
  outline-offset: -0.3em;
  margin-bottom: 1rem;
  /* preview */
  color: white;
  line-height: 1.3;
  background-color: #15181d;

  span {
    font-weight: bold;
  }
}
</style>
