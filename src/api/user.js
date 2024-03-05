import request from '@/utils/request'

export function login(params) {
  return request({
    url: '/user/login',
    method: 'post',
    params
  })
}

export function getInfo(id) {
  return request({
    url: '/user/userInfo',
    method: 'get',
    params: { id }
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
    url: '/user/delete',
    method: 'post',
    params
  })
}

export function updateUser(params) {
  return request({
    url: '/user/edit',
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
    url: '/user/charge',
    method: 'post',
    params
  })
}

export function inviteCode(params) {
  return request({
    url: '/user/codeList',
    method: 'post',
    params
  })
}

export function newCode(params) {
  return request({
    url: '/user/madeCode',
    method: 'post',
    params
  })
}

export function exportCode(params) {
  return request({
    url: '/user/codeExcel',
    method: 'post',
    params,
    responseType: 'arraybuffer'
  })
}

export function deleteCode(params) {
  return request({
    url: '/user/delCode',
    method: 'post',
    params
  })
}

export function paycard(params) {
  return request({
    url: '/pay/cardList',
    method: 'get',
    params
  })
}

export function newPaycard(params) {
  return request({
    url: '/pay/madePaycard',
    method: 'post',
    params: {
      ...params
    }
  })
}

export function deleteCard(params) {
  return request({
    url: '/pay/delete',
    method: 'post',
    params: {
      ...params
    }
  })
}
