import request from '@/utils/request'
export function getMyOrderList (params) {
  return request({
    url: '/order/getMyOrderList',
    method: 'get',
    params: params
  })
}
export function generateOrder (params) {
  const qs = require('qs');
  return request({
    url: '/order/generateOrder',
    method: 'get',
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
    },
    params: params
  })
}
export function getOrderById (OrderId) {
  return request({
    url: '/order/getOrderById/'+OrderId,
    method: 'get'
  })
}

export function getOrderList (params) {
  return request({
    url: '/order/getOrderList',
    method: 'get',
    params:params
  })
}
//获取微信接口所需的config
export function getJsApiProperty (params) {
  return request({
    url: '/wechat/getJsApiProperty',
    method: 'get',
    params: params
  })
}
export function getPrepayId (params) {
  return request({
    url: '/wechat/getPrePayId',
    method: 'get',
    params: params
  })
}
//确认收货

export function confirmProduct (params) {
  return request({
    url: '/order/confirmProduct/'+params,
    method: 'get'
  })
}

export function cancelOrder (OrderId,params) {
  return request({
    url: '/order/cancelOrder/'+OrderId,
    method: 'get',
    params:params
  })
}