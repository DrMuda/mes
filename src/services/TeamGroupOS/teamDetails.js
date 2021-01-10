import request from '@/utils/request';

//获取当前班次
export async function queryFrequency(params = {}) {
	return request('/api/teamGroup/frequency', {
		method: 'GET',
		data: params,
	});
}

//获取正在工作的小组
export async function queryWorkingGroup(params = {}) {
	return request('/api/teamGroup/workingGroup', {
		method: 'GET',
		data: params,
	});
}

//获取班次模式
export async function queryFrequencyType(params = {}) {
	return request('/api/teamGroup/frequencyTypeList', {
		method: 'GET',
		data: params,
	});
}

//获取车间列表
export async function queryWorkshopList(params = {}) {
	return request('/api/teamGroup/workshopList', {
		method: 'GET',
		data: params,
	});
}

//添加班组
export async function addFrequency(params) {
	return request('/api/teamGroup/frequency/add', {
		method: 'POST',
		data: params,
	});
}
