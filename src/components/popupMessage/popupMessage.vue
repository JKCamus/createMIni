<template>
  <uni-popup ref="messagePopup" type="message">
    <uni-popup-message
      :type="defaultOptions.type"
      :message="defaultOptions.message"
      :duration="defaultOptions.duration"
    ></uni-popup-message>
  </uni-popup>
</template>

<script setup lang="ts">
import { ref, defineExpose, reactive } from 'vue'

export interface MessagePopup {
  type: 'success' | 'warn' | 'error' | 'info'
  message: string
  duration: number
}

const defaultOptions = reactive({
  type: 'success',
  message: '',
  duration: 2000
})

const messagePopup = ref({
  open: () => {}
})

const showMessagePopup = (options: MessagePopup) => {
  const { type, message, duration } = options
  defaultOptions.type = type
  defaultOptions.message = message
  defaultOptions.duration = duration
  if (messagePopup?.value) {
    messagePopup?.value?.open()
  }
}
defineExpose({
  showMessagePopup
})
</script>
