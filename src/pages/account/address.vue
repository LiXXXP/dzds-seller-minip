<template>
  <view class="address">
    <view class="list flex row-between col-center">
      <view class="item">
        <view class="addr">
          <text class="default">默认</text>
          <text>河南省郑州市金水区</text>
        </view>
        <text class="user">王先生 17802281345</text>
      </view>
      <image src="@/static/apply/edit.png"></image>
    </view>
    <view class="button">新增地址</view>
  </view>
</template>

<script>
export default {
  data() {
    return {}
  },
  onLoad() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.address {
  width: 100vw;
  height: 100vh;
  padding: 32rpx 0;
  box-sizing: border-box;
  background-color: #f7faff;
  .list {
    width: 100%;
    padding: 32rpx;
    box-sizing: border-box;
    border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
    image {
      width: 40rpx;
      height: 40rpx;
    }
    .item {
      color: #1a2234;
      .addr {
        font-size: 28rpx;
        font-weight: 500;
        .default {
          color: #fff;
          padding: 0 8rpx;
          font-size: 24rpx;
          font-weight: 400;
          margin-right: 12rpx;
          border-radius: 4rpx;
          background-color: #3c7dff;
        }
      }
      .user {
        color: #b1b6bb;
        font-size: 24rpx;
      }
    }
  }
  .button {
    color: #fff;
    z-index: 99;
    width: 686rpx;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    border-radius: 100rpx;
    background-color: #3c7dff;
    position: fixed;
    left: 50%;
    bottom: 64rpx;
    margin-left: -343rpx;
  }
}
</style>
