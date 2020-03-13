import request from '@/utils/request'
export function getGiftList (params) {
  return request({
    url: '/gift/getGiftList',
    method: 'get',
    params: params
  })
}
export function addMembership (params) {//生成充值会员订单
  return request({
    url: '/membership/addMembership',
    method: 'get',
    params: params
  })
}
export function getMembershipPrePayId (params) {//支付会员订单
  return request({
    url: '/wechat/getMembershipPrePayId',
    method: 'get',
    params: params
  })
}
