<template>
  <view class="wrapper">
    <view class="titleInfo">
      <!-- <p class="title">锅友</p> -->
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
        v-for="activeItem in activeList"
        class="menu-item"
        :key="activeItem.food"
        @click="addToCook(activeItem.food, activeItem.time)"
      >
        <span class="foodName">{{ activeItem.food }}</span>
        <span class="foodTimeContainer">
          <span class="foodTime">{{ activeItem.formatTime }}</span>
        </span>
      </div>
    </view>
    <view class="customBlock">
      <div class="customInputWrap">
        <span class="label">菜名</span>
        <up-input placeholder="自定义菜名" border="none" clearable></up-input>
      </div>
      <div class="customInputWrap">
        <span class="label">时间</span>
        <up-input placeholder="自定义时间" border="none" clearable></up-input>
      </div>
      <up-button
        class="putIntoButton"
        type="primary"
        text="下锅"
        color="#e93134"
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
import { computed, reactive, ref } from 'vue'
import foodProcess from './foodProcess.vue'

enum MenuType {
  Meat = '肉类',
  Beef = '牛肉',
  Seafood = '河海鲜',
  Vegetables = '蔬菜',
  BeanProducts = '豆制品',
  Mushrooms = '菌菇',
  StapleFood = '主食',
  CustomHistory = '自定义历史'
}
interface List {
  food: string
  time: number
}
type CookingItem = List & {
  id: number
  completedAt?: number
}

interface MenuList {
  type: MenuType
  list: List[]
}

const menuList = reactive<MenuList[]>([
  {
    type: MenuType.Meat,
    list: [
      { food: '鸭血', time: 6 * 60 },
      { food: '黄喉', time: 1 * 60 },
      { food: '肥牛', time: 20 },
      { food: '毛肚', time: 15 },
      { food: '鸭肠', time: 20 },
      { food: '鲜切牛肉', time: 30 },
      { food: '千层毛肚', time: 3 * 60 },
      { food: '鹌鹑蛋', time: 3 * 60 }
    ]
  },
  {
    type: MenuType.Beef,
    list: [
      { food: '嫩牛', time: 10 },
      { food: '三花趾', time: 10 },
      { food: '五花趾', time: 10 },
      { food: '匙柄', time: 8 },
      { food: '匙仁', time: 8 },
      { food: '脖仁', time: 10 },
      { food: '吊龙伴', time: 8 },
      { food: '吊龙', time: 8 },
      { food: '肥胼', time: 12 },
      { food: '胸口油', time: 2 * 60 },
      { food: '牛舌', time: 10 },
      { food: '牛百叶', time: 8 },
      { food: '手锤牛肉丸', time: 10 * 60 }
    ]
  },
  {
    type: MenuType.Seafood,
    list: [
      { food: '虾滑', time: 3 * 60 },
      { food: '巴沙鱼片', time: 3 * 60 },
      { food: '鲜虾', time: 3 * 60 }
    ]
  },
  {
    type: MenuType.Vegetables,
    list: [
      { food: '娃娃菜', time: 2 * 60 },
      { food: '菠菜', time: 30 },
      { food: '冬瓜', time: 3 * 60 },
      { food: '山药', time: 3 * 60 }
    ]
  }
])

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
  console.log('cookingPoor', cookingPoor)
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
</script>
<style lang="scss" scoped>
$card-border-radius: 24rpx;

.wrapper {
  display: flex;
  flex-direction: column;
  background-color: #e93134;
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
  height: 400rpx;
  margin-top: 20rpx;
  padding: 20rpx;
  border-radius: $card-border-radius;
  background-color: #fff;
  display: flex;
  gap: 10rpx;
  flex-wrap: wrap;
  overflow-y: scroll;
  align-content: flex-start;

  .menu-item {
    background-color: #ff4d4f;
    height: 48rpx;
    font-size: 28rpx;
    color: white;
    padding: 10rpx 18rpx;
    border-radius: 10rpx;
    justify-content: space-between;
    margin-bottom: 10rpx;
    display: flex;
    align-items: center;
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
}
.putIntoButton {
  width: 96rpx;
  button {
    height: 30px !important;
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
