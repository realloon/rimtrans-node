<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

defineProps<{
  name?: string
}>()

const model = defineModel<string>()

const textareaRef = ref<HTMLTextAreaElement>()

function adjustHeight() {
  const element = textareaRef.value
  if (!element) return

  element.style.height = 'auto'
  element.style.height = `${element.scrollHeight}px`
}

function trim() {
  model.value = model.value!.trim()
}

onMounted(adjustHeight)
watch(model, adjustHeight) // in order to respond to AI translate modifications.
</script>

<template>
  <textarea
    ref="textareaRef"
    v-model="model"
    @change="trim"
    :name="name ?? 'field'"
  ></textarea>
</template>

<style scoped>
textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
  border: none;
  border-radius: 8px;
  outline-offset: -1px;
  font-size: 1rem;
  line-height: 1.5;
  font-family: var(--mono);
  background-color: var(--panel);
  resize: none;
  overflow: hidden;
}

textarea:focus {
  outline-color: var(--theme);
}
</style>
