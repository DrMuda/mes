let departmentList = {
	id: '',
	name: 'root',
	children: [
		{
			id: '1',
			name: '生产部',
			children: [
				{
					id: '1-1',
					name: '梳棉',
					children: [
						{
							id: '1-1-1',
							name: '梳棉一组',
							children: [],
						},
						{
							id: '1-1-2',
							name: '梳棉二组',
							children: [],
						},
					],
				},
				{
					id: '1-2',
					name: '并条',
					children: [
						{
							id: '1-2-1',
							name: '并条一组',
							children: [],
						},
					],
				},
			],
		},
	],
};
for (let i = 1; i < 10; i++) {
	if (Math.random() > 0.3) {
		appendDepartment(departmentList); //生成一级部门
		for (let j = 0; j < 10; j++) {
			if (Math.random() > 0.3) {
				let length1 = departmentList.children.length;
				appendDepartment(departmentList.children[length1 - 1]); //生成二级部门
				for (let k = 0; k < 10; k++) {
					if (Math.random() > 0.3) {
						let length2 = departmentList.children[length1 - 1].children.length;
						appendDepartment(
							departmentList.children[length1 - 1].children[length2 - 1],
						); //生成三级部门
					}
				}
			}
		}
	}
}
//追加子部门
//parent父级部门
function appendDepartment(parent, child) {
	//如果有指定子部门
	if (child) {
		child.id = parent.id + '-' + parent.children.length + 1;
		parent.children.push(child);
	} else {
		let id;
		if (parent.id) {
			id = parent.id + '-' + (parent.children.length + 1);
		} else {
			id = parent.children.length + 1 + '';
		}
		let name = '部门' + id;
		parent.children.push({
			id,
			name,
			children: [],
		});
	}
}
export default {
	//获取部门列表
	'get /api/config/department': (req, res) => {
		res.send({
			data: departmentList,
			success: true,
		});
	},
	//删除一个部门
	'post /api/config/department/del': (req, res) => {
		let { id } = req.body;
		id = id.split('-');
		let parentDepartment = departmentList;
		for (let level = 0; level < id.length; level++) {
			let index = parentDepartment.children.findIndex((department) => {
				return department.id.split('-')[level] == id[level];
			});
			if (level + 1 == id.length && index != -1) {
				parentDepartment.children.splice(index, 1);
			} else {
				if (index != -1) {
					parentDepartment = parentDepartment.children[index];
				} else {
					break;
				}
			}
		}
		res.send({
			data: departmentList,
			success: true,
		});
	},
	//增加或一个编辑部门
	'post /api/config/department/edit': (req, res) => {
		try {
			let { id, name } = req.body;
			if (id == '') {
				appendDepartment(departmentList, {
					name: name,
					children: [],
				});
			} else {
				id = id.split('-');
				let parentDepartment = departmentList;
				for (let level = 0; level < id.length; level++) {
					let index = parentDepartment.children.findIndex((department) => {
						return department.id.split('-')[level] == id[level];
					});
					if (level + 1 == id.length && index != -1) {
						appendDepartment(parentDepartment.children[index], {
							name: name,
							children: [],
						});
					} else {
						if (index != -1) {
							parentDepartment = parentDepartment.children[index];
						} else {
							break;
						}
					}
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
};
