import request from '@/utils/request'

export function getList(params) {
    return request({
        url: '/swiper/list',
        method: 'get',
        params
    })
}

export function addSwiper(params) {
    return request({
        url: '/swiper/add',
        method: 'post',
        params: {
            ...params
        }
    })
}

export function deleteSwiper(params) {
    return request({
        url: '/swiper/delete',
        method: 'post',
        params: {
            ...params
        }
    })
}

export function updateSwiper(params) {
    return request({
        url: '/swiper/update',
        method: 'post',
        params: {
            ...params
        }
    })
}