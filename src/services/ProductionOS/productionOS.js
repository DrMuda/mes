import request from '@/utils/request';

// 获取设备计划
export async function queryProductionPlan(params = {}) {
    return request('/api/production/plan', {
        method: 'GET',
        params,
    });
}


export async function queryProductionDetail(id = '') {
    return request(`/api/production/detail/${id}`);
}

// 获取计划日历
export async function queryProductionCalendar(params = {}) {
    return request('/api/production/calendar', {
        method: 'GET',
        params,
    });
}

// 获取计划日历-订单列表
export async function queryProductionCalendarOrderInfo(params = {}) {
    return request('/api/production/calendar/list', {
        method: 'GET',
        params,
    });
}

// --------------------------------------

// 获取订单计划页数据
export async function queryProductionOrderplan(params = {}) {
    return request('/api/production/orderplan', {
        method: 'GET',
        params,
    });
}

// 修改订单计划的生产状态
export async function changeProductionStatus(params) {
    return request('/api/production/orderplan/productionstatus', {
        method: 'POST',
        data: params,
    });
}

// 获取订单信息
export async function queryProductionOrderPlanDetail(params = {}) {
    return request('/api/production/orderplan/detail', {
        method: 'GET',
        params,
    });
}

// 获取计划方案列表
export async function queryProductionOrderPlanList(params = {}) {
    return request('/api/production/orderplan/planlist', {
        method: 'GET',
        params,
    });
}

// 获取计划方案列表
export async function queryCheckPlanChartDataAndDetails(params = {}) {
    return request('/api/production/orderplan/checkPlan', {
        method: 'GET',
        params,
    });
}

//--------------------------------------------------------
//获取领料单数据
export async function getMaterialRequisition(){
    return request('/mock-material-requisition',{
        method:'get'
    })
}