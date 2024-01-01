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

export function userRecharge(params) {
  return request({
    url: '/user/userRecharge',
    method: 'post',
    params
  })
}

export function inviteCode(params) {
  return request({
    url: '/user/invitationList',
    method: 'post',
    params
  })
}

export function newCode(params) {
  return request({
    url: '/user/madeInvitation',
    method: 'post',
    params
  })
}

export function exportCode(params) {
  return request({
    url: '/user/invitationExcel',
    method: 'post',
    params,
    responseType: 'arraybuffer'
  })
}
