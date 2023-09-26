<template>
  <view id="clock">
    <p class="currentTime">{{ time }}</p>
    <p class="currentDate">2023年9月23日</p>
  </view>
  <u-cell-group class="cellGroup">
    <view v-for="(item, index) in timeControl">
      <u-cell
        :title="item.label"
        :key="item.key"
        @click="openTimePicker(index)"
        :value="item.value"
      >
      </u-cell>
      <timePicker ref="timePickerRefs" v-model:time="item.value"></timePicker>
    </view>
    <u-cell class="result" title="最晚出发时间" :value="resultTime"></u-cell>
  </u-cell-group>
  <button class="calcButton" @click="handleInARush">赶时间</button>
  <popupMessage id="message-popup"></popupMessage>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import timePicker from './timePicker.vue'
import Notify from '@components/popupMessage/Notify'

import dayjs from 'dayjs'
const time = ref('')
const resultTime = ref('')
const timePickerRefs = ref()
const uToast = ref()

const timeControl = reactive([
  {
    key: 'target',
    label: '目标时间',
    value: dayjs().format('HH:mm')
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
    const currentDate = dayjs()
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
    Notify({
      type: 'error',
      message: '计算的出发时间超出当前时间!'
    })
    
    resultTime.value = 'error'
  } else {
    resultTime.value = result
  }
  
}
</script>

<style lang="scss">
page {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande',
    'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
p {
  margin: 0;
  padding: 0;
}
#clock {
  font-weight: bold;
  text-align: center;
  margin: 56px 40px;
  .currentDate {
    color: #69c0ff;
  }

  .currentTime {
    letter-spacing: 0.05em;
    font-size: 60px;
    padding: 5px 0;
    color: #0050b3;
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
.cardBox {
  width: 220rpx;

  .uni-card {
    height: 120px;
    padding: 8px 0 !important;
    border-radius: 8px;
  }
  .label {
    font-size: 18px;
    color: #3a00fb;
  }
  .time {
    font-size: 20px;
    font-weight: bold;
    display: block;
    margin-top: 20px;
  }
}
.cellGroup {
  .u-cell__body {
    padding: 32px 24px !important;
    .u-cell__title-text {
      font-size: 24px;
    }
    .u-cell__value {
      font-size: 24px;
    }
  }
}

.result {
  .u-cell__value {
    color: #1c71e9 !important;
  }
}
.calcButton {
  width: 220rpx;
  margin-top: 140rpx;
  background: linear-gradient(to top right, #5287f0, #185fec);
  box-shadow: 0px 3px 4px #5287f0;
  color: #fff;
  font-size: 34rpx;
  &:active {
    transform: scale(0.96);
  }
}
button {
  border-radius: 48rpx;
}

button::after {
  border: unset;
}
.controlCell {
  display: flex;
  justify-content: center;
  text-align: center;
  justify-content: space-around;
}
</style>
