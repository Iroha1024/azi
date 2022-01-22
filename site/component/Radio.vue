<template>
  <z-radio :checked="checked">radio</z-radio>
  <z-radio :checked="checked" disabled>radio</z-radio>
  <z-button block @click="toggle">{{ checked ? '取消' : '选择' }}</z-button>
  <z-radio-group v-model:active="active">
    <z-radio
      v-for="{ label, value } in list"
      :key="value"
      :value="value"
      :disabled="value == 2"
      >{{ label }}</z-radio
    >
  </z-radio-group>
  {{ active }}
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ZRadio, ZButton, ZRadioGroup } from 'azi'

const checked = ref(false)

const toggle = () => (checked.value = !checked.value)

const active = ref(1)

const list = ref([
  {
    label: 'radio 1',
    value: 1,
  },
  {
    label: 'radio 2',
    value: 2,
  },
  {
    label: 'radio 3',
    value: 3,
  },
])
</script>
