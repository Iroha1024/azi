<template>
  <div class="showcase">
    <h2>{{ heading }}</h2>
    <p>{{ content }}</p>
    <div class="list">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { string } from 'vue-types'

defineProps({
  heading: string().isRequired,
  content: string().isRequired,
})
</script>

<style scoped>
.showcase {
  margin-bottom: 20px;
}

:deep(.list > *) {
  margin: 0 20px 10px 0;
}
</style>
