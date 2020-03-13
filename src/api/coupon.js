import request from '@/utils/request'
export function getMyCouponList(params) {
  return request({
    url:'/receive/myCouponList',
    method:'get',
    params:params
  })
}

export function getCouponList(params) {
  return request({
    url:'/coupon/getCouponList',
    method:'get',
    params:params
  })
}

export function getReceiveList(params) {
  return request({
    url:'/receive/getReceiveList',
    method:'get',
    params:params
  })
}
//领券
export function addReceive(params) {
  return request({
    url:'/receive/addReceive',
    method:'get',
    params:params
  })
}
