import request from '@/utils/request'
export function getGrouponList(params) {
  return request({
    url:'/groupon/getGrouponList',
    method:'get',
    params:params
  })
}

export function getJoinDetail (JoinId) {
  return request({
    url: '/join/getJoinById/' + JoinId,
    method: 'get'
  })
}