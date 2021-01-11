import request from '@/utils/request';

// 获取设备配置
export async function queryEquipmentConfig(params = {}) {
	return request('/api/config/equipment', {
		method: 'GET',
		params,
	});
}

// 删除某条设备配置
export async function delEquipmentConfig(params) {
	return request('/api/config/equipment/del', {
		method: 'POST',
		data: params,
	});
}

// 编辑某条设备配置
export async function editEquipmentConfig(params) {
	return request('/api/config/equipment/edit', {
		method: 'POST',
		data: params,
	});
}

// ---------------------------------------------------

// 获取车间配置
export async function queryWorkshopConfig(params = {}) {
	return request('/api/config/workshop', {
		method: 'GET',
		params,
	});
}

// 删除某条车间配置
export async function delWorkshopConfig(params) {
	return request('/api/config/workshop/del', {
		method: 'POST',
		data: params,
	});
}

// 编辑某条车间配置
export async function editWorkshopConfig(params) {
	return request('/api/config/workshop/edit', {
		method: 'POST',
		data: params,
	});
}

// ---------------------------------------------------

// 获取工位配置
export async function queryWorkplaceConfig(params = {}) {
	return request('/api/config/workplace', {
		method: 'GET',
		params,
	});
}

// 删除某条工位配置
export async function delWorkplaceConfig(params) {
	return request('/api/config/workplace/del', {
		method: 'POST',
		data: params,
	});
}

// 编辑某条工位配置
export async function editWorkplaceConfig(params) {
	return request('/api/config/workplace/edit', {
		method: 'POST',
		data: params,
	});
}

// --------------------------供应商配置
// 获取供应商类型数据
export function get_supplier_typedata() {
	return request('/mock-supplier-type', {
		method: 'get'
	})
}

// 更新,添加,删除供应商类型数据
export function update_supplier_typedata(params) {
	return request('/mock-supplier-type', {
		method: 'post',
		params
	})
}


// 获取供应商级别数据
export function get_supplier_leveldata() {
	return request('/mock-supplier-level', {
		method: 'get'
	})
}


// 更新,添加,删除供应商级别数据
export function update_supplier_leveldata(params) {
	return request('/mock-supplier-level', {
		method: 'post',
		params
	})
}

// 获取供应商列表
export function get_supplier_listdata() {
	return request('/mock-supplier-list', {
		method: 'get'
	})
}

// 搜索供应商列表
export function search_supplier_listdata(params) {
	return request('/mock-supplier-list', {
		method: 'post',
		params
	})
}

// 更新,添加,删除供应商列表
export function update_supplier_list(params) {
	return request('/mock-supplier-list', {
		method: 'post',
		params
	})
}


// ---------------------------产品数据
// 获得计量单位
export function get_productdata_unit() {
	return request('/mock-productdata-unit', {
		method: 'get'
	})
}
// 更新、添加、删除计量单位
export function update_productdata_unit(params) {
	return request('/mock-productdata-unit', {
		method: 'post',
		params
	})
}

// 获得物料属性
export function get_productdata_material() {
	return request('/mock-productdata-material', {
		method: 'get'
	})
}

// 更新、添加、删除物料属性
export function update_productdata_material(params) {
	return request('/mock-productdata-material', {
		method: 'post',
		params
	})
}

// 获取子项类型
export function get_productdata_subitem_type() {
	return request('/mock-productdata-subitem-type', {
		method: 'get'
	})
}

// 更新、添加、删除子项类型
export function update_productdata_subitem_type(params) {
	return request('/mock-productdata-subitem-type', {
		method: 'post',
		params
	})
}

// 获取物料/成品类型
export function get_productdata_material_fproduct_type() {
	return request('/mock-productdata-material-fproduct-type', {
		method: 'get'
	})
}

// 更新、添加、删除物料/成品类型
export function update_productdata_material_fproduct_type(params) {
	return request('/mock-productdata-material-fproduct-type', {
		method: 'post',
		params
	})
}

// 获取物料列表
export async function get_productdata_material_list() {
	return request('/mock-producudata-material-list', {
		method: 'get'
	})
}

// 更新、添加、删除物料列表
export function update_productdata_material_list(params) {
	return request('/mock-producudata-material-list', {
		method: 'post',
		params
	})
}

// ---------------------------------------------------
// 架构配置/部门列表

// 获取部门列表
export async function queryDepartment(params = {}) {
	return request('/api/config/department', {
		method: 'GET',
		data: params,
	});
}

// 编辑部门列表
export async function editDepartment(params) {
	return request('/api/config/department/edit', {
		method: 'POST',
		data: params,
	});
}

// 删除部门列表
export async function delDepartment(params) {
	return request('/api/config/department/del', {
		method: 'POST',
		data: params,
	});
}

// ---------------------------------------------------
// 架构配置/班次模式

// 获取班次模式列表
export async function queryFrequencyType(params = {}) {
	return request('/api/config/frequencyType', {
		method: 'GET',
		data: params,
	});
}

// 编辑或增加班次模式
export async function editFrequencyType(params) {
	return request('/api/config/frequencyType/edit', {
		method: 'POST',
		data: params,
	});
}

// 删除班次模式
export async function delFrequencyType(params) {
	return request('/api/config/frequencyType/del', {
		method: 'POST',
		data: params,
	});
}

// ---------------------------------------------------
// 生产配置/工序配置

// 获取工序列表
export async function queryWorkingProcedure(params = {}) {
	return request('/api/config/workingProcedure', {
		method: 'GET',
		data: params
	})
}

// 删除工序
export async function delWorkingProcedure(params) {
	return request('/api/config/workingProcedure/del', {
		method: 'POST',
		data: params
	})
}

// 增加或编辑工序
export async function editWorkingProcedure(params) {
	return request('/api/config/workingProcedure/edit', {
		method: 'POST',
		data: params
	})
}

// ---------------------------------------------------
// 生产配置/物料BOM配置

// 获取物料BOM列表
export async function queryMaterialBOM(params = {}) {
	return request('/api/config/materialBOM', {
		method: 'GET',
		data: params
	})
}

// 删除物料BOM
export async function delMaterialBOM(params) {
	return request('/api/config/materialBOM/del', {
		method: 'POST',
		data: params
	})
}

// 增加或编辑物料BOM
export async function editMaterialBOM(params) {
	return request('/api/config/materialBOM/edit', {
		method: 'POST',
		data: params
	})
}

// ---------------------------------------------------
// 生产配置/工艺BOM配置

// 获取工艺BOM列表
export async function queryCraftBOM(params = {}) {
	return request('/api/config/craftBOM', {
		method: 'GET',
		data: params
	})
}

// 删除工艺BOM
export async function delCraftBOM(params) {
	return request('/api/config/craftBOM/del', {
		method: 'POST',
		data: params
	})
}

// 增加或编辑工艺BOM
export async function editCraftBOM(params) {
	return request('/api/config/craftBOM/edit', {
		method: 'POST',
		data: params
	})
}