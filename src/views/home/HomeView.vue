<script setup lang="ts">
import logo from '@/assets/images/logo.png'
import chat from '@/assets/images/chat.png'
import { Icon } from '@/components/common'
const version = '0.4.2'
</script>

<template>
  <main>
    <img :src="logo" alt="logo" />

    <h2 class="title">Rimtrans Node</h2>

    <p class="version">Version {{ version }} <icon type="experiment" /></p>

    <article>
      <h2>次时代的 Rimworld Mod 翻译工具</h2>
      <p>
        点击左侧 <icon type="folder" /> 按钮，上传由 Mod 打包的
        <icon type="zip" /> .zip 文件或 <icon type="project" /> .rnp 项目文件。
      </p>
      <p class="warn">
        Rimtrans Node 正处于早期开发阶段，<br />为避免意外情况，请勿
        <icon type="error" /> 用于正式翻译项目。
      </p>
      <div class="chat">
        <img :src="chat" />
        <span> 710882819 </span>
      </div>
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
  color: red;
}
.chat {
  display: flex;
  align-items: center;
  width: fit-content;
  font-size: 1rem;
  font-weight: bold;
  font-family: var(--mono);
  padding-right: 12px;
  border: 1px solid black;
  border-radius: 16px;
  margin: 0 auto;
  color: white;
  background-color: #262626;

  img {
    max-width: 320px;
    border-radius: 16px;
  }
}
</style>
