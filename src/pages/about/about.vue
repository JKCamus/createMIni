<template>
  <view class="container">
    <view class="header">
      <image src="@/static/img/avatar.jpg" class="avatar" />
      <text>上午好，您好</text>
    </view>

    <view class="actions">
      <view class="action-item">
        <button class="action-button">New task</button>
      </view>
      <view class="action-item">
        <button class="action-button">Task record</button>
      </view>
    </view>

    <view class="task-section">
      <view class="task-header">
        <text>当前任务 (3)</text>
        <text>全部任务 (4)</text>
      </view>
      <view class="task-list">
        <view class="task-item" v-for="task in tasks" :key="task.id">
          <text>{{ task.title }}</text>
          <text>{{ task.date }}</text>
        </view>
      </view>
    </view>

    <view class="summary">
      <view class="summary-item">
        <text>121</text>
        <text>人数</text>
      </view>
      <!-- ... 其他摘要项目 ... -->
    </view>
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
<style>
.container {
    padding: 20rpx;
    background-color: #f5f5f5;
    height: 100vh;
}

.header {
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 20rpx 30rpx;
    border-bottom: 1rpx solid #eee;
}

.avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}

.actions {
    display: flex;
    justify-content: space-around;
    margin-top: 20rpx;
}

.action-item {
    width: 45%;
}

.action-button {
    width: 100%;
    padding: 20rpx;
    background-color: #007AFF;
    color: #fff;
    border-radius: 10rpx;
    text-align: center;
}

.task-section {
    background-color: #fff;
    padding: 20rpx 30rpx;
    border-radius: 10rpx;
    margin-top: 20rpx;
}

.task-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10rpx;
}

.task-list {
    border-top: 1rpx solid #eee;
}

.task-item {
    display: flex;
    justify-content: space-between;
    border-bottom: 1rpx solid #eee;
    padding: 10rpx 0;
}

.summary {
    display: flex;
    gap: 20rpx;
    justify-content: space-around;
    background-color: #fff;
    padding: 20rpx 30rpx;
    border-radius: 10rpx;
    margin-top: 20rpx;
}

.summary-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
