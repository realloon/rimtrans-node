<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  list: Array<string>
  add: Function
  remove: Function
  // size?: string
}>()

const input = ref('')
</script>

<template>
  <ol>
    <li v-for="item in props.list">
      <div class="item">
        <span>{{ item }}</span>
        <icon @click="remove(item)" type="close0" />
      </div>
    </li>
  </ol>

  <div class="add-wrapper">
    <input v-model.trim="input" name="dependency" type="text" />
    <button @click.prevent="add"><icon type="plus" /></button>
  </div>
</template>

<style scoped></style>
