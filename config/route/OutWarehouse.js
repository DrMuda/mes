//出库管理
const OutWarehouse = {
    name: '出库管理',
    icon: 'table',
    path: '/DepositoryOS/OutWarehouse',
    routes: [
        {
            name: '成品出库',
            path: '/DepositoryOS/OutWarehouse/FinishOrder',
            component: './DepositoryOS/OutWarehouse/FinishOrder'
        },
        {
            name: '其他出库',
            path: '/DepositoryOS/OutWarehouse/OtherOrder',
            component: './DepositoryOS/OutWarehouse/OtherOrder'
        },
        {
            name: '出库单详细信息',
            path: '/DepositoryOS/OutWarehouse/FinishOrderDetails',
            component: './DepositoryOS/OutWarehouse/FinishOrderDetails',
            hideInMenu: true,
        },
        {
            name: '其他出库单详细信息',
            path: '/DepositoryOS/OutWarehouse/OtherOrderDetails',
            component: './DepositoryOS/OutWarehouse/OtherOrderDetails',
            hideInMenu: true,
        },
        {
            name: '新增出库单',
            path: '/DepositoryOS/OutWarehouse/AddFinishOrder',
            component: './DepositoryOS/OutWarehouse/AddFinishOrder',
            hideInMenu: true,
        },
        {
            name: '新增其他出库单',
            path: '/DepositoryOS/OutWarehouse/AddOtherOrder',
            component: './DepositoryOS/OutWarehouse/AddOtherOrder',
            hideInMenu: true,
        },
    ]
}
export default OutWarehouse