<script setup lang="ts">
import { ref } from 'vue'
import { IconLabel } from '@/components/common'
import { useProjectStore } from '@/stores/project'
import Progression from '@/components/Progression.vue'
import saveFile from '@/utils/saveFile'
import { outputMod } from '@/helper/ExportView'

const { defs, about } = useProjectStore()

const language = ref('ChineseSimplified')
const languages = { ChineseSimplified: '简体中文' }

const exportProject = () => {
  saveFile(`${about.name}_${Date.now()}.rnp`, JSON.stringify({ defs, about }))
}
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
      <button @click="exportProject">
        <icon-label icon="download" text="保存" size="21" />
      </button>
    </section>

    <section class="card">
      <h3>生成模组</h3>
      <p>输出当前项目，生成 Mod 文件夹压缩包，<br />这适用于发布 Mod 文件。</p>
      <p>
        目标语言
        <select v-model="language" name="language">
          <option
            v-for="[key, value] in Object.entries(languages)"
            :value="key"
          >
            {{ value }}
          </option>
        </select>
        <span class="language">{{ language }}</span>
      </p>
      <button @click="outputMod(language)">
        <icon-label icon="export" text="生成" size="20" />
      </button>
    </section>
  </main>
</template>

<style scoped>
.language {
  color: var(--theme);
  font-weight: bold;
  font-family: var(--mono);
  padding: 0 1em;
}

button {
  font-size: 1rem;
  font-weight: bold;
  line-height: 32px;
  padding: 0 0.5em;
  border: 1px solid var(--light-border);
  border-radius: 4px;
  background-color: var(--page);
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: var(--page);
    background-color: var(--theme);
  }
}
</style>
