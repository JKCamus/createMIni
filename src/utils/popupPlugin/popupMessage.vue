<template>
  <uni-popup ref="messagePopup" type="message">
    <uni-popup-message
      :type="msgType"
      :message="messageText"
      :duration="2000"
    ></uni-popup-message>
  </uni-popup>
</template>

<script setup lang="ts">

import { ref, Ref, defineExpose } from 'vue'

const msgType: Ref<string | null> = ref(null)
const messageText: Ref<string | null> = ref(null)
const messagePopup: Ref<null> = ref(null)
const durationValue: Ref<number | null> = ref(2000)

const showMessagePopup = (type: string, message: string, duration = 2000) => {
  msgType.value = type
  messageText.value = message
  durationValue.value = duration
  if (messagePopup?.value) {
    messagePopup?.value?.open()
  }
}
defineExpose({
  showMessagePopup
})
</script>
