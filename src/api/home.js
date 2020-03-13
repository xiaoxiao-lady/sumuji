import request from '@/utils/request'
export function getHomeDetail(params) {
  return request({
    url:'/home/getHomeDetail',
    method:'get',
    params:params
  })
}
export function getHotSreachList(params) {
  return request({
    url:'/hotSearch/getHotSearchList',
    method:'get',
    params:params
  })
}

export function getSearchList(params) {
  return request({
    url:'/search/getSearchList',
    method:'get',
    params:params
  })
}

export function getMessageList(params) {//1是系统 2交易信息 3物流信息
  return request({
    url:'/message/getMessageList',
    method:'get',
    params:params
  })
}



export function countMessageByType(params) {
  return request({
    url:'/message/countMessageByType/'+params,
    method:'get',
   
  })
}
//获取我的账户 积分 优惠券 信息

export function getMineDetail(userId) {
  return request({
    url:'/home/getMineDetail/'+userId,
    method:'get',
  })
}
//获取分类详情
export function getSortDetail() {
  return request({
    url:'/home/getSortDetail',
    method:'get'
  })
}
//会员更多 
export function getExclusiveList(params) {
  return request({
    url:'/exclusive/getExclusiveList',
    method:'get',
    params:params
  })
}
//团购更多
export function getGrouponList(params) {
  return request({
    url:'/groupon/getGrouponList',
    method:'get',
    params:params
  })
}
//推荐更多
export function getRecommendList(params) {
  return request({
    url:'/recommend/getRecommendList',
    method:'get',
    params:params
  })
}
//top更多
export function getTopList(params) {
  return request({
    url:'/top/getTopList',
    method:'get',
    params:params
  })
}