<template>
  <z-checkbox
    v-model:checked="checked1"
    v-model:indeterminate="indeterminate"
    :disabled="disabled"
    >checkbox1 {{ checked1 }}</z-checkbox
  >
  <z-checkbox v-model:checked="checked2">checkbox {{ checked2 }}</z-checkbox>
  <hr />
  <z-checkbox
    v-model:checked="all"
    :indeterminate="indeterminate"
    @update:checked="handleCheck"
  ></z-checkbox>
  <z-checkbox-group v-model:active="list">
    <z-checkbox value="beijing" disabled>北京</z-checkbox>
    <z-checkbox value="shanghai">上海</z-checkbox>
    <z-checkbox value="guangzhou">广州</z-checkbox>
  </z-checkbox-group>
  {{ list }}
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { ZCheckbox, ZCheckboxGroup } from 'azi'

const checked1 = ref(false)
const checked2 = ref(true)
const disabled = ref(false)

setTimeout(() => {
  disabled.value = true
}, 4000)

const all = computed(() => list.value.length == 3)
const indeterminate = computed(
  () => list.value.length > 0 && list.value.length < 3
)

const origin = ['guangzhou', 'shanghai', 'beijing']
const list = ref(['guangzhou', 'shanghai'])

const handleCheck = (checked: boolean) => {
  if (checked) {
    list.value = origin
  } else {
    list.value = []
  }
}
</script>
