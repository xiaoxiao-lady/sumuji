import request from '@/utils/request'
export function getQuestionList(params) {
  return request({
    url:'/question/getQuestionList',
    method:'get',
    params:params
  })
}


