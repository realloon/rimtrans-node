<script setup lang="ts">
import { ref, watch, onMounted, defineProps, defineEmits } from 'vue'

interface Props {
  modelValue: string
  placeholder: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const minHeight = 23 // init height
const height = ref<number>(minHeight) // reactive-height

const resetHeight = () => {
  if (!textareaRef.value) return

  textareaRef.value.style.height = 'inherit'
}

const autoResize = () => {
  resetHeight()

  if (!textareaRef.value) return

  const newHeight = Math.max(textareaRef.value.scrollHeight, minHeight) // 计算新高度
  height.value = newHeight // updat reactive-height
}

const handle = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  autoResize() // updata
  emit('update:modelValue', target.value) // TODO: trim space
}

onMounted(autoResize) // init

watch(() => props.modelValue, autoResize)
</script>

<template>
  <textarea
    name="textarea"
    ref="textareaRef"
    :value="modelValue"
    @input="handle"
    :style="{ minHeight: minHeight + 'px', height: height + 'px' }"
    :placeholder="placeholder"
  ></textarea>
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
  background-color: #f5f6f8;
  border: 1px solid #eef0f4;
  border-radius: 8px;

  &:focus-within {
    outline-color: var(--theme);
  }
}
</style>
