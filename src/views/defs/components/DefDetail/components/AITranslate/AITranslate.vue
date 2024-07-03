<script setup lang="ts">
import type { Def } from '@/types'
// Components
import IconSparkles from '@/components/icons/IconSparkles.vue'
// Function
import { throttle } from '@/utils'
import translate from './helper/translate'
// Store
import { useSettingStore } from '@/stores/setting'
const settingStore = useSettingStore()
const { appKey, key, vocabId } = settingStore.translateConfig

const props = defineProps<{
  def: Def
}>()

const useTranslate = throttle(async () => {
  const query = props.def.content
  const transed = await translate({ query, appKey, key, vocabId })
  props.def.translated = transed
}, 2000)
</script>

<template>
  <button @click.prevent="useTranslate" class="AI-translate">
    <icon-sparkles style="fill: #9c27b0" />
    <span>Translate</span>
  </button>
</template>

<style scoped>
.AI-translate {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;
  user-select: none;
  cursor: pointer;
}

span {
  font-size: 0.875rem;
  font-weight: bold;
  background: linear-gradient(to right, #9c27b0, #3f51b5);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
</style>
