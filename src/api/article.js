import request from '@/utils/request'

export function articleList(params) {
    return request({
        url: '/article/articleList',
        method: 'get',
        params
    })
}

export function articleInfo(params) {
    return request({
        url: '/article/info',
        method: 'get',
        params
    })
}

export function articleUpdate(params) {
    return request({
        url: '/article/update',
        method: 'post',
        params
    })
}

export function articleDelete(params) {
    return request({
        url: '/article/delete',
        method: 'post',
        params
    })
}