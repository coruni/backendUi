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
    method: 'get',
    ...params
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
    method: 'get',
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

export function clearCard(params) {
  return request({
    url: '/pay/clear',
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

export function exportPaycard(params) {
  return request({
    url: '/pay/cardExport',
    method: 'get',
    responseType: 'arraybuffer',
    params
  })
}

export function deleteArticle(id) {
  return request({
    url: '/article/deleteUserArticle',
    method: 'post',
    params: {
      id
    }
  })
}

export function deleteComment(id) {
  return request({
    url: '/comments/deleteUserComment',
    method: 'post',
    params: {
      id
    }
  })
}

export function ban(params) {
  return request({
    url: '/user/ban',
    method: 'post',
    params
  })
}

export function unban(id) {
  return request({
    url: '/user/unban',
    method: 'post',
    params: {
      id
    }
  })
}
