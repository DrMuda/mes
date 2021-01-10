// 生产管理
const routes = [
	{
		path: `/ProductionOS/OrderPlan`,
		name: '生产计划',
		routes: [
			{
				name: '订单计划',
				path: `/ProductionOS/OrderPlan/Index`,
				component: `./ProductionOS/OrderPlan/Index`,
			},
			{
				name: '订单信息',
				path: `/ProductionOS/OrderPlan/OrderInfo`,
				component: `./ProductionOS/OrderPlan/OrderInfo`,
				hideInMenu: true
			},
			{
				name: '计划方案',
				path: `/ProductionOS/OrderPlan/Arrange`,
				component: `./ProductionOS/OrderPlan/Arrange`,
				hideInMenu: true
			},
			{
				path: `/ProductionOS/OrderPlan/PlanningCalendar`,
				name: '计划日历',
				component: `./ProductionOS/PlanningCalendar`,
			},
		]
	},
	{
		path: `/ProductionOS/EquipmentPlan`,
		name: '生产安排',
		routes: [
			{
				name: '设备计划',
				path: `/ProductionOS/EquipmentPlan/EquipmentList`,
				component: `./ProductionOS/EquipmentPlan/EquipmentList`,
			},
			{
				path: `/ProductionOS/EquipmentPlan/PlanDetail`,
				name: '设备计划详情',
				component: `./ProductionOS/EquipmentPlan/PlanDetail`,
				hideInMenu: true,
			},
			{
				name: '制作通知',
				path: `/ProductionOS/EquipmentPlan/Notice`,
				component: `./ProductionOS/EquipmentPlan/Notice`,
				// 暂不展示
				hideInMenu: true,
			},
		]
	},
	{
		path:'/ProductionOS/ProductionPicking',
		name:'生产领料',
		routes:[
			{
				path:'/ProductionOS/ProductionPicking/MaterialRequisition',
				name:'领料单',
				component:'./ProductionOS/ProductionPicking'
			},
			{
				path:'/ProductionOS/ProductionPicking/MaterialRequisitionDetails',
				name:'领料单详情页',
				hideInMenu: true,
				// component:''
			},
			{
				path:'/ProductionOS/ProductionPicking/MateruakReturnSheet',
				name:'退料单',
				// component:''
			},
			{
				path:'/ProductionOS/ProductionPicking/MateruakReturnSheetDetails',
				name:'退料单详情页',
				hideInMenu:true,
				// component:''
			},
			{
				path:'/ProductionOS/ProductionPicking/AddMateruakReturnSheet',
				name:'新增退料单',
				hideInMenu:true,
				// component:''
			}
		]
	}
	
];

export default routes;
