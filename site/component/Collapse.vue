<template>
  <z-collapse v-model:expanded="value">
    <template #header="{ toggleExpand }">
      <z-button @click="toggleExpand">{{ value ? '折叠' : '打开' }}</z-button>
    </template>
    <div style="height: 100px; background-color: yellowgreen">
      <countComponent></countComponent>
    </div>
  </z-collapse>
  <z-collapse v-model:expanded="value2" destroy-inactive>
    <template #header="{ toggleExpand }">
      <z-button @click="toggleExpand">{{ value2 ? '折叠' : '打开' }}</z-button>
    </template>
    <div style="height: 100px; background-color: yellowgreen">
      <countComponent2></countComponent2>
    </div>
  </z-collapse>
  <z-collapse-group v-model:active="active">
    <z-collapse key="1">
      <template #header="{ expanded, toggleExpand }">
        <z-button @click="toggleExpand"
          >{{ expanded ? '展开' : '折叠' }}collapse 1</z-button
        >
      </template>
      <div style="height: 100px; background-color: rgb(180, 43, 25)"></div>
      <z-collapse-group v-model:active="activeKey2">
        <z-collapse v-for="{ key, name, color } in list" :key="key">
          <template #header="{ toggleExpand: click }">
            <z-button @click="click">{{ name }}</z-button>
          </template>
          <div :style="`height: 100px; background-color: ${color}`"></div>
        </z-collapse>
      </z-collapse-group>
    </z-collapse>
    <z-collapse key="2">
      <template #header="{ toggleExpand }">
        <z-button @click="toggleExpand">collapse 2</z-button>
      </template>
      <div style="height: 100px; background-color: rgb(25, 118, 180)"></div>
    </z-collapse>
    <z-collapse key="3">
      <template #header="{ toggleExpand }">
        <z-button @click="toggleExpand">collapse 2</z-button>
      </template>
      <div style="height: 100px; background-color: rgb(25, 118, 180)"></div>
    </z-collapse>
    <z-button @click="toggle"
      >切换{{ Array.isArray(active) ? '手风琴' : '普通' }}模式</z-button
    >
  </z-collapse-group>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

import { ZCollapse, ZButton, ZCollapseGroup } from 'azi'

const value = ref(false)
const value2 = ref(false)

const useCount = () => ({
  setup() {
    const count = ref(0)

    return () =>
      h(
        'div',
        {
          onClick: () => count.value++,
        },
        count.value
      )
  },
})

const countComponent = useCount()
const countComponent2 = useCount()

const active = ref<string | string[]>([])
const activeKey2 = ref<string | string[]>('')

const toggle = () =>
  Array.isArray(active.value) ? (active.value = '') : (active.value = [])

const list = ref([
  {
    name: 'collapse 1-1',
    key: '1-1',
    color: 'rgb(180, 43, 25)',
  },
  {
    name: 'collapse 1-2',
    key: '1-2',
    color: 'rgb(25, 118, 180)',
  },
  {
    name: 'collapse 1-3',
    key: '1-3',
    color: 'rgb(158, 29, 170)',
  },
])
</script>
