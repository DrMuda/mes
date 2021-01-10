let workshopList = [
	{
		id: 'shumian', //车间
		name: '梳棉',
		groupList: ['一组', '二组', '三组', '四组'], //组别
		groupId: [1, 2, 3, 4],
	},
	{
		id: 'bingtiao',
		name: '并条',
		groupList: ['一组', '二组', '三组', '四组'],
		groupId: [1, 2, 3, 4],
	},
	{
		id: 'cusha',
		name: '粗纱',
		groupList: ['一组', '二组', '三组', '四组'],
		groupId: [1, 2, 3, 4],
	},
	{
		id: 'xisha',
		name: '细纱',
		groupList: ['一组', '二组', '三组', '四组'],
		groupId: [1, 2, 3, 4],
	},
	{
		id: 'luotong',
		name: '络筒',
		groupList: ['一组', '二组', '三组', '四组'],
		groupId: [1, 2, 3, 4],
	},
];
let userList = [
	{
		id: '101008', //人员的编号
		name: '刘一', //名字
		group: [
			'shumian-1',
			'bingtiao-1',
			'cusha-1',
			'xisha-1',
			'luotong-1',
			'shumian-2',
			'bingtiao-2',
			'cusha-2',
		], //一个人可以在多个组中，shumian-1代表梳棉一组
	},
	{
		id: '101009',
		name: '陈二',
		group: [
			'shumian-1',
			'bingtiao-1',
			'cusha-1',
			'xisha-1',
			'luotong-1',
			'shumian-3',
			'bingtiao-3',
			'cusha-3',
		],
	},
	{
		id: '101010',
		name: '张三',
		group: ['shumian-1', 'bingtiao-1', 'cusha-1', 'xisha-1', 'luotong-1'],
	},
	{
		id: '101011',
		name: '李四',
		group: ['shumian-1', 'bingtiao-1', 'cusha-1', 'xisha-1', 'luotong-1'],
	},
	{
		id: '101012',
		name: '王五',
		group: ['shumian-1', 'bingtiao-1', 'cusha-1', 'xisha-1', 'luotong-1'],
	},
	{
		id: '101013',
		name: '赵六',
		group: ['shumian-1', 'bingtiao-1', 'cusha-1', 'xisha-1', 'luotong-1'],
	},
	{
		id: '101014',
		name: '孙七',
		group: ['shumian-1', 'bingtiao-1', 'cusha-1', 'xisha-1', 'luotong-1'],
	},
	{
		id: '101015',
		name: '周八',
		group: ['shumian-1', 'bingtiao-1', 'cusha-1', 'xisha-1', 'luotong-1'],
	},
	{
		id: '101016',
		name: '吴九',
		group: ['shumian-1', 'bingtiao-1', 'cusha-1', 'xisha-1', 'luotong-1'],
	},
	{
		id: '101017',
		name: '郑十',
		group: ['shumian-1', 'bingtiao-1', 'cusha-1', 'xisha-1', 'luotong-1'],
	},
];
let frequencyList = [
	{
		startTime: '2020/12/1 0:00',
		endTime: '2021/12/31 24:00',
		type: 'normal',
		groupList: [
			{
				workshop: 'shumian',
				groupList: [1, 2],
			},
			{
				workshop: 'bingtiao',
				groupList: [1, 2, 3, 4],
			},
			{
				workshop: 'cusha',
				groupList: [1, 3, 4],
			},
			{
				workshop: 'xisha',
				groupList: [1, 2, 3, 4],
			},
			{
				workshop: 'luotong',
				groupList: [1, 2, 3, 4],
			},
		],
	},
];

let frequencyTypeList = [
	{
		type: 'normal',
		name: '正常生产班次',
		timeSlotByTime: ['8:00-16:00', '16:00-24:00', '0:00-8:00'],
		timeSlotList: ['早', '午', '晚'],
	},
	{
		type: 'hurry',
		name: '赶工生产班次',
		timeSlotByTime: ['8:00-14:00', '14:00-20:00', '20:00-2:00', '2:00-8:00'],
		timeSlotList: ['早', '午', '晚', '夜'],
	},
];
function getNowDate() {
	//获得真实事件或虚假时间
	// let fakeTime="2020/12/01 8:00"
	let fakeTime = new Date().getTime();
	return new Date(fakeTime);
}
function getDayAndTimeSoltAndRotation() {
	let nowFrequency = getNowFrequency();
	let date = getNowDate();
	let nowDate = date.toLocaleDateString();
	let nowTime = date.getTime();
	//得到距离排班开始时间到现在的毫秒数
	let day = nowTime - new Date(nowFrequency.startTime);
	//毫秒=>秒=>分=>时=>天
	day = parseInt(day / 1000 / 60 / 60 / 24);

	let frequencyType = {};
	frequencyTypeList.map((frequencyTypeTemp) => {
		if (frequencyTypeTemp.type == nowFrequency.type) {
			frequencyType = frequencyTypeTemp;
		}
	});

	let timeSlot = 0;
	let timePoint = [];
	let preEnd = 0;
	let nowDateTemp = nowDate;
	//将时间段转为一对时间点
	frequencyType.timeSlotByTime.map((timeSlot) => {
		let timePointTemp = timeSlot.split('-');
		let start = nowDateTemp + ' ' + timePointTemp[0];
		let end = nowDateTemp + ' ' + timePointTemp[1];
		if (new Date(start).getTime() < new Date(preEnd).getTime()) {
			//首班与末班在不在同一天的情况下
			//开始时间刚好是0:00
			nowDateTemp = nowDateTemp.split('/');
			nowDateTemp =
				nowDateTemp[0] + '/' + nowDateTemp[1] + '/' + (parseInt(nowDateTemp[2]) + 1);

			start = nowDateTemp + ' ' + timePointTemp[0];
			end = nowDateTemp + ' ' + timePointTemp[1];
		} else if (new Date(end).getTime() < new Date(preEnd).getTime()) {
			//开始时间与结束时间不在同一天，只需要修改结束时间
			nowDateTemp = nowDateTemp.split('/');
			nowDateTemp =
				nowDateTemp[0] + '/' + nowDateTemp[1] + '/' + (parseInt(nowDateTemp[2]) + 1);
			end = nowDateTemp + ' ' + timePointTemp[1];
		}
		preEnd = new Date(end).getTime();
		timePoint.push(new Date(start).getTime());
		timePoint.push(new Date(end).getTime());
	});
	//当当前时间处于首班的第二天的情况
	//时间点都需要往前一天推移
	//经过的天数也是
	//因为不能看做一天结束了
	if (nowTime < timePoint[0]) {
		timePoint = timePoint.map((time) => {
			return time - 1 * 24 * 60 * 60 * 1000;
		});
		day--;
	}
	//得到处于哪个时间段
	for (let i = 0; i * 2 < timePoint.length; i++) {
		if (nowTime >= timePoint[i * 2] && nowTime < timePoint[i * 2 + 1]) {
			timeSlot = i;
			break;
		}
	}
	let result = {
		day: day,
		timeSlot: timeSlot,
		rotation: day * (timePoint.length / 2) + timeSlot,
	};
	return result;
}
function getNowFrequency() {
	let nowTime = getNowDate().getTime();
	let nowFrequency = {};
	frequencyList.map((frequency) => {
		let startTime = new Date(frequency.startTime);
		let endTime = new Date(frequency.endTime);
		if (nowTime > startTime && nowTime < endTime) {
			nowFrequency = frequency;
		}
	});
	return nowFrequency;
}
function groupIdToName(groupId) {
	let groupName = '';
	workshopList.map((workshop) => {
		if (workshop.id == groupId.split('-')[0]) {
			groupName = workshop.name;
			if (groupId.split('-').length >= 2) {
				groupName += workshop.groupList[parseInt(groupId.split('-')[1]) - 1];
			}
		}
	});
	return groupName;
}
export default {
	//获取班次
	'get /api/teamGroup/frequency': function (req, res) {
		let nowFrequency = getNowFrequency();
		if (JSON.stringify(nowFrequency) !== '{}' && nowFrequency) {
			let frequencyType = {};
			let temp = getDayAndTimeSoltAndRotation();
			let rotation = temp.rotation;
			let timeSlot = temp.timeSlot;
			frequencyTypeList.map((frequencyTypeTemp) => {
				if (frequencyTypeTemp.type == nowFrequency.type) {
					frequencyType = frequencyTypeTemp;
				}
			});
			let results = nowFrequency.groupList.map((group) => {
				let groupList = group.groupList.map((number) => {
					return groupIdToName(group.workshop + '-' + number);
				});
				return {
					workshop: groupIdToName(group.workshop),
					groupList: groupList,
				};
			});
			results = {
				startTime: nowFrequency.startTime,
				endTime: nowFrequency.endTime,
				frequencyType: frequencyType,
				rotation: rotation,
				timeSlot: timeSlot,
				groupList: results,
			};
			res.status(200);
			res.send({
				data: results,
				success: true,
			});
		} else {
			res.status(200);
			res.send({
				data: {},
				success: false,
			});
		}
	},
	'get /api/teamGroup/workingGroup': function (req, res) {
		let working = []; //正在工作的小组别
		let nowFrequency = getNowFrequency();
		if (JSON.stringify(nowFrequency) !== '{}' && nowFrequency) {
			let frequencyType = {};
			frequencyTypeList.map((frequencyTypeTemp) => {
				if (frequencyTypeTemp.type == nowFrequency.type) {
					frequencyType = frequencyTypeTemp;
				}
			});
			//通过天数与第几个时间段得到班次轮换次数
			//轮换次数取模得到轮换到第几个小组
			let temp = getDayAndTimeSoltAndRotation();
			let rotation = temp.rotation;
			let timeSlot = temp.timeSlot;
			nowFrequency.groupList.map((group) => {
				let workingGroup =
					group.workshop + '-' + group.groupList[rotation % group.groupList.length];
				let user = [];
				userList.map((userTemp) => {
					if (userTemp.group.toString().indexOf(workingGroup) !== -1) {
						user.push(userTemp.name);
					}
				});
				working.push({
					group: groupIdToName(workingGroup),
					userList: user,
				});
			});
			working = {
				nowTime: getNowDate().toLocaleDateString(),
				timeSlot: timeSlot,
				timeSlotByTime: frequencyType.timeSlotByTime,
				groupList: working,
			};
			res.status(200);
			res.send({
				data: working,
				success: true,
			});
		} else {
			res.status(200);
			res.send({
				data: {},
				success: false,
			});
		}
	},
	'get /api/teamGroup/frequencyTypeList': function (req, res) {
		res.status(200);
		res.send({
			data: frequencyTypeList,
			success: true,
		});
	},
	'get /api/teamGroup/workshopList': function (req, res) {
		res.status(200);
		res.send({
			data: workshopList,
			success: true,
		});
	},
	'post /api/teamGroup/frequency/add': function (req, res) {
		let { frequency } = req.body;
		frequencyList.push(frequency);
		res.status(200);
		res.send({
			data: frequencyList,
			success: true,
		});
	},
};
