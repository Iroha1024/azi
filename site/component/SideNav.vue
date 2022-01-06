<template>
  <aside>
    <router-link
      v-for="({ name, href, active }, index) in list"
      :key="index"
      :to="href"
      class="link"
      :class="{
        active: active,
      }"
      @click="activate(index)"
      >{{ name }}</router-link
    >
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const { pathname } = location

const list = ref(
  [
    {
      name: 'button',
      href: '/button',
    },
    {
      name: 'ellipsis',
      href: '/ellipsis',
    },
  ].map((item) => {
    ;(item as any).active = pathname === item.href
    return item
  }) as Array<{
    name: string
    href: string
    active: boolean
  }>
)

const activate = (index: number) =>
  list.value.forEach((item, i) => (item.active = i == index))
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
.link.active {
  background-color: #e7e7e7;
}
</style>
