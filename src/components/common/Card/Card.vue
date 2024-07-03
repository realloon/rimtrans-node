<script setup lang="ts">
withDefaults(
  defineProps<{
    padding?: number
  }>(),
  {
    padding: 16,
  }
)
</script>

<template>
  <section class="card" :style="`padding: ${padding}px;`">
    <slot></slot>
  </section>
</template>

<style scoped>
.card {
  border: 1px solid var(--light-border);
  border-radius: 8px;
  background-color: var(--panel);
}
</style>
