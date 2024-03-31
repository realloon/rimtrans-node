<script setup lang="ts">
import { Icon, IconLabel } from './'
import { ref } from 'vue'
const props = defineProps<{
  icon: string
  header: string
  list: Array<string>
  orderly?: boolean
}>()

const input = ref('')

const add = () => {
  if (props.list.includes(input.value)) return alert('已有重复项目')

  props.list.push(input.value)
  input.value = ''
}

const remove = (source: string) => {
  if (props.list.length <= 1) return alert('至少需要一个项目')

  props.list.forEach(
    (item, index, self) => item === source && self.splice(index, 1)
  )
}
</script>

<template>
  <fieldset>
    <legend><icon-label :icon="props.icon" :text="props.header" /></legend>

    <component :is="orderly ? 'ol' : 'ul'">
      <li v-for="item in props.list" :key="item">
        <span>{{ item }}</span>
        <icon v-if="remove" @click="remove(item)" type="close0" />
      </li>
    </component>

    <div class="add-wrapper">
      <input v-model.trim="input" name="item" type="text" />
      <button @click.prevent="add">
        <icon type="plus" />
      </button>
    </div>
  </fieldset>
</template>

<style scoped>


legend {
  color: var(--theme);
  font-weight: bold;
  position: unset;
  padding: 0;
}

ul,
ol {
  font-family: var(--mono);
  background-color: var(--panel);
  padding: 1rem 1rem 1rem 3rem;
  border: 1px solid var(--light-border);
  margin: 0.5em 0;
  border-radius: 8px;
}

li {
  position: relative;

  &:hover {
    text-decoration: underline;
  }

  /* remove button */
  span:last-child {
    position: absolute;
    top: 4px;
    right: 0;
    opacity: 0;
    transition: 0.2s;
    cursor: pointer;
  }

  &:hover span:last-child {
    opacity: 1;
  }
}

.add-wrapper {
  width: fit-content;

  button {
    width: 32px;
    height: 32px;
    background-color: var(--panel);
    border-radius: 50%;
    padding: 0;
    border: none;
    outline-color: var(--light-border);
    cursor: pointer;
  }

  input {
    height: 2rem;
    font-size: 1rem;
    line-height: 2rem;
    font-family: var(--mono);
    background-color: var(--panel);
    border: none;
    border-radius: 0.5rem;
    outline-color: var(--light-border);
    /* transition */
    width: 0em;
    padding: 0;
    margin-right: 0rem;
    transition: 0.5s;
  }

  /* transition */
  &:hover input,
  input:focus-within,
  &:has(button:focus) input {
    width: 12em;
    padding: 0 1rem;
    margin-right: 0.5rem;
  }
}
</style>
