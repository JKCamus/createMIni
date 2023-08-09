<template>
  <view class="wrapper">
    <button
      class="openid-button"
      type="primary"
      size="small"
      @click="handleClick"
    >
      获取Openid
    </button>
    <p class="openid-view">返回的Openid:</p>
    <p class="openid-view">{{ state.openid }}</p>
    <popupMessage id="message-popup"></popupMessage>
  </view>
</template>

<script setup lang="ts">
import useBmob from '@hooks/useBmob'
import { reactive } from 'vue'
import Notify from '@components/popupMessage/Notify'

const Bmob = useBmob()
const state = reactive({
  loading: true,
  openid: ''
})

const handleClick = async () => {
  try {
    const res = await uni.login({})
    const result = await Bmob.User.requestOpenId(res?.code)
    state.openid = result?.openid
  } catch (e) {
    console.log('error', e)
    Notify({
      type: 'error',
      message: '获取Openid错误'
    })
  }
}
</script>

<style lang="scss">
.wrapper {
  .openid-button {
    width: 560rpx;
  }
  .openid-view {
    margin-left: 100rpx;
    margin-top: 20rpx;
  }
}
</style>
