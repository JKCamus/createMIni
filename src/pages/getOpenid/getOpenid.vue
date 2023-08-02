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
    <p class="openid-view">{{ openid }}</p>
  </view>
</template>

<script lang="ts">
import useBmob from '@hooks/useBmob'
import { reactive, toRefs } from 'vue'

export default {
  data() {
    return {}
  },
  methods: {},
  setup() {
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
      } catch (error) {
        console.log('Error: ' + error)
      }
    }
    return {
      ...toRefs(state),
      handleClick
    }
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
