// 仓库管理
import EntryWarehouse from './EntryWarehouse';
import OutWarehouse from './OutWarehouse'
const routes = [
    {
        path: `/DepositoryOS/Stock`,
        name: '库存管理',
        routes: [
            {
                name: '库存明细',
                path: `/DepositoryOS/Stock/StockDetail`,
                component: `./DepositoryOS/Stock/StockDetail`,
            },
            {
                name: '库存盘点',
                path: `/DepositoryOS/Stock/StockCheck`,
                component: `./DepositoryOS/Stock/StockCheck`,
            },
            {
                name: '新增盘点',
                path: `/DepositoryOS/Stock/NewlyForm`,
                component: `./DepositoryOS/Stock/NewlyForm`,
                hideInMenu: true,
            },
            {
                name: '盘点单详情',
                path: `/DepositoryOS/Stock/OrderDetails`,
                component: `./DepositoryOS/Stock/OrderDetails`,
                hideInMenu: true,
            },
        ],
    },
    EntryWarehouse,
    OutWarehouse
];


export default routes;
