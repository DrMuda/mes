import ProductionOS from './route/ProductionOS';
import EquipmentOS from './route/EquipmentOS';
import DepositoryOS from './route/DepositoryOS';
import TeamGroupOS from './route/TeamGroupOS';
import ConfigOS from './route/ConfigOS';
import FinishedProductOS from './route/FinishedProductOS';

export default [
	{
		path: '/',
		component: '../layouts/SecurityLayout',
		routes: [
			{
				path: '/',
				component: '../layouts/BasicLayout',
				routes: [
					{
						path: '/',
						redirect: '/home',
					},
					// 首页
					{
						path: '/home',
						name: '首页',
						icon: 'home',
						component: './Home/Index'
					},
					// 生产管理
					{
						path: '/ProductionOS',
						name: '生产管理',
						icon: 'smile',
						routes: ProductionOS,
					},
					//成品管理
					{
						path: '/FinishedProductOS',
						name: '成品管理',
						icon: 'ProfileFilled',
						routes: FinishedProductOS,
					},
					// 设备管理
					{
						path: '/EquipmentOS',
						name: '设备管理',
						icon: 'smile',
						routes: EquipmentOS,
					},
					// 仓库管理
					{
						path: '/DepositoryOS',
						name: '仓库管理',
						icon: 'smile',
						routes: DepositoryOS
					},
					//班组管理
					{
						path: '/TeamGroupOS',
						name: '班组管理',
						icon: 'team',
						routes: TeamGroupOS
					},
					//配置管理
					{
						path: '/ConfigOS',
						name: '配置管理',
						icon: 'setting',
						routes: ConfigOS
					}
				],
			},
		],
	},
];
