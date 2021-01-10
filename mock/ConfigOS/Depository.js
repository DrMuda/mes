let depositoryTypeList = [
	{
		id: '1',
		name: '一楼仓',
	},
	{
		id: '2',
		name: '二楼仓',
	},
	{
		id: '3',
		name: '原料仓库',
	},
	{
		id: '4',
		name: '三楼仓',
	},
	{
		id: '5',
		name: 'VMII仓',
	},
	{
		id: '6',
		name: '自有仓',
	},
];
let directorList = [
	{
		id: '1',
		name: '张三',
		telNumber: '12345678910',
	},
];
for (let i = 0; i < 20; i++) {
	directorList.push({
		id: directorList.length + 1 + '',
	});
}
let depositoryList = [
	{
		depositoryTypeId: '1',
		depositoryId: '1',
		depositoryName: '广东仓',
		depositoryAddress: '广东',
		directorName: '张三',
		directorTelNumber: '12345678910',
		enable: true,
	},
];
for (let i = 0; i < 30; i++) {
	depositoryList.push({
		depositoryTypeId: parseInt(Math.random() * 6) + 1 + '',
		depositoryId: depositoryList.length + 1 + '',
		depositoryName: '仓库名' + parseInt(Math.random() * 30),
		depositoryAddress: '仓库地址' + parseInt(Math.random() * 30),
		directorName: '负责人' + parseInt(Math.random() * 100),
		directorTelNumber:
			parseInt(Math.random() * 1000000) + '' + parseInt(Math.random() * 100000),
		enable: Math.random() > 0.5,
	});
}
let storageList = [
	{
		depositoryId: '1',
		storageId: '1',
		storageName: '库位名称',
		shelfId: '架号1',
	},
];
for (let i = 0; i < 30; i++) {
	storageList.push({
		depositoryId: parseInt(Math.random() * 30 + 1) + '',
		storageId: storageList.length + 1 + '',
		storageName: '库位名' + parseInt(Math.random() * 30),
		shelfId: parseInt(Math.random() * 30) + '',
	});
}
export default {
	//获取仓库类型列表
	'get /api/config/depository/depositoryTypeList': function (req, res) {
		res.status(200);
		res.send({ data: depositoryTypeList });
	},
	//删除某个仓库类型
	'post /api/config/depository/depositoryTypeList/del': function (req, res) {
		let depositoryTypeId = req.query.depositoryTypeId;
		if (depositoryTypeId) {
			//由于要遍历depositoryTypeList，并且修改，为了防止出问题
			//使用JSON深拷贝depositoryTypeList一个新的数组
			let next = depositoryTypeList.map((depositoryType) => {
				return JSON.parse(JSON.stringify(depositoryType));
			});
			depositoryTypeList.map((depositoryType, index) => {
				if (depositoryTypeId == depositoryType.id) {
					next.splice(index, 1);
				}
			});
			depositoryTypeList = next;
			res.status(200);
			res.send({ data: '删除成功' });
		} else {
			res.status(500);
			res.json({ data: '删除失败' });
		}
	},
	//增加一个仓库类型
	'post /api/config/depository/depositoryTypeList/add': function (req, res) {
		let depositoryTypeName = req.query.depositoryTypeName;
		if (depositoryTypeName) {
			depositoryTypeList.push({
				id: depositoryTypeList.length + 1 + '',
				name: depositoryTypeName,
			});
			res.status(200);
			res.json({ data: '添加成功' });
		} else {
			res.status(500);
			res.json({ data: '添加失败' });
		}
	},
	//修改某个仓库类型
	'post /api/config/depository/depositoryTypeList/edit': function (req, res) {
		let depositoryTypeName = req.query.depositoryTypeName;
		let depositoryTypeId = req.query.depositoryTypeId;
		if (depositoryTypeName) {
			let next = depositoryTypeList.map((depositoryType) => {
				return JSON.parse(JSON.stringify(depositoryType));
			});
			depositoryTypeList.map((depositoryType, index) => {
				if (depositoryTypeId == depositoryType.id) {
					next[index].name = depositoryTypeName;
				}
			});
			depositoryTypeList = next;
			res.status(200);
			res.send({ data: '修改成功' });
		} else {
			res.status(500);
			res.json({ data: '修改失败' });
		}
	},

	//获取仓库列表
	'get /api/config/depository/depositoryList': function (req, res) {
		res.status(200);
		res.send({ data: depositoryList });
	},
	//增加一个仓库
	'post /api/config/depository/depositoryList/add': function (req, res) {
		let depository = JSON.parse(req.body.data);
		if (depository) {
			depositoryList.push(depository);
			res.status(200);
			res.send('添加成功');
		} else {
			res.status(500);
			res.send('添加失败');
		}
	},
	//删除某个仓库
	'post /api/config/depository/depositoryList/del': function (req, res) {
		let depositoryId = req.query.depositoryId;
		if (depositoryId) {
			let next = depositoryList.map((depository) => {
				return JSON.parse(JSON.stringify(depository));
			});
			depositoryList.map((depository, index) => {
				if (depositoryId == depository.depositoryId) {
					next.splice(index, 1);
				}
			});
			depositoryList = next;
			res.status(200);
			res.send({ data: '删除成功' });
		} else {
			res.status(500);
			res.send('删除成功');
		}
	},
	//修改某个仓库
	'post /api/config/depository/depositoryList/edit': function (req, res) {
		let newDepository = JSON.parse(req.body.data);

		if (newDepository) {
			let index = depositoryList.findIndex((depository) => {
				return depository.depositoryId === newDepository.depositoryId;
			});
			if (index != -1) {
				depositoryList[index] = { ...depositoryList[index], ...newDepository };
			} else {
				depositoryList.push(newDepository);
			}
			res.status(200);
			res.send('修改成功');
		} else {
			res.status(500);
			res.send('修改失败');
		}
	},

	//获取库位列表
	'get /api/config/depository/storageList': function (req, res) {
		res.status(200);
		res.send({ data: storageList });
	},
	//删除某个库位
	'post /api/config/depository/storageList/del': function (req, res) {
		let storageId = req.query.storageId;
		if (storageId) {
			let next = storageList.map((storage) => {
				return JSON.parse(JSON.stringify(storage));
			});
			storageList.map((storage, index) => {
				if (storageId == storage.storageId) {
					next.splice(index, 1);
				}
			});
			storageList = next;
			res.status(200);
			res.send({ data: '删除成功' });
		} else {
			res.status(500);
			res.send('删除成功');
		}
	},
	//增加一个库位
	'post /api/config/depository/storageList/add': function (req, res) {
		let storage = JSON.parse(req.body.data);
		if (storage) {
			storageList.push(storage);
			res.status(200);
			res.send('添加成功');
		} else {
			res.status(500);
			res.send('添加失败');
		}
	},
	//修改某个库位
	'post /api/config/depository/storageList/edit': function (req, res) {
		let newStorage = JSON.parse(req.body.data);
		if (newStorage) {
			storageList = storageList.map((storage) => {
				if (storage.storageId === newStorage.storageId) {
					return newStorage;
				} else {
					return storage;
				}
			});
			res.status(200);
			res.send('修改成功');
		} else {
			res.status(500);
			res.send('修改失败');
		}
	},
};
