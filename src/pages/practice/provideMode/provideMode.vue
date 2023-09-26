<template>
  <view class="wrapper"> provideMode mode </view>
  <u-divider hairline text="父组件分割线"></u-divider>
  <child></child>
</template>

<script setup lang="ts">
import { ref, provide, reactive, readonly } from 'vue'
import child from './child.vue'
import {
  ReadOnlyReactiveUserInfoKey,
  ChangeUserNameType,
  ReadOnlyReactiveUserInfoType,
  ChangeReadOnlyReactiveUserNameKey,
  ReadOnlyRefUserInfoType,
  ReadOnlyUserInfoKey,
  ChangeReadOnlyUserNameRefKey
} from './type'

// reactive版本

const reactiveUserInfo = reactive({
  userName: 'reactiveUserInfo',
  userId: 12
})

const changeReactiveUserName = (name: string) => {
  reactiveUserInfo.userName = name
}

provide<ReadOnlyReactiveUserInfoType>(
  ReadOnlyReactiveUserInfoKey,
  readonly(reactiveUserInfo)
)
provide<ChangeUserNameType>(
  ChangeReadOnlyReactiveUserNameKey,
  changeReactiveUserName
)

// ref 版本

const refUserInfo = ref({
  userName: 'userInfoRef',
  userId: 11
})

const changeUserNameRef = (name: string) => {
  refUserInfo.value.userName = name
}

provide<ReadOnlyRefUserInfoType>(ReadOnlyUserInfoKey, readonly(refUserInfo))
provide<ChangeUserNameType>(ChangeReadOnlyUserNameRefKey, changeUserNameRef)
</script>
<style lang="scss"></style>
