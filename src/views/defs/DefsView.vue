<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AutoTextarea from '@/components/AutoTextarea.vue'
import Preview from './Preview.vue'
import { useNodesStore } from '@/stores/nodes'

const nodesStore = useNodesStore()
const route = useRoute()

const defs = computed(() =>
  route.params.category !== ''
    ? nodesStore.defs.filter(def => def.folder === route.params.category)
    : nodesStore.defs
)
</script>

<template>
  <main>
    <h2>{{ route.params.category || 'All Defs' }}</h2>
    <form>
      <fieldset v-for="def in defs" :key="def.id">
        <legend>
          {{ def.tagName }}
          <input
            type="checkbox"
            :disabled="def.translated === ''"
            v-model="def.completed"
            name="completed"
          />
        </legend>
        <blockquote class="original">{{ def.content }}</blockquote>
        <preview v-if="def.content?.includes('\\n')" :text="def.content" />
        <auto-textarea
          v-model="def.translated"
          :placeholder="def.content"
          name="filed"
        />
        <preview
          v-if="def.translated?.includes('\\n')"
          :text="def.translated"
        />
      </fieldset>
    </form>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

fieldset {
  margin: 0;
  padding: 0;
  border: none;
}

legend {
  font-weight: bold;
  margin: 0;
  padding: 0;
  line-height: 1;
  font-size: 1rem;
  color: var(--theme);
  /*  */
  display: flex;
  align-items: center;
  gap: 0.25em;

  input {
    margin: 0;
  }
}

.original {
  font-family: var(--mono);
  font-size: 1rem;
  line-height: 1.3;
  margin: 16px 0;
  border-left: 0.3em solid var(--lighter);
  padding-left: 0.7em;
}
</style>
