<script setup lang="ts">
defineProps<{
  data: Array<{ key: string; text: string }>
  label?: string
  name?: string
}>()

const model = defineModel()

function handle(e: Event) {
  const target = e.target as HTMLSelectElement
  model.value = target.value
}
</script>

<template>
  <div class="select-wrapper">
    <select @change="handle" :name="name ?? 'select'">
      <option v-if="label" disabled value="">{{ label }}</option>

      <option
        v-for="item in data"
        :value="item.key"
        :selected="item.key === model"
      >
        {{ item.text }}
      </option>
    </select>

    <svg
      t="1718652406678"
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="5918"
      width="8"
      height="8"
    >
      <path
        d="M780.6 586.3H242.1c-33.4 0-51 39.6-28.5 64.4l119.7 132.1 149.5 165c15.3 16.9 41.8 16.9 57.1 0l149.5-165 119.7-132.1c22.4-24.8 4.9-64.4-28.5-64.4zM242.1 438h538.4c33.4 0 51-39.6 28.5-64.4L689.4 241.5l-149.5-165c-15.3-16.9-41.8-16.9-57.1 0l-149.5 165-119.7 132.1c-22.5 24.7-4.9 64.4 28.5 64.4z"
        fill=""
        p-id="5919"
      ></path>
    </svg>
  </div>
</template>

<style scoped>
.select-wrapper {
  display: flex;
  align-items: center;
  border-radius: 6px;
  transition: 0.2s;
  position: relative;
  z-index: 1;

  &:has(select:hover) {
    background-color: #efefef;
    box-shadow: 0 0 1px #00000032;
  }

  &:hover svg {
    box-shadow: none;
  }
}

select {
  appearance: none;
  padding: 0.2em 1.2em 0.2em 0.3em;
  background-color: transparent;
  border: none;
  font-size: 1rem;
  line-height: 1;
  font-family: inherit;
  outline: none;
  cursor: pointer;
  z-index: 3;
}

svg {
  padding: 3px 2px;
  background-color: #efefef;
  border-radius: 4px;
  box-shadow: 0 0 1px #00000032;
  /* position */
  position: absolute;
  right: 0.2rem;
  z-index: 2;
}
</style>
