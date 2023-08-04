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
import { provide, ref, Ref, defineExpose } from 'vue'

const msgType: Ref<string | null> = ref(null)
const messageText: Ref<string | null> = ref(null)
const messagePopup: Ref<null> = ref(null)
console.log('------', )
const showMessagePopup = (type: string, message: string) => {
  msgType.value = type
  messageText.value = message
  console.log('messagePopup', messagePopup.value)
  if (messagePopup?.value) {
    messagePopup?.value?.open()
  }
}
defineExpose({
  childName: '这是子组件的属性',
  showMessagePopup
})
</script>
