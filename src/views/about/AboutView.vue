<script setup lang="ts">
import { IconLabel } from '@/components/common'
import InputBox from '@/components/InputBox.vue'
import EditList from '@/components/EditList.vue'
import { useProjectStore } from '@/stores/project'

const project = useProjectStore()
const about = project.about
</script>

<template>
  <main>
    <h2>About</h2>

    <form>
      <fieldset>
        <legend>
          <icon-label icon="edit" text="基本信息" class="legend" />
        </legend>

        <div class="wrapper">
          <input-box
            label="名称"
            v-model.trim="about.name"
            placeholder="输入项目名称"
            name="project"
          />

          <input-box
            label="包名"
            v-model.trim="about.packageId"
            placeholder="输入项目包名"
            style="font-family: var(--mono)"
            name="package"
          />

          <input-box
            label="作者"
            v-model.trim="about.author"
            placeholder="输入你的名字"
            name="name"
            autocomplete="true"
          />

          <input-box
            label="描述"
            v-model.trim="about.description"
            placeholder="输入该翻译模组的描述"
            name="description"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <icon-label icon="check" text="版本支持" class="legend" />
        </legend>

        <div class="wrapper">
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
        </div>
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
  display: flex;
  flex-direction: column;
  gap: 40px;
}

fieldset {
  padding: 0;
  border: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

legend {
  font-weight: bold;
  color: var(--theme);
}

.wrapper {
  background-color: var(--panel);
  padding: 1rem;
  border: 1px solid var(--light-border);
  margin-top: 0.5em;
  border-radius: 8px;
  display: flex;
  flex-direction: column;

  label:not(:last-child) {
    padding-bottom: 0.75em;
    border-bottom: 1px solid var(--lighter);
    margin-bottom: 0.75em;
  }
}
</style>
