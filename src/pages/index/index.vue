<template>
  <view class="home">
    <view class="banner" @click="showPhone = true">
      <image src="@/static/banner/banner.png"></image>
    </view>
    <view class="supply-tab flex row-between">
      <text class="goods active"></text>
      <view class="more flex col-center" @click="toMore">
        <text>更多</text>
        <image src="@/static/home/right.png"></image>
      </view>
    </view>
    <!-- 求购大厅 -->
    <view class="supply-list">
      <view class="item flex row-between" v-for="item in goodList" :key="item.id" @click="toDetail(item)">
        <view class="goods flex">
          <image :src="item.cover"></image>
          <view class="info flex flex-column row-between">
            <text class="title">{{ item.goodsCategory }}</text>
            <view class="flex col-center">
              <view class="flex col-center">
                <image src="@/static/home/money.png"></image>
                <text class="blue breadth">{{ item.price }} 元/ {{ item.unit }}</text>
              </view>
              <view class="flex col-center">
                <image src="@/static/home/bag.png"></image>
                <text class="blue">{{ item.quantity }} {{ item.unit }}</text>
              </view>
            </view>
            <view class="flex col-center">
              <view class="flex col-center">
                <image src="@/static/home/addr.png"></image>
                <text class="breadth">{{ item.destinationAddress }}</text>
              </view>
              <view class="flex col-center">
                <image src="@/static/home/time.png"></image>
                <text>{{ item.createAt }}</text>
              </view>
            </view>
          </view>
        </view>
        <view class="icon-heart" @click.stop="onCollect(item)">
          <image v-if="!item.isCollect" src="@/static/home/collect.png"></image>
          <image v-else src="@/static/home/collect-select.png"></image>
        </view>
      </view>
    </view>
    <view v-if="goodList.length < 1" class="none">
      <text>暂无数据</text>
    </view>
    <!-- 客服 -->
    <view class="service" @click="showPhone = true">
      <image src="@/static/home/service.png"></image>
    </view>
    <!-- 客服电话 -->
    <u-overlay :show="showPhone" :z-index="999">
      <view class="overlay-warp" @tap.stop>
        <view class="phone">
          <text>工作时间：9:00-17:30</text>
          <text>400-880-9527</text>
        </view>
        <view class="cancel" @click="showPhone = false">取消</view>
      </view>
    </u-overlay>
  </view>
</template>

<script>
import GoodsApi from '@/api/goods.js'
import { date } from '@/common/util/util.js'
export default {
  data() {
    return {
      showPhone: false, // 显示客服电话0
      goodList: []
    }
  },
  onShow() {
    this.getDemandGoods()
  },
  methods: {
    // 供应大厅求购信息列表
    async getDemandGoods() {
      const _this = this
      GoodsApi.demandGoods({
        page: {
          returnCount: true
        }
      })
        .then((res) => {
          if (res.status.success) {
            _this.goodList = res.body.demandGoodsList
            for (const item of _this.goodList) {
              this.$set(item, 'isCollect', false)
              item.createAt = date('Y-m-d', item.createAt)
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 商品详情
    toDetail(item) {
      uni.navigateTo({
        url: '/pages/detail/index?item=' + encodeURIComponent(JSON.stringify(item))
      })
    },
    // 收藏
    onCollect(item) {
      item.isCollect = !item.isCollect
    },
    // 更多
    toMore() {
      uni.navigateTo({
        url: '/pages/more/index'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  width: 100vw;
  height: 100vh;
  background-color: #f7faff;
  .banner {
    height: 240rpx;
    padding: 0 32rpx;
    margin: 36rpx auto;
    border-radius: 8rpx;
    image {
      width: 100%;
      height: 100%;
      box-shadow: 0px 8px 20px 0px rgba(60, 125, 255, 0.3);
    }
  }
  .supply-tab {
    color: #666;
    padding: 32rpx;
    font-size: 28rpx;
    margin-bottom: 32rpx;
    text {
      position: relative;
      &.goods {
        &::before {
          z-index: 999;
          width: 160rpx;
          display: block;
          content: '求购大厅';
          position: absolute;
          top: 0;
        }
        &.active {
          color: #131313;
          font-size: 36rpx;
          font-weight: 600;
          top: -10rpx;
          &::after {
            content: '';
            width: 150rpx;
            height: 12rpx;
            display: block;
            background: linear-gradient(135deg, #6fb4ff 0%, #3c7dff 100%);
            border-radius: 10px;
            position: absolute;
            left: -6rpx;
            top: 36rpx;
          }
        }
      }
    }
    .more {
      text {
        color: #2b2a35;
        font-size: 28rpx;
      }
      image {
        width: 44rpx;
        height: 44rpx;
      }
    }
  }
  .supply-list {
    width: 100%;
    background-color: #fdfefe;
    .item {
      padding: 32rpx 40rpx;
      box-sizing: border-box;
      border-bottom: 1rpx solid rgba(0, 0, 0, 0.1);
      position: relative;
      .icon-heart {
        width: 40rpx;
        height: 40rpx;
        position: absolute;
        top: 32rpx;
        right: 40rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .goods {
        image {
          width: 124rpx;
          height: 124rpx;
          border-radius: 16rpx;
        }
        .info {
          margin-left: 24rpx;
          image {
            width: 24rpx;
            height: 24rpx;
            margin-right: 8rpx;
          }
          text {
            color: #606a78;
            font-size: 24rpx;
          }
          .title {
            color: #2b2a35;
            font-weight: 600;
            font-size: 32rpx;
          }
          .blue {
            color: #3c7dff;
            font-weight: 600;
          }
          .breadth {
            width: 260rpx;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .none {
    color: #666;
    text-align: center;
  }
  .service {
    width: 120rpx;
    height: 120rpx;
    border-radius: 100%;
    box-shadow: 0px 8px 20px 0px rgba(60, 125, 255, 0.3);
    position: fixed;
    right: 32rpx;
    bottom: 32rpx;
    image {
      width: 100%;
      height: 100%;
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
