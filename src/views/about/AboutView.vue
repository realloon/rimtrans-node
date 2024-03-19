<script setup lang="ts">
import { ref } from 'vue'
import { Icon, IconLabel } from '@/components/common'
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

      <fieldset class="dependency">
        <legend hidden>loadAfter</legend>
        <icon-label icon="unit" text="前置加载" class="legend" />

        <ol>
          <li v-for="item in about.loadAfter">
            <div class="item">
              <span>{{ item }}</span>
              <icon @click="removeDependency(item)" type="close0" />
            </div>
          </li>
        </ol>

        <div class="add-wrapper">
          <input v-model.trim="input" name="dependency" type="text" />
          <button @click.prevent="addDependency"><icon type="plus" /></button>
        </div>
      </fieldset>
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

fieldset {
  display: flex;
  flex-direction: column;
  margin: 0;
  border: 1px solid #eef0f4;
  padding: 0;
  background-color: #f5f6f8;
  border-radius: 8px;
  position: relative;

  /* show */
  & > .legend {
    font-weight: bold;
    line-height: 1;
    color: var(--theme);
    position: absolute;
    top: -1.5em;
  }
}

.dependency {
  position: relative;

  ol {
    font-family: var(--mono);
    margin: 0;
    padding-left: 2em;
    margin: 1rem;
  }

  .item {
    display: flex;
    align-items: baseline;

    /* list item */
    & > span:first-child {
      flex-grow: 1;
    }

    & > span:last-child {
      opacity: 0;
      transition: 0.2s;
      cursor: pointer;
    }
    &:hover > span:last-child {
      opacity: 1;
    }
  }

  .add-wrapper {
    position: absolute;
    bottom: -40px;
    display: flex;

    button {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      border: none;
      padding: 0;
      background-color: #f5f6f8;
      outline-color: var(--light-gray);
      cursor: pointer;
    }

    input {
      font-family: var(--mono);
      height: 2rem;
      font-size: 1rem;
      line-height: 2rem;
      background-color: #f5f6f8;
      border: none;
      border-radius: 0.5rem;
      transition: 0.5s;
      outline-color: var(--light-gray);
      /*  */
      width: 0em;
      padding: 0;
      margin-right: 0rem;
    }

    &:hover input,
    input:focus-within {
      width: 12em;
      padding: 0 1rem;
      margin-right: 0.5rem;
    }
  }
}
</style>
