<template>
  <view class="index-page">
    <u-grid :col="3" border hover-class="hover-class">
      <u-grid-item
        :customStyle="{ padding: 20 + 'rpx' + ' 0' }"
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
  // {
  //   name: '微信手机号',
  //   ico: 'email',
  //   url: '../getPhone/getPhone'
  // },
  // {
  //   name: '注册',
  //   ico: 'paperplane',
  //   url: '../register/register'
  // },
  // {
  //   name: 'login',
  //   ico: 'auth',
  //   url: '../login/login'
  // },
  // {
  //   name: 'loginPhone',
  //   ico: 'phone',
  //   url: '../signOrLoginByMobilePhone/signOrLoginByMobilePhone'
  // },
  // {
  //   name: 'userInfo',
  //   ico: 'person-filled',
  //   url: '../getUserInfo/getNickname'
  // },
  {
    name: 'inARush',
    ico: 'calendar',
    url: '../inARush/inARush'
  },
  // {
  //   name: 'practice',
  //   ico: 'pyq',
  //   url: '../practice/practice'
  // },
  // {
  //   name: 'generateAvatar',
  //   ico: 'fire',
  //   url: '../generateAvatar/generateAvatar'
  // }
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
.u-grid-item {
  padding: 15px 20px !important;
}
.border,
.is-first-border:is(:first-child) {
  border-style: none;
}
</style>
