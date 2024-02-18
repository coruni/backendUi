import request from '@/utils/request'

export function category(params) {
    return request({
        url: '/shop/typeList',
        method: 'get',
        params: params
    })
}
export function save(params) {
    return request({
        url: '/shop/typeAdd',
        method: 'post',
        params
    })
}

export function update(params) {
    return request({
        url: '/shop/typeEdit',
        method: 'post',
        params
    })
}

export function deleteCategory (params){
    return request({
        url: '/shop/typeDelete',
        method: 'post',
        params
    })
}
