// 库存明细列表
let stockDetailDataSource = [];
// 盘点单列表
let checkOrderDataSource = [];
// 库存盘点的详情
const checkDataDetail = [];
const createOrderArr = []; // 已生成盘点单的单号
let tempData = null;

const valueEnum = {
	0: '蒸汽机',
	1: '柴油机',
	2: '内燃机',
	3: '发电机',
};

const warehouseTypeEnum = {
	0: '原料',
	1: '备料',
	2: '成品',
};

const auditStatusEnum = {
	0: '待审核',
	1: '已审核',
};

for (let i = 0; i < 50; i += 1) {
	stockDetailDataSource.push({
		key: i,
		name: 'XXX',
		systemCoding: Math.floor(Math.random() * 20),
		model: valueEnum[Math.floor(Math.random() * 10) % 4],
		warehouseType: warehouseTypeEnum[Math.floor(Math.random() * 10) % 3],
		warehouse: 'XXX',
		positions: 'XXX',
		totalWarehouse: Math.floor(Math.random() * 200),
		availableQuantity: Math.floor(Math.random() * 200),
		minimum: Math.floor(Math.random() * 200),
		peak: Math.floor(Math.random() * 200),
		cost: `${Math.floor(Math.random() * 200)}元`,
	});
}

for (let i = 0; i < 50; i += 1) {
	let stateIndex = (Math.random() * 2) | 0;

	checkOrderDataSource.push({
		key: i,
		numbers: Date.now() + i,
		auditStatus: auditStatusEnum[stateIndex],
		date: new Date().toLocaleString(),
		warehouse: 'XXX',
		producer: 'XXX',
		reviewerm: 'XXX',
		passed: stateIndex /* 0:未盘点，1：已盘点 */,
		validateDate: new Date().toLocaleString(),
	});
}

for (let i = 0; i < 10; i++) {
	checkDataDetail.push({
		key: i + '',
		shelves: `库位 ${i}`,
		cargoId: `XXX ${i}`,
		cargoName: `XXX ${i}`,
		SpecificationModel: `XXX ${i}`,
		unit: `吨`,
		qriginalStockQuantity: `999`,
		firmOffer: `888`,
		breakEven: `111`,
	})
}


module.exports = {
	// 库存明细
	'GET /api/stock/detail': (req, res) => {
		let type = (req.query.type || 0) | 0;
		let warehouseType = (req.query.warehouseType || -1) * 1;


		let newDataArr = stockDetailDataSource.slice();

		if (type === 1) {
			// 库存量少于50的为缺货
			newDataArr = stockDetailDataSource.filter((item) => {
				return item.totalWarehouse < 50;
			});
		} else if (type === 2) {
			// 库存量高于100的为超仓
			newDataArr = stockDetailDataSource.filter((item) => {
				return item.totalWarehouse > 100;
			});
		}

		if (warehouseTypeEnum[warehouseType]) {
			newDataArr = newDataArr.filter((item) => {
				return item.warehouseType === warehouseTypeEnum[warehouseType];
			});
		}

		res.send({
			data: newDataArr,
			success: true,
		});
	},

	// 库存盘点
	'GET /api/stock/check': (req, res) => {
		let type = (req.query.type || 0) | 0;


		let newDataArr = checkOrderDataSource.slice();

		if (type !== 0) {
			newDataArr = checkOrderDataSource.filter((item) => {
				return item.passed === type - 1;
			});
		}

		res.send({
			data: newDataArr,
			success: true,
		});
	},

	// 获取盘点单详情
	'GET /api/stock/order/detail': (req, res) => {
		let { orderNumber } = req.query;
		if (!createOrderArr.includes(+orderNumber)) return res.send({ success: false })

		res.send({
			data: tempData ? tempData : checkDataDetail,
			success: true
		})
	},

	// 创建盘点单
	'POST /api/stock/order/create': (req, res) => {
		let { orderNumber } = req.body;
		if (!createOrderArr.includes(orderNumber)) {
			createOrderArr.push(orderNumber);
		};
		res.send({ success: true });
	},

	// 接收上传的盘点单
	'POST /api/stock/order/upload': (req, res) => {
		let { orderNumber, sheetData } = req.body;
		tempData = sheetData;
		res.send({ success: true });
	},

	// 审核盘点单
	'POST /api/stock/order/review': (req, res) => {
		let { orderNumber } = req.body;

		let targetIndex = checkOrderDataSource.findIndex(item => item.numbers === orderNumber);

		if (targetIndex === -1) return res.send({ success: false });

		checkOrderDataSource[targetIndex].auditStatus = auditStatusEnum[1];
		checkOrderDataSource[targetIndex].passed = 1;

		res.send({ success: true });
	},

	// 删除盘点单
	'POST /api/stock/order/delete': (req, res) => {

		let { orderNumber } = req.body;

		let targetIndex = checkOrderDataSource.findIndex(item => item.numbers === orderNumber);

		if (targetIndex === -1) return res.send({ success: false });

		checkOrderDataSource.splice(targetIndex, 1);

		res.send({ success: true });
	}
};
