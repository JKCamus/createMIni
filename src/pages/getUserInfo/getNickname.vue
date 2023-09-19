<template>
  <view class="wrapper">
    <form @submit="handleEditNickname">
      <div class="edit-info">
        <div class="flex-box center align-center p-3">
          <button
            class="avatar-wrapper"
            :plain="true"
            open-type="chooseAvatar"
            @chooseavatar="onChooseAvatar"
          >
            <image class="avatar" :src="userInfo.avatar"></image>
            <div class="font2">点击图片修改头像</div>
          </button>
        </div>
        <uni-section title="基础信息" type="line" padding>
          <button>
            <open-data type="userNickName"></open-data>
          </button>
        </uni-section>
      </div>
      <button class="submit-btn mt-2" form-type="submit" type="primary">
        保存
      </button>
    </form>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const userInfo = reactive({
  nickname: '',
  avatar: ''
})

function handleEditNickname(e) {
  // 获取到用户昵称，存储到store中
  console.log('====>', e.detail.value.nickname)

  uni.navigateBack()
}
const onChooseAvatar = (e) => {
  uni.showLoading({
    title: '上传中'
  })
  // 获取到微信头像临时地址
  const { avatarUrl } = e.detail
  console.log('avatar', avatarUrl)
  // 上传文件到服务器
}
</script>
<style lang="scss">
.edit-info {
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  .avatar-wrapper {
    background-color: #fff;
    border: 0 none;
    line-height: 1.5;

    .avatar {
      width: 180rpx;
      height: 180rpx;
      border-radius: 20rpx;
      background-color: #ddd;
    }
  }
}
</style>
