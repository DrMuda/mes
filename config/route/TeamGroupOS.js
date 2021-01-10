export default [
	{
		name: '班组明细',
		path: '/TeamGroupOS/TeamDetails',
		component: './TeamGroupOS/TeamDetails',
	},
	{
		name: '人员列表',
		path: '/TeamGroupOS/UserList',
		component: './TeamGroupOS/UserList',
	},
	{
		name: '新增人员',
		path: '/TeamGroupOS/AddUser',
		component: './TeamGroupOS/AddUser',
		hideInMenu: true,
	},
	{
		name: '人员详情',
		path: '/TeamGroupOS/UserDetails',
		component: './TeamGroupOS/UserDetails',
		hideInMenu: true,
	},
	{
		name: '当前排班计划',
		path: '/TeamGroupOS/CurrentSchedulingPlan',
		component: './TeamGroupOS/CurrentSchedulingPlan',
		hideInMenu: true,
	},
	{
		name: '新建排班',
		path: '/TeamGroupOS/AddFrequency',
		component: './TeamGroupOS/AddFrequency',
		hideInMenu: true,
	},
];
