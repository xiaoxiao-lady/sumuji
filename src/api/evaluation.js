import request from '@/utils/request'
export function addEvaluation (data) {
  return request({
    url: '/evaluation/addEvaluation',
    method: 'get',
    params: data
  })
}