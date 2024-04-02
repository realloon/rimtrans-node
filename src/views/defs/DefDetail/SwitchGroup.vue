<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  group: string[]
}>()

const emit = defineEmits<{
  (event: 'change', value: string): string
}>()

const selected = ref(props.group[0])

function handle(text: string) {
  selected.value = text
  emit('change', text)
}
</script>

<template>
  <div class="switch-group">
    <button
      v-for="text in group"
      @click.prevent="handle(text)"
      :class="selected === text && 'active'"
    >
      {{ text }}
    </button>
  </div>
</template>

<style scoped>
.switch-group {
  border-radius: 6px;
  background-color: var(--panel);
  display: flex;
  align-items: center;
  padding: 4px;
}

button {
  font-size: 0.75rem;
  padding: 0.25em 0.5em;
  background-color: transparent;
  border-radius: 4px;
  opacity: 0.7;

  &.active,
  &:hover {
    opacity: 1;
  }

  &.active {
    background-color: var(--page);
  }
}
</style>
