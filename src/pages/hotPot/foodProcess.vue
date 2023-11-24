<template>
  <view class="wrapper">
    <u-line-progress
      :percentage="percentage"
      :showText="false"
      activeColor="#ff4d4f"
      height="30"
    ></u-line-progress>
    <div class="infoMask">
      <span class="foodName">{{ foodName }}</span>
      <span class="remainTime">{{ countdown }}秒后可以吃~</span>
    </div>
  </view>
</template>

<script setup lang="ts">
interface IProps {
  id: number
  time: number
  foodName: string
}

interface IEmitEvent {
  (event: 'completeCooking', value: number): void
  (event: 'delTargetFood', value: number): void
}

import dayjs from 'dayjs'
import {
computed,
defineProps,
onMounted,
onUnmounted,
ref,
withDefaults
} from 'vue'

const { id, time, foodName } = withDefaults(defineProps<IProps>(), {
  id: 0,
  time: 0,
  foodName: ''
})

const endTime = dayjs().add(time, 'second')

const countdown = ref(time)

const percentage = computed(() => {
  const totalSeconds = time
  return ((totalSeconds - countdown.value) / totalSeconds) * 100
})

function updateCountdown() {
  const now = dayjs()
  const secondsLeft = endTime.diff(now, 'second')
  countdown.value = secondsLeft >= 0 ? secondsLeft : 0
}

const emit = defineEmits<IEmitEvent>()

// 使用 setInterval 来每秒更新倒计时和进度条
let intervalId: NodeJS.Timer | undefined
onMounted(() => {
  intervalId = setInterval(() => {
    updateCountdown()
    if (countdown.value === 0 && intervalId) {
      emit('completeCooking', id)
      clearInterval(intervalId)
    }
  }, 1000)
})

// 组件卸载时清除定时器
onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  position: relative;
}
.infoMask {
  font-size: 12px;
  color: #3a3a3a;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  padding: 0 12px;
}
</style>
