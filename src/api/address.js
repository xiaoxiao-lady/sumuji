import request from '@/utils/request'
export function getAddressList (params) {
  return request({
    url: '/address/getAddressList',
    method: 'get',
    params: params
  })
}
export function getDefaultAddress (params) {
  return request({
    url: '/address/getDefaultAddress/' + params.userId,
    method: 'get'
  })
}
export function getAddressById (params) {
  return request({
    url: '/address/getAddressById/' + params.addressId,
    method: 'get'
  })
}
export function setDefaultAddress (params) {
  return request({
    url: '/address/setDefaultAddress',
    method: 'get',
    params: params
  })
}

export function deleteAddress (params) {
  return request({
    url: '/address/deleteAddress/' + params.addressId,
    method: 'get'
  })
}
export function modifyAddress (addressId,params) {
  return request({
    url: '/address/modifyAddress/'+addressId,
    method: 'get',
    params: params
  })
}

export function addAddress (params) {
  return request({
    url: '/address/addAddress',
    method: 'post',
    params: params
  })
}
//获取城市列表 太慢 已用本地json取代
export function getCityList (params) {
  return request({
    url: '/city/getCityList',
    method: 'get',
    params: params
  })
}
