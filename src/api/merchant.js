import request from '@/utils/request'
export function modifyMerchant(params) {
  return request({
    url:'/merchant/modifyMerchant',
    method:'get',
    params:params
  })
}
export function addMerchant(params) {
  return request({
    url:'/merchant/addMerchant',
    method:'get',
    params:params
  })
}



