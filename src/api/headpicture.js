import request from '@/utils/request'
export function headList(params) {
    return request({
        url: '/headpicture/list',
        method: 'get',
        params: params
    })
}

export function deleteHead(params) {
    return request({
        url: '/headpicture/delete',
        method: 'post',
        params
    })
}

export function save(params) {
    return request({
        url: '/headpicture/add',
        method: 'post',
        params
    })
}

export function update(params){
    return request({
        url:'',
    })
}