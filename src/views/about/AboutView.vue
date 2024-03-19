<script setup lang="ts">
import { ref } from 'vue'
import { Icon, IconLabel } from '@/components/common'
import EditList from '@/components/EditList.vue'
import { useAboutStore } from '@/stores/about'

const aboutStore = useAboutStore()
const about = aboutStore.about

const input = ref('')

const addDependency = () => {
  if (about.loadAfter.includes(input.value)) return alert('已有重复依赖')

  about.loadAfter.push(input.value)
  input.value = ''
}
const removeDependency = (item: string) => {
  if (about.loadAfter.length <= 1) return alert('至少需一个依赖')

  about.loadAfter = about.loadAfter.filter(value => value !== item)
}
</script>

<template>
  <main>
    <h2>About</h2>

    <form>
      <fieldset>
        <legend hidden>Base</legend>
        <icon-label icon="edit" text="基本信息" class="legend" />

        <label>
          <input
            v-model.trim="about.name"
            name="name"
            type="text"
            autocomplete="false"
          />
          <span>名称</span>
        </label>

        <label>
          <input v-model.trim="about.packageId" name="packageId" type="text" />
          <span>包名</span>
        </label>

        <label>
          <input
            v-model.trim="about.author"
            placeholder="Your name"
            name="author"
            type="text"
          />
          <span>作者</span>
        </label>

        <label>
          <input
            v-model.trim="about.description"
            name="description"
            type="text"
          />
          <span>描述</span>
        </label>
      </fieldset>

      <fieldset class="version">
        <legend hidden>supportedVersions</legend>
        <icon-label icon="check" text="版本支持" class="legend" />

        <label v-for="version in about.supportedVersions">
          <input
            type="checkbox"
            name="version"
            :checked="Boolean(version)"
            disabled
            style="margin-right: 0.5em"
          />
          <span>{{ version }}</span>
        </label>
      </fieldset>

      <edit-list
        :list="about.loadAfter"
        icon="unit"
        header="前置依赖"
        orderly
      />
    </form>
  </main>
</template>

<style scoped>
form {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

/* filed input */
label {
  display: flex;
  margin-left: 1rem;

  &:not(:last-child) {
    border-bottom: 1px solid hsl(0, 0%, 80%);
  }

  & input[type='text'],
  & span {
    font-size: 1rem;
    line-height: 3rem;
    height: 3rem;
  }

  & input[type='text'] {
    flex-grow: 1;
    border: none;
    padding: 0;
    background-color: transparent;
    outline: none;
  }

  & span {
    margin-right: 1rem;
    color: gray;
  }
}

/* fieldset {
  display: flex;
  flex-direction: column;
  margin: 0;
  border: 1px solid #eef0f4;
  padding: 0;
  background-color: #f5f6f8;
  border-radius: 8px;
  position: relative;

  & > .legend {
    font-weight: bold;
    line-height: 1;
    color: var(--theme);
    position: absolute;
    top: -1.5em;
  }
} */
</style>
