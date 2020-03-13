import request from '@/utils/request'
export function addApply (params) {
  return request({
    url: '/apply/addApply',
    method: 'get',
    params: params
  })
}
