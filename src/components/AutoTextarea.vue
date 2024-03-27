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
  <textarea
    ref="textareaRef"
    :value="modelValue"
    @input="updateModelValue"
    name="filed"
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
