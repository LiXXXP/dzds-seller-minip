<template>
  <view class="setting">
    <u-cell title="头像">
      <image
        slot="value"
        :src="headerUrl"
        class="header"
        :titleStyle="{ color: '#1A2234', 'font-size': '28rpx' }"
        @click="chooseHeader"
      ></image>
    </u-cell>
    <u-cell
      title="认证"
      value="未认证"
      isLink
      url="/pages/account/buyer"
      :titleStyle="{ color: '#1A2234', 'font-size': '28rpx' }"
    ></u-cell>
    <view class="button">退出</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      headerUrl: require('@/static/account/header.png')
    }
  },
  onLoad() {},
  methods: {
    chooseHeader() {
      const _this = this
      uni.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], // 从相册选择
        success: function (res) {
          _this.headerUrl = res.tempFilePaths[0]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  width: 100vw;
  height: 100vh;
  padding: 32rpx;
  box-sizing: border-box;
  background-color: #f7faff;
  .header {
    width: 112rpx;
    height: 112rpx;
    border-radius: 100%;
  }
  .button {
    width: 100%;
    height: 88rpx;
    color: #606a78;
    font-size: 28rpx;
    font-weight: 500;
    line-height: 88rpx;
    text-align: center;
    margin-top: 198rpx;
    border-radius: 20rpx;
    background-color: #ededed;
  }
}
</style>
