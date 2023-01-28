import Request from '../networking/request.js'

// 接口列表
export class GoodsApi {
  // 求购商品信息列表
  demandGoods = async (params) => {
    const request = new Request({
      url: '/dzsc/v1/DemandGoodsListInquiry',
      method: 'post',
      isLoading: true,
      isMessage: true,
      isError: true,
      params: params
    })
    return await request.start()
  }

  // 商品信息列表
  goods = async (params) => {
    const request = new Request({
      url: '/dzsc/v1/GoodsListInquiry',
      method: 'post',
      isLoading: true,
      isMessage: true,
      isError: true,
      params: params
    })
    return await request.start()
  }

  // 商品信息新增
  goodsAddition = async (params) => {
    const request = new Request({
      url: '/dzsc/v1/GoodsAddition',
      method: 'post',
      isLoading: true,
      isMessage: true,
      isError: true,
      params: params
    })
    return await request.start()
  }
}
export default new GoodsApi()
