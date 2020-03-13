import request from '@/utils/request'
export function getShoppingCartList (params) {
  return request({
    url: '/shoppingCart/getShoppingCartList',
    method: 'get',
    params: params
  })
}

export function addToShoppingCart (data) {
  return request({
    url: '/shoppingCart/addShoppingCart',
    method: 'post',
    params: data
  })
}
// 删除购物车
export function deleteShoppingCartBatch (params) {
  const qs = require('qs');
  return request({
    url: '/shoppingCart/deleteShoppingCartBatch',
    method: 'get',
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat: 'repeat'})
    },
    params: params
  })
}

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

