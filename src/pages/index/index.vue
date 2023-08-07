<template>
  <view class="index-page">
    <u-grid :col="3" hover-class="hover-class">
      <u-grid-item
        @click="handleGridClick(item.url)"
        v-for="(item, index) in grids"
        :index="index"
        :key="index"
      >
        <uni-icons :type="item.ico" :size="30" color="#777" />
        <text class="grid-text">{{ item.name }}</text>
      </u-grid-item>
    </u-grid>
  </view>
</template>

<script setup lang="ts">
interface GridItem {
  name: string
  ico: string
  url: string
}
const grids: GridItem[] = [
  {
    name: '获取openid',
    ico: 'link',
    url: '../getOpenid/getOpenid'
  },
  {
    name: '生成二维码',
    ico: 'redo-filled',
    url: '../getQRcodeImg/getQRcodeImg'
  },
  {
    name: '微信手机号',
    ico: 'email',
    url: '../getPhone/getPhone'
  },
  {
    name: '注册',
    ico: 'paperplane',
    url: '../register/register'
  },
  {
    name: 'login',
    ico: 'auth',
    url: '../login/login'
  },
  {
    name: 'loginPhone',
    ico: 'phone',
    url: '../signOrLoginByMobilePhone/signOrLoginByMobilePhone'
  }
]

const handleGridClick = (url: string) => {
  uni.navigateTo({
    url
  })
}
</script>

<style scoped lang="scss">
.index-page {
  font-style: normal;
  text-align: center;
}
.grid-item-box {
  flex: 1;
  // position: relative;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px 0;
}
</style>
