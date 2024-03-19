<script setup lang="ts">
import { ref, computed } from 'vue'
import { IconLabel } from '@/components/common'
import { useNodesStore } from '@/stores/nodes'
import { useAboutStore } from '@/stores/about'
import saveFile from '@/utils/saveFile'
import { outputMod } from '@/helper/ExportView'

const nodesStores = useNodesStore()
const aboutStore = useAboutStore()

const language = ref('ChineseSimplified')
const languages = { ChineseSimplified: '简体中文' }

const total = computed(() => nodesStores.defs.length)
const completed = computed(
  () => nodesStores.defs.filter(def => def.completed).length
)

const exportProject = () => {
  const defs = nodesStores.defs
  const about = aboutStore.about

  saveFile(`${about?.name}_${Date.now()}.rnp`, JSON.stringify({ defs, about }))
}
</script>

<template>
  <main>
    <h2>Export</h2>

    <section>
      <h3 style="font-size: 1.25rem">{{ aboutStore.about.name }}</h3>
      <p>已翻译 {{ completed }} / {{ total }} 条</p>
      <progress :max="total" :value="completed" style="width: 100%"></progress>
    </section>

    <section class="download">
      <h3>保存项目</h3>
      <p>
        保存当前项目，储存为
        <code>.rnp</code> 项目文件，<br />这适用于在不同设备间同步进度。
      </p>
      <button @click="exportProject">
        <icon-label icon="download" text="保存" size="21" />
      </button>
    </section>

    <section class="output">
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
section {
  margin-bottom: 32px;
  border: 1px solid var(--light-gray);
  padding: 16px 24px;
  border-radius: 8px;
  background-color: #f5f6f8;

  h3 {
    font-size: 1rem;
    margin: 0;
  }

  p {
    margin: 0.5em 0;
  }
}

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
  border: 1px solid var(--light-gray);
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: white;
    background-color: var(--theme);
  }
}
</style>
