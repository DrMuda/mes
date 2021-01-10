import request from '@/utils/request';

// 获取维护列表
export const queryMaintenanceList = (params) => {
    return request('/api/equipment/maintenance', {
        method: 'GET',
        params,
    });
}

// 获取负责人列表
export const queryMaintenanceDirectors = (params) => {
    return request('/api/equipment/maintenance/directors', {
        method: 'GET',
        params,
    });
}

// 派单、转单
export const requestChangeDirector = (params) => {
    return request('/api/equipment/maintenance', {
        method: 'POST',
        data: params,
    });
}

// 添加维护
export const addMaintenanceOrder = (params) => {
    return request('/api/equipment/maintenance/add', {
        method: 'POST',
        data: params,
    });
}

// 完成维护
export const complateMaintenanceOrder = (params) => {
    return request('/api/equipment/maintenance/complete', {
        method: 'POST',
        data: params,
    });
}

// 获取维护详情
export const queryMaintenanceDetail = (params) => {
    return request('/api/equipment/maintenance/detail', {
        method: 'GET',
        params,
    });
}