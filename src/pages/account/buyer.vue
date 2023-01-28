<template>
  <view class="buyer">
    <view class="bar">供应商认证通过可进行商品发布，请尽快提交认证</view>
    <view class="form">
      <u--form labelPosition="left" :model="model" :rules="rules" ref="form" labelWidth="140rpx">
        <u-form-item label="认证类型" prop="radio" leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
          <u-radio-group v-model="model.radio" placement="row">
            <u-radio name="1" activeColor="#3C7DFF" label="材料厂"></u-radio>
            <u-radio name="2" activeColor="#3C7DFF" label="加工厂"></u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item><view style="height: 16rpx; background-color: #f8f8f8"></view></u-form-item>

        <u-form-item>
          <view style="color: #1a2234; font-size: 32rpx; font-weight: 500">公司信息</view>
        </u-form-item>
        <u-form-item label="公司名称" prop="company" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
          <u--input v-model="model.company" border="none" placeholder="请填写公司名称"></u--input>
        </u-form-item>
        <u-form-item label="信用代码" prop="code" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
          <u--input v-model="model.code" border="none" placeholder="请填写信用代码"></u--input>
        </u-form-item>
        <u-form-item label="店铺名称" prop="store" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
          <u--input v-model="model.store"  border="none" placeholder="请填写店铺名称"></u--input>
        </u-form-item>
        <u-form-item label="主营材料" prop="materials" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
          <u--input v-model="model.materials"  border="none" placeholder="请填写主营材料"></u--input>
        </u-form-item>
        <u-form-item v-if="model.radio === '2'" label="加工种类" prop="process" borderBottom>
          <u--input v-model="model.process"  border="none" placeholder="请填写加工种类"></u--input>
        </u-form-item>
        <u-form-item label="优势石种" prop="stone" borderBottom>
          <u--input v-model="model.stone"  border="none" placeholder="请填写优势石种"></u--input>
        </u-form-item>
        <u-form-item label="公司地址" prop="address" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
          <u--input v-model="model.address"  border="none" placeholder="请填写公司地址"></u--input>
        </u-form-item>
        <u-form-item labelPosition="top">
          <text style="font-size: 28rpx; margin-bottom: 24rpx">公司简介</text>
          <u--textarea count maxlength="200" v-model="model.memo" placeholder="请输入公司简介"></u--textarea>
        </u-form-item>
        <u-form-item><view style="height: 16rpx; background-color: #f8f8f8"></view></u-form-item>

        <u-form-item>
          <view style="color: #1a2234; font-size: 32rpx; font-weight: 500">联系人信息</view>
        </u-form-item>
        <u-form-item label="姓名" prop="buyerName" borderBottom leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
          <u--input v-model="model.buyerName" border="none" placeholder="请输入姓名"></u--input>
        </u-form-item>
        <u-form-item label="手机号" prop="buyerMobile" leftIcon="*" :leftIconStyle="{ color: '#F5222D' }">
          <u--input v-model="model.buyerMobile" type="number" border="none" placeholder="请输入手机号"></u--input>
        </u-form-item>
        <u-form-item><view style="height: 16rpx; background-color: #f8f8f8"></view></u-form-item>

        <u-form-item borderBottom>
          <view class="head flex row-between">
            <text>企业标志/LOGO</text>
            <text>方形图，建议500*500以上</text>
          </view>
          <u-upload :fileList="model.fileList1" name="1" :maxCount="1" @afterRead="afterRead"></u-upload>
        </u-form-item>
        <u-form-item borderBottom>
          <view class="head flex row-between">
            <text><text style="color: #f5222d">*</text>营业执照</text>
            <text>方形图，建议500*500以上</text>
          </view>
          <u-upload :fileList="model.fileList2" name="2" :maxCount="1" @afterRead="afterRead"></u-upload>
        </u-form-item>
        <u-form-item borderBottom>
          <view class="head flex row-between">
            <text>门面照</text>
            <text>请上传门面照片，最多上传10张</text>
          </view>
          <u-upload :fileList="model.fileList3" name="3" :maxCount="10" @afterRead="afterRead"></u-upload>
        </u-form-item>
        <view class="button" @click="submit">提交认证</view>
      </u--form>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      model: {
        radio: '1',
        buyerName: '',
        buyerMobile: '',
        company: '',
        code: '',
        store: '',
        materials: '',
        process: '',
        stone: '',
        address: '',
        memo: '',
        fileList1: [],
        fileList2: [],
        fileList3: []
      },
      rules: {
        radio: {
          type: 'string',
          message: '请选择认证类型',
          trigger: ['change']
        },
        buyerName: {
          type: 'string',
          required: true,
          message: '请输入联系人',
          trigger: ['blur', 'change']
        },
        buyerMobile: [
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
        company: {
          type: 'string',
          required: true,
          message: '请填写公司名称',
          trigger: ['blur', 'change']
        },
        code: {
          type: 'string',
          required: true,
          message: '请填写信用代码',
          trigger: ['blur', 'change']
        },
        store: {
          type: 'string',
          required: true,
          message: '请填写店铺名称',
          trigger: ['blur', 'change']
        },
        materials: {
          type: 'string',
          required: true,
          message: '请填写主营材料',
          trigger: ['blur', 'change']
        },
        process: {
          type: 'string',
          required: true,
          message: '请填写加工种类',
          trigger: ['blur', 'change']
        },
        stone: {
          type: 'string',
          required: true,
          message: '请填写优势石种',
          trigger: ['blur', 'change']
        },
        address: {
          type: 'string',
          required: true,
          message: '请填写公司地址',
          trigger: ['blur', 'change']
        }
      }
    }
  },
  methods: {
    afterRead(event) {
      this.model[`fileList${event.name}`] = [
        {
          url: event.file.url
        }
      ]
    },
    submit() {
      this.$refs.form
        .validate()
        .then((res) => {
          uni.$u.toast('提交成功')
          uni.switchTab({
            url: '/pages/account/index'
          })
        })
        .catch((errors) => {
          uni.$u.toast('请填写正确的认证格式')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.buyer {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  .bar {
    width: 100%;
    color: #fff;
    height: 88rpx;
    font-size: 28rpx;
    line-height: 88rpx;
    padding-left: 32rpx;
    box-sizing: border-box;
    background: url('@/static/account/bar.png') no-repeat 0 0;
    background-size: 100%;
  }
  .form {
    width: 100%;
    padding: 32rpx;
    box-sizing: border-box;
    ::v-deep .u-radio {
      margin-right: 32rpx;
    }
    .head {
      color: #b1b6bb;
      font-size: 28rpx;
      margin-bottom: 20rpx;
      text {
        &:first-child {
          color: #1a2234;
          font-size: 32rpx;
          font-weight: 500;
        }
      }
    }
    .button {
      color: #fff;
      width: 686rpx;
      height: 100rpx;
      font-size: 32rpx;
      margin: 32rpx auto;
      text-align: center;
      line-height: 100rpx;
      border-radius: 50rpx;
      background-color: #3c7dff;
    }
  }
}
</style>
