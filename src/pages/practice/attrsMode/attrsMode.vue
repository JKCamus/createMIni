<template>
  <view class="wrapper">
    <p>Attrs</p>
    <u-divider text="父组件中"></u-divider>
    <child :msg1="msg1" type="success" @parentClick="parentClick"></child>
  </view>
</template>


<script setup lang="ts">
// todo attrs 在微信小程序中是失败的。在h5中是没有问题的
// https://github.com/dcloudio/uni-app/issues/4099
// attrs中的值获取不到
import { ref } from 'vue';
import child from './child.vue'
const msg1 = ref('子组件msg1')
const parentClick = (childValue) => {
  console.log('父组件方法被调用,子组件传递过来的值是--》', childValue)
}

</script>
<style lang="scss">
</style>
