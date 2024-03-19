<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  text: String,
})

const html = computed(() => {
  const colorTagRegex: RegExp = /<color=#([a-fA-F0-9]{6})>(.*?)<\/color>/gi

  let convertedText: string = (props.text as string).replace(
    colorTagRegex,
    (_, colorCode, innerText) => {
      return `<span style="color: #${colorCode}; font-weight: bold">${innerText}</span>`
    }
  )

  convertedText = convertedText.replace(/\\n/g, '<br />')

  return convertedText
})
</script>

<template>
  <div v-html="html" class="preview"></div>
</template>

<style>
.preview {
  padding: 1rem;
  outline: 0.3em dashed var(--lighter);
  outline-offset: -0.3em;
  margin-bottom: 1rem;
}
</style>
