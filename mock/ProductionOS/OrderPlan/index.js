const scheduleStateMap = {
    unProductive: { stateCode: 0, desc: '未生产', stateKey: 'unProductive' },
    notStarted: { stateCode: 1, desc: '未开始', stateKey: 'notStarted' },
    production: { stateCode: 2, desc: '生产中', stateKey: 'production' },
    pause: { stateCode: 3, desc: '暂停', stateKey: 'pause' },
    stop: { stateCode: 4, desc: '终止', stateKey: 'stop' },
    completed: { stateCode: 5, desc: '已完成', stateKey: 'completed' },
}

let sourceData = [];

// 添加模拟数据
for (let i = 1; i <= 50; i++) {
    sourceData.push({
        key: i,
        orderNumber: `${Date.now() + i}`,
        orderCode: `X${Date.now() + i}`,
        productName: `笔记本 ${i}`,
        orders: (Math.random() * 999) | 0,
        model: `XXX型号`,
        endDate: '2020-12-25',
        scheduleState: (Math.random() * 10) % 2 | 0,
        productionStatus: scheduleStateMap[Object.keys(scheduleStateMap)[((Math.random() * 10) % 6 | 0)]],
        completions: {
            current: (Math.random() * 1000) % 999 | 0,
            total: 1000,
        },
        contrast: {
            sctualOutput: (Math.random() * 1000) % 999 | 0,
            goalOutput: (Math.random() * 1000) % 999 | 0,
        },
        planCreateDate: '2020-12-01',
        planStartDate: '2020-12-01',
        planFinishDate: '2020-12-01',
        createTime: '2020-12-01'
    });
}


module.exports = {
    // 检索订单计划
    'GET /api/production/orderplan': (req, res) => {

        let { currentSchedule, orderNumber, orderProductName } = req.query;
        currentSchedule = Number(currentSchedule);


        let listData = [...sourceData];

        if (orderNumber) {
            listData = listData.filter(item => item.orderNumber === orderNumber);
        }

        if (orderProductName) {
            listData = listData.filter(item => item.productName === orderProductName);
        }

        if ([0, 1].includes(currentSchedule)) {
            listData = listData.filter(item => item.scheduleState === currentSchedule);
        }

        res.send({
            data: listData,
            success: true
        })
    },

    // 修改订单计划的生产状态
    'POST /api/production/orderplan/productionstatus': (req, res) => {
        let { stateKey, orderNumber, orderCode } = req.body;

        if (!/^(pause|stop)$/.test(stateKey)) return res.send({ success: false });

        sourceData = sourceData.map(item => {
            if (item.orderNumber === orderNumber && item.orderCode === orderCode) {
                item.productionStatus = scheduleStateMap[stateKey];
            }
            return item;
        });

        res.send({ success: true });
    },

    // 获取订单详细信息
    'GET /api/production/orderplan/detail': (req, res) => {
        let { orderNumber } = req.query;
        // 计划信息
        let data = sourceData.find(item => item.orderNumber === orderNumber);

        // 数据图
        let chartData = [
            {
                orderId: '梳棉',
                type: '计划',
                DateRange: [1, 3],
                month: [12, 12],
                demand: 100,
            },
            {
                orderId: '梳棉',
                type: '实际',
                DateRange: [1, 2],
                month: [12, 12],
                demand: 150,
            },
            // ---------------------
            {
                orderId: '并条',
                type: '计划',
                DateRange: [3, 6],
                month: [12, 12],
                demand: 200,
            },
            {
                orderId: '并条',
                type: '实际',
                DateRange: [3, 5],
                month: [12, 12],
                demand: 250,
            },
            // -------------------
            {
                orderId: '粗纱',
                type: '计划',
                DateRange: [6, 9],
                month: [12, 12],
                demand: 100,
            },
            {
                orderId: '粗纱',
                type: '实际',
                DateRange: [6, 8],
                month: [12, 12],
                demand: 90,
            },
            // // -------------------
            {
                orderId: '细纱',
                type: '计划',
                DateRange: [9, 11],
                month: [12, 12],
                demand: 300,
            },
            {
                orderId: '细纱',
                type: '实际',
                DateRange: [9, 10],
                month: [12, 12],
                demand: 215,
            },
            // // --------------------
            {
                orderId: '络筒',
                type: '计划',
                DateRange: [11, 15],
                month: [12, 12],
                demand: 222,
            },
            {
                orderId: '络筒',
                type: '实际',
                DateRange: [11, 14],
                month: [12, 12],
                demand: 666,
            },
        ];

        // 生产信息
        let productionInfo = {
            productionNumber: `${Date.now()}`,
            productionBatchNumber: `${Date.now()}`,
            materialsRequired: 'XXX',
            processList: []
        }

        for (let i = 0; i < 50; i++) {
            productionInfo.processList.push({
                key: `processList-${i}`,
                processNumber: `${Date.now()}`,
                processName: `工序 ${i}`,
                numbers: (Math.random() * 100) | 0,
                detailed: 'C01、C02、C03',
                startDate: '2020-12-01',
                finishDate: '2020-12-31'
            })
        }

        res.send({
            data,
            chartData,
            productionInfo,
            success: true
        })
    }
}