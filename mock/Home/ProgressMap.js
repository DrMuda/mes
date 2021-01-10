const orderDetailData = {
    startTime: '2021-01-01',
    data: [
        { count: 98, desc: '订单总数' },
        { count: 5, desc: '已完成订单数量' },
        { count: 4, desc: '生产中订单数量' },
        { count: 89, desc: '未生产订单数量' },
    ]
}

const orderProgressData = [
    { percent: 0.8 ,  completionTime: '2021-01-31' },
    { percent: 0.71 , completionTime: '2021-02-10' },
    { percent: 0.5 ,  completionTime: '2021-02-15' },
    { percent: 0.32 , completionTime: '2021-02-20' },
]


module.exports = {
    orderDetailData,
    orderProgressData
};