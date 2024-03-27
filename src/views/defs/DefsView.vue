<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {AutoTextarea} from '@/components'
import Preview from './Preview.vue'
import { useProjectStore } from '@/stores/project'
import { throttle } from '@/utils/index'

const project = useProjectStore()
const route = useRoute()

const counter = ref(1)
const defs = computed(() =>
  (route.params.category !== ''
    ? project.defs.filter(def => def.folder === route.params.category)
    : project.defs
  )
    .filter(def => def.tagName !== '') // Unresolved abstract inheritance fields.
    .slice(0, counter.value * 20)
)

const app = document.querySelector('#app') as Element

const isNearBottom = () =>
  app.scrollHeight - app.scrollTop - app.clientHeight < app.clientHeight

const throttleScroll = throttle(
  () => isNearBottom() && (counter.value += 1),
  300
)

onMounted(() => app.addEventListener('scroll', throttleScroll))
onUnmounted(() => app.removeEventListener('scroll', throttleScroll))
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

.spacer {
  height: 10vh;
}
</style>
