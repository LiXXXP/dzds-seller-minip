<template>
  <view class="concern">
    <view class="cont">
      <image src="@/static/empty/empty.png"></image>
      <text>暂无数据</text>
    </view>
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
.concern {
  width: 100vw;
  height: 100vh;
  padding: 32rpx 0;
  box-sizing: border-box;
  background-color: #f7faff;
  .cont {
    color: #b1b6bb;
    font-size: 28rpx;
    text-align: center;
    margin-top: 268rpx;
    image {
      width: 480rpx;
      height: 360rpx;
      margin: 0 auto;
    }
  }
}
</style>
