import request from '@/utils/request'
export function list(params) {
    return request({
        url: '/rank/list',
        method: 'get',
        params
    })
}

export function add(params) {
    return request({
        url: '/rank/add',
        method: 'post',
        params: {
            ...params
        }
    })
}


export function update(params) {
    return request({
        url: '/rank/update',
        method: 'post',
        params: {
            ...params
        }
    })
}

export function deleteRank(params) {
    return request({
        url: '/rank/delete',
        method: 'post',
        params: {
            ...params
        }
    })
}

export function give(user_id,id) {
    return request({
        url: '/rank/give',
        method: 'post',
        params: {
            user_id,
            id,
        }
    })
}
