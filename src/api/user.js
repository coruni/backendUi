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

export function userList(params) {
  return request({
    url: '/user/userList',
    method: 'get',
    params
  })
}

export function deleteUser(params) {
  return request({
    url: '/user/userDelete',
    method: 'post',
    params
  })
}

export function updateUser(params) {
  return request({
    url: '/user/userEdit',
    method: 'post',
    params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
