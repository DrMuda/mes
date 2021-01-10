//入库管理
const EntryWarehouse = {
    name: '入库管理',
    icon: 'table',
    path: '/DepositoryOS/EntryWarehouse',
    routes: [
        {
            name: '仓库收货',
            path: '/DepositoryOS/EntryWarehouse/ReceiveOrder',
            component: './DepositoryOS/EntryWarehouse/ReceiveOrder'
        },
        {
            name: "成品退货",
            path: "/DepositoryOS/EntryWarehouse/ReturnOrder",
            component: "./DepositoryOS/EntryWarehouse/ReturnOrder"
        },
        {
            name: '入库单明细',
            path: '/DepositoryOS/EntryWarehouse/ReceiveOrderDetails',
            component: './DepositoryOS/EntryWarehouse/ReceiveOrderDetails',
            hideInMenu: true,
        },
        {
            name: '退货单明细',
            path: '/DepositoryOS/EntryWarehouse/ReturnOrderDetails',
            component: './DepositoryOS/EntryWarehouse/ReturnOrderDetails',
            hideInMenu: true,
        },
        {
            name: '新增入库单',
            path: '/DepositoryOS/EntryWarehouse/AddReceiveOrder',
            component: './DepositoryOS/EntryWarehouse/AddReceiveOrder',
            hideInMenu: true,
        },
        {
            name: '新增退货单',
            path: '/DepositoryOS/EntryWarehouse/AddReturnOrder',
            component: './DepositoryOS/EntryWarehouse/AddReturnOrder',
            hideInMenu: true,
        },


        {
            name:"其他入库",
            path:"/DepositoryOS/EntryWarehouse/OtherEntryList",
            component:"./DepositoryOS/EntryWarehouse/OtherEntry/OtherEntryList",
        },
        {
            name:"其他入库明细",
            path:"/DepositoryOS/EntryWarehouse/OtherEntryDetails",
            component:"./DepositoryOS/EntryWarehouse/OtherEntry/OtherEntryDetails",
            hideInMenu: true,
        },
        {
            name:"新增其他入库单",
            path:"/DepositoryOS/EntryWarehouse/AddOtherEntry",
            component:"./DepositoryOS/EntryWarehouse/OtherEntry/AddOtherEntry",
            hideInMenu: true,
        }
    ]
}
export default EntryWarehouse