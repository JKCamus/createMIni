<template>
  <view class="wrapper">
    <div id="container"></div>
  </view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
console.log('global', global)

const PANOLENS =require('../../static/js/panolens.min.js')

onMounted(() => {
  let viewer = new PANOLENS.Viewer({
    container: document.querySelector('#container'),
    controlButtons: ['fullscreen', 'setting', 'video'],
    autoRotate: true, //自动播放
    autoRotateActivationDuration: 2000, //时长
    autoRotateSpeed: 0.3 //速度
  })

  let panorama = new PANOLENS.ImagePanorama('https://pchen66.github.io/panolens.js/examples/asset/textures/equirectangular/view.jpg');
  viewer.add(panorama);

})
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: 0;
}

#container {
  width: 100%;
  height: 100%;
}
</style>
