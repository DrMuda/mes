import request from '@/utils/request';

// 获取库存明细
export async function queryDetail(params = {}) {
    return request('/api/stock/detail', {
        method: 'GET',
        params,
    });
}

// 获取库存盘点
export async function queryCheck(params = {}) {
    return request('/api/stock/check', {
        method: 'GET',
        params,
    });
}

// 获取盘点单详情
export async function queryCheckDetail(params = {}) {
    return request('/api/stock/order/detail', {
        method: 'GET',
        params,
    });
}

// 生成盘点单
export async function createCheckOrder(params = {}) {
    return request('/api/stock/order/create', {
        method: 'POST',
        data: params,
    });
}

// 上传盘点单
export async function uploadOrderExcel(params = {}) {
    return request('/api/stock/order/upload', {
        method: 'POST',
        data: params,
    });
}

// 删除盘点单
export async function review(params = {}) {
    return request('/api/stock/order/review', {
        method: 'POST',
        data: params,
    });
}

// 删除盘点单
export async function delOrder(params = {}) {
    return request('/api/stock/order/delete', {
        method: 'POST',
        data: params,
    });
}