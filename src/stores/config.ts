import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore(
  'config',
  () => {
    const extractFields = reactive([
      'label',
      'description',
      'jobString',
      'helpText',
      'formatString',
    ])

    const translateConfig = reactive({
      appKey: '739c5d5167c5bf35',
      key: 'QVqaeZ1ULFULJLJ0VNdp7gt01S4AwrZC',
      vocabId: '665A56AEF2A542F6B900C83F9A4C32E8',
    })

    return { extractFields, translateConfig }
  },
  {
    persist: true,
  }
)
