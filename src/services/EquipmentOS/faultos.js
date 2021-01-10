import request from '@/utils/request';

// 获取故障列表
export const queryFaultList = (params) => {
    return request('/api/fault/faultlist', {
        method: 'GET',
        params,
    });
}

// 获取故障详情
export const queryFaultDetail = (params) => {
    return request('/api/fault/faultdetail', {
        method: 'GET',
        params,
    });
}