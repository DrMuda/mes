import request from  '@/utils/request'

export const getFinishedProduct=()=>{
    return request('/mock-order',{
        method:'get'
    })
}

export const searchFinishedProduct=(params)=>{
    return request('/mock-search-order',{
        method:'get',
        params:{
            ...params
        }
    })
}

export const getdetails_yl=(params)=>{
    return request('/mock-yl-details',{
        method:'get',
        params:{
            ...params
        }
    })
}

export const getdetails_sc=(params)=>{
    return request('/mock-sc-details',{
        method:'get',
        params:{
            ...params
        }
    })
}

export const getput_in_storage=()=>{
    return request('/mock-instorage',{
        method:'get'
    })
}

export const search_put_in_storage=(params)=>{
    return request('/mock-search-instorage',{
        method:'get',
        params
    })
}

export const search_put_in_details=(params)=>{
    return request('/mock-search-instorage-details',{
        method:'get',
        params
    })
}

export const change_put_in_state=(params)=>{
    return request('/mock-putin-storage-changeState',{
        method:'post',
        data: params
    })
}

export const get_goodslist=()=>{
    return request('/mock-goodslist',{
        method:'get'
    })
}

export const add_putinstorage=(params)=>{
    return request('/mock-instorage',{
        method:'post',
        data: params
    })
}

export const add_putinstorage_details=(params)=>{
    return request('/mock-search-instorage-details',{
        method:'post',
        data: params
    })
}