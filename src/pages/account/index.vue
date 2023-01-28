<template>
  <view>
    <view class="header">
      <image src="@/static/account/backgound.png" class="bk"></image>
      <view class="location flex col-center" :style="'top:' + head.top + 'rpx;'">
        <image src="@/static/home/location-blue.png"></image>
        <text>北京市</text>
      </view>
      <view class="user flex col-center">
        <image src="@/static/account/header.png" class="header-img"></image>
        <view class="phone">
          <text>182****1235</text>
          <view class="auth flex col-center">
            <image src="@/static/account/v.png"></image>
            <text>未实名认证</text>
          </view>
        </view>
      </view>
    </view>
    <view class="account">
      <view class="order">
        <view class="title">我的订单</view>
        <view class="flex row-between col-center">
          <view class="block" @click="toOrder(0)">
            <image src="@/static/account/all.png"></image>
            <view>全部</view>
          </view>
          <view class="block" @click="toOrder(2)">
            <image src="@/static/account/payment.png"></image>
            <view>待付款</view>
          </view>
          <view class="block" @click="toOrder(1)">
            <image src="@/static/account/deliver.png"></image>
            <view>待发货</view>
          </view>
          <view class="block" @click="toOrder(3)">
            <image src="@/static/account/delivery.png"></image>
            <view>配送中</view>
          </view>
          <view class="block" @click="toOrder(4)">
            <image src="@/static/account/complete.png"></image>
            <view>已完成</view>
          </view>
        </view>
      </view>
      <view class="order" style="padding: 10rpx 32rpx">
        <u-cell-group :border="false">
          <u-cell
            title="收货地址"
            isLink
            url="/pages/account/address"
            :titleStyle="{ color: '#1A2234', 'font-size': '28rpx' }"
          ></u-cell>
          <u-cell
            title="我的收藏"
            isLink
            url="/pages/account/concern"
            :titleStyle="{ color: '#1A2234', 'font-size': '28rpx' }"
          ></u-cell>
          <u-cell
            title="设置"
            isLink
            url="/pages/account/setting"
            :border="false"
            :titleStyle="{ color: '#1A2234', 'font-size': '28rpx' }"
          ></u-cell>
        </u-cell-group>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      head: {
        top: 0,
        height: 0
      }
    }
  },
  onShow() {
    const head = uni.getMenuButtonBoundingClientRect()
    this.head.top = head.top * 2
    this.head.height = head.height
  },
  methods: {
    toOrder(index) {
      uni.navigateTo({
        url: '/pages/order/index?index=' + index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 384rpx;
  box-sizing: border-box;
  position: relative;
  .bk {
    width: 100vw;
    height: 616rpx;
    position: absolute;
    top: 0;
    left: 0;
  }
  .location {
    margin-left: 32rpx;
    position: absolute;
    image {
      width: 40rpx;
      height: 40rpx;
    }
  }
  .user {
    margin-left: 32rpx;
    position: absolute;
    top: 200rpx;
    .header-img {
      width: 168rpx;
      height: 168rpx;
      border-radius: 100%;
    }
    .phone {
      color: #000;
      font-size: 32rpx;
      font-weight: 900;
    }
    .auth {
      margin-top: 20rpx;
      padding: 8rpx 22rpx;
      border-radius: 24rpx;
      background-color: #fff;
      image {
        width: 28rpx;
        height: 28rpx;
        margin-right: 4rpx;
      }
      text {
        color: #606a78;
        font-size: 24rpx;
        font-weight: 400;
      }
    }
  }
}
.account {
  z-index: 999;
  width: 100vw;
  height: 100vh;
  padding: 0 32rpx;
  box-sizing: border-box;
  background-color: #f7faff;
  position: absolute;
  top: 384rpx;
  .order {
    width: 100%;
    color: #1a2234;
    padding: 32rpx;
    font-size: 24rpx;
    border-radius: 20px;
    margin-bottom: 32rpx;
    box-sizing: border-box;
    background-color: #fff;
    .title {
      font-size: 32rpx;
      margin-bottom: 32rpx;
    }
    .block {
      width: 72rpx;
      text-align: center;
      image {
        width: 60rpx;
        height: 60rpx;
        margin: 0 auto 4rpx;
      }
    }
  }
}
</style>
