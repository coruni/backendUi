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

export function getConfig(params) {
    return request({
        url: '/system/getApiConfig',
        method: 'get',
        params: {
            ...params,
            webkey: process.env.VUE_APP_API_KEY
        }
    })
}

export function save(params) {
    return request({
        url: '/system/apiConfigUpdate',
        method: 'post',
        params: {
            params,
            webkey: process.env.VUE_APP_API_KEY

        },

    })
}

export function getSystem(params) {
    return request({
        url: '/system/getConfig',
        method: 'post',
        params: {
            webkey: process.env.VUE_APP_API_KEY
        }
    })
}

export function setupEmail(params) {
    return request({
        url: '/system/setupEmail',
        method: 'post',
        params: {
            params,
            webkey: process.env.VUE_APP_API_KEY
        }
    })
}

export function initApp() {
    return request({
        url: '/system/initApp',
        method: 'post',
        params: {
            webkey: process.env.VUE_APP_API_KEY
        }
    })
}

export function getApp() {
    return request({
        url: '/system/app',
        method: 'post',
        params:{}
    })
}
export function updateApp(params) {
    return request({
        url: '/system/updateApp',
        method: 'post',
        params: {
            params,
            webkey: process.env.VUE_APP_API_KEY
        }
    })
}