<template>
  <view class="more">
    <u-sticky :zIndex="99999">
      <view class="select flex row-around">
        <view class="flex col-center" @click="onSelect(0)">
          <text :class="{ active: currentIndex === 0 }">{{ goodsCategory ? goodsCategory : '分类' }}</text>
          <image v-if="currentIndex === 0" src="@/static/more/pull-blue.png"></image>
          <image v-else src="@/static/more/pull.png"></image>
        </view>
        <view class="flex col-center" @click="onSelect(1)">
          <text :class="{ active: currentIndex === 1 }">{{ goodsType ? goodsType : '品名' }}</text>
          <image v-if="currentIndex === 1" src="@/static/more/pull-blue.png"></image>
          <image v-else src="@/static/more/pull.png"></image>
        </view>
        <view class="flex col-center" @click="onSelect(2)">
          <text :class="{ active: currentIndex === 2 }">价格</text>
          <image v-if="currentIndex === 2" src="@/static/more/pull-blue.png"></image>
          <image v-else src="@/static/more/pull.png"></image>
        </view>
        <view class="flex col-center" @click="onSelect(3)">
          <text :class="{ active: currentIndex === 3 }">距离</text>
          <image v-if="currentIndex === 3" src="@/static/more/pull-blue.png"></image>
          <image v-else src="@/static/more/pull.png"></image>
        </view>
      </view>
    </u-sticky>
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
    <u-popup
      :show="show"
      :safeAreaInsetTop="true"
      :customStyle="{ 'margin-top': '40rpx', padding: '0 17rpx' }"
      mode="top"
      @close="close"
    >
      <view class="classify flex flex-wrap col-center" v-if="currentIndex === 0">
        <text v-for="item in classesList" :key="item.name" @click="onGoods(item.name)">{{ item.name }}</text>
      </view>
      <view class="classify flex flex-wrap col-center" v-if="currentIndex === 1">
        <text v-for="item in tradeList" :key="item.name" @click="onGoods(item.name)">{{ item.name }}</text>
      </view>
      <view v-if="currentIndex === 2">
        <u-slider v-model="price" blockSize="24" activeColor="#007AFF" min="0" max="10000" showValue></u-slider>
      </view>
      <view v-if="currentIndex === 3">
        <u-slider v-model="distance" blockSize="24" activeColor="#007AFF" min="0" max="1000" showValue></u-slider>
      </view>
    </u-popup>
  </view>
</template>

<script>
import GoodsApi from '@/api/goods.js'
import { date } from '@/common/util/util.js'
export default {
  data() {
    return {
      show: false,
      goodList: [],
      currentIndex: -1,
      goodsCategory: '',
      goodsType: '',
      price: 5000,
      distance: 500,
      classesList: [
        {
          name: '全部'
        },
        {
          name: '石子'
        },
        {
          name: '天然石'
        },
        {
          name: '机制砂'
        },
        {
          name: '规格砂'
        },
        {
          name: '块石'
        },
        {
          name: '料石'
        },
        {
          name: '天然砂'
        },
        {
          name: '荒料'
        },
        {
          name: '大板'
        },
        {
          name: '条板'
        }
      ],
      tradeList: [
        {
          name: '全部'
        },
        {
          name: '1-2石子'
        },
        {
          name: '1-3石子'
        },
        {
          name: '石粉'
        },
        {
          name: '规格砂'
        },
        {
          name: '5-30石子'
        },
        {
          name: '天然砂'
        },
        {
          name: '0-5石子'
        },
        {
          name: '级配碎石'
        }
      ]
    }
  },
  onLoad() {
    this.getDemandGoods()
  },
  methods: {
    // 供应大厅求购信息列表
    async getDemandGoods() {
      const _this = this
      GoodsApi.demandGoods({
        goodsCategory: _this.goodsCategory,
        goodsType: _this.goodsType,
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
    onSelect(index) {
      this.show = !this.show
      if (this.show) {
        this.currentIndex = index
      } else {
        this.currentIndex = -1
      }
    },
    close() {
      this.show = false
      this.currentIndex = -1
    },
    onGoods(name) {
      if (name === '全部') {
        this.goodsCategory = ''
        this.goodsType = ''
      } else {
        if (this.currentIndex === 0) {
          this.goodsCategory = name
        }
        if (this.currentIndex === 1) {
          this.goodsType = name
        }
      }
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.more {
  .select {
    width: 100%;
    padding: 20rpx 0;
    background-color: #fdfefe;
    border: 2rpx solid rgba(0, 0, 0, 0.1);
    view {
      color: #606a78;
      font-size: 28rpx;
      text {
        &.active {
          color: #3c7dff;
        }
      }
      image {
        width: 16rpx;
        height: 8rpx;
        margin-left: 14rpx;
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
    padding-top: 32rpx;
    text-align: center;
  }
  .classify {
    text {
      color: #fff;
      width: 144rpx;
      height: 50rpx;
      font-size: 24rpx;
      line-height: 50rpx;
      text-align: center;
      margin: 12rpx 15rpx;
      border-radius: 25rpx;
      background-color: #3c7dff;
    }
  }
}
</style>
