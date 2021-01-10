
const otherEntryOrderTemplate = {
    creator: "",
    otherEntryNumber: "",
    entryTime: "",
    entry: true,
    cargos: [],
}
const cargoTemplate = {
    cargoId: '',
    cargoName: '',
    specificationModel: '',
    unit: '',
    entrySum: '',
    entryWarehouse: '',
    reason: ""
}
let otherEntryOrderList = [
    {
        creator: "张三",
        otherEntryNumber: "1",
        entryTime: "2020/12/1",
        entry: true,
        cargos: [
            {
                cargoId: 'cargoId1',
                cargoName: '物料1',
                specificationModel: '规格型号',
                unit: '斤',
                entrySum: '10',
                entryWarehouse: '仓库1',
                reason: "这是入库原因"
            }
        ],
    }
]
let cargoList = [
    {
        cargoId: 'cargoId1',
        cargoName: '物料1',
        specificationModel: '规格型号',
        unit: '斤',
        registered: false
    }
]
const unit = ["斤", "瓶", "盒", "条"]

for (let i = 0; i < 20; i += 1) {
    if (Math.random() > 0.4) {
        let newOrder = JSON.parse(JSON.stringify(otherEntryOrderTemplate))
        newOrder.creator = `制单人${parseInt(Math.random() * 20)}`
        newOrder.otherEntryNumber = `${otherEntryOrderList.length + 1}`
        newOrder.entryTime = `${parseInt(Math.random() * 20 + 2000)}/${parseInt(Math.random() * 12)}/${parseInt(Math.random() * 25)}`
        newOrder.entry = Math.random() > 0.5
        for (let j = 0; j < 5; j += 1) {
            if (Math.random() > 0.5) {
                let newCargo = JSON.parse(JSON.stringify(cargoTemplate))
                newCargo.cargoId = `cargoId${newOrder.cargos.length + 1}`
                newCargo.cargoName = `物料${newOrder.cargos.length + 1}`
                newCargo.specificationModel = `规格型号${parseInt(Math.random() * 20)}`
                newCargo.unit = unit[parseInt(Math.random() * 4)]
                newCargo.entrySum = parseInt(Math.random() * 100)
                newCargo.entryWarehouse = `仓库${parseInt(Math.random() * 100)}`
                newCargo.reason = `入库原因${parseInt(Math.random() * 100)}`
                newOrder.cargos.push(newCargo)
            }
        }
        otherEntryOrderList.push(newOrder)
    }
}

for (let j = 0; j < 10; j += 1) {
    if (Math.random() > 0.3) {
        let newCargo = JSON.parse(JSON.stringify(cargoTemplate))
        newCargo.cargoId = `cargoId${cargoList.length + 1}`
        newCargo.cargoName = `物料${cargoList.length + 1}`
        newCargo.specificationModel = `规格型号${parseInt(Math.random() * 20)}`
        newCargo.unit = unit[parseInt(Math.random() * 4)]
        newCargo.registered = Math.random() > 0.5
        cargoList.push(newCargo)
    }
}

export default {

    // 获取其他入库单列表
    'get /api/depository/entryWarehouse/otherEntryOrder': (req, res) => {
        res.status(200)
        res.send({
            data: otherEntryOrderList,
            success: true
        })
    },

    //获取其他入库中的物料列表
    'get /api/depository/entryWarehouse/otherEntryCargo': (req, res) => {
        res.status(200)
        res.send({
            data: cargoList,
            success: true
        })
    },

    //新增或修改其他入库单
    'post /api/depository/entryWarehouse/otherEntryOrder/edit': (req, res) => {
        let { newOrder } = req.body
        console.log(newOrder)
        if (newOrder) {
            const index = otherEntryOrderList.findIndex((order) => {
                return order.otherEntryNumber === newOrder.otherEntryNumber
            })
            if (index !== -1) {
                otherEntryOrderList[index] = {
                    ...otherEntryOrderList[index],
                    ...newOrder
                }
            } else {
                otherEntryOrderList.push({
                    ...otherEntryOrderTemplate,
                    ...newOrder
                })
            }
            res.status(200)
            res.send({
                data: otherEntryOrderList,
                success: true
            })
            return;
        }
        res.status(200)
        res.send({
            data: otherEntryOrderList,
            success: false
        })
    }
}