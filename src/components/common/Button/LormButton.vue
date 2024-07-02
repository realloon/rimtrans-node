<script setup lang="ts">
defineProps<{
  text: string
  type?: 'prime' | 'warn'
}>()
</script>

<template>
  <button class="lorm-button" :class="type ?? 'prime'" v-bind="$attrs">
    {{ text }}
  </button>
</template>

<style scoped>
.lorm-button {
  font-size: 0.85rem;
  padding: 0.5em 1.5em;
  border: none;
  background-color: var(--page);
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  /* transition */
  outline: 2px solid transparent;
  outline-offset: -2px;
  transition: 0.4s;
}

.lorm-button.theme:hover {
  color: var(--theme);
  outline-color: var(--theme);
}

.lorm-button.warn:hover {
  color: var(--warn);
  outline-color: var(--warn);
}
</style>
