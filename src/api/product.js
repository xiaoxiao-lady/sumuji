import request from '@/utils/request'
export function getProductList (params) {
  return request({
    url: '/product/getProductList',
    method: 'get',
    params: params
  })
}

export function getProductDetail (productId,userId) {
  return request({
    url: '/product/getProductById/' + productId,
    method: 'get',
    params:userId
  })
}

export function getConfirmProductList (params) {
  const qs = require('qs');
  return request({
    url: '/product/getConfirmProductList',
    method: 'get',
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
    },
    params: params
  })
}
