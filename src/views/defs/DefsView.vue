<script setup lang="ts">
import AutoTextarea from '@/components/AutoTextarea.vue'
import { useNodesStore } from '@/stores/nodes'
import { useCategoriesStore } from '@/stores/categories'

const nodesStore = useNodesStore()
const categoriesStore = useCategoriesStore()
</script>

<template>
  <main>
    <h2>{{ categoriesStore.currentCategory || 'All Defs' }}</h2>
    <form>
      <fieldset v-for="def in nodesStore.groupedDefs" :key="def.tagName">
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
        <auto-textarea v-model="def.translated" :placeholder="def.content" />
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
  border-left: 0.3em solid lightgray;
  padding-left: 0.7em;
}
</style>
