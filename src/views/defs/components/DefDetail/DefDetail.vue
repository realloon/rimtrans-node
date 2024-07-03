<script setup lang="ts">
import type { Def } from '@/types'
import { ref } from 'vue'
// Componets
import { AutoTextarea } from '@/components'
import PreviewButton from './components/PreviewButton.vue'
import Preview from './components/Preview'
import AITranslate from './components/AITranslate'

defineProps<{ def: Def }>()

const emit = defineEmits<{
  (event: 'change', value: Def): void
}>()

const showOriginalPreview = ref(false)
const showTranslatePreview = ref(false)
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

      <preview-button :content="def.content" v-model="showOriginalPreview" />

      <AITranslate :def="def" />
    </section>

    <section>
      <!-- original -->
      <blockquote v-if="!showOriginalPreview" class="original">
        {{ def.content }}
      </blockquote>

      <preview v-else :text="def.content" />
    </section>

    <section class="translate-wrapper">
      <auto-textarea
        v-if="!showTranslatePreview"
        v-model="def.translated"
        @update:model-value="emit('change', def)"
        placeholder="Input translation"
      />

      <preview v-else :text="def.translated" />

      <div class="hover-tools">
        <preview-button
          :content="def.translated"
          v-model="showTranslatePreview"
          type="icon"
        />
      </div>
    </section>
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

.trans {
  color: #3f51b5;
  font-size: 0.875rem;
  font-weight: bolder;
  cursor: pointer;
  /* gradient */
  background: linear-gradient(to right, #9c27b0, #3f51b5);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.translate-wrapper {
  position: relative;

  .hover-tools {
    position: absolute;
    top: 0;
    right: -1.5rem;
  }
}
</style>
