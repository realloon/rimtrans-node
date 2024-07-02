<script setup lang="ts">
import { EditList, InputBox } from '@/components'
import { useSettingStore } from '@/stores/setting'
import { useProjectStore } from '@/stores/project'
const setting = useSettingStore()
const project = useProjectStore()

const resetCache = () => {
  if (!confirm('这将清空浏览器保存的全部本地数据！')) return

  project.$reset()
}
</script>

<template>
  <main>
    <h2>Setting (WIP)</h2>
    <form>
      <edit-list
        icon="search1"
        :list="setting.extractFields"
        :header="'提取字段'"
        orderly
      />
    </form>

    <form>
      <div class="wrapper">
        <input-box
          label="appKey"
          v-model.trim="setting.translateConfig.appKey"
          placeholder="输入你申请的应用 ID"
          name="name"
        />

        <input-box
          label="key"
          v-model.trim="setting.translateConfig.key"
          placeholder="输入你申请的应用密匙"
          name="name"
        />

        <input-box
          label="vocabId"
          v-model.trim="setting.translateConfig.vocabId"
          placeholder="输入你申请的词表 ID"
          name="name"
        />
      </div>
    </form>

    <section class="card">
      <button @click="resetCache" class="warn">重置全部缓存</button>
    </section>
  </main>
</template>

<style scoped>
.wrapper {
  background-color: var(--panel);
  padding: 1rem;
  border: 1px solid var(--light-border);
  margin-top: 0.5em;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  label:not(:last-child) {
    padding-bottom: 0.75em;
    border-bottom: 1px solid var(--lighter);
    margin-bottom: 0.75em;
  }
}
</style>
