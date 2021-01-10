import request from '@/utils/request';

// 获取设备总览页面数据
export async function queryAllData(params = {}) {
    return request('/api/overview/data', {
        method: 'GET',
        params,
    });
}
