import request from '@/utils/request'
export function getLogisticsList(params) {
  return request({
    url:'/logistics/getLogisticsList',
    method:'get',
    params:params
  })
}