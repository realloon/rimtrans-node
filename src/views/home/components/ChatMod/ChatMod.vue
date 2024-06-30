<script setup lang="ts">
import chat from '@/assets/images/chat.png'
</script>

<template>
  <div class="chat-mod">
    <span>710882819</span>
    <img :src="chat" />
  </div>
</template>

<style scoped>
.chat-mod {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: bold;
  font-family: var(--mono);
  padding-left: 10px;
  border: 1px solid var(--border);
  border-radius: 16px;
  color: white;
  background-color: #262626;
}

img {
  width: 120px;
  height: 120px;
  border-radius: 16px;
}
</style>
