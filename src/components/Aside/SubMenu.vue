<script setup lang="ts">
import { nanoid } from 'nanoid';
import { useCategoriesStore } from '@/stores/categories'
const categoriesStore = useCategoriesStore()
</script>

<template>
  <ul class="category-wrapper">
    <li
      v-for="item in categoriesStore.categories"
      @click="categoriesStore.currentCategory = item"
      :class="categoriesStore.currentCategory === item && 'active'"
      :key="nanoid()"
    >
      {{ item }}
    </li>
  </ul>
</template>

<style scoped>
.category-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 8px 0 0;
  list-style: none;

  li {
    font-size: 0.8rem;
    line-height: 1rem;
    padding: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    border-radius: 3px;
    transition: background-color .2s;
    cursor: pointer;

    &:hover {
      outline: 2px solid var(--light-border);
      outline-offset: -1px;
    }

    &.active {
      background-color: var(--light-border);
    }
  }
}
</style>
