import request from '@/utils/request'
export function getMyCollectList (params) {
  return request({
    url: '/collect/getMyCollectList',
    method: 'get',
    params: params
  })
}

export function batchDeleteMyCollect (params) {
  return request({
    url: '/collect/batchDeleteMyCollect',
    method: 'get',
    params: params
  })
}

export function addMyCollect (params) {
  return request({
    url: '/collect/addCollect',
    method: 'get',
    params: params
  })
}
