import request from '@/utils/request';

//获取其他入库单列表
export async function queryOtherEntryOrder(params = {}) {
	return request('/api/depository/entryWarehouse/otherEntryOrder', {
		method: 'GET',
		data: params,
	});
}

//获取其他入库中的物料列表
export async function queryOtherEntryCargo(params = {}) {
	return request('/api/depository/entryWarehouse/OtherEntryCargo', {
		method: 'GET',
		data: params,
	});
}

//新增或修改其他入库单
export async function editOtherEntry(params) {
	return request('/api/depository/entryWarehouse/otherEntryOrder/edit', {
		method: 'POST',
		data: params,
	});
}