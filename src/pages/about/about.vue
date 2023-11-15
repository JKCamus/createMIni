<template>
  <view class="container">
    <h1>关于小程序</h1>
    <u-line margin="10rpx 0"></u-line>
    <span class="content">
      主要用于练习及开发用于解决自己日常生活中需求的小工具。
    </span>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        { id: 1, title: '任务1', date: '2020/02/24 19:00:45', type: 'primary' },
        { id: 2, title: '任务2', date: '2020/02/24 19:00:50', type: 'success' },
        { id: 3, title: '任务3', date: '2020/02/24 19:00:55', type: 'warning' }
      ],
      summaries: [
        { type: 'people', number: 121, label: '人数' },
        { type: 'tasks', number: 52, label: '任务' },
        { type: 'messages', number: 235, label: '消息' },
        { type: 'others', number: 120, label: '其他' }
      ]
    }
  }
}
</script>
<style lang="scss">
.container {
    padding: 20rpx;
    background-color: #f5f5f5;
    height: 100vh;
}
.title {
  font-size: 0.85em;
}
.content {
  font-size: 14px;
  color: #5e6d82;
  line-height: 2em;
}

</style>
