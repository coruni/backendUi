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
        url: '/article/articleUpdate',
        method: 'post',
        params
    })
}

export function articleDelete(params) {
    return request({
        url: '/article/articleDelete',
        method: 'post',
        params
    })
}