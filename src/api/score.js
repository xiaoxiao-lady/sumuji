import request from '@/utils/request'
export function getMyScoreList(params) {
  return request({
    url:'/score/getMyScoreList',
    method:'get',
    params:params
  })
}

