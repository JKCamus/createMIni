<template>
  <view id="clock">
    <p class="time">{{ time }}</p>
  </view>
  <view class="controlCell">
    <view
      v-for="(item, index) in timeControl"
      :key="item.key"
      :class="item.key"
    >
      <span @click="openTimePicker(index)">
        {{ `${item.label}: ${item.value}` }}
      </span>
      <timePicker ref="timePickerRefs" v-model:time="item.value"></timePicker>
    </view>
    <view> 出发时间 </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, Ref } from 'vue'
import timePicker from './timePicker.vue'
const time = ref('')
const timePickerRefs = ref()

const timeControl = reactive([
  {
    key: 'target',
    label: '目标时间',
    value: '00:00'
  },
  {
    key: 'buffer',
    label: '预留时间',
    value: '00:00'
  },
  {
    key: 'onTheRoad',
    label: '路上时间',
    value: '00:00'
  }
])

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
    time.value = `${formattedH}:${formattedM}:${formattedS} ${session}`
  }

  onMounted(() => {
    updateTime()
    setInterval(updateTime, 1000)
  })
}
showTime()

const openTimePicker = (index) => {
  timePickerRefs.value[index].show = true
}

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
.controlCell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  .bufferTime {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
