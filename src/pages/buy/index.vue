<template>
  <view class="buy">
    <view class="header flex row-between col-center">
      <text class="title">商品列表</text>
      <view class="add flex col-center" @click="onAdd">
        <image src="@/static/buy/add.png"></image>
        <text>新增商品</text>
      </view>
    </view>
    <u-swipe-action>
      <u-swipe-action-item v-for="item in goodList" :key="item.id" :options="item.options">
        <view class="supply-list" @click="toPublish(item)">
          <view class="item flex row-between">
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
                    <text class="breadth">{{ item.departureAddress }}</text>
                  </view>
                  <view class="flex col-center">
                    <image src="@/static/home/time.png"></image>
                    <text>{{ item.createAt }}</text>
                  </view>
                </view>
              </view>
            </view>
            <view class="status">{{ item.status }}</view>
          </view>
        </view>
      </u-swipe-action-item>
    </u-swipe-action>
  </view>
</template>

<script>
import GoodsApi from '@/api/goods.js'
import { date } from '@/common/util/util.js'
export default {
  data() {
    return {
      goodList: []
    }
  },
  onShow() {
    this.getGoods()
  },
  methods: {
    // 供应大厅求购信息列表
    async getGoods() {
      const _this = this
      GoodsApi.goods({
        page: {
          returnCount: true
        }
      })
        .then((res) => {
          if (res.status.success) {
            _this.goodList = res.body.goodsList
            for (const item of _this.goodList) {
              item.isCollect = false
              item.createAt = date('Y-m-d', item.createAt)
              switch (item.status) {
                case 1:
                  item.status = '待审核'
                  break
                case 2:
                  item.status = '已审核'
                  break
                case 4:
                  item.status = '已上架'
                  break
                case 8:
                  item.status = '已下架'
                  break
                default:
                  return
              }
              item.options = [
                {
                  text: '上架',
                  style: {
                    backgroundColor: '#FF8900'
                  }
                },
                {
                  text: '删除',
                  style: {
                    backgroundColor: '#FF3A57'
                  }
                }
              ]
            }
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    onAdd() {
      uni.navigateTo({
        url: '/pages/publish/index'
      })
    },
    toPublish(item) {
      uni.navigateTo({
        url: '/pages/publish/index?detail=' + encodeURIComponent(JSON.stringify(item))
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.buy {
  .header {
    padding: 32rpx;
    background-color: #fff;
    .title {
      color: #1a2234;
      font-size: 32rpx;
      font-weight: 600;
    }
    .add {
      image {
        width: 28rpx;
        height: 28rpx;
      }
      text {
        color: #3c7dff;
        font-size: 28rpx;
        margin-left: 12rpx;
      }
    }
  }
  .supply-list {
    .item {
      padding: 32rpx 40rpx;
      box-sizing: border-box;
      border-top: 1rpx solid rgba(0, 0, 0, 0.1);
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
      .status {
        color: #606a78;
        font-size: 24rpx;
      }
    }
  }
}
</style>
