<template>
  <view class="gwin-swiper">
    <u-swiper :list="bannerList" height="360rpx" indicatorStyle="right: 20px" @change="(e) => (currentNum = e.current)">
      <view slot="indicator" class="indicator-num">
        <text class="indicator-num__text">{{ currentNum + 1 }} / {{ bannerList.length }}</text>
      </view>
    </u-swiper>
  </view>
</template>

<script>
export default {
  data() {
    return {
      currentNum: 0,
      bannerList: [
        'https://cdgwin-dev.cn-bj.ufileos.com/gwin-dzsc/detail01.png',
        'https://cdgwin-dev.cn-bj.ufileos.com/gwin-dzsc/detail02.png',
        'https://cdgwin-dev.cn-bj.ufileos.com/gwin-dzsc/detail03.png',
        'https://cdgwin-dev.cn-bj.ufileos.com/gwin-dzsc/detail04.png',
        'https://cdgwin-dev.cn-bj.ufileos.com/gwin-dzsc/detail05.png'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.indicator-num {
  display: flex;
  justify-content: center;
  &__text {
    color: #fff;
    font-size: 24rpx;
  }
}
</style>
