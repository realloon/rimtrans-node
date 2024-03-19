<script setup lang="ts">
import logo from '@/assets/images/logo.png'
import { Icon } from '@/components/common'
const version = '0.4.0'
</script>

<template>
  <main>
    <img :src="logo" alt="logo" />

    <h2 class="title">Rimtrans Node</h2>

    <p class="version">Version {{ version }}</p>

    <article>
      <h2>次时代的 Rimworld Mod 翻译工具</h2>
      <p>开始使用</p>
      <p>
        点击左侧 <icon type="folder" /> 按钮，上传由 Mod 打包的
        <icon type="zip" /> zip 文件。
      </p>
    </article>
  </main>
</template>

<style scoped>
main {
  margin-top: 32px;
  text-align: center;
}

.title {
  font-size: 56px;
  margin-bottom: 0;
}

img {
  width: 248px;
  height: 248px;
}

.version {
  font-size: 1rem;
  font-family: var(--mono);
  margin: 0;
}
</style>
