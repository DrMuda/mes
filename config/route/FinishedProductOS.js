//成品管理
export default [
    {
        path: '/FinishedProductOS',
        redirect: '/FinishedProductOS/FinishedProductTrace'
    },
    {
        path: '/FinishedProductOS/FinishedProductTrace',   //成品追溯
        name: '成品追溯',
        component: './FinishedProductOS/FinishedProductTrace',
    },
    {
        path: '/FinishedProductOS/TraceDetails',    //成品追溯详情
        name: '成品追溯详情',
        component: './FinishedProductOS/TraceDetails',
        hideInMenu: true
    },
    {
        path: '/FinishedProductOS/PutInStorage',  //成品入库
        name: '成品入库',
        component: './FinishedProductOS/PutInStorage'
    },
    {
        path: '/FinishedProductOS/PutInStorage_Details',   //货物入库详情
        name: '货物入库明细',
        component: './FinishedProductOS/PutInStorage_Details',
        hideInMenu: true
    },
    {
        path:'/FinishedProductOS/AddPutInStorage',    //新增成品入库单
        name:'新增成品入库单',    
        component:'./FinishedProductOS/AddPutInStorage',
        hideInMenu: true
    }
]