import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/exchange/list',
        method: 'get',
        params
    })
}

export function save(params) {
    return request({
        url: '/exchange/save',
        method: 'post',
        params: {
            ...params
        }
    })
}

export function deleteExchange(id) {
    return request({
        url: '/exchange/delete',
        method: 'post',
        params: {
            id
        }
    })
}