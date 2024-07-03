<script setup lang="ts"></script>

<template>
  <section class="card">
    <slot></slot>
  </section>
</template>

<style scoped>
.card {
  border: 1px solid var(--light-border);
  padding: 16px 24px;
  border-radius: 8px;
  background-color: var(--panel);
}
</style>
