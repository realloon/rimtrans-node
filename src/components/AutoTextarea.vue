<script setup lang="ts">
import { ref, watch, onMounted, withDefaults } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
  }>(),
  {
    modelValue: '',
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const updateModelValue = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const value = target.value
  emit('update:modelValue', value)
  adjustHeight(target)
}

const adjustHeight = (element: HTMLTextAreaElement) => {
  element.style.height = 'auto'
  element.style.height = `${element.scrollHeight}px`
}

watch(
  () => props.modelValue,
  newValue => {
    const textarea = textareaRef.value
    if (!textarea) return
    textarea.value = newValue
    adjustHeight(textarea)
  }
)

onMounted(() => {
  const textarea = textareaRef.value
  if (!textarea) return
  adjustHeight(textarea)
})
</script>

<template>
  <textarea ref="textareaRef" :value="modelValue" @input="updateModelValue" />
</template>

<style scoped>
textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 1em;
  font-size: 1rem;
  line-height: 1.5;
  font-family: var(--mono);
  resize: none;
  overflow: hidden;
  background-color: var(--panel);
  border: 1px solid var(--light-border);
  border-radius: 8px;
  outline-color: var(--theme);
  outline: none;
}

textarea:focus {
  border-color: var(--theme);
}
</style>
