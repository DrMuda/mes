// 设备管理
const routes = [
    {
        path: `/EquipmentOS/EquipmentOverview`,
        name: '设备总览',
        routes: [
            {
                path: `/EquipmentOS/EquipmentOverview/`,
                component: `./EquipmentOS/EquipmentOverview/Index`,
            },
            {
                path: `/EquipmentOS/EquipmentOverview/ViewDetail`,
                name: '设备详情',
                component: `./EquipmentOS/EquipmentOverview/ViewDetail`,
                hideInMenu: true,
            },
        ],
    },
    {
        path: `/EquipmentOS/EquipmentList`,
        name: '设备列表',
        routes: [
            {
                path: `/EquipmentOS/EquipmentList/`,
                component: `./EquipmentOS/EquipmentList/Index`,
            },
            {
                path: `/EquipmentOS/EquipmentList/Detail/:id`,
                name: '设备详情',
                component: `./EquipmentOS/EquipmentList/Detail`,
                hideInMenu: true,
            },
        ],
    },
    {
        path: `/EquipmentOS/FaultOS`,
        name: '故障管理',
        routes: [
            {
                path: `/EquipmentOS/FaultOS`,
                component: `./EquipmentOS/FaultOS/Index.jsx`,
            },
            {
                path: `/EquipmentOS/FaultOS/Detail/:id`,
                name: '故障详情',
                component: `./EquipmentOS/FaultOS/FaultDetail`,
                hideInMenu: true,
            },
        ],
    },
    {
        path: `/EquipmentOS/EquipmentMaintenance`,
        name: '设备维护',
        routes: [
            {
                path: `/EquipmentOS/EquipmentMaintenance`,
                component: `./EquipmentOS/EquipmentMaintenance`,
            },
            {
                path: `/EquipmentOS/EquipmentMaintenance/detail/:id`,
                name: '维护明细',
                component: `./EquipmentOS/EquipmentMaintenance/MaintenanceDetail`,
                hideInMenu: true,
            },
        ],
    },
];

export default routes;
