import request from '@/utils/request'

export function categoryList(params) {
    return request({
        url: '/category/list',
        method: 'get',
        params
    })
}

export function update(params) {
    return request({
        url: '/category/update',
        method: 'post',
        params
    })
}

export function deleteCategory(params) {
    return request({
        url: '/category/delete',
        method: 'post',
        params
    })
}

export function newCategory(params) {
    return request({
        url: '/category/add',
        method: 'post',
        params
    })
}

export function action(params) {
    return request({
        url: '/category/action',
        method: 'post',
        params
    })

}