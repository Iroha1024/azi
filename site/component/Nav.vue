<template>
  <nav class="flex">
    <div class="flex">
      <ZIcon :size="48">
        <img :src="logo" />
      </ZIcon>
      <div class="desc">AZI</div>
    </div>
    <div class="nav-content">
      <z-button @click="() => toggleDark()">{{
        isDark ? 'light' : 'dark'
      }}</z-button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useDark, ZButton, ZIcon } from 'azi'

import logo from '../asset/logo.svg'

const { isDark, toggleDark } = useDark()
</script>

<style scoped>
.flex {
  display: flex;
  align-items: center;
}

nav {
  height: var(--nav-height);
  padding: 0 20px;
  box-shadow: 0 0 10px -5px #898989;
}

.desc {
  margin-left: 10px;
  font-size: 24px;
}

.nav-content {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
</style>
