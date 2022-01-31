<template>
  <z-switch v-model:checked="checked"></z-switch>
  <z-switch v-model:checked="checked" inset></z-switch>
  <z-switch v-model:checked="checked" inset disabled></z-switch>
</template>

<script setup lang="ts">
import { ZSwitch } from 'azi'
import { ref } from 'vue'

const checked = ref(true)
</script>
