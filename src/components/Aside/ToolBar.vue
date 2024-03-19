<script setup lang="ts">
import {Icon} from '../common'
</script>

<template>
  <section>
    <button><icon type="set" /></button>
    <button><icon type="search" /></button>
  </section>
</template>

<style scoped>
section {
  margin: -16px;
  border-top: 1px solid #e7e9ec;
  padding: 8px;
  display: flex;
  gap: 8px;
}

button {
  box-sizing: border-box;
  border: 0;
  width: 48px;
  height: 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.2s;
  background-color: white;

  & > span {
    font-size: 16px;
  }

  &:hover {
    outline: 2px solid #5c95ba;
  }
}
</style>
