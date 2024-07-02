<script setup lang="ts">
defineProps<{
  label: string
}>()

const model = defineModel()
</script>

<template>
  <label>
    <input v-model="model" v-bind="$attrs" />
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
