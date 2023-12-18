import request from '@/utils/request'

export function isInstall(params) {
    return request({
        url: '/install/isInstall',
        method: 'get',
        params
    })
}
export function install(data) {
    return request({
        url: '/install/databaseInstall',
        method: 'post',
        params: {
            ...data,
            webkey: process.env.VUE_APP_API_KEY
        }
    })
}

export function newInstall(data) {
    return request({
        url: 'install/newInstall',
        method: 'post',
        params: {
            ...data,
            webkey: process.env.VUE_APP_API_KEY
        }
    })
}