<template>
  <view>
    <uni-section title="当前页面地址" type="line" padding>
      <uni-easyinput
        class="uni-mt-5"
        trim="all"
        v-model="computedRoute"
        placeholder="请输入内容"
      ></uni-easyinput>
    </uni-section>
    <uni-section title="生成二维码尺寸" type="'line'">
      <view class="box">
        <uni-number-box
          class="size-control"
          v-model="state.size"
          :max="600"
          :min="30"
        />
        <button type="primary" size="mini" @click="handleClick">
          点击生成QR
        </button>
      </view>
    </uni-section>
    <uni-section title="生成页面QRCode" type="'line'">
      <view class="img-box" v-if="state.imageBytes !== ''">
        <image
          :style="`width:${state.size}px; height:${1.1*state.size}px; background-color: #eeeeee`"
          :src="`data:image/png;base64,${state.imageBytes}`"
        ></image>
      </view>
    </uni-section>
  </view>
</template>

<script setup lang="ts">
import useBmob from '@hooks/useBmob';
import { reactive, computed } from 'vue';


const Bmob = useBmob()
const state = reactive({
  route: '',
  size: 300,
  imageBytes: ''
})

const computedRoute = computed(() => {
  let pages = getCurrentPages()
  let currentPage = pages[pages.length - 1]
  return currentPage.route
})
const handleClick = () => {
  Bmob.generateCode({
    path: computedRoute.value,
    width: state.size
  }).then((obj) => {
    state.imageBytes = obj.imageBytes
  })
}
</script>

<style lang="scss">
.img-box {
  display: flex;
  align-items: center;
  justify-content: center;
}
.box {
  display: flex;
}

.size-control {
  margin-left: 10px;
}
</style>
