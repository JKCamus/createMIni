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
    <MessagePopup ref="messageRef"></MessagePopup>
  </view>
</template>

<script setup lang="ts">
import useBmob from '@hooks/useBmob'
import { reactive, ref } from 'vue'
import MessagePopup from '@utils/popupPlugin/popupMessage.vue'
const messageRef = ref({
  showMessagePopup: (type: string, code: string, duration?: number) => {}
})

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
    // messageRef?.value && messageRef?.value?.showMessagePopup('error', )
    console.log('messageRef', messageRef.value)
  } catch (error) {
    console.log('Error: ' + error)
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
