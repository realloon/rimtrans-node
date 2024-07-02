<script setup lang="ts">
import { ref } from 'vue'
import { IconLabel } from '@/components'
import Progression from '@/components/Progression.vue'
import outputMod from './helper/outputMod'
import { LormButton, LormSelect } from '@/components/common'

const language = ref('')
const languages = [
  {
    key: 'ChineseSimplified',
    text: '简体中文',
  },
]

const exportProject = async () => {}
</script>

<template>
  <main>
    <h2>Export</h2>

    <Progression />

    <section class="card">
      <h3>保存项目</h3>
      <p>
        保存当前项目，储存为
        <code>.rnp</code> 项目文件，<br />这适用于在不同设备间同步进度。
      </p>
      <lorm-button @click="exportProject" text="保存" />
    </section>

    <section class="card">
      <h3>生成模组</h3>
      <p>输出当前项目，生成 Mod 文件夹压缩包，<br />这适用于发布 Mod 文件。</p>

      <div class="lang-select">
        <span>目标语言：</span>
        <lorm-select :data="languages" v-model="language" />
      </div>

      <lorm-button @click="outputMod" text="生成" />
    </section>
  </main>
</template>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
}

.lang-select {
  display: flex;
  align-items: baseline;
}
</style>
