<template>
  <view class="wrapper">
    <u-list>
      <u-list-item v-for="(item, index) in methodsArray" :key="index">
        <u-cell
          @click="navigateToDetail(index)"
          :title="item"
        >
        </u-cell>
      </u-list-item>
    </u-list>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Methods } from './types'
const methodsArray = Object.values(Methods)
console.log('methodsArray', methodsArray)

const navigateToDetail = (index: number) => {
  uni.navigateTo({
    url: `/pages/practice/practiceDetail?methods=${methodsArray[index]}`
  })
}
</script>
<style lang="scss"></style>
