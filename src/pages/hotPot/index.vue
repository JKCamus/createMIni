<template>
  <view class="wrapper">
    <view class="titleInfo">
      <p class="title">锅友</p>
      <view class="icon">
        <img
          class="clockIcon"
          src="../../static/img/hotpotClock.png"
          alt="clock-icon"
        />
      </view>
    </view>
    <view class="menuList">
      <u-tabs
        class="tabs"
        :list="menuTypeList"
        @click="menuTypeClick"
        lineColor="#fff"
        :activeStyle="{
          color: '#fff',
          fontWeight: 'bold',
          transform: 'scale(1.05)'
        }"
        :inactiveStyle="{
          color: 'rgba(255,255,255,0.5)',
          transform: 'scale(1)'
        }"
      ></u-tabs>
    </view>
    <view class="menuCard">
      <div
        class="setting"
        v-if="activeType === MenuType.CustomHistory"
        @click="recentHistorySetting"
      >
        ⚙️
      </div>
      <div class="menuContainer">
        <div
          v-for="(activeItem, index) in activeList"
          class="menu-item"
          :key="activeItem.food"
          @click="addToCook(activeItem.food, activeItem.time)"
        >
          <span class="foodName">{{ activeItem.food }}</span>
          <span class="foodTimeContainer">
            <span class="foodTime">{{ activeItem.formatTime }}</span>
          </span>
          <span v-if="showDelIcon" @click.stop="clearRecent(index)">
            <u-icon
              name="close"
              color="#fff"
              size="14"
              class="closeIcon"
            ></u-icon>
          </span>
        </div>
      </div>
    </view>
    <view class="customBlock">
      <div class="customInputWrap">
        <span class="label">菜名</span>
        <up-input
          v-model="customFood.food"
          placeholder="自定义菜名"
          border="none"
          clearable
        ></up-input>
      </div>
      <div class="customInputWrap">
        <span class="label">时间</span>
        <up-input
          v-model="customFood.time"
          placeholder="自定义时间"
          border="none"
          clearable
          type="number"
        ></up-input>
      </div>
      <up-button
        class="putIntoButton"
        type="primary"
        text="下锅"
        @click="customAddToCook"
        color="rgb(227, 67, 70)"
      ></up-button>
    </view>
    <view class="potCard">
      <div class="cookingPot" v-if="cookingPoor.length">
        <div class="tool">
          <!-- <img
          class="left-img"
          src="../../static/img/hotpotEmpty.png"
          alt="icon"
        /> -->
          <div class="right-tools">
            <span class="clear-button" @click="clearButton"> 🧹 </span>
          </div>
        </div>
        <div class="inPot">
          <foodProcess
            v-for="cooking in cookingPoor"
            :id="cooking.id"
            :key="cooking.food"
            :time="cooking.time"
            :foodName="cooking.food"
            @completeCooking="completeCooking"
            @delTargetFood="delTargetFood"
          ></foodProcess>
        </div>
      </div>
      <div v-else="!cookingPoor.length" class="empty-container">
        <img
          class="empty-image"
          src="../../static/img/hotpotEmpty.png"
          alt="empty-icon"
        />
        <span class="empty-info">别干看着，下锅，下锅~</span>
      </div>
    </view>
    <u-toast ref="uToastRef"></u-toast>
    <u-modal
      showCancelButton
      @confirm="clearAll"
      @cancel="clearCancel"
      :show="showClearAlert"
      :content="alertContent"
    ></u-modal>
  </view>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import foodProcess from './foodProcess.vue'

import {
CookingItem,
MenuList,
MenuType,
UToastType,
menuListData
} from './type'

const menuList = reactive<MenuList[]>(menuListData)

const menuTypeList = menuList.map((item) => {
  return { name: item.type }
})

const activeType = ref(MenuType.Meat)

const menuTypeClick = ({ name }: { name: MenuType }) => {
  activeType.value = name
}

const activeList = computed(() => {
  const activeMenu = menuList.find((menu) => menu.type === activeType.value)
  const list = activeMenu ? activeMenu.list : []
  const formatList = list.map((item) => ({
    ...item,
    formatTime: formatTime(item.time)
  }))
  return formatList
})

const formatTime = (time: number) => {
  const min = Math.floor(time / 60)
  const sec = time % 60
  if (min > 0) {
    return sec === 0 ? `${min}'` : `${min}'${sec}''`
  }
  return `${sec}''`
}

const cookingPoor = reactive<CookingItem[]>([])

const customFood = reactive<{ food: string; time: number | undefined }>({
  food: '',
  time: undefined
})

const uToastRef = ref<UToastType>({
  show: () => {}
})

// watchEffect(() => console.log('watch', customFood.time))

const customAddToCook = () => {
  const time = Number(customFood.time)
  const foodLengthLimit = 10
  const timeLimit = 2 * 60 * 60 // 2小时，以分钟为单位
  let notice = ''
  if (Number.isNaN(time)) {
    notice = '时间输入错误❎'
  }
  // 检查菜名长度
  if (customFood.food.length > foodLengthLimit) {
    notice = '菜名太长了，锅都放不下了🤪'
  }

  if (time < 1) notice = '甭麻烦了，直接刺身吧🤡'
  // 检查烹饪时间
  if (time > timeLimit) {
    notice = notice ? '你在找茬是不是？💢' : '煮太久了，咱不吃了🤪'
  }

  // 如果有任何提醒信息，则不继续执行
  if (notice) {
    uToastRef?.value?.show({
      message: notice,
      type: 'error'
    })

    return
  }

  // 添加到曾经tab
  const toRecentFood = {
    food: customFood.food,
    time
  }

  const recentList = menuList.find(
    (item) => item.type === MenuType.CustomHistory
  )

  recentList?.list.push(toRecentFood)

  const cookingFood = {
    id: Date.now(),
    food: customFood.food,
    time
  }

  cookingPoor.push(cookingFood)
  customFood.food = ''
  customFood.time = undefined
}

const addToCook = (food: string, time: number) => {
  const cookingFood = {
    id: Date.now(),
    time,
    food
  }
  cookingPoor.push(cookingFood)
}

const completeCooking = (id: number) => {
  const index = cookingPoor.findIndex((item) => item.id === id)
  if (index !== -1) {
    cookingPoor[index].completedAt = Date.now()
  }
  cookingPoor.sort((a, b) => {
    if (a.completedAt && b.completedAt) {
      return a.completedAt - b.completedAt
    }
    if (a.completedAt) {
      return -1
    }
    if (b.completedAt) {
      return 1
    }
    return 0
  })
  console.log('cookingPoor', cookingPoor) //todo 修复 id 导致不排序bug
}

const delTargetFood = (id: number) => {
  const index = cookingPoor.findIndex((item) => item.id === id)
  if (index !== -1) {
    cookingPoor.splice(index, 1)
  }
}

const showClearAlert = ref(false)
const alertContent = '那我清空计时器喽？'

const clearButton = () => {
  showClearAlert.value = true
}
const clearAll = () => {
  // 清空列表
  cookingPoor.length = 0
  showClearAlert.value = false
}

const clearCancel = () => {
  showClearAlert.value = false
}
const alignItem = computed(() => (cookingPoor.length ? 'flex-start' : 'center'))

const isSetting = ref(false)

const showDelIcon = computed(
  () => isSetting.value && activeType.value === MenuType.CustomHistory
)

const recentHistorySetting = () => {
  isSetting.value = !isSetting.value
}

const clearRecent = (index: number) => {
  const recentList = menuList.find(
    (item) => item.type === MenuType.CustomHistory
  )
  recentList?.list.splice(index, 1)

  // 清空列表后，自定义setting改为false
  if (!recentList?.list.length) {
    isSetting.value = false
  }
}

const storageKey = 'HOT_POT'

onMounted(() => {
  const storedData = uni.getStorageSync(storageKey)

  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData)
      const historyMenu = menuList.find(
        (item) => item.type === MenuType.CustomHistory
      )
      if (historyMenu) {
        historyMenu.list = parsedData
      }
    } catch (e) {
      console.error('Failed to parse stored data:', e)
    }
  }
})
onUnmounted(() => {
  const historyMenu = menuList.find(
    (item) => item.type === MenuType.CustomHistory
  )
  if (historyMenu) {
    const listToStore = historyMenu.list
    uni.setStorageSync(storageKey, JSON.stringify(listToStore))
  }
})
</script>
<style lang="scss" scoped>
$card-border-radius: 24rpx;

.wrapper {
  display: flex;
  flex-direction: column;
  background-color: #d63628;
  height: 100%;
  padding: 0 40rpx;
  min-height: 100vh;
}
.titleInfo {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40rpx;
  padding-bottom: 20rpx;
  .title {
    color: #fff;
    font-size: 100rpx;
  }
  .icon {
    height: 100rpx;
    width: 100rpx;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .clockIcon {
    width: 200rpx;
    height: 200rpx;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); // 正确居中图片
  }
}
/* .tabs {
  .u-tabs__wrapper {
    margin: 0 20px;
  }
} */
.menuCard {
  height: 320rpx;
  margin-top: 20rpx;
  padding: 20rpx;
  border-radius: $card-border-radius;
  background-color: #fff;
  display: flex;
  flex-direction: column;

  .menuContainer {
    overflow-y: scroll;
    flex-wrap: wrap;
    overflow-y: scroll;
    display: flex;
    gap: 10rpx;
    align-content: flex-start;
    .menu-item {
      background-color: rgb(227, 67, 70);
      height: 48rpx;
      font-size: 28rpx;
      color: white;
      padding: 10rpx 18rpx;
      border-radius: 10rpx;
      justify-content: space-between;
      margin-bottom: 10rpx;
      display: flex;
      align-items: center;
      position: relative;
      .closeIcon {
        position: absolute;
        top: -4rpx;
        right: -4rpx;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 10px;
      }
    }
  }

  .setting {
    display: flex;
    /* height: 30px; */
    justify-content: flex-end;
  }

  .foodName {
    flex: none;
    margin-right: 4rpx;
  }
  .foodTime {
    font-size: 22rpx;
    color: rgba(255, 255, 255, 0.6);
    text-align: end;
    position: relative;
    bottom: -4rpx;
  }
}
.customBlock {
  background-color: #fff;
  height: 100rpx;
  margin-bottom: 40rpx;
  margin-top: 40rpx;
  border-radius: $card-border-radius;
  justify-content: space-between;
  padding: 0 20rpx;
  font-size: 32rpx;
  color: #3a3a3a;
  align-items: center;
  display: flex;

  .customInputWrap {
    display: flex;
    flex: 1;
    .label {
      margin-right: 20rpx;
    }
  }

  .customInputWrap span,
  .customInputWrap up-input {
    flex: 1;
  }
  .putIntoButton {
    width: 96rpx;
    :deep(button) {
      height: 56rpx;
    }
  }
}

.potCard {
  background-color: #fff;
  max-height: 800rpx;
  border-radius: $card-border-radius;
  margin-bottom: 30px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: v-bind(alignItem);
  .inPot {
    padding: 0 10rpx 20rpx 10rpx;
    overflow-y: scroll;
    max-height: 700rpx;
  }

  .cookingPot {
    width: 100%;
  }

  .tool {
    display: flex;
    justify-content: flex-end;
    padding: 10rpx 30rpx 10rpx 20rpx;
    .left-img {
      width: 80rpx;
      height: 80rpx;
      object-fit: contain;
    }
    .right-tools {
      font-size: 40rpx;
    }
  }

  .empty-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    text-align: center;
    height: 100%;
    margin-top: -30rpx;
  }

  .empty-image {
    width: 300rpx;
    height: 300rpx;
    object-fit: contain;
  }
  .empty-info {
    margin-top: -30rpx;
    color: #999;
  }
}
</style>
