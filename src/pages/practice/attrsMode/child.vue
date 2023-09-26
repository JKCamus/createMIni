<template>
  <view class="wrapper">
    <button @click="getParentClick">调用父组件方法</button>
  </view>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'
const attrs = useAttrs()
const getParentClick = () => {
  console.log('attrs', attrs.msg1)
  console.log('attrs===>', attrs.onParentClick('这是child'))
}
</script>
<style lang="scss"></style>
