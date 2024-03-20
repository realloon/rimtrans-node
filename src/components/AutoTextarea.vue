<script setup lang="ts">
import { ref, watch, onMounted, type Ref } from 'vue'

interface Props {
  modelValue: string
}

// 定义属性和事件
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
})

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void
}>()

// 创建 textarea 引用
const textareaRef: Ref<HTMLTextAreaElement | null> = ref(null)

// 更新 modelValue 和调整高度
const updateModelValue = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  const value = target.value
  // 发送 update:modelValue 事件，允许 v-model 双向绑定
  emit('update:modelValue', value)
  adjustHeight(target)
}

// 调整 textarea 高度的方法
const adjustHeight = (element: HTMLTextAreaElement) => {
  element.style.height = 'auto'
  element.style.height = `${element.scrollHeight}px`
}

// 监听 modelValue 的变化
watch(
  () => props.modelValue,
  newValue => {
    const textarea = textareaRef.value
    if (textarea) {
      textarea.value = newValue
      adjustHeight(textarea)
    }
  }
)

// 初始加载时调整 textarea 高度
onMounted(() => {
  const textarea = textareaRef.value
  if (textarea) {
    adjustHeight(textarea)
  }
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
