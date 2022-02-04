<template>
  <aside>
    <z-list :width="200">
      <z-list-item
        v-for="{ name, path } in list"
        :key="name"
        button
        :class="{
          active: route.name === name,
        }"
        @click="router.push(path)"
      >
        <z-list-item-text>
          {{ name }}
        </z-list-item-text>
      </z-list-item>
    </z-list>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { ZList, ZListItem, ZListItemText } from 'azi'

const router = useRouter()
const route = useRoute()

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
.active {
  background-color: #d9d9d9;
}
</style>
