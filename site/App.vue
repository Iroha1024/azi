<template>
  <z-config-provider :theme="config.theme">
    <Nav />
    <div class="container">
      <SideNav />
      <main>
        <router-view v-slot="{ Component, route }" :key="$route.fullPath">
          <component
            :is="Component"
            :key="route.meta.usePathKey ? route.path : undefined"
          />
        </router-view>
      </main>
    </div>
  </z-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { ZConfigProvider } from 'azi'
import type { ConfigProviderProps } from 'azi'

import Nav from './component/Nav.vue'
import SideNav from './component/SideNav.vue'

const config = ref<ConfigProviderProps>({
  theme: {
    // '--z-primary-color': 'red'
  },
})
</script>

<style>
html {
  background-color: #f7f7f7;
  --nav-height: 60px;
}

html.dark {
  background-color: #272727;
}
</style>

<style scoped>
.container {
  display: flex;
  position: absolute;
  bottom: 0;
  top: var(--nav-height);
  left: 0;
  right: 0;
}

main {
  padding: 20px 40px;
  overflow-y: scroll;
  flex: 1;
}

main::-webkit-scrollbar {
  width: 6px;
  background-color: #f5f5f5;
}

main::-webkit-scrollbar-thumb {
  background-color: #9e9e9e;
}
</style>
