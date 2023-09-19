<template>
  <view class="page">
    <image class="bg-img" src="/static/img/bg.png" />
    <view class="inner" :style="[getInnerStyle]">
      <view class="header">
        <scroll-view class="type-list" scroll-x>
          <text
            v-for="(item, index) of getNameList"
            :key="index"
            class="type-name"
            :class="{ 'type-name--active': index === typeIndex }"
            @tap="onNameTap(index)"
            >{{ item }}</text
          >
        </scroll-view>
        <scroll-view scroll-x>
          <view class="image-list">
            <view
              v-for="(item, index) of getImageList"
              :key="index"
              class="preview"
              @click="onImageClick(item, index)"
            >
              <image class="avatar" :src="avatar"></image>
              <image class="image" :src="item"></image>
            </view>
          </view>
        </scroll-view>
      </view>
      <view class="main">
        <view class="image-wp">
          <canvas type="2d" id="myCanvas"></canvas>
        </view>
        <view class="button-group">
          <button
            class="button"
            open-type="chooseAvatar"
            @chooseavatar="onChooseAvatar"
          >
            获取头像
          </button>
          <button class="button" @tap="onSaveImage">保存图片</button>
          <button class="button" open-type="share">分享好友</button>
        </view>
      </view>
      <view v-if="isGradient" class="params">
        <view class="title">生成参数</view>
        <view v-for="(item, index) in params" :key="index" class="slider-wp">
          {{ item.name }}：
          <slider
            class="slider"
            block-size="24"
            :value="item.value"
            :max="item.max"
            :min="item.min"
            :step="item.step"
            @changing="onSliderChange($event, index)"
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import data from "./data";

const size = uni.upx2px(300);

export default {
  data() {
    return {
      startImage: {},
      timer: null,
      canvas: {},
      ctx: {},
      isGradient: true,
      statusBarHeight: 20,
      typeIndex: 0,
      imageIndex: 0,
      avatar: "/static/img/avatar.jpg",
      image: "",
      params: {
        starSize: {
          name: "五星大小",
          max: size * 0.5,
          min: size * 0.1,
          value: size * 0.3,
          step: 1
        },
        gradientSzie: {
          name: "渐变大小",
          max: size * 1.5,
          min: 50 * 0.5,
          value: size * 1.2,
          step: 1
        },
        gradientPostion: {
          name: "渐变位置",
          max: 100,
          min: -100,
          value: 0,
          step: 1
        },
        gradientSection: {
          name: "渐变区间",
          max: 8,
          min: 2,
          value: 4,
          step: 0.2
        }
      }
    };
  },
  computed: {
    getNameList() {
      return data.map(item => item.name);
    },
    getImageList() {
      return data[this.typeIndex].images || [];
    },
    getInnerStyle() {
      return {
        paddingTop: this.statusBarHeight + uni.upx2px(200) + "px"
      };
    }
  },
  onLoad() {
    uni.showModal({
      title: "温馨提示",
      content:
        "使用新头像前，建议先保存原始头像，方便后面换回原始头像，本程序不会存储用户端图片。",
      showCancel: false
    });
    this.image = this.getImageList[0];
    this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
  },
  onReady() {
    const query = wx.createSelectorQuery();
    query
      .select("#myCanvas")
      .fields({
        node: true,
        size: true
      })
      .exec(res => {
        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
        const dpr = wx.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);
        this.canvas = canvas;
        this.ctx = ctx;
        this.loadImage("/static/img/star.png").then(res => {
          this.startImage = res;
          this.generate();
        },(err)=>{
          console.log('res=>err', err)
        })
      });
  },
  onShareAppMessage() {
    return {
      title: "国庆来临，快来试试新头像啦"
    };
  },
  methods: {
    onNameTap(index) {
      if (this.typeIndex === index) return;
      this.typeIndex = index;
      if (this.isGradient) {
        this.params = this.$options.data().params;
      }
    },
    onImageClick(item, index) {
      if (this.image === item) return;
      this.image = item;
      this.imageIndex = index;
      this.isGradient = this.typeIndex === 0;
      if (this.isGradient) {
        this.params = this.$options.data().params;
      }

      this.generate();
    },
    onSliderChange(e, key) {
      this.params[key].value = e.detail.value;
      this.generate();
    },
    onChooseAvatar(e) {
      this.avatar = e.detail.avatarUrl;
      this.generate();
    },
    async onSaveImage() {
      const { canvas, ctx } = this;
      ctx.clearRect(0, 0, size, size);
      await this.generate();
      uni.canvasToTempFilePath({
        canvas,
        success: res => {
          const tempFilePath = res.tempFilePath;
          uni.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success: () => {
              uni.showToast({
                title: "保存相册成功",
                icon: "success"
              });
            },
            fail: e => {
              if (e.errMsg !== "saveImageToPhotosAlbum:fail auth deny") return;
              uni.showModal({
                title: "温馨提示",
                content: "请选开启添加到相册权限",
                success: uni.openSetting
              });
            }
          });
        }
      });
    },
    async generate() {
      if (this.isGradient) {
        await this.generate1();
        console.log('res=>-------1-', )
      } else {
        console.log('res=>-------2-', )

        await this.generate2();
      }
    },
    async generate1() {
      const {
        ctx,
        params: { starSize, gradientPostion, gradientSzie, gradientSection }
      } = this;
      if (this.avatar) {
        const avatar = await this.loadImage(this.avatar);
        ctx.drawImage(avatar, 0, 0, size, size);
      }

      console.log('res=>avatar',avatar )

      const list = {
        0: () => {
          return ctx.createRadialGradient(
            0,
            gradientPostion.value,
            0,
            0,
            gradientPostion.value + 20,
            gradientSzie.value * (1.414 / 1.5)
          );
        },
        1: () => {
          return ctx.createLinearGradient(
            0,
            size / 2,
            gradientSzie.value,
            size / 2
          );
        },
        2: () => {
          return ctx.createLinearGradient(
            0,
            0,
            gradientSzie.value,
            gradientSzie.value
          );
        }
      };
      let Gradient = list[this.imageIndex]();
      Gradient.addColorStop(0, "#d80203");
      Gradient.addColorStop(gradientSection.value / 10, "rgba(216,2,3,0.8)");
      Gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.fillStyle = Gradient;
      ctx.fillRect(0, 0, size, size);
      const image = this.startImage;
      ctx.drawImage(
        image,
        0,
        0,
        image.width,
        image.height,
        size * 0.04,
        size * 0.04,
        starSize.value * (image.width / image.height),
        starSize.value
      );
    },
    async generate2() {
      const { ctx } = this;

      const avatar = await this.loadImage(this.avatar);

      ctx.drawImage(avatar, 0, 0, size, size);
      const image = await this.loadImage(this.image);
      ctx.drawImage(image, 0, 0, size, size);
    },
    loadImage(url) {
      return new Promise((resolve, reject) => {
        const image = this.canvas.createImage();
        console.log('res=>url', image)
        console.log('res=>000url', url)
        console.log('res=>res', this.canvas)


        image.onload = () => resolve(image);
        image.onerror = reject;
        // image.src = 'static/img/star.png';
        image.src =url;

        console.log('res=>',image.src )
      });
    }
  }
};
</script>


<style lang="scss" scoped>
.full {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.glass {
  background: #fff;
  // background-color: rgba(255, 255, 255, 0.1);
  // backdrop-filter: blur(30rpx);
  // box-shadow: 0 0 20rpx #333;
}
.page {
  height: 100vh;
}
.bg-img {
  width: 100vw;
  height: 100vh;
  position: fixed;
  @extend .full;
}
.inner {
  position: relative;
  z-index: 1;
  padding: 240rpx 30rpx 0;
  .header {
    @extend .glass;
    padding: 15rpx 30rpx 30rpx;
    border-radius: 30rpx;
    height: 282rpx;
    box-sizing: border-box;
    .type-list {
      white-space: nowrap;
      margin: 0 -15rpx 15rpx;
      .type-name {
        font-size: 32rpx;
        display: inline-block;
        padding: 15rpx 15rpx;
      }
      .type-name--active {
        color: #f00;
        font-weight: 600;
      }
    }
    .image-list {
      display: flex;
      white-space: nowrap;
      .preview {
        width: 150rpx;
        height: 150rpx;
        position: relative;
        border-radius: 10rpx;
        overflow: hidden;
        &:not(:last-child){
          margin-right: 30rpx;
        }
        .avatar {
          width: 100%;
          height: 100%;
        }
        .image {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
  .main {
    display: flex;
    margin-top: 50rpx;
    .image-wp {
      width: 300rpx;
      height: 300rpx;
    }
    .button-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 30rpx;
      .button {
        @extend .glass;
        width: 100%;
        font-size: 34rpx;
        font-weight: bold;
      }
    }
  }
  .params {
    @extend .glass;
    padding: 30rpx 30rpx 10rpx;
    border-radius: 30rpx;
    margin-top: 50rpx;
    font-weight: bold;
    .title {
      margin-bottom: 20rpx;
    }
    .slider-wp {
      display: flex;
      align-items: center;
      font-size: 28rpx;
      .slider {
        flex: 1;
        margin: 20rpx;
      }
    }
  }
}
#myCanvas {
  width: 300rpx;
  height: 300rpx;
  &.hidden {
    position: fixed;
    top: -99999px;
    left: -99999px;
  }
}
</style>