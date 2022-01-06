<template>
  <Showcase heading="类型" content="type">
    <z-button>NORMAL</z-button>
    <z-button type="primary">PRIMARY</z-button>
    <z-button type="error">ERROR</z-button>
  </Showcase>
  <Showcase heading="自定义颜色" content="color">
    <z-button color="#ccc">CUSTOM</z-button>
    <z-button color="#1867c0">CUSTOM</z-button>
  </Showcase>
  <Showcase heading="块级" content="block">
    <z-button block>BLOCK</z-button>
    <z-button>INLINE-BLOCK</z-button>
  </Showcase>
  <Showcase heading="形状" content="">
    <z-button>圆角</z-button>
    <z-button tile>无圆角</z-button>
    <z-button circle>圆形</z-button>
  </Showcase>
  <Showcase heading="轮廓" content="outlined">
    <z-button outlined>轮廓</z-button>
    <z-button outlined type="primary">轮廓</z-button>
    <z-button color="#1867c0" outlined>轮廓</z-button>
  </Showcase>
  <Showcase heading="文本" content="text">
    <z-button text>文本</z-button>
    <z-button text type="primary">文本</z-button>
    <z-button text color="#1867c0">文本</z-button>
  </Showcase>
  <Showcase heading="凹陷" content="depressed">
    <z-button type="primary">正常</z-button>
    <z-button type="primary" depressed>凹陷</z-button>
  </Showcase>
  <Showcase heading="禁用" content="disabled">
    <z-button disabled>禁用</z-button>
  </Showcase>
  <Showcase heading="加载" content="loading">
    <z-button :loading="loading" type="primary" @click="load">加载</z-button>
  </Showcase>
  <Showcase heading="图标" content="size">
    <z-button>
      <div>HOME</div>
      <z-icon><home theme="filled" /></z-icon>
    </z-button>
    <z-button>
      <z-icon><home theme="filled" /></z-icon>
      HOME
    </z-button>
    <z-button icon>
      <z-icon><airplay theme="filled" /></z-icon>
    </z-button>
    <z-button icon type="primary">
      <z-icon><airplay theme="filled" /></z-icon>
    </z-button>
  </Showcase>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Home, Airplay } from '@icon-park/vue-next'

import { ZButton, ZIcon } from 'azi'
import Showcase from './Showcase.vue'

const loading = ref(false)

const load = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 4000)
}
</script>
