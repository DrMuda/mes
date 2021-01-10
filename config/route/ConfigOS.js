// 配置管理
const routes = [
    {
        path: `/ConfigOS/EquipmentConfig`,
        name: '设备配置',
        routes: [
            {
                name: '设备配置',
                path: `/ConfigOS/EquipmentConfig/Equipment`,
                component: `./ConfigOS/EquipmentConfig/Equipment`,
            },
            {
                name: '车间配置',
                path: `/ConfigOS/EquipmentConfig/Workshop`,
                component: `./ConfigOS/EquipmentConfig/Workshop`,
            },
            {
                name: '工位配置',
                path: `/ConfigOS/EquipmentConfig/Workplace`,
                component: `./ConfigOS/EquipmentConfig/Workplace`,
            },
        ],
    },
    {
        path: '/ConfigOS/SupplierConfig',
        name: '供应商配置',
        routes: [
            {
                path: '/ConfigOS/SupplierConfig/Type',
                name: '供应商类型',
                component: './ConfigOS/SupplierConfig/Type'
            },
            {
                path: '/ConfigOS/SupplierConfig/Level',
                name: '供应商级别',
                component: './ConfigOS/SupplierConfig/Level'
            },
            {
                path: '/ConfigOS/SupplierConfig/List',
                name: '供应商列表',
                component: './ConfigOS/SupplierConfig/List'
            }
        ]
    },
	{
		name: '仓库配置',
		path: '/ConfigOS/DepositoryConfig',
		routes: [
			{
				name: '仓库类别',
				path: '/ConfigOS/DepositoryConfig/DepositoryType',
				component: './ConfigOS/DepositoryConfig/DepositoryType',
			},
			{
				name: '仓库列表',
				path: '/ConfigOS/DepositoryConfig/DepositoryList',
				component: './ConfigOS/DepositoryConfig/DepositoryList',
			},
			{
				name: '库位设定',
				path: '/ConfigOS/DepositoryConfig/StorageSetting',
				component: './ConfigOS/DepositoryConfig/StorageSetting',
			},
		],
	},
	{
		name: '架构配置',
		path: '/ConfigOS/FrameworkConfig',
		routes: [
			{
				name: '部门列表',
				path: '/ConfigOS/FrameworkConfig/DepartmentList',
				component: './ConfigOS/FrameworkConfig/DepartmentList',
            },
            {
                name:'班次模式',
                path:'/ConfigOS/FrameworkConfig/FrequencyType',
                component:'./ConfigOS/FrameworkConfig/FrequencyType'
            }
		],
    },
    {
        path: '/ConfigOS/ProductData',
        name: '产品数据',
        routes:[
            {
                path: '/ConfigOS/ProductData/Material_FinishedProduct_Type',
                name: '物料/成品类型',
                component: './ConfigOS/ProductData/Material_FinishedProduct_Type'
            },
            {
                path: '/ConfigOS/ProductData/SubitemType',
                name: '子项类型',
                component: './ConfigOS/ProductData/SubitemType'
            },
            {
                path: '/ConfigOS/ProductData/Unit',
                name: '计量单位',
                component: './ConfigOS/ProductData/Unit'
            },
            {
                path: '/ConfigOS/ProductData/MaterialProperties',
                name: '物料属性',
                component: './ConfigOS/ProductData/MaterialProperties'
            },
            {
                path: '/ConfigOS/ProductData/Material_FinishedProduct_List',
                name: '物料/成品列表',
                component: './ConfigOS/ProductData/Material_FinishedProduct_List'
            }
        ]
    },
    {
        name:'生产配置',
        path:'/ConfigOS/ProduceConfig',
        routes:[
            {
                name:'工序配置',
                path:'/ConfigOS/ProduceConfig/WorkingProcedure',
                component:'./ConfigOS/ProduceConfig/WorkingProcedure'
            },
            {
                name:'物料BOM配置',
                path:'/ConfigOS/ProduceConfig/MaterialBOM',
                component:'./ConfigOS/ProduceConfig/MaterialBOM'
            },
            {
                name:'管理BOM',
                path:'/ConfigOS/ProduceConfig/EditSubMaterial',
                component: './ConfigOS/ProduceConfig/EditSubMaterial',
                hideInMenu: true
            },
            {
                name:'物料BOM详情',
                path:'/ConfigOS/ProduceConfig/ShowSubMaterial',
                component:'./ConfigOS/ProduceConfig/ShowSubMaterial',
                hideInMenu: true
            }
        ]
    }
];

export default routes;
