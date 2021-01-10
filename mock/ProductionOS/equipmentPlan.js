// 设备明细
let equipmentDetails = {
    listHead: ['设备编码', { title: '设备名称', onclick: true }, , '设备型号'],
    listData: [],
};
// 当前订单
let CurrentOrder = {
    listHead: ['任务单号', '计划产量', '开工日', '完工日'],
    listData: [],
};
// 后续订单
let ordersContinuously = {
    listHead: ['任务单号', '计划产量', '开工日', '完工日'],
    listData: [],
};
// 设备详细信息
let equipmentDetailCollection = [];

// 计划日历
let calendarDate = {
    1: [
        { content: '40支 800锭' },
        { content: '50支 700锭' },
        { content: '60支 600锭' },
    ],
    15: [
        { content: '40支 800锭' },
        { content: '50支 700锭' },
        { content: '60支 600锭' },
    ],
    18: [
        { content: '40支 800锭' },
        { content: '50支 700锭' },
        { content: '60支 600锭' },
    ],
    24: [
        { content: '40支 800锭' },
        { content: '50支 700锭' },
        { content: '60支 600锭' },
    ],
}

// 计划日历-订单列表
let calendarOrderList = [
    {
        orderId: 2017130305,
        productName: '普梳纱',
        number: '40支',
        yield: '800锭',
        progress: 25,
    },
    {
        orderId: 2017130305,
        productName: '普梳纱',
        number: '50支',
        yield: '600锭',
        progress: 50,
    },
    {
        orderId: 2017130305,
        productName: '普梳纱',
        number: '60支',
        yield: '400锭',
        progress: 75,
    },
];

for (let i = 0; i < 10; i++) {

    // 添加设备明细数据
    equipmentDetails.listData.push({
        id: i,
        list: ['XXXX', 'XX设备', 'XX型号']
    })

    // 添加当前订单数据
    CurrentOrder.listData.push({
        id: `current-order-${i}`,
        list: [Date.now(), '生条1000斤', '2020-12-11', '2020-12-12']
    })

    // 添加后续订单数据
    ordersContinuously.listData.push({
        id: `orders-continuously-${i}`,
        list: [Date.now(), '生条1000斤', '2020-12-11', '2020-12-12']
    })

    // 添加设备详情数据
    equipmentDetailCollection.push({
        id: i,
        euipmentName: '梳棉机C0' + i,
        belong: '梳棉',
        position: 'C区-6排-11列',
        euipmentModel: 'XXXXXXX',
    })
}

module.exports = {
    // 设备计划页加载数据
    'GET /api/production/plan': (req, res) => {
        res.send({
            data: {
                equipmentDetails,
                CurrentOrder,
                ordersContinuously
            },
            success: true
        });
    },
    // 获取设备详细信息
    'GET /api/production/detail/:id': (req, res) => {
        let id = req.params.id | 0;

        let data = equipmentDetailCollection.find(item => {
            return item.id === id
        });

        let chartData = [
            {
                orderId: '订单：0001',
                type: '计划',
                DateRange: [1, 3],
                month: [12, 12],
                demand: 100,
            },
            {
                orderId: '订单：0001',
                type: '实际',
                DateRange: [1, 2],
                month: [12, 12],
                demand: 150,
            },
            // ---------------------
            {
                orderId: '订单：0002',
                type: '计划',
                DateRange: [3, 6],
                month: [12, 12],
                demand: 200,
            },
            {
                orderId: '订单：0002',
                type: '实际',
                DateRange: [3, 5],
                month: [12, 12],
                demand: 250,
            },
            // -------------------
            {
                orderId: '订单：0003',
                type: '计划',
                DateRange: [6, 9],
                month: [12, 12],
                demand: 100,
            },
            {
                orderId: '订单：0003',
                type: '实际',
                DateRange: [6, 8],
                month: [12, 12],
                demand: 90,
            },
            // // -------------------
            {
                orderId: '订单：0004',
                type: '计划',
                DateRange: [9, 11],
                month: [12, 12],
                demand: 300,
            },
            {
                orderId: '订单：0004',
                type: '实际',
                DateRange: [9, 10],
                month: [12, 12],
                demand: 215,
            },
            // // --------------------
            {
                orderId: '订单：0005',
                type: '计划',
                DateRange: [11, 15],
                month: [12, 12],
                demand: 222,
            },
            {
                orderId: '订单：0005',
                type: '实际',
                DateRange: [11, 14],
                month: [12, 12],
                demand: 666,
            },
            // // --------------------
            {
                orderId: '订单：0006',
                type: '计划',
                DateRange: [15, 19],
                month: [12, 12],
                demand: 123,
            },
            {
                orderId: '订单：0006',
                type: '实际',
                DateRange: [15, 18],
                month: [12, 12],
                demand: 321,
            },
            // // --------------------
            {
                orderId: '订单：0007',
                type: '计划',
                DateRange: [21, 25],
                month: [12, 12],
                demand: 456,
            },
            {
                orderId: '订单：0007',
                type: '实际',
                DateRange: [21, 26],
                month: [12, 12],
                demand: 654,
            },
            // // --------------------
            {
                orderId: '订单：0008',
                type: '计划',
                DateRange: [27, 30],
                month: [12, 12],
                demand: 15,
            },
            {
                orderId: '订单：0008',
                type: '实际',
                DateRange: [27, 30],
                month: [12, 12],
                demand: 10,
            },
        ];

        res.send({
            data: { data, chartData } || {},
            success: true
        });
    },
    // 获取计划日历
    'GET /api/production/calendar': (req, res) => {

        res.send({
            data: calendarDate,
            success: true
        })
    },
    // 获取计划日历-订单列表
    'GET /api/production/calendar/list': (req, res) => {
        let { year, month, date } = req.query;

        res.send({
            year,
            month,
            date,
            data: calendarOrderList,
            success: true
        })
    }
}