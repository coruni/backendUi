import request from '@/utils/request'

export function getData(params) {
    return request({
        url: '/raffle/list',
        method: 'get',
        params
    })
}

export function deleteRaffle(params) {
    return request({
        url: '/raffle/delete',
        method: 'post',
        params: {
            ...params
        }
    })
}

export function addRaffle(params) {
    return request({
        url: '/raffle/add',
        method: 'post',
        params: {
            ...params
        }
    })
}

export function updateRaffle(params) {
    return request({
        url: '/raffle/update',
        method: 'post',
        params: {
            ...params
        }
    })
}

export function log(params) {
    return request({
        url: '/raffle/log',
        method: 'get',
        params
    })

}

export function track(params) {
    return request({
        url: '/raffle/track',
        method: 'post',
        params: {
            ...params
        }
    })
}

