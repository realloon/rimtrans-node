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
      return `<span style="color: #${colorCode};">${innerText}</span>`
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
