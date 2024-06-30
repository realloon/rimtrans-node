<script setup lang="ts">
import { ref } from 'vue'
import { IconLabel } from '@/components'
import Progression from '@/components/Progression.vue'
import outputMod from './helper/outputMod'
import LormSelect from '@/components/Select/LormSelect.vue'

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
      <button @click="exportProject" class="theme">
        <icon-label icon="download" text="保存" size="21" />
      </button>
    </section>

    <section class="card">
      <h3>生成模组</h3>
      <p>输出当前项目，生成 Mod 文件夹压缩包，<br />这适用于发布 Mod 文件。</p>

      <div class="lang-select">
        <span>目标语言：</span>
        <lorm-select :data="languages" v-model="language" />
      </div>

      <button @click="outputMod(language)" class="theme">
        <icon-label icon="export" text="生成" size="20" />
      </button>
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
