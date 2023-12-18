import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/user/userLogin',
    method: 'post',
    params
  })
}

export function getInfo(key) {
  return request({
    url: '/user/userInfo',
    method: 'get',
    params: { key }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
