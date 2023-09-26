<template>
  <view class="wrapper">
    <child @getChildEvent="getChildMsg"></child>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import child from './child.vue'
const name = ref('defaultName')
const getChildMsg = (value) => {
  console.log('getChildMsg', value)
}
</script>
<style lang="scss"></style>
