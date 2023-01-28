<template>
  <view class="detail">
    <gwin-swiper></gwin-swiper>
    <view class="card">
      <view class="title flex row-between">
        <view class="flex col-center">
          <text class="name">{{ detail.goodsCategory }}</text>
          <text class="num">求购：{{ detail.quantity }}{{ detail.unit }}</text>
        </view>
        <view @click="isCollect = !isCollect">
          <image v-if="!isCollect" src="@/static/home/collect.png"></image>
          <image v-else src="@/static/home/collect-select.png"></image>
        </view>
      </view>
      <view class="price flex col-center">
        <image src="@/static/home/money.png"></image>
        <text>{{ detail.price }} 元/{{ detail.unit }}</text>
      </view>
      <view class="info">
        <view class="flex row-between">
          <text>发货时效</text>
          <text>{{ detail.limitations }}</text>
        </view>
        <view class="flex row-between">
          <text>联系人姓名</text>
          <text>{{ detail.buyerName }}</text>
        </view>
        <view class="flex row-between">
          <text>手机号</text>
          <text>{{ detail.buyerMobile }}</text>
        </view>
        <view class="flex row-between">
          <text>配送至</text>
          <text>{{ detail.destinationAddress }}</text>
        </view>
      </view>
      <view class="explain">
        <view>详细说明</view>
        <view>{{ detail.memo }}</view>
      </view>
    </view>
    <view class="button">
      <view class="dial-btn" @click="showPhone = true">隐私拨打</view>
    </view>
    <!-- 拨打 -->
    <u-overlay :show="showPhone" :z-index="999">
      <view class="overlay-warp" @tap.stop>
        <view class="phone">
          <text>17947274524</text>
        </view>
        <view class="cancel" @click="showPhone = false">取消</view>
      </view>
    </u-overlay>
  </view>
</template>

<script>
export default {
  data() {
    return {
      isCollect: false,
      showPhone: false,
      detail: {}
    }
  },
  onLoad(option) {
    const item = JSON.parse(decodeURIComponent(option.item))
    this.detail = item
  }
}
</script>

<style lang="scss" scoped>
.detail {
  width: 100vw;
  height: 100vh;
  padding: 32rpx;
  padding-bottom: 64rpx;
  box-sizing: border-box;
  background-color: #f7faff;
  .card {
    width: 100%;
    padding: 32rpx;
    margin-top: 32rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    box-shadow: inset 0px -2px 0px 0px rgba(0, 0, 0, 0.1);
    border-radius: 16px;
    .title {
      .name {
        max-width: 200rpx;
        color: #2b2a35;
        font-size: 32rpx;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .num {
        color: #fff;
        font-size: 24rpx;
        margin-left: 24rpx;
        padding: 8rpx 10rpx;
        border-radius: 8rpx;
        background-color: #3c7dff;
      }
      image {
        width: 40rpx;
        height: 40rpx;
      }
    }
    .price {
      margin-top: 32rpx;
      padding-bottom: 32rpx;
      border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
      image {
        width: 24rpx;
        height: 24rpx;
        margin-right: 8rpx;
      }
      text {
        color: #3c7dff;
        font-weight: 600;
        font-size: 36rpx;
      }
    }
    .info {
      padding: 32rpx 0;
      border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
      text {
        color: #2b2a35;
        font-size: 28rpx;
        line-height: 64rpx;
        &:first-child {
          color: #b1b6bb;
        }
      }
    }
    .explain {
      padding: 32rpx 0;
      view {
        color: #2b2a35;
        font-size: 28rpx;
        line-height: 64rpx;
        &:first-child {
          color: #b1b6bb;
        }
      }
    }
  }
  .button {
    margin-top: 64rpx;
    .dial-btn {
      color: #fff;
      width: 100%;
      height: 100rpx;
      font-size: 32rpx;
      font-weight: 500;
      line-height: 100rpx;
      text-align: center;
      border-radius: 50rpx;
      background-color: #41c870;
    }
  }
  .overlay-warp {
    width: 100%;
    padding: 32rpx;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    .phone {
      text-align: center;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.7);
      border-radius: 24rpx;
      text {
        color: #3c7dff;
        display: block;
        padding: 32rpx 0;
        font-size: 36rpx;
        &:first-child {
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
      }
    }
    .cancel {
      color: #3c7dff;
      padding: 30rpx;
      font-size: 36rpx;
      margin-top: 20rpx;
      text-align: center;
      border-radius: 24rpx;
      background-color: #fff;
    }
  }
}
</style>
