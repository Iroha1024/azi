<template>
  <aside>
    <router-link
      v-for="{ name, path } in list"
      :key="name"
      :to="path"
      class="link"
      >{{ name }}</router-link
    >
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const list = computed(() =>
  router
    .getRoutes()
    .filter(({ path }) => path !== '/')
    .map(({ name, path }) => {
      const obj = {
        name,
        path,
      }
      return obj
    })
)
</script>

<style scoped>
aside {
  padding: 10px 0;
}

.link {
  display: block;
  padding: 10px 40px;
}

.link:hover,
.link.router-link-active {
  background-color: #00000052;
}
</style>
