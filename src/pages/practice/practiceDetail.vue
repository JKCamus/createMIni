<template>
  <view class="wrapper">
    <attrsMode v-if="dynamicComponent === Methods.ATTRS"></attrsMode>
    <emitMode v-else-if="dynamicComponent === Methods.EMIT"></emitMode>
    <injectMode v-else-if="dynamicComponent===Methods.PROVIDE"></injectMode>
    <u-empty
      v-else
      mode="page"
    >
    </u-empty>
    <!-- <emitMode v-else="dynamicComponent===Methods.EMIT"></emitMode> -->
  </view>
</template>

<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import attrsMode from './attrsMode/attrsMode.vue'
import emitMode from './emitMode/emitMode.vue'
import injectMode from './provideMode/provideMode.vue'
import { ref } from 'vue'
import { Methods } from './types'

const dynamicComponent = ref<Methods>()


onLoad((options) => {
  console.log('options', options)
  dynamicComponent.value=options!.methods
})
</script>
<style lang="scss"></style>
