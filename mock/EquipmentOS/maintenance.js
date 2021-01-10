const maintainStateMap = {
    0: '预防维护',
    1: '定期维护',
    2: '故障维护',
}

const handleStateMap = {
    0: '待处理',
    1: '处理中',
    2: '已处理',
}

const directorArr = [
    { id: 'zs', name: '张三' },
    { id: 'ls', name: '李四' },
    { id: 'ww', name: '王五' },
    { id: 'zl', name: '赵六' },
]

const tableListDataSource = [];

for (let i = 0; i < 10; i += 1) {
    tableListDataSource.push({
        key: i + '',
        maintainNumber: Date.now(),
        equipmentNumber: Date.now(),
        maintenanceType: maintainStateMap[Math.floor(Math.random() * 10) % 3],
        equipmentName: '设备 A' + i,
        plannedMaintenanceTime: new Date().toLocaleDateString().toString(),
        actualMaintenanceTime: new Date().toLocaleDateString().toString(),
        address: 'XX位置',
        content: '更换零件',
        status: handleStateMap[Math.floor(Math.random() * 10) % 3],
        director: 'XXX',
    });
}




module.exports = {
    // 获取维护列表
    'GET /api/equipment/maintenance': (req, res) => {

        let { maintainState, handleState } = req.query;

        let maintenanceList = tableListDataSource.slice();

        if (maintainStateMap[maintainState]) {
            maintenanceList = maintenanceList.filter(item => {
                return item.maintenanceType === maintainStateMap[maintainState];
            })
        }

        if (handleStateMap[handleState]) {
            maintenanceList = maintenanceList.filter(item => {
                return item.status === handleStateMap[handleState];
            })
        }

        res.send({
            data: maintenanceList,
            success: true
        })
    },
    // 获取负责人列表
    'GET /api/equipment/maintenance/directors': (req, res) => {
        res.send({
            data: directorArr,
            success: true
        })
    },
    // 派单、转单
    'POST /api/equipment/maintenance': (req, res) => {
        let { type, director, key } = req.body;

        let targetIndex = tableListDataSource.findIndex(item => item.key === key);

        if (targetIndex === -1) return res.send({ success: false });

        let targetDirector = directorArr.find(item => item.id === director);

        if (Object.keys(targetDirector).length === 0) return res.send({ success: false });

        tableListDataSource[targetIndex].director = targetDirector.name;

        // if (type === '0') {
        //     // 派单
        // } else if (type === '1') {
        //     // 转单
        // }
        res.send({ success: true })
    },
    // 添加维护
    'POST /api/equipment/maintenance/add': (req, res) => {
        let {
            maintenanceType, // 维护类型
            equipmentNumber, // 设备编号
            plannedMaintenanceTime, // 计划维护时间
            content // 维护内容
        } = req.body;

        let randomNumber = Date.now();

        tableListDataSource.unshift({
            key: randomNumber + '',
            maintainNumber: randomNumber,
            equipmentNumber,
            maintenanceType: maintainStateMap[maintenanceType],
            equipmentName: '设备 XXX',
            plannedMaintenanceTime,
            actualMaintenanceTime: new Date().toLocaleDateString().toString(),
            address: 'XX位置',
            content,
            status: handleStateMap[0],
            director: 'XXX',
        });

        res.send({ success: true });

    },
    // 完成维护
    'POST /api/equipment/maintenance/complete': (req, res) => {
        let { key, maintainNumber } = req.body;

        let targetIndex = tableListDataSource.findIndex(item => item.key === key && item.maintainNumber === maintainNumber);

        if (targetIndex === -1) return res.send({ success: false });

        tableListDataSource[targetIndex].status = handleStateMap[2];

        res.send({ success: true });
    },
    // 查看详情
    'GET /api/equipment/maintenance/detail': (req, res) => {
        let { id } = req.query;
        let detail = tableListDataSource.find(item => item.key === id);
        res.send({
            data: detail,
            type: detail.maintenanceType,
            success: true
        })
    }
}