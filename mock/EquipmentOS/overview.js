// 工序
const ProcessMap = {
	0: '梳棉工序',
	1: '并条工序',
	2: '粗纱工序',
	3: '细纱工序',
	4: '络筒工序',
}

// 设备总览界面数据
module.exports = {
	'GET /api/overview/data': (req, res) => {
		// 饼形图数据
		let pieData = [];
		for (let i = 0; i < 5; i++) {
			let d1 = (Math.random() * 40) | 0 || 10;
			let d2 = (Math.random() * 40) | 0 || 10;
			let pie = [
				{
					type: '开工率',
					value: d1,
				},
				{
					type: '故障率',
					value: d2,
				},
				{
					type: '未开工率',
					value: 100 - (d1 + d2),
				},
			];
			pieData.push(pie);
		}

		// 警报信息
		let warnList = [];
		for (let i = 0; i < 20; i++) {
			warnList.push({
				id: `list_id_${i}`,
				process:ProcessMap[Math.floor(Math.random() * 10) % 4],
				name: 'XXX设备',
				desc: '没电了',
				state: '暂停工作',
			});
		}

		// 设备矩阵
		let matrixSourceData = [];

		let rowLen = (Math.random() * 10) | 0 || 1;
		for (let i = 0; i < rowLen; i++) {
			let colLen = (Math.random() * 10) | 0 || 2;
			for (let j = 0; j < colLen; j++) {
				let state = (Math.random() * 3) | 0;
				matrixSourceData.push({
					x: i,
					y: j,
					txt: `测试${i + 1}${j + 1}`,
					state,
				});
			}
			continue;
		}

		// -------------------
		res.send({
			data: {
				pieData,
				warnList,
				matrixSourceData,
			},
			success: true,
		});
	},
};
