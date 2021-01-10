let groupList = [
	{
		id: 'shumian', //大组别的编号
		name: '梳棉',
		team: ['一组', '二组', '三组', '四组'], //大组别的小组，暂时用team表示
		working: 1, //早班工作的小组，1代表一组，2代表二组，以此类推
	},
	{
		id: 'bingtiao',
		name: '并条',
		team: ['一组', '二组', '三组', '四组'],
		working: 1,
	},
	{
		id: 'cusha',
		name: '粗纱',
		team: ['一组', '二组', '三组', '四组'],
		working: 1,
	},
	{
		id: 'xisha',
		name: '细纱',
		team: ['一组', '二组', '三组', '四组'],
		working: 1,
	},
	{
		id: 'luotong',
		name: '络筒',
		team: ['一组', '二组', '三组', '四组'],
		working: 1,
	},
];
let userList = [
	{
		id: '101008', //人员的编号
		name: '刘一', //名字
		group: 'shumian-1', //所在组别
		equipments: ['shumianC01', 'shumianC02', 'shumianC03'],
		status: '工作中',
	},
	{
		id: '101009',
		name: '陈二',
		group: 'shumian-1',
		equipments: ['shumianC01', 'shumianC02', 'shumianC03'],
		status: '工作中',
	},
	{
		id: '101010',
		name: '张三',
		group: 'shumian-1',
		equipments: ['shumianC01', 'shumianC02', 'shumianC03'],
		status: '工作中',
	},
	{
		id: '101011',
		name: '李四',
		group: 'shumian-1',
		equipments: ['shumianC01', 'shumianC02'],
		status: '未工作',
	},
	{
		id: '101012',
		name: '王五',
		group: 'bingtiao-1',
		equipments: ['bingtiaoC01', 'bingtiaoC02'],
		status: '工作中',
	},
	{
		id: '101013',
		name: '赵六',
		group: 'cusha-1',
		equipments: ['cushaC02', 'cushaC03'],
		status: '未工作',
	},
	{
		id: '101014',
		name: '孙七',
		group: 'xisha-1',
		equipments: ['xishaC01'],
		status: '工作中',
	},
	{
		id: '101015',
		name: '周八',
		group: 'luotong-1',
		equipments: ['luotongC02', 'luotongC03'],
		status: '工作中',
	},
	{
		id: '101016',
		name: '吴九',
		group: 'bingtiao-1',
		equipments: ['bingtiaoC01'],
		status: '未工作',
	},
	{
		id: '101017',
		name: '郑十',
		group: 'xisha-1',
		equipments: ['xishaC02'],
		status: '未工作',
	},
];
let equipmentList = [
	{
		id: 'shumianC01',
		name: '梳棉C01',
		status: '工作中',
	},
	{
		id: 'shumianC02',
		name: '梳棉C02',
		status: '工作中',
	},
	{
		id: 'shumianC03',
		name: '梳棉C03',
		status: '未工作',
	},
	{
		id: 'bingtiaoC01',
		name: '并条C01',
		status: '工作中',
	},
	{
		id: 'bingtiaoC02',
		name: '并条C02',
		status: '工作中',
	},
	{
		id: 'bingtiaoC03',
		name: '并条C03',
		status: '未工作',
	},
	{
		id: 'cushaC01',
		name: '粗纱C01',
		status: '工作中',
	},
	{
		id: 'cushaC02',
		name: '粗纱C02',
		status: '工作中',
	},
	{
		id: 'cushaC03',
		name: '粗纱C03',
		status: '未工作',
	},
	{
		id: 'xishaC01',
		name: '细纱C01',
		status: '工作中',
	},
	{
		id: 'xishaC02',
		name: '细纱C02',
		status: '工作中',
	},
	{
		id: 'xishaC03',
		name: '细纱C03',
		status: '未工作',
	},
	{
		id: 'luotongC01',
		name: '络筒C01',
		status: '工作中',
	},
	{
		id: 'luotongC02',
		name: '络筒C02',
		status: '工作中',
	},
	{
		id: 'luotongC03',
		name: '络筒C03',
		status: '未工作',
	},
];
let newUser = [
	{
		id: '101018', //人员的编号
		name: '刘新一', //名字
		group: 'shumian-1', //所在组别
	},
	{
		id: '101019',
		name: '陈新二',
		group: 'shumian-1',
	},
	{
		id: '101020',
		name: '张新三',
		group: 'shumian-1',
	},
	{
		id: '101021',
		name: '李新四',
		group: 'shumian-1',
	},
	{
		id: '101022',
		name: '王新五',
		group: 'bingtiao-1',
	},
	{
		id: '101023',
		name: '赵新六',
		group: 'cusha-1',
	},
	{
		id: '101024',
		name: '孙新七',
		group: 'xisha-1',
	},
	{
		id: '101025',
		name: '周新八',
		group: 'luotong-1',
	},
	{
		id: '101026',
		name: '吴新九',
		group: 'bingtiao-1',
	},
	{
		id: '101027',
		name: '郑新十',
		group: 'xisha-1',
	},
];
let productionRecords = [
	{
		userId: '101008', //人员工号
		date: '2020/01/01', //日期
		productType: '生条', //生产成品类型
		equipment: [
			{
				id: 'shumianC01', //设备编号
				output: 100, //设备产量
			},
			{
				id: 'shumianC02',
				output: 100,
			},
			{
				id: 'shumianC03',
				output: 100,
			},
		],
	},
	{
		userId: '101008', //人员工号
		date: '2020/01/05', //日期
		productType: '生条', //生产成品类型
		equipment: [
			{
				id: 'shumianC01', //设备编号
				output: 100, //设备产量
			},
			{
				id: 'shumianC02',
				output: 100,
			},
			{
				id: 'shumianC03',
				output: 100,
			},
		],
	},
	{
		userId: '101009', //人员工号
		date: '2020/01/05', //日期
		productType: '生条', //生产成品类型
		equipment: [
			{
				id: 'shumianC01', //设备编号
				output: 100, //设备产量
			},
			{
				id: 'shumianC02',
				output: 100,
			},
			{
				id: 'shumianC03',
				output: 100,
			},
		],
	},
	{
		userId: '101008',
		date: '2020/02/01',
		productType: '生条',
		equipment: [
			{
				id: 'shumianC01',
				output: 100,
			},
			{
				id: 'shumianC02',
				output: 100,
			},
			{
				id: 'shumianC03',
				output: 100,
			},
		],
	},
	{
		userId: '101008',
		date: '2020/02/05',
		productType: '生条',
		equipment: [
			{
				id: 'shumianC01',
				output: 100,
			},
			{
				id: 'shumianC02',
				output: 100,
			},
			{
				id: 'shumianC03',
				output: 100,
			},
		],
	},
	{
		userId: '101008',
		date: '2020/02/14',
		productType: '生条',
		equipment: [
			{
				id: 'shumianC01',
				output: 100,
			},
			{
				id: 'shumianC02',
				output: 100,
			},
			{
				id: 'shumianC03',
				output: 100,
			},
		],
	},
	{
		userId: '101008',
		date: '2020/03/01',
		productType: '生条',
		equipment: [
			{
				id: 'shumianC01',
				output: 100,
			},
			{
				id: 'shumianC02',
				output: 100,
			},
			{
				id: 'shumianC03',
				output: 100,
			},
		],
	},
	{
		userId: '101008',
		date: '2020/04/01',
		productType: '生条',
		equipment: [
			{
				id: 'shumianC01',
				output: 100,
			},
			{
				id: 'shumianC02',
				output: 100,
			},
			{
				id: 'shumianC03',
				output: 100,
			},
		],
	},
];
let performanceList = [
	{
		userId: '101008',
		date: '2019/9',
		planOutput: 500,
		realOutput: 600,
	},
	{
		userId: '101008',
		date: '2019/10',
		planOutput: 700,
		realOutput: 400,
	},
	{
		userId: '101008',
		date: '2019/11',
		planOutput: 600,
		realOutput: 800,
	},
	{
		userId: '101008',
		date: '2019/12',
		planOutput: 500,
		realOutput: 400,
	},
	{
		userId: '101008',
		date: '2020/1',
		planOutput: 700,
		realOutput: 600,
	},
	{
		userId: '101008',
		date: '2020/2',
		planOutput: 500,
		realOutput: 700,
	},
	{
		userId: '101008',
		date: '2020/3',
		planOutput: 700,
		realOutput: 500,
	},
	{
		userId: '101008',
		date: '2020/4',
		planOutput: 600,
		realOutput: 600,
	},
	{
		userId: '101008',
		date: '2020/5',
		planOutput: 200,
		realOutput: 400,
	},
	{
		userId: '101008',
		date: '2020/6',
		planOutput: 400,
		realOutput: 300,
	},
	{
		userId: '101008',
		date: '2020/7',
		planOutput: 500,
		realOutput: 100,
	},
	{
		userId: '101008',
		date: '2020/8',
		planOutput: 600,
		realOutput: 900,
	},
	{
		userId: '101008',
		date: '2020/9',
		planOutput: 1000,
		realOutput: 500,
	},
	{
		userId: '101009',
		date: '2019/9',
		planOutput: 500,
		realOutput: 500,
	},
	{
		userId: '101009',
		date: '2019/10',
		planOutput: 700,
		realOutput: 700,
	},
	{
		userId: '101009',
		date: '2019/11',
		planOutput: 600,
		realOutput: 500,
	},
	{
		userId: '101009',
		date: '2019/12',
		planOutput: 500,
		realOutput: 600,
	},
	{
		userId: '101009',
		date: '2020/1',
		planOutput: 700,
		realOutput: 800,
	},
	{
		userId: '101009',
		date: '2020/2',
		planOutput: 500,
		realOutput: 900,
	},
	{
		userId: '101009',
		date: '2020/3',
		planOutput: 700,
		realOutput: 600,
	},
	{
		userId: '101009',
		date: '2020/4',
		planOutput: 600,
		realOutput: 600,
	},
	{
		userId: '101009',
		date: '2020/5',
		planOutput: 200,
		realOutput: 300,
	},
	{
		userId: '101009',
		date: '2020/6',
		planOutput: 400,
		realOutput: 300,
	},
	{
		userId: '101009',
		date: '2020/7',
		planOutput: 500,
		realOutput: 500,
	},
	{
		userId: '101009',
		date: '2020/8',
		planOutput: 600,
		realOutput: 900,
	},
	{
		userId: '101009',
		date: '2020/9',
		planOutput: 1000,
		realOutput: 900,
	},
];
export default {
	//获取人员相关列表
	'get /getUserList': function (req, res) {
		let info = [];
		userList.map((user) => {
			let temp = {
				name: user.name ? user.name : undefined,
				userId: user.id ? user.id : undefined,
				equipmentSum: user.equipments ? user.equipments.length : undefined,
				userStatus: user.status ? user.status : undefined,
			};
			if (user.group !== undefined) {
				groupList.map((group) => {
					if (group.id == user.group.split('-')[0]) {
						temp.team = group.name + group.team[parseInt(user.group.split('-')[1]) - 1];
					}
				});
			}
			if (user.equipments !== undefined) {
				equipmentList.map((equipment) => {
					if (user.equipments.indexOf(equipment.id) !== -1) {
						if (temp.equipments) {
							temp.equipments.push(equipment.name);
						} else {
							temp.equipments = [equipment.name];
						}

						if (temp.equipmentStatus) {
							temp.equipmentStatus.push(equipment.status);
						} else {
							temp.equipmentStatus = [equipment.status];
						}
					}
				});
			}
			info.push(temp);
		});
		res.status(200);
		res.json(info);
	},
	'post /deleteUser': function (req, res) {
		var userId = req.body.userId;
		if (userId != undefined && userId != '') {
			userId = userId.split(',');
			let temp = [];
			userList.map((user, index) => {
				if (userId.indexOf(user.id) == -1) {
					temp.push(user);
				}
			});
			userList = temp;
			res.status(200);
			res.json('删除成功');
		} else {
			res.status(200);
			res.json('未选择任何一行');
		}
	},
	'get /getNewUserList': function (req, res) {
		res.status(200);
		res.json(newUser);
	},
	'post /addNewUser': function (req, res) {
		let user = JSON.parse(req.body.user);
		userList.push(user);
		for (let i = 0; i < newUser.length; i++) {
			if (newUser[i].id === user.id) {
				newUser.splice(i, 1);
				break;
			}
		}
		res.status(200);
		res.json('已新增人员');
	},
	'get /getProductionRecord': function (req, res) {
		const urlib = require('url');
		var myobj = urlib.parse(req.url, true);
		var userId = myobj.query.userId;
		var recordSum = myobj.query.recordSum;
		let record = {
			userId: '',
			userName: '',
			equipmentSum: 0,
			userGroup: '',
			userGroupId: '',
			dataList: [],
		};
		userList.map((user) => {
			if (user.id === userId) {
				record.userId = user.id;
				record.userName = user.name;
				record.equipmentSum = user.equipments ? user.equipments.length : 0;
				if (user.group !== undefined) {
					groupList.map((group) => {
						if (group.id == user.group.split('-')[0]) {
							record.userGroupId = user.group;
							record.userGroup =
								group.name + group.team[parseInt(user.group.split('-')[1]) - 1];
						}
					});
				}
			}
		});
		productionRecords.map((productionRecord) => {
			let temp = {};
			if (productionRecord.userId === userId) {
				temp.sequenceNumber = productionRecord.sequenceNumber;
				temp.date = productionRecord.date;
				temp.productType = productionRecord.productType;
				temp.equipment = productionRecord.equipment;
				// if(record.dataList.length>=5){
				//     record.dataList.shift();
				// }
				record.dataList.push(temp);
			}
		});
		res.status(200);
		res.json(record);
	},
	'get /getGroupList': function (req, res) {
		res.status(200);
		res.json(groupList);
	},
	'post /updataUser': function (req, res) {
		const urlib = require('url');
		var myobj = urlib.parse(req.url, true);
		var id = myobj.query.userId;
		var newId = myobj.query.newId;
		var newName = myobj.query.newName;
		var newGroup = myobj.query.newGroup;
		userList.map((user) => {
			if (user.id == id) {
				user.id = newId;
				user.name = newName;
				user.group = newGroup;
				return user;
			}
		});
		productionRecords.map((record) => {
			if (record.userId == id) {
				record.userId = newId;
				return record;
			}
		});
		res.status(200);
		res.json('修改成功');
	},
	'get /getPerformanceList': function (req, res) {
		const urlib = require('url');
		var myobj = urlib.parse(req.url, true);
		var userId = myobj.query.userId;
		let list = [];
		performanceList.map((performance) => {
			if (performance.userId == userId) {
				// if(list.length>=12){
				//     list.shift()
				// }
				list.push(performance);
			}
		});
		res.status(200);
		res.json(list);
	},
};
