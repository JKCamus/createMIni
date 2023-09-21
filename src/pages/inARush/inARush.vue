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

    <view>
      <button @click="handleInARush">计算</button>
      <span>最晚出发时间：{{ resultTime }}</span>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import timePicker from './timePicker.vue'
import dayjs from 'dayjs'
const time = ref('')
const resultTime = ref('')
const timePickerRefs = ref()

const currentDate = dayjs()

const timeControl = reactive([
  {
    key: 'target',
    label: '目标时间',
    value: currentDate.format('HH:mm')
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
    time.value = currentDate.format('HH:mm:ss')
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

const handleInARush = () => {
  const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    return { hours, minutes }
  }

  const targetTime = parseTime(timeControl[0].value)
  const bufferTime = parseTime(timeControl[1].value)
  const onTheRoadTime = parseTime(timeControl[2].value)

  let resultDate = dayjs().hour(targetTime.hours).minute(targetTime.minutes)

  // 减去预留时间和路上时间
  resultDate = resultDate
    .subtract(bufferTime.hours + onTheRoadTime.hours, 'hour')
    .subtract(bufferTime.minutes + onTheRoadTime.minutes, 'minute')

  const result = resultDate.format('HH:mm')

  // 检查 resultTime 是否超出当前时间
  if (resultDate.isBefore(dayjs())) {
    throw new Error('计算的出发时间超出当前时间!')
  }

  resultTime.value = result
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
