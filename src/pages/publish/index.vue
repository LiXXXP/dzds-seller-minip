<template>
  <view class="publish">
    <u--form labelPosition="left" :model="model" :rules="rules" ref="form" labelWidth="220rpx">
      <u-form-item
        label="商品类型"
        prop="publish.goodsType"
        borderBottom
        leftIcon="*"
        :leftIconStyle="{ color: '#F5222D' }"
        @click="isShow.type = true"
      >
        <u--input
          v-model="model.publish.goodsType"
          disabled
          inputAlign="right"
          disabledColor="#fff"
          placeholder="请选择"
          border="none"
        ></u--input>
        <u-icon slot="right" name="arrow-right" color="#B1B6BB"></u-icon>
      </u-form-item>
      <u-form-item
        label="发货地址"
        prop="publish.departureAddress"
        borderBottom
        leftIcon="*"
        :leftIconStyle="{ color: '#F5222D' }"
        @click="isShow.addr = true"
      >
        <u--input
          v-model="model.publish.departureAddress"
          disabled
          inputAlign="right"
          disabledColor="#fff"
          placeholder="请选择"
          border="none"
        ></u--input>
        <u-icon slot="right" name="arrow-right" color="#B1B6BB"></u-icon>
      </u-form-item>
      <u-form-item label="运输方式" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
        <u--input
          v-model="model.publish.transportType"
          disabled
          inputAlign="right"
          disabledColor="#fff"
          placeholder="汽运"
          border="none"
        ></u--input>
      </u-form-item>
      <u-form-item
        label="计价单位"
        prop="publish.unit"
        borderBottom
        leftIcon="*"
        :leftIconStyle="{ color: '#F5222D' }"
        @click="isShow.unit = true"
      >
        <u--input
          v-model="model.publish.unit"
          disabled
          inputAlign="right"
          disabledColor="#fff"
          placeholder="请选择"
          border="none"
        ></u--input>
        <u-icon slot="right" name="arrow-right" color="#B1B6BB"></u-icon>
      </u-form-item>
      <u-form-item label="供应数量" prop="publish.quantity" leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
        <u--input
          v-model="model.publish.quantity"
          type="number"
          border="none"
          placeholder="请输入"
          inputAlign="right"
        ></u--input>
      </u-form-item>
      <u-form-item label="供应价格(元)" prop="publish.price" leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
        <u--input
          v-model="model.publish.price"
          type="number"
          border="none"
          placeholder="请输入"
          inputAlign="right"
        ></u--input>
      </u-form-item>
      <u-form-item><view style="height: 16rpx; background-color: #f8f8f8"></view></u-form-item>
      <u-form-item label="联系人" prop="publish.sellerName" leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
        <u--input v-model="model.publish.sellerName" border="none" placeholder="请输入" inputAlign="right"></u--input>
      </u-form-item>
      <u-form-item label="手机号" prop="publish.sellerMobile" leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
        <u--input
          v-model="model.publish.sellerMobile"
          type="number"
          border="none"
          placeholder="请输入"
          inputAlign="right"
        ></u--input>
      </u-form-item>
      <u-form-item prop="publish.memo" labelPosition="top">
        <text style="font-size: 28rpx; margin-bottom: 24rpx">详情信息</text>
        <u--textarea
          count
          maxlength="200"
          v-model="model.publish.memo"
          placeholder="请输入商品的详细说明，如碎压值、卸车情况等"
        ></u--textarea>
      </u-form-item>
      <u-form-item prop="publish.cover" labelPosition="top">
        <text style="font-size: 28rpx; margin-bottom: 24rpx">上传图片</text>
        <u-upload :fileList="fileList" :maxCount="1" @afterRead="afterRead"></u-upload>
      </u-form-item>
      <view class="button" @click="submit">提交</view>
    </u--form>
    <u-picker
      :show="isShow.type"
      ref="tPicker"
      :columns="typeColumns"
      @confirm="
        (e) => {
          model.publish.goodsType = e.value
          isShow.type = false
        }
      "
      @change="changeHandlerType"
      @cancel="isShow.type = false"
    ></u-picker>
    <u-picker
      :show="isShow.addr"
      ref="cPicker"
      :columns="cityColumns"
      keyName="label"
      @confirm="confirmAddr"
      @change="changeHandlerAddr"
      @cancel="isShow.addr = false"
    ></u-picker>
    <u-picker
      :show="isShow.unit"
      ref="uPicker"
      :columns="unitColumns"
      @confirm="
        (e) => {
          model.publish.unit = e.value
          isShow.unit = false
        }
      "
      @cancel="isShow.unit = false"
    ></u-picker>
  </view>
</template>

<script>
import GoodsApi from '@/api/goods.js'
import city from '@/common/js/uview-city.js'
export default {
  data() {
    return {
      fileList: [],
      isShow: {
        type: false, // 类型
        addr: false, // 地址
        unit: false // 单位
      },
      model: {
        publish: {
          goodsType: '', // 类型
          departureAddress: '', // 地址
          transportType: '汽运', // 运输方式
          unit: '', // 单位
          quantity: '', // 数量
          price: '', // 价格
          sellerName: '', // 联系人
          sellerMobile: '', // 手机号
          memo: '' // 详情信息
        }
      },
      rules: {
        'publish.goodsType': {
          type: 'array',
          required: true,
          message: '请选择',
          trigger: ['blur', 'change']
        },
        'publish.departureAddress': {
          type: 'array',
          required: true,
          message: '请选择',
          trigger: ['blur', 'change']
        },
        'publish.unit': {
          type: 'array',
          required: true,
          message: '请选择',
          trigger: ['blur', 'change']
        },
        'publish.quantity': {
          type: 'number',
          required: true,
          message: '请输入正确的求购数量',
          trigger: ['blur', 'change']
        },
        'publish.price': {
          type: 'number',
          required: true,
          message: '请输入正确的供应价格',
          trigger: ['blur', 'change']
        },
        'publish.buyerName': {
          type: 'string',
          required: true,
          message: '请输入联系人',
          trigger: ['blur', 'change']
        },
        'publish.sellerMobile': [
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
        'publish.memo': {
          required: false
        },
        'publish.cover': {
          required: false
        }
      },
      typeColumns: [
        ['石子', '天然石', '机制砂', '规格砂', '块石', '料石', '天然砂', '荒料', '大板', '条板'],
        ['1-2石子', '1-3石子', '石粉', '5-30石子', '0-5瓜子片', '1-5石子', '级配碎石']
      ],
      typeColumnData: [
        ['1-2石子', '1-3石子', '石粉', '5-30石子', '0-5瓜子片', '1-5石子', '级配碎石'],
        ['天然石'],
        ['机制砂'],
        ['规格砂'],
        ['块石'],
        ['料石'],
        ['天然砂'],
        ['荒料'],
        ['大板'],
        ['条板']
      ],
      cityColumns: [],
      timeColumns: [
        ['紧急采购（三天）', '临时采购（一周）', '正常采购（两周）', '生产采购（一个月）', '季度采购（三个月）']
      ],
      unitColumns: [['件', '吨', '立方米', '箱']]
    }
  },
  onLoad(option) {
    this.cityColumns = city.columns
    if (option.detail) {
      const detail = JSON.parse(decodeURIComponent(option.detail))
      this.model.publish = {
        goodsType: [detail.goodsType, detail.goodsCategory],
        departureAddress: [detail.departureAddress],
        unit: [detail.unit],
        quantity: detail.quantity,
        price: detail.price,
        sellerName: detail.sellerName,
        sellerMobile: detail.sellerMobile,
        memo: detail.memo
      }
    }
  },
  methods: {
    changeHandlerType(e) {
      const {
        columnIndex,
        index,
        // 微信小程序无法将picker实例传出来，只能通过ref操作
        picker = this.$refs.tPicker
      } = e
      // 当第一列值发生变化时，变化第二列(后一列)对应的选项
      if (columnIndex === 0) {
        // picker为选择器this实例，变化第二列对应的选项
        picker.setColumnValues(1, this.typeColumnData[index])
      }
    },
    changeHandlerAddr(e) {
      const {
        columnIndex,
        index,
        // 微信小程序无法将picker实例传出来，只能通过ref操作
        picker = this.$refs.cPicker
      } = e
      // 当第一列值发生变化时，变化第二列(后一列)对应的选项
      if (columnIndex === 0) {
        // picker为选择器this实例，变化第二列对应的选项
        picker.setColumnValues(1, city.columnData[index])
      }
    },
    confirmAddr(e) {
      this.model.publish.departureAddress = [e.value[0].label, e.value[1].label]
      this.isShow.addr = false
    },
    afterRead(event) {
      this.fileList = [
        {
          url: event.file.url
        }
      ]
    },
    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          const param = { ...this.model.publish }
          param.goodsType = this.model.publish.goodsType[0]
          param.goodsCategory = this.model.publish.goodsType[1]
          param.unit = this.model.publish.unit[0]
          param.departureAddress = this.model.publish.departureAddress[0] + this.model.publish.departureAddress[1]
          GoodsApi.goodsAddition(param)
            .then((res) => {
              if (res.status.success) {
                uni.$u.toast('提交成功')
                uni.switchTab({
                  url: '/pages/buy/index'
                })
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((errors) => {
          uni.$u.toast('请填写购买信息')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.publish {
  padding: 32rpx;
  box-sizing: border-box;
  .button {
    color: #fff;
    width: 100%;
    height: 100rpx;
    font-size: 32rpx;
    margin-top: 32rpx;
    text-align: center;
    line-height: 100rpx;
    border-radius: 50rpx;
    background-color: #3c7dff;
  }
}
</style>
