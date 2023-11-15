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
      <div v-for="activeItem in activeList">
        <p>{{ activeItem.food }}</p>
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
    <view class="potCard"> </view>
  </view>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
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

console.log('menuTypeList', menuTypeList)

const menuTypeClick = ({ name }) => {
  activeType.value = name
}

const activeList = computed(() => {
  const activeMenu = menuList.find((menu) => menu.type === activeType.value)
  return activeMenu ? activeMenu.list : []
})
</script>
<style lang="scss">
$card-border-radius: 24rpx;

.wrapper {
  background-color: #e93134;
  height: 100vh;
  padding: 0 40rpx;
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
  margin: 20rpx 0;
  padding: 20rpx;
  border-radius: $card-border-radius;

  background-color: #fff;
}
.customBlock {
  background-color: #fff;
  height: 100rpx;
  margin: 40rpx 0;
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
  height: 400rpx;
  border-radius: $card-border-radius;
}

</style>
