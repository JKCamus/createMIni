<template>
  <view class="wrapper">
    <!-- <span>---{{ time }}</span> -->
    <!-- <button @click="handle">90909009</button> -->
    <u-datetime-picker
      :show="show"
      v-model="time"
      @cancel="cancel"
      @confirm="confirm"
      mode="time"
    ></u-datetime-picker>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const emit = defineEmits(['update:time'])
const { time } = defineProps({
  time: String
})

const cancel = () => {
  show.value = false
}

const confirm = (e) => {
  show.value = false
  emit('update:time', e.value)

  console.log('value', e)
}
const handle = () => {
  emit('update:time', '00:08')
}

defineExpose({
  show
})
</script>
<style lang="scss"></style>
