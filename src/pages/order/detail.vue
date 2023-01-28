<template>
  <view class="detail">
    <view class="transport flex row-between col-center">
      <view class="logistics">
        <view class="state flex col-center">
          <image v-if="detail.id === 3" src="@/static/order/icon-ys.png"></image>
          <image v-if="detail.id === 4" src="@/static/order/complete.png"></image>
          <image v-if="detail.id === 1 || detail.id === 2" src="@/static/order/stay.png"></image>
          <text v-if="detail.id === 3">配送中</text>
          <text v-if="detail.id === 4">已完成</text>
          <text v-if="detail.id === 1">待发货</text>
          <text v-if="detail.id === 2">待付款</text>
        </view>
        <view class="addr">送至天津市滨海机场 张先生 18701232345</view>
      </view>
      <image src="@/static/order/delivery.png"></image>
    </view>

    <view class="block">
      <view class="item">
        <view class="title flex row-between">
          <text class="name">{{ detail.goodsCategory }}</text>
          <text v-if="detail.id === 3" class="state">配送中</text>
          <text v-if="detail.id === 4" class="state">已完成</text>
          <text v-if="detail.id === 1" class="state">待发货</text>
          <text v-if="detail.id === 2" class="state">待付款</text>
        </view>
        <view class="content flex col-center">
          <image :src="detail.url"></image>
          <view class="info flex flex-column row-around">
            <text class="product">{{ detail.product }}</text>
            <text>购买数量：{{ detail.num }}吨</text>
            <text>运输方式：{{ detail.transportType }}</text>
          </view>
        </view>
        <view class="footer">
          <text class="price"
            >实付金额：<text>¥ {{ detail.price }}</text></text
          >
        </view>
      </view>
    </view>
    <view class="block" v-if="detail.id === 1">
      <view class="item" style="padding: 24rpx">
        <view class="title">
          <text class="name">运单录入</text>
        </view>
        <u--form labelPosition="left" :model="model" :rules="rules" ref="form" labelWidth="140rpx">
          <u-form-item label="司机姓名" prop="name" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
            <u--input v-model="model.name" border="none" placeholder="请填写司机姓名"></u--input>
          </u-form-item>
          <u-form-item label="手机号" prop="mobile" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
            <u--input v-model="model.mobile" type="number" border="none" placeholder="请输入司机手机号"></u--input>
          </u-form-item>
          <u-form-item label="车牌号" prop="license" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
            <u--input v-model="model.license" border="none" placeholder="请输入车牌号"></u--input>
          </u-form-item>
          <u-form-item label="货物数量" prop="number" borderBottom>
            <u--input
              v-model="model.number"
              type="number"
              border="none"
              placeholder="请输入货物数量（砂石无需输入）"
            ></u--input>
          </u-form-item>
          <u-form-item label="货物重量" prop="weight" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
            <u--input v-model="model.weight" type="number" border="none" placeholder="请输入货物重量"></u--input>
          </u-form-item>
          <u-form-item labelPosition="top">
            <text style="font-size: 28rpx; margin-bottom: 24rpx">上传行驶证</text>
            <view class="flex row-between col-bottom">
              <u-upload :fileList="model.fileList" :maxCount="1" @afterRead="afterRead"></u-upload>
              <view class="btn-add flex col-center row-center">
                <image src="@/static/order/add.png"></image>
                <text @click="add">继续添加</text>
              </view>
            </view>
          </u-form-item>
        </u--form>
      </view>
    </view>

    <view class="block" v-if="detail.id === 3">
      <view class="item">
        <view class="title flex row-between">
          <text class="name">运单信息</text>
          <text class="state" style="color: #3c7dff" @click="toTrack(1)">查看在途轨迹</text>
        </view>
        <view class="blog">
          <view> <text>运单编号</text>2098323435356546 </view>
          <view> <text>司机姓名</text>张强 </view>
          <view> <text>手机号</text><text style="color: #3c7dff; text-decoration: underline">18910231411</text> </view>
          <view> <text>车牌号</text>京YH0008 </view>
          <view> <text>状态</text>配送中 </view>
          <view> <text>货物重量</text>20吨 </view>
          <view class="flex"> <text>行驶证</text><image src="@/static/order/driving.png"></image></view>
          <view> <text>发车时间</text>2022-03-26 10:28:58 </view>
          <view> <text>送达时间</text> - - </view>
        </view>
      </view>
    </view>

    <view class="block" v-if="detail.id > 2">
      <view class="item">
        <view class="title flex row-between">
          <text class="name">运单信息</text>
          <text class="state" style="color: #3c7dff" @click="toTrack(0)">查看历史轨迹</text>
        </view>
        <view class="blog">
          <view> <text>运单编号</text>2098323435356546 </view>
          <view> <text>司机姓名</text>张强 </view>
          <view> <text>手机号</text><text style="color: #3c7dff; text-decoration: underline">18910231411</text> </view>
          <view> <text>车牌号</text>京YH0008 </view>
          <view> <text>状态</text>已完成 </view>
          <view> <text>货物重量</text>20吨 </view>
          <view class="flex"> <text>行驶证</text><image src="@/static/order/driving.png"></image></view>
          <view> <text>发车时间</text>2022-03-26 10:28:58 </view>
          <view> <text>送达时间</text>2022-03-28 10:38:24 </view>
        </view>
      </view>
    </view>

    <view v-if="detail.id === 1">
      <view class="block" v-for="item in addList" :key="item">
        <view class="item">
          <view class="title flex row-between">
            <text class="name">运单信息</text>
          </view>
          <view class="blog">
            <view> <text>运单编号</text>2098323435356546 </view>
            <view> <text>司机姓名</text>{{ item.name }} </view>
            <view>
              <text>手机号</text><text style="color: #3c7dff; text-decoration: underline">{{ item.mobile }}</text>
            </view>
            <view> <text>车牌号</text>{{ item.license }} </view>
            <view>
              <text>状态</text>
              <text v-if="detail.id === 3">配送中</text>
              <text v-if="detail.id === 4">已完成</text>
              <text v-if="detail.id === 1">待发货</text>
              <text v-if="detail.id === 2">待付款</text>
            </view>
            <view> <text>货物重量</text>{{ item.weight }}吨 </view>
            <view class="flex"> <text>行驶证</text><image src="@/static/order/driving.png"></image></view>
            <view> <text>发车时间</text>--</view>
            <view> <text>送达时间</text>--</view>
          </view>
        </view>
      </view>
    </view>

    <view class="block">
      <view class="item">
        <view class="title">
          <text class="name">订单信息</text>
        </view>
        <view class="blog">
          <view> <text>订单编号</text>2098323435356546 </view>
          <view> <text>创建时间</text>2022-03-22 15:25:45 </view>
          <view v-if="detail.id !== 2">
            <text>付款时间</text>
            <text>2022-03-22 16:38:24</text>
          </view>
          <view v-if="detail.id !== 2">
            <text>发货时间</text>
            <text> {{ detail.id === 1 ? '- -' : '2022-03-26 10:28:58' }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="button">
      <view>查看合同</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      detail: {},
      addList: [],
      model: {
        name: '',
        mobile: '',
        license: '',
        number: '',
        weight: '',
        fileList: []
      },
      rules: {
        name: {
          type: 'string',
          required: true,
          message: '请填写司机姓名',
          trigger: ['blur', 'change']
        },
        mobile: [
          {
            type: 'number',
            required: true,
            message: '请输入正确的手机号',
            trigger: ['blur', 'change']
          },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // uni.$u.test.mobile()就是返回true或者false的
              return uni.$u.test.mobile(value)
            },
            message: '手机号码不正确',
            // 触发器可以同时用blur和change
            trigger: ['change', 'blur']
          }
        ],
        license: {
          required: true,
          message: '请输入车牌号',
          trigger: ['blur', 'change']
        },
        number: {
          type: 'number',
          required: false
        },
        weight: {
          type: 'number',
          required: true,
          message: '请输入货物重量',
          trigger: ['blur', 'change']
        }
      }
    }
  },
  onLoad(option) {
    const detail = JSON.parse(decodeURIComponent(option.detail))
    this.detail = detail
  },
  methods: {
    add() {
      this.$refs.form
        .validate()
        .then((res) => {
          this.addList.unshift({
            name: this.model.name,
            mobile: this.model.mobile,
            license: this.model.license,
            weight: this.model.weight
          })
          this.model = {
            name: '',
            mobile: '',
            license: '',
            number: '',
            weight: '',
            fileList: []
          }
          uni.$u.toast('提交成功')
        })
        .catch((errors) => {
          uni.$u.toast('请填写正确的运单格式')
        })
    },
    afterRead(event) {
      this.model.fileList = [
        {
          url: event.file.url
        }
      ]
    },
    toTrack(id) {
      uni.navigateTo({
        url: '/pages/order/track?id=' + id
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  width: 100vw;
  min-height: 100vh;
  padding-bottom: 240rpx;
  box-sizing: border-box;
  background-color: #f7faff;
  .transport {
    width: 100%;
    height: 164rpx;
    padding: 16rpx;
    box-sizing: border-box;
    background: url('@/static/order/banner.png') no-repeat 0 0;
    background-size: 100%;
    .logistics {
      color: #fff;
      .state {
        font-size: 32rpx;
        font-weight: 500;
        padding-bottom: 20rpx;
        image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 16rpx;
        }
      }
      .addr {
        font-size: 28rpx;
        font-weight: 400;
        padding-left: 56rpx;
      }
    }
    image {
      width: 132rpx;
      height: 132rpx;
    }
  }

  .block {
    padding: 24rpx 32rpx 0;
    box-sizing: border-box;
    .item {
      width: 100%;
      padding: 24rpx 0;
      font-size: 28rpx;
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
      }
      .blog {
        color: #1a2234;
        padding: 0 24rpx;
        view {
          margin-top: 24rpx;
          text {
            &:first-child {
              color: #b1b6bb;
              width: 160rpx;
              display: inline-block;
            }
          }
          image {
            width: 290rpx;
            height: 174rpx;
            border-radius: 8rpx;
          }
        }
      }
      .btn-add {
        color: #fff;
        width: 236rpx;
        height: 80rpx;
        font-size: 28rpx;
        font-weight: 500;
        background: #3c7dff;
        border-radius: 20rpx;
        image {
          width: 28rpx;
          height: 28rpx;
          margin-right: 16rpx;
        }
      }
    }
  }
  .button {
    width: 100%;
    padding: 32rpx;
    padding-bottom: 64rpx;
    background-color: #fff;
    box-shadow: 0px -4px 12px 0px rgba(0, 0, 0, 0.06);
    position: fixed;
    left: 0;
    bottom: 0;
    view {
      color: #fff;
      width: 686rpx;
      height: 100rpx;
      font-size: 32rpx;
      text-align: center;
      line-height: 100rpx;
      border-radius: 50rpx;
      background-color: #3c7dff;
    }
  }
}
</style>
