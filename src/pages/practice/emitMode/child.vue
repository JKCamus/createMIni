<template>
  <view class="wrapper">
    <u-divider text="子组件中"></u-divider>
    <button @click="handleClick">changeNewValue</button>
  </view>
</template>

<script setup lang="ts">
const props = defineProps({
  name: String
})
const emit = defineEmits(['getChildEvent'])

const handleClick = () => {
  emit('getChildEvent', 'childValue')
}
</script>
<style lang="scss"></style>
