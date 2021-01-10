const yieldData = require('./YieldMap');
const stockData = require('./StockMap');
const equipmentWorkData = require('./EquipmentWorkMap');
const faultData = require('./FaultMap');
const efficiencyMapData = require('./EfficiencyMap');
const progressMapData = require('./ProgressMap');
const noticeListData = require('./NoticeList');


module.exports = {
    'GET /api/home': (req, res) => {
        console.log(666);
        res.send({
            data: {
                yieldData,
                stockData,
                environmentData: {
                    temperature: Math.random() * 42 | 0,
                    humidity: Math.random() * 100 | 0,
                    difference: Math.random() * 100 | 0,
                },
                equipmentWorkData,
                faultData,
                efficiencyMapData,
                progressMapData,
                noticeListData
            },
            success: true
        });
    }
}