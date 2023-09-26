<template>
  <view class="wrapper"> inject </view>
  <u-divider hairline text="子组件分割线"></u-divider>
  <u-divider hairline text="reactive版本"></u-divider>
  {{ reactiveUserInfo.userName }}
  <button @click="changeReactiveUserName('花开')">
    reactive 有效修改父组件数据
  </button>
  <button @click="directChangeReactiveUserName('富贵')">
    reactive 直接修改父组件
  </button>
  <u-divider hairline text="ref版本"></u-divider>
  {{ refUserNameInfo.userName }}
  <button @click="changeRefUserName('喜上')">
    reactive 有效修改父组件数据
  </button>
  <button @click="directChangeRefUserName('眉梢')">
    reactive 直接修改父组件
  </button>
</template>

<script setup lang="ts">
import { inject, ref, watchEffect } from 'vue'
import {
  ReadOnlyReactiveUserInfoKey,
  ChangeUserNameType,
  ReadOnlyReactiveUserInfoType,
  ChangeReadOnlyReactiveUserNameKey,
  ReadOnlyRefUserInfoType,
  ReadOnlyUserInfoKey,
  ChangeReadOnlyUserNameRefKey
} from './type'

// reactive 版本
const reactiveUserInfo = inject<ReadOnlyReactiveUserInfoType>(
  ReadOnlyReactiveUserInfoKey,
  {
    userName: '',
    userId: NaN
  }
)

const directChangeReactiveUserName = (name: string) => {
  // 修改失败
  reactiveUserInfo.userName = name
  console.log('reactiveUserInfo inner', reactiveUserInfo)
}

const changeReactiveUserName = inject<ChangeUserNameType>(
  ChangeReadOnlyReactiveUserNameKey,
  () => {
    console.log('无法修改父组件的值reactive')
  }
)

// ref版本

const refUserNameInfo = inject<ReadOnlyRefUserInfoType>(
  ReadOnlyUserInfoKey,
  ref({
    userName: '',
    userId: NaN
  })
)

const directChangeRefUserName = (name: string) => {
  refUserNameInfo.value.userName = name
}
const changeRefUserName = inject<ChangeUserNameType>(
  ChangeReadOnlyUserNameRefKey,
  () => {
    console.log('修改失败')
  }
)

watchEffect(() => {
  console.log('reactiveUserInfo===>', reactiveUserInfo.userName)
  console.log('refUserNameInfo===>', refUserNameInfo.value.userName)
})
</script>
<style lang="scss"></style>
