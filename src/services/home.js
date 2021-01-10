import request from '@/utils/request';

// 获取设备总览页面数据
export async function queryHomeData(params = {}) {
    return request('/api/home', {
        method: 'GET',
        params,
    });
}
