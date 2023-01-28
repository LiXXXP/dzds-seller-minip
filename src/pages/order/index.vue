<template>
  <view>
    <u-navbar :safeAreaInsetTop="true" :bgColor="'#f7faff'" :placeholder="true" :autoBack="true">
      <view class="location flex" slot="center">
        <u-search
          placeholder="请输入搜索内容"
          :show-action="false"
          v-model="keyword"
          bgColor="#F7F8FA"
          borderColor="#DDDFE5"
          shape="square"
        ></u-search>
      </view>
    </u-navbar>
    <view class="order">
      <u-sticky bgColor="#fff" :customNavHeight="tophight.top + tophight.height + 7.8">
        <view class="nav flex row-around">
          <text
            v-for="(item, index) in navList"
            :key="item.name"
            :class="{ active: currentIndex === index }"
            @click="tabNav(index)"
            >{{ item.name }}</text
          >
        </view>
      </u-sticky>
      <view class="list">
        <view class="item" v-for="(item, index) in orders" :key="item.name" @click="toDetail(index)">
          <view class="title flex row-between">
            <text class="name">{{ item.goodsCategory }}</text>
            <text class="state">{{ item.state }}</text>
          </view>
          <view class="content flex col-center">
            <image :src="item.url"></image>
            <view class="info flex flex-column row-around">
              <text class="product">{{ item.product }}</text>
              <text>购买数量：{{ item.num }}吨</text>
              <text>运输方式：{{ item.transportType }}</text>
            </view>
          </view>
          <view class="footer flex row-between">
            <text class="price"
              >实付金额：<text>¥ {{ item.price }}</text></text
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tophight: 0,
      keyword: '',
      currentIndex: 0,
      navList: [{ name: '全部' }, { name: '待发货' }, { name: '待付款' }, { name: '配送中' }, { name: '已完成' }],
      orderList: [
        {
          id: 4,
          goodsCategory: '谭颂歌砂石有限公司',
          state: '已完成',
          url: require('@/static/category/stone07.png'),
          product: '规格砂',
          num: 500,
          transportType: '汽运',
          price: 9999.0
        },
        {
          id: 3,
          goodsCategory: '胜辉砂石',
          state: '配送中',
          url: require('@/static/order/product.png'),
          product: '河砂',
          num: 520,
          transportType: '汽运',
          price: 53920.0
        },
        {
          id: 2,
          goodsCategory: '富美石材',
          state: '待付款',
          url: require('@/static/category/stone01.png'),
          product: '1-2石子',
          num: 1000,
          transportType: '汽运',
          price: 40000.0
        },
        {
          id: 1,
          goodsCategory: '富美石材',
          state: '待发货',
          url: require('@/static/category/stone04.png'),
          product: '料石',
          num: 520,
          transportType: '汽运',
          price: 53920.0
        }
      ],
      orders: []
    }
  },
  onShow() {
    this.tophight = uni.getMenuButtonBoundingClientRect()
  },
  onLoad(option) {
    this.currentIndex = parseInt(option.index)
    this.tabNav(this.currentIndex)
  },
  methods: {
    tabNav(index) {
      this.currentIndex = index
      if (index === 0) {
        this.orders = this.orderList
      } else {
        this.orders = [
          this.orderList.find((item) => {
            return item.id === index
          })
        ]
      }
    },
    toDetail(index) {
      const detail = this.orders[index]
      uni.navigateTo({
        url: '/pages/order/detail?detail=' + encodeURIComponent(JSON.stringify(detail))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.order {
  width: 100vw;
  height: 100vh;
  background-color: #f7faff;
  .nav {
    padding-top: 32rpx;
    text {
      color: #1a2234;
      font-size: 28rpx;
      &.active {
        color: #3c7dff;
        font-weight: 600;
        &::after {
          content: '';
          width: 48rpx;
          height: 6rpx;
          display: block;
          border-radius: 3rpx;
          margin: 20rpx auto 0;
          background-color: #3c7dff;
        }
      }
    }
  }
  .list {
    padding: 24rpx 32rpx;
    box-sizing: border-box;
    .item {
      width: 100%;
      padding: 24rpx 0;
      font-size: 28rpx;
      margin-bottom: 24rpx;
      border-radius: 20rpx;
      box-sizing: border-box;
      background-color: #fff;
      .title {
        padding: 0 24rpx 24rpx 24rpx;
        border-bottom: 2rpx solid #f6f6f6;
        .name {
          color: #1a2234;
          font-weight: 600;
        }
        .state {
          color: #606a78;
        }
      }
      .content {
        padding: 24rpx;
        box-sizing: border-box;
        border-bottom: 2rpx solid #f6f6f6;
        image {
          width: 184rpx;
          height: 184rpx;
          margin-right: 20rpx;
          border-radius: 8rpx;
        }
        .info {
          text {
            color: #606a78;
            margin-bottom: 8rpx;
            &.product {
              color: #1a2234;
              font-weight: 600;
              margin-bottom: 20rpx;
            }
          }
        }
      }
      .footer {
        padding: 24rpx 24rpx 0 24rpx;
        .price {
          color: #606a78;
          text {
            color: #3c7dff;
            font-size: 32rpx;
          }
        }
        .button {
          color: #fff;
          padding: 8rpx 40rpx;
          border-radius: 8rpx;
          background-color: #3c7dff;
        }
      }
    }
  }
}
</style>
