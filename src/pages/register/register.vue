<template>
  <view class="wrapper">
    <uni-forms
      ref="registerFormRef"
      :modelValue="registerFormData"
      :rules="rules"
    >
      <uni-forms-item label="用户名" name="username" required>
        <uni-easyinput
          v-model="registerFormData.username"
          placeholder="请输入用户名"
        />
      </uni-forms-item>
      <uni-forms-item label="密码" name="password" required>
        <uni-easyinput
          v-model="registerFormData.password"
          type="password"
          placeholder="请输入密码"
        />
      </uni-forms-item>
      <uni-forms-item label="邮箱" name="email" required>
        <uni-easyinput
          v-model="registerFormData.email"
          placeholder="请输入邮箱"
        />
      </uni-forms-item>
      <uni-forms-item label="手机号" name="phone" required>
        <uni-easyinput
          v-model="registerFormData.phone"
          placeholder="请输入手机号"
        />
      </uni-forms-item>
      <button type="primary" @click="submit">注册</button>
    </uni-forms>
  </view>
</template>

<script setup lang="ts">
import {  ref } from 'vue'
import useBmob from '@hooks/useBmob'
import useResetFromData from '@hooks/useResetFromData'
//todo  简化表单验证 
const registerFormRef = ref({
  validate: () => Promise
})
const Bmob = useBmob()
const [registerFormData, resetFromData] = useResetFromData({
  username: '',
  password: '',
  email: '',
  phone: ''
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
        errorMessage: '请输入用户名'
      }
    ]
  },
  email: {
    rules: [
      {
        required: true,
        errorMessage: '请输入邮箱'
      },
      {
        validateFunction: (rule, email) => {
          return new Promise((resolve, reject) => {
            const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
            if (emailRegex.test(email)) {
              resolve()
            } else {
              reject(new Error('请输入正确的邮箱'))
            }
          })
        }
      }
    ]
  },
  phone: {
    rules: [
      {
        required: true,
        errorMessage: '请输入手机号'
      },
      {
        validateFunction: (rule, phone, data, callback) => {
          return new Promise((resolve, reject) => {
            const phoneRegex = /^\d{11}$/ // 假设电话号码是10位数字
            if (phoneRegex.test(phone)) {
              resolve()
            } else {
              reject(new Error('请输入正确的手机号码'))
            }
          })
        }
      }
    ]
  }
}

const submit = async () => {
  try {
    await registerFormRef?.value?.validate()
    // const { username, password, email, phone } = registerFormData
    const result = await Bmob.User.register(registerFormData)
    resetFromData()
  } catch (e) {
    // handle error
    console.log('error', e)
  }
}
</script>
<style lang="scss">
.wrapper {
  margin: 20px;
}
</style>
