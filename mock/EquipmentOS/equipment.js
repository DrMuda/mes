// 设备列表
// eslint-disable-next-line import/no-extraneous-dependencies
import { parse } from 'url';

// 筛选工作状态
const filterWorkMap = {
	1: (arr) => arr.filter(item => item.status === 1), // 工作中
	2: (arr) => arr.filter(item => item.status === 2), // 故障中
	3: (arr) => arr, // 全部
	0: (arr) => arr.filter(item => item.status === 0), // 未工作
}

// 筛选工序
const filterProcessMap = {
	0: '梳棉工序',
	1: '并条工序',
	2: '粗纱工序',
	3: '细纱工序',
	4: '络筒工序',
	5: '全部',
}
// mock tableListDataSource
const genList = (current, pageSize) => {
	const tableListDataSource = [];

	for (let i = 0; i < pageSize; i += 1) {
		const index = (current - 1) * 10 + i;
		tableListDataSource.push({
			key: index,
			disabled: i % 6 === 0,
			avatar: [
				'https://cdn.pixabay.com/photo/2019/05/14/21/50/storytelling-4203628__340.jpg',
				'https://cdn.pixabay.com/photo/2016/03/17/23/07/abstract-1264071__340.png',
			][i % 2],
			equipmentName: `设备 ${index}`,
			belong: filterProcessMap[Math.floor(Math.random() * 10) % 4],
			currentAddress: 'XX位置',
			equipmentModel: 'XX型号',
			capacity: (Math.random() * 200) | 0,
			capacityUnit: '吨',
			manufacturer: 'XX厂商',
			currentOrderNo: 'XX订单',
			productionTime: new Date(),
			usageTime: new Date(),
			distributor: `经销商 ${index}`,
			status: Math.floor(Math.random() * 10) % 3,
		});
	}

	tableListDataSource.reverse();
	return tableListDataSource;
};

let tableListDataSource = genList(1, 100);


const Chart1 = () => {
	var data = [
		{
			name: '故障1',
			day: '10/1',
			gdp: 1,
		},
		{
			name: '故障1',
			day: '10/2',
			gdp: 3,
		},
		{
			name: '故障1',
			day: '10/3',
			gdp: 8,
		},
		{
			name: '故障1',
			day: '10/4',
			gdp: 2,
		},
		{
			name: '故障1',
			day: '10/5',
			gdp: 5,
		},
		{
			name: '故障1',
			day: '10/6',
			gdp: 6,
		},
		{
			name: '故障1',
			day: '10/7',
			gdp: 7,
		},
		{
			name: '故障2',
			day: '10/1',
			gdp: 8,
		},
		{
			name: '故障2',
			day: '10/2',
			gdp: 8,
		},
		{
			name: '故障2',
			day: '10/3',
			gdp: 2,
		},
		{
			name: '故障2',
			day: '10/4',
			gdp: 5,
		},
		{
			name: '故障2',
			day: '10/5',
			gdp: 6,
		},
		{
			name: '故障2',
			day: '10/6',
			gdp: 1,
		},
		{
			name: '故障2',
			day: '10/7',
			gdp: 7,
		},
		{
			name: '故障3',
			day: '10/1',
			gdp: 4,
		},
		{
			name: '故障3',
			day: '10/2',
			gdp: 2,
		},
		{
			name: '故障3',
			day: '10/3',
			gdp: 5,
		},
		{
			name: '故障3',
			day: '10/4',
			gdp: 2,
		},
		{
			name: '故障3',
			day: '10/5',
			gdp: 9,
		},
		{
			name: '故障3',
			day: '10/6',
			gdp: 5,
		},
		{
			name: '故障3',
			day: '10/7',
			gdp: 2,
		},
	];

	var config = {
		data: data,
		xField: 'day',
		yField: 'gdp',
		seriesField: 'name',
		yAxis: {
			label: {
				formatter: function formatter(v) {
					return ''.concat((v / 1000000000).toFixed(1), ' B');
				},
			},
		},
		legend: { position: 'top' },
		smooth: true,
		animation: {
			appear: {
				animation: 'path-in',
				duration: 2000,
			},
		},
	};

	return config;
};

const Chart2 = () => {
	// 图表1数据配置
	var data = [
		{
			date: '10/1',
			value: 3,
		},
		{
			date: '10/2',
			value: 15,
		},
		{
			date: '10/3',
			value: 3.5,
		},
		{
			date: '10/4',
			value: 5,
		},
		{
			date: '10/5',
			value: 10,
		},
		{
			date: '10/6',
			value: 10,
		},
		{
			date: '10/7',
			value: 2,
		},
		{
			date: '10/8',
			value: 3,
		},
		{
			date: '10/9',
			value: 8,
		},
		{
			date: '10/10',
			value: 8,
		},
	];
	var config = {
		data: data,
		xField: 'date',
		yField: 'value',
		label: {},
		point: {
			size: 5,
			shape: 'diamond',
			style: {
				fill: 'white',
				stroke: '#5B8FF9',
				lineWidth: 2,
			},
		},
		tooltip: { showMarkers: false },
		state: {
			active: {
				style: {
					shadowColor: 'yellow',
					shadowBlur: 4,
					stroke: 'transparent',
					fill: 'red',
				},
			},
		},
		theme: {
			geometries: {
				point: {
					diamond: {
						active: {
							style: {
								shadowColor: '#FCEBB9',
								shadowBlur: 2,
								stroke: '#F6BD16',
							},
						},
					},
				},
			},
		},
		interactions: [{ day: 'marker-active' }],
	};

	return config;
};

// 获取列表
function getEquipment(req, res, u) {
	let realUrl = u;

	if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
		realUrl = req.url;
	}

	const { current = 1, pageSize = 10 } = req.query;
	const params = parse(realUrl, true).query;
	let dataSource = [...tableListDataSource];
	const sorter = JSON.parse(params.sorter);

	const { activeWork, activeProcess} = req.query;

	if (sorter) {
		dataSource = dataSource.sort((prev, next) => {
			let sortNumber = 0;
			Object.keys(sorter).forEach((key) => {
				if (sorter[key] === 'descend') {
					if (prev[key] - next[key] > 0) {
						sortNumber += -1;
					} else {
						sortNumber += 1;
					}

					return;
				}

				if (prev[key] - next[key] > 0) {
					sortNumber += 1;
				} else {
					sortNumber += -1;
				}
			});
			return sortNumber;
		});
	}

	if (params.filter) {
		const filter = JSON.parse(params.filter);

		if (Object.keys(filter).length > 0) {

			dataSource = dataSource.filter((item) => {
				
				let keys = Object.keys(filter);
				
				return keys.some((key) => {
					return String(item[key]) === String(filter[key])
				});
				
			});

		}
	}

	if (params.name) {
		dataSource = dataSource.filter((data) => data.name.includes(params.name || ''));
	}

	if (activeWork && filterWorkMap[activeWork]) {
		dataSource = filterWorkMap[activeWork](dataSource);
	}

	if (activeProcess && filterProcessMap[activeProcess]) {
		if (activeProcess >= 0 && activeProcess < 5) {
			dataSource = dataSource.filter(item => {
				return item.belong === filterProcessMap[activeProcess];
			});
		}
	}

	const result = {
		data: dataSource.slice((current - 1) * pageSize, current * pageSize),
		total: tableListDataSource.length,
		success: true,
		pageSize,
		current: parseInt(`${params.currentPage}`, 10) || 1,
		chart1: Chart1(),
		chart2: Chart2(),
	};
	return res.json(result);
}

// 提交数据
function postEquipment(req, res, u, b) {
	let realUrl = u;

	if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
		realUrl = req.url;
	}

	const body = (b && b.body) || req.body;
	const { method, name, desc, key } = body;
	delete body['method'];

	switch (method) {
		/* eslint no-case-declarations:0 */
		case 'delete':
			tableListDataSource = tableListDataSource.filter(
				(item) => key.indexOf(item.key) === -1,
			);
			break;

		case 'post':
			(() => {
				const i = Math.ceil(Math.random() * 10000);
				const newRule = {
					key: tableListDataSource.length,
					avatar: [
						'https://cdn.pixabay.com/photo/2019/05/14/21/50/storytelling-4203628__340.jpg',
						'https://cdn.pixabay.com/photo/2016/03/17/23/07/abstract-1264071__340.png',
					][i % 2],
					currentOrderNo: 'XX订单',
					status: Math.floor(Math.random() * 10) % 3,
					...body,
				};
				tableListDataSource.unshift(newRule);
				return res.json(newRule);
			})();

			return;

		case 'update':
			(() => {
				let newRule = {};
				tableListDataSource = tableListDataSource.map((item) => {
					if (item.key === key) {
						newRule = { ...item, desc, name };
						return { ...item, desc, name };
					}

					return item;
				});
				return res.json(newRule);
			})();

			return;

		default:
			break;
	}

	const result = {
		list: tableListDataSource,
		pagination: {
			total: tableListDataSource.length,
		},
	};
	res.json(result);
}

export default {
	'GET /api/equipment': getEquipment,
	'POST /api/equipment': postEquipment,
};
