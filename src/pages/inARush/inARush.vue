<template>
  <view id="clock">
    <p class="time">{{ currentTime }}</p>
    <view>
      <view> 目标时间 </view>
      <view> 预留时间 </view>
      <view> 路上预估 </view>
      <view> 出发时间 </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentTime = ref('')

const showTime = () => {
  const updateTime = () => {
    const date = new Date()
    let h = date.getHours() // 0 - 23
    let m = date.getMinutes() // 0 - 59
    let s = date.getSeconds() // 0 - 59
    const session = h >= 12 ? 'PM' : 'AM'
    h = h === 0 ? 12 : h > 12 ? h - 12 : h
    const formattedH: string = h < 10 ? '0' + h : h.toString()
    const formattedM: string = m < 10 ? '0' + m : m.toString()
    const formattedS: string = s < 10 ? '0' + s : s.toString()
    currentTime.value = `${formattedH}:${formattedM}:${formattedS} ${session}`
  }

  onMounted(() => {
    updateTime()
    setInterval(updateTime, 1000)
  })
}
showTime()
</script>

<style lang="scss">
page {
  /* background: #0f3854; */
  /* background: radial-gradient(ellipse at center, #0a2e38 0%, #000000 70%);
  background-size: 100%; */
}
p {
  margin: 0;
  padding: 0;
}
#clock {
  /* font-family: 'Share Tech Mono', monospace; */
  font-family: serif;
  text-align: center;
  /* position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
  /* color: #daf6ff; */

  /* text-shadow: 0 0 20px rgba(10, 175, 230, 1), 0 0 20px rgba(10, 175, 230, 0); */
  .time {
    letter-spacing: 0.05em;
    font-size: 60px;
    padding: 5px 0;
    color: #3a00fb;
  }
  .date {
    letter-spacing: 0.1em;
    font-size: 24px;
  }
  .text {
    letter-spacing: 0.1em;
    font-size: 12px;
    padding: 20px 0 0;
  }
}
</style>
