import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', () => {
  const extractFields = reactive([
    'label',
    'description',
    'jobString',
    'helpText',
    'formatString',
  ])

  return { extractFields }
})
