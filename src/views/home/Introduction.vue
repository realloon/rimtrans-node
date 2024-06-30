<script setup lang="ts">
import { ref, onMounted } from 'vue'
import logo from '@/assets/images/logo.png'
import { Icon, InputFile } from '@/components'
import ChatMod from './components/ChatMod'
const version = ref('')

onMounted(async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/realloon/rimtrans-node/main/package.json'
  )
  const data = await res.json()
  version.value = data.version
})
</script>

<template>
  <article>
    <img :src="logo" alt="logo" />
    <h2 class="title">Rimtrans Node</h2>
    <p class="version">Version {{ version }} <icon type="experiment" /></p>
    <h2>次时代的 Rimworld Mod 翻译工具</h2>
    <input-file />
    <p>
      上传由 Mod 打包的 <icon type="zip" /> .zip 文件或
      <icon type="project" /> .rnp 项目文件。
    </p>
    <p class="warn">
      Rimtrans Node 正处于早期开发阶段，<br />为避免意外情况，请勿用于正式翻译项目。
    </p>
  </article>

  <chat-mod />
</template>

<style scoped>
article {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

h1,
h2,
p {
  margin: 0;
  text-align: center;
}

.title {
  font-size: 56px;
}

img {
  width: 160px;
  height: 160px;
}

.version {
  font-size: 1rem;
  font-family: var(--mono);
  margin: 0;
}

/* tmpl */
.warn {
  color: var(--warn);
  font-weight: bold;
}
</style>
