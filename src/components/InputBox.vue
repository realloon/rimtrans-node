<script setup lang="ts">
defineProps<{
  modelValue: ''
  label: string
}>()

const emit = defineEmits(['update:modelValue'])

function updateValue(event: Event) {
  const inputElement = event.target as HTMLInputElement
  if (inputElement) {
    emit('update:modelValue', inputElement.value.trim())
  }
}
</script>

<template>
  <label>
    <input :value="modelValue" @input="updateValue" v-bind="$attrs" />
    <span>{{ label }}</span>
  </label>
</template>

<style scoped>
label {
  margin-right: -1rem;
  position: relative;
  display: block;
}

input {
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 1.5;
  width: 100%;
  padding: 0 0.5em;
  border: 0;
  outline: none;
  background-color: transparent;
}

span {
  color: gray;
  position: absolute;
  right: 1rem;
}
</style>
