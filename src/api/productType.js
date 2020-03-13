import request from '@/utils/request'
export function getAllProductTypeList(params) {
  return request({
    url:'/productType/all',
    method:'get',
    params:params
  })
}

export function getBrandList(params) {
  return request({
    url:'/brand/getBrandList',
    method:'get',
    params:params
  })
}



