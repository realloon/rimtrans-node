<script setup lang="ts">
import DefDetail from './DefDetail/DefDetail.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import useScrollLoad from '@/hooks/useScrollLoad'

const project = useProjectStore()
const route = useRoute()
const { counter } = useScrollLoad()

const defs = computed(() =>
  (route.params.category !== ''
    ? project.defs.filter(def => def.folder === route.params.category)
    : project.defs
  )
    .filter(def => def.tagName !== '') // Unresolved abstract inheritance fields.
    .slice(0, counter.value * 20)
)
</script>

<template>
  <main>
    <h2>{{ route.params.category || 'All Defs' }}</h2>
    <form>
      <def-detail v-for="def in defs" :def="def" />

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
