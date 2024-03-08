import request from '@/utils/request'

export function isInstall(params) {
    return request({
        url: '/install/check',
        method: 'get',
        params
    })
}
export function install(data) {
    return request({
        url: '/install/install',
        method: 'post',
        params: {
            ...data
        }
    })
}

export function newInstall(data) {
    return request({
        url: 'install/update',
        method: 'post',
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
        params: {}
    })
}
export function updateApp(params) {
    return request({
        url: '/system/update',
        method: 'post',
        params: {
            params,
            webkey: process.env.VUE_APP_API_KEY
        }
    })
}

export function appHomepage(params) {
    return request({
        url: '/system/appHomepage',
        method: 'get',
        params: {
            ...params
        }
    })
}

export function appHomepageAdd(params){
    return request({
        url:'/system/appHomepageAdd',
        method:'post',
        params:{
            ...params
        }
    })
    
}

export function appHomepageUpdate(params){
    return request({
        url:'/system/appHomepageUpdate',
        method:'post',
        params:{
            ...params
        }
    })
    
}

export function appHomepageDelete(params){
    return request({
        url:'/system/appHomepageDelete',
        method:'post',
        params:{
            ...params
        }
    })
}