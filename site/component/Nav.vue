<template>
  <nav>
    <z-button @click="() => toggleDark()">{{
      isDark ? 'light' : 'dark'
    }}</z-button>
  </nav>
</template>

<script setup lang="ts">
import { useDark, ZButton } from 'azi'

const { isDark, toggleDark } = useDark()
</script>

<style scoped>
nav {
  height: var(--nav-height);
  display: flex;
  align-items: center;
}
</style>
