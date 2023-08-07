<template>
  <view class="wrapper">
    <uni-forms ref="baseForm" :modelValue="baseFormData" :rules="rules">
      <uni-forms-item label="用户名" name="username" required>
        <uni-easyinput
          v-model="baseFormData.username"
          placeholder="请输入用户名"
        />
      </uni-forms-item>
      <uni-forms-item label="密码" name="password" required>
        <uni-easyinput
          v-model="baseFormData.password"
          type="password"
          placeholder="请输入密码"
        />
      </uni-forms-item>
      <button type="primary" @click="submit">登录</button>
    </uni-forms>
  </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import useBmob from '@hooks/useBmob'
const Bmob = useBmob()

const baseForm = ref({
  validate: () => Promise
})

const rules = {
  username: {
    rules: [
      {
        required: true,
        errorMessage: '请输入用户名'
      }
    ]
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: '请输入密码'
      }
    ]
  },
}

const baseFormData = reactive({
  username: '',
  password: ''
})
const submit = async () => {
  try {
    const value = await baseForm?.value?.validate()
    const userInfo = await Bmob.User.login(
      baseFormData.username,
      baseFormData.password
    )
    console.log('res=>', userInfo)
  } catch (e) {
    // handle error
  }
}
</script>
<style lang="scss">
.wrapper {
  padding: 20px;
}
</style>
