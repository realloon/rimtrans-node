<script setup lang="ts">
defineProps<{
  currentPage: number
  totalPage: number
}>()

const emits = defineEmits(['update:currentPage'])

function changePage(newPage: number) {
  emits('update:currentPage', newPage)
}
</script>

<template>
  <div class="pagination" v-show="totalPage > 1">
    <button
      :class="{ active: page === currentPage }"
      v-for="page in totalPage"
      :key="page"
      @click="changePage(page)"
    >
      {{ page }}
    </button>
  </div>
</template>

<style scoped>
.pagination {
  padding: 16px;
  margin-top: 32px;
  border-radius: 8px;
  background-color: var(--panel);
  border: 1px solid var(--border);
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  justify-items: center;
  gap: 0.75rem;

  button {
    font-weight: bold;
    background-color: var(--page);
    width: 100%;
    aspect-ratio: 1 /1;
    border-radius: 50%;
    padding: 0;
    border: none;
    cursor: pointer;
    transition: 0.2s;

    &.active,
    &:hover {
      color: var(--theme);
    }

    &:hover {
      font-size: 1.2em;
      transform: scale(1.2);
    }
  }
}
</style>
