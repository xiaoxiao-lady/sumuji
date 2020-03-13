import request from '@/utils/request'
export function getUserList (params) {
  return request({
    url: '/user/getUserList',
    method: 'get',
    params: params
  })
}

export function login (params) {
  return request({
    url: '/user/login',
    method: 'post',
    params: params
  })
}
export function acLogin (params) {
  return request({
    url: '/user/acLogin',
    method: 'post',
    params: params
  })
}

export function createUser (data) {
  return request({
    url: '/user/create',
    method: 'post',
    data: data
  })
}

export function getUser (id) {
  return request({
    url: '/user/getUserById/' + id,
    method: 'get'
  })
}

export function updateUser (data) {
  return request({
    url: '/user/modifyUser/',
    method: 'post',
    data: data
  })
}

export function deleteUser (id) {
  return request({
    url: '/user/delete/' + id,
    method: 'post'
  })
}
// 注册
export function register (params) {
  return request({
    url: '/user/register',
    method: 'post',
    params: params
  })
}

// 获取验证码
export function getCode (data) {
  return request({
    url: '/user/getVerCode?userName=' + data.userName + '&codeTYpe=' + data.codeType,
    method: 'get'
  })
}
// 设置密码
export function forgetPassword (params) {
  return request({
    url: '/user/forgetPassword',
    method: 'post',
    params: params
  })
}
// 微信登录
export function wxLogin (params) {
  return request({
    url: '/user/wxLogin',
    method: 'get',
    params: params
  })
}

// 微信授权没获取token
export function getAccessToken (params) {
  return request({
    url: '/wechat/getAccessToken',
    method: 'get',
    params: params
  })
}
//问题反馈
export function addFeedback (params) {
  return request({
    url: '/feedback/addFeedback',
    method: 'get',
    params: params,
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  })
}
//绑定手机号
export function wxBindMobile (params) {
  return request({
    url: '/user/wxBindMobile',
    method: 'get',
    params: params
  })
}
//获取验证码
export function getVerCode (params) {
  return request({
    url: '/user/getVerCode',
    method: 'get',
    params: params
  })
}
//修改个人信息
export function modifyUser (params) {
  return request({
    url: 'user/modifyUser',
    method: 'get',
    params: params
  })
}
//获得我的团队列表
export function getMyTeamList (params) {
  return request({
    url: 'user/getMyTeamList',
    method: 'get',
    params: params
  })
}