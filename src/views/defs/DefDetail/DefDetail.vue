<script setup lang="ts">
import type { Def } from '@/types'
import { ref } from 'vue'
import { AutoTextarea } from '@/components'
import Preview from './Preview.vue'

const showPreview = ref(false)

defineProps<{ def: Def }>()
</script>

<template>
  <fieldset :key="def.id">
    <section class="legend-wrapper">
      <legend>{{ def.tagName }}</legend>

      <input
        type="checkbox"
        :disabled="def.translated === ''"
        v-model="def.completed"
        name="completed"
      />

      <div class="button-wrapper">
        <button
          @click.prevent="showPreview = false"
          :class="!showPreview && 'active'"
        >
          Original
        </button>
        <button
          @click.prevent="showPreview = true"
          :class="showPreview && 'active'"
        >
          Preview
        </button>
      </div>
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
    /* flex-grow: 1; */
  }

  input {
    margin: 0;
    margin-right: auto;
  }

  .button-wrapper {
    padding: 4px;
    border: 1px solid var(--light-border);
    border-radius: 6px;
    background-color: var(--panel);
    display: flex;
    align-items: center;
    gap: 4px;

    button {
      font-size: 0.75rem;
      padding: 0.25em 0.5em;
      background-color: transparent;
      border-radius: 3px;
      opacity: 0.7;

      &.active,
      &:hover {
        opacity: 1;
      }

      &.active {
        background-color: var(--page);
      }
    }
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
