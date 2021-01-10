let unit = [
    {
        id: '1',
        unit: '件'
    },
    {
        id: '2',
        unit: '套'
    },
    {
        id: '3',
        unit: '个'
    }
]

let material = [
    {
        id: '1',
        material_properties: '自制'
    },
    {
        id: '2',
        material_properties: '外购'
    },
    {
        id: '3',
        material_properties: '赠品'
    }
]

let subitem_type = [
    {
        id: '1',
        subitem_type: '原料'
    },
    {
        id: '2',
        subitem_type: '备件'
    },
    {
        id: '3',
        subitem_type: '成品部件'
    }
]

let material_fp_type = [
    {
        id: '1',
        material_finishedproduct_type: '物料'
    },
    {
        id: '2',
        material_finishedproduct_type: '成品'
    }
]

let material_list = [
    {
        id: '1',
        material_finishedproduct_type: "成品",
        material_code: 'QB2L10',
        material_name: '玻璃水',
        specification: '2L*10',
        subitem_type: '成品部件',
        material_properties: '外购',
        unit: '瓶',
        min_stock_num: '20',
        max_stock_num: '100',
        reference_cost_price: '55',
        warehouse: '1-广东仓',
        loss_num: '1'
    },
    {
        id: '2',
        material_finishedproduct_type: "物料",
        material_code: 'LL001L',
        material_name: '牛津手套',
        specification: 'L',
        subitem_type: '成品部件',
        material_properties: '外购',
        unit: '个',
        min_stock_num: '50',
        max_stock_num: '500',
        reference_cost_price: '66',
        warehouse: '2-广东仓',
        loss_num: '1'
    },
    {
        id: '3',
        material_finishedproduct_type: "物料",
        material_code: 'LS001',
        material_name: '工业手套',
        specification: 'S',
        subitem_type: '成品部件',
        material_properties: '外购',
        unit: '个',
        min_stock_num: '10',
        max_stock_num: '100',
        reference_cost_price: '50',
        warehouse: '1-广东仓',
        loss_num: '1',
    }
]

for(let i=1230;i<1250;i++){
    let ee={
        id:i,
        material_finishedproduct_type: "物料",
        material_code: 'LS001',
        material_name: '工业手套',
        specification: 'S',
        subitem_type: '成品部件',
        material_properties: '外购',
        unit: '个',
        min_stock_num: '10',
        max_stock_num: '100',
        reference_cost_price: '50',
        warehouse: '1-广东仓',
        loss_num: '1',
    }
    material_list.push(ee)
}
for(let i=1255;i<1275;i++){
    let ee={
        id:i,
        material_finishedproduct_type: "成品",
        material_code: 'LS001',
        material_name: '工业手套',
        specification: 'S',
        subitem_type: '成品部件',
        material_properties: '外购',
        unit: '个',
        min_stock_num: '10',
        max_stock_num: '100',
        reference_cost_price: '50',
        warehouse: '1-广东仓',
        loss_num: '1',
    }
    material_list.push(ee)
}

export default {
    'get /mock-productdata-unit': function (req, res) {
        return res.json(unit)
    },
    'post /mock-productdata-unit': function (req, res) {
        //更新数据,通过req.query[0]来判断更新、删除、新增操作
        const getdata = JSON.parse(req.query[1])
        let change_unit;
        if (req.query[0] === 'delete') {  //删除
            unit = unit.filter(val => {
                if (val.id !== getdata.id) {
                    return val;
                }
            })
        }
        else if (req.query[0] === 'add') { //添加
            unit = unit.concat(getdata)
        }
        else if (req.query[0] === 'update') { //更新编辑
            unit.map(val => {
                if (val.id === getdata.id) {
                    change_unit = val.unit;
                    val.unit = getdata.unit;
                }
            })
            if (change_unit) {  //更新列表中的原数据
                material_list.map(val => {
                    if (val.unit === change_unit) {
                        val.unit = getdata.unit;
                    }
                })
            }
        }

        return res.json(unit)
    },
    'get /mock-productdata-material': function (req, res) {
        return res.json(material)
    },
    'post /mock-productdata-material': function (req, res) {
        //更新数据,通过req.query[0]来判断更新、删除、新增操作
        const getdata = JSON.parse(req.query[1])
        let change_material;
        if (req.query[0] === 'delete') {  //删除
            material = material.filter(val => {
                if (val.id !== getdata.id) {
                    return val;
                }
            })
        }
        else if (req.query[0] === 'add') { //添加
            material = material.concat(getdata)
        }
        else if (req.query[0] === 'update') { //更新编辑
            material.map(val => {
                if (val.id === getdata.id) {
                    change_material = val.material_properties;
                    val.material_properties = getdata.material_properties;
                }
            })
            if (change_material) {  //更新列表中的原数据
                material_list.map(val => {
                    if (val.material_properties === change_material) {
                        val.material_properties = getdata.material_properties;
                    }
                })
            }
        }
        return res.json(material)
    },
    'get /mock-productdata-subitem-type': function (req, res) {
        return res.json(subitem_type)
    },
    'post /mock-productdata-subitem-type': function (req, res) {
        //更新数据,通过req.query[0]来判断更新、删除、新增操作
        const getdata = JSON.parse(req.query[1])
        let change_subitem_type;
        if (req.query[0] === 'delete') {  //删除
            subitem_type = subitem_type.filter(val => {
                if (val.id !== getdata.id) {
                    return val;
                }
            })
        }
        else if (req.query[0] === 'add') { //添加
            subitem_type = subitem_type.concat(getdata)
        }
        else if (req.query[0] === 'update') { //更新编辑
            subitem_type.map(val => {
                if (val.id === getdata.id) {
                    change_subitem_type = val.subitem_type;
                    val.subitem_type = getdata.subitem_type;
                }
            })
            if (change_subitem_type) {  //更新列表中的原数据
                material_list.map(val => {
                    if (val.subitem_type === change_subitem_type) {
                        val.subitem_type = getdata.subitem_type;
                    }
                })
            }
        }
        return res.json(subitem_type)
    },
    'get /mock-productdata-material-fproduct-type': function (req, res) {
        return res.json(material_fp_type)
    },
    'post /mock-productdata-material-fproduct-type': function (req, res) {
        //更新数据,通过req.query[0]来判断更新、删除、新增操作
        const getdata = JSON.parse(req.query[1])
        let change_material_fp_type;
        if (req.query[0] === 'delete') {  //删除
            material_fp_type = material_fp_type.filter(val => {
                if (val.id !== getdata.id) {
                    return val;
                }
            })
        }
        else if (req.query[0] === 'add') { //添加
            material_fp_type = material_fp_type.concat(getdata)
        }
        else if (req.query[0] === 'update') { //更新编辑
            material_fp_type.map(val => {
                if (val.id === getdata.id) {
                    change_material_fp_type = val.material_finishedproduct_type;
                    val.material_finishedproduct_type = getdata.material_finishedproduct_type;
                }
            })
            if (change_material_fp_type) {  //更新列表中的原数据
                // supplier_list.map(val => {
                //     if (val.supplier_type === change_type) {
                //         val.supplier_type = getdata.supplier_type;
                //     }
                // })
            }
        }
        return res.json(material_fp_type)
    },
    'get /mock-producudata-material-list': function (req, res) {
        return res.json(material_list)
    },
    'post /mock-producudata-material-list': function (req, res) {
        //更新数据,通过req.query[0]来判断更新、删除、新增操作
        const getdata = JSON.parse(req.query[1])
        if (req.query[0] === 'delete') {  //删除
            material_list = material_list.filter(val => {
                if (val.id !== getdata.id) {
                    return val;
                }
            })
        }
        else if (req.query[0] === 'add') { //添加
            for (let i in req.query) {
                let flag = true;
                if (i !== '0') {
                    material_list.map(val => {
                        if (val.id == JSON.parse(req.query[i]).id) {
                            flag = false;
                        }
                    })
                }
                if (i !== '0' && flag) {
                    material_list = material_list.concat(JSON.parse(req.query[i]))
                }
            }
        }
        else if (req.query[0] === 'update') { //更新编辑,
            material_list.map(val => {
                if (val.id === getdata.id) {
                    val.material_code = getdata.material_code,
                        val.material_name = getdata.material_name,
                        val.specification = getdata.specification,
                        val.subitem_type = getdata.subitem_type,
                        val.material_properties = getdata.material_properties,
                        val.unit = getdata.unit,
                        val.min_stock_num = getdata.min_stock_num,
                        val.max_stock_num = getdata.max_stock_num,
                        val.reference_cost_price = getdata.reference_cost_price,
                        val.loss_num = getdata.loss_num,
                        val.warehouse = getdata.warehouse
                }
            })
        }
        return res.json(material_list)
    }
}