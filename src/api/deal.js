import request from '@/utils/request'
export function getMyDealList(params) {
  return request({
    url:'/deal/getMyDealList',
    method:'get',
    params:params
  })
}

export function applyWithdraw(params) {
  return request({
    url:'/deal/applyWithdraw',
    method:'get',
    params:params
  })
}

export function addTransfer (params) {//提现接口
  return request({
    url: '/transfer/addTransfer',
    method: 'get',
    params: params
  })
}

export function getMyProfitList (params) {//查看我的收益
  return request({
    url: '/deal/getMyProfitList',
    method: 'get',
    params: params
  })
}
