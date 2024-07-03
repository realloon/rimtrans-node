<script setup lang="ts">
import type { Def } from '@/types'
import { ref, computed, toRaw, onMounted } from 'vue'
import DefDetail from './components/DefDetail'
import { useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import useScrollLoad from '@/hooks/useScrollLoad'
import useBean from '@/hooks/useBean'
import { debounce } from '@/utils'

const route = useRoute()
const project = useProjectStore()
const { counter } = useScrollLoad()

const defs = computed(() =>
  (route.params.category !== ''
    ? project.defs.filter(def => def.folder === route.params.category)
    : project.defs
  )
    .filter(def => def.tagName !== '') // Unresolved abstract inheritance fields.
    .slice(0, counter.value * 20)
)

// Can it be done better?
const store = ref()

onMounted(async () => {
  const { storeDefs } = await useBean()
  store.value = storeDefs
})

const update = debounce((def: Def) => store.value.put(toRaw(def)), 300)
</script>

<template>
  <main>
    <h2>{{ route.params.category || 'All Defs' }}</h2>
    <form>
      <def-detail v-for="def in defs" :def="def" @change="update(def)" />

      <div class="spacer"></div>
    </form>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.spacer {
  height: 10vh;
}
</style>
