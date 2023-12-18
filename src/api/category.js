import request from '@/utils/request'

export function categoryList(params) {
    return request({
        url: '/category/categoryList',
        method: 'get',
        params
    })
}