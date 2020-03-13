import request from '@/utils/request'

export function drawAward (params) {
  return request({
    url: '/draw/drawAward',
    method: 'get',
    params: params
  })
}

export function getDrawDetail (id) {//获得user的邀请次数，已抽奖次数等
  return request({
    url: '/draw/getDrawDetail/'+id,
    method: 'get'
  })
}

export function getAwardList (params) {//获得抽奖奖品列表
  return request({
    url: '/award/getAwardList',
    method: 'get',
    params: params
  })
}

export function getMyDrawList (params) {//获得抽奖奖品列表
  return request({
    url: '/draw/getMyDrawList',
    method: 'get',
    params: params
  })
}
