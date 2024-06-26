<script setup lang="ts">
import type { Def } from '@/types'
import { ref } from 'vue'
import { AutoTextarea } from '@/components'
import Preview from './Preview.vue'
import SwitchGroup from './SwitchGroup.vue'

defineProps<{ def: Def }>()

const emit = defineEmits<{
  (event: 'change', value: Def): void
}>()

const showPreview = ref(false)
</script>

<template>
  <fieldset :key="def.id">
    <section class="legend-wrapper">
      <legend>{{ def.tagName }}</legend>

      <input
        type="checkbox"
        :disabled="def.translated === ''"
        v-model="def.completed"
        @change="emit('change', def)"
        name="completed"
      />

      <switch-group
        :group="['Original', 'Preview']"
        @change="showPreview = $event === 'Preview'"
      />
    </section>

    <!-- original -->
    <blockquote v-show="!showPreview" class="original">
      {{ def.content }}
    </blockquote>
    <preview v-show="showPreview" :text="def.content" />

    <!-- translate -->
    <auto-textarea
      v-show="!showPreview"
      v-model="def.translated"
      @update:model-value="emit('change', def)"
      :placeholder="def.content"
    />
    <preview v-show="showPreview" :text="def.translated" />
  </fieldset>
</template>

<style scoped>
fieldset {
  margin: 0;
  padding: 0;
  border: none;
}

.legend-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;

  legend {
    font-weight: bold;
    color: var(--theme);
    padding: 0;
  }

  input {
    margin: 0;
    margin-right: auto;
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
