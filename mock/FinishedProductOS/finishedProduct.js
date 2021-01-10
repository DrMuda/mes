//成品追溯数据
const orderdata = [
    {
        "fipr_no": "47407864367642",
        "pr_no": "65581622986438",
        "order_no": "86207635",
        "product_name": "俔嘨匝",
        "product_num": "147",
        "specification": "中",
        "unit": "千克"
    },
    {
        "fipr_no": "19048003140742",
        "pr_no": "52812865142847",
        "order_no": "73721682",
        "product_name": "妜凷噣",
        "product_num": "347",
        "specification": "特",
        "unit": "克"
    },
    {
        "fipr_no": "16141721274255",
        "pr_no": "76565414540844",
        "order_no": "84440435",
        "product_name": "姇历垄",
        "product_num": "517",
        "specification": "中",
        "unit": "千克"
    },
    {
        "fipr_no": "73182045287717",
        "pr_no": "64358317671621",
        "order_no": "81117526",
        "product_name": "功園儶",
        "product_num": "267",
        "specification": "大",
        "unit": "个"
    }
]
//原料追溯数据
const yl_details = [
    {
        "fipr_no": "47407864367642",
        "material_code": "h1nd",
        "material_name": "嗤刽",
        "specification": "367",
        "subitem_type": "噶剑",
        "material_properties": "婗做",
        "delivery_warehouse": "京东",
        "supplier": "小米",
        "supplier_orderno": "Ex0Dz"
    },
    {
        "fipr_no": "47407864367642",
        "material_code": "z7oj",
        "material_name": "堎凡宀埲",
        "specification": "334",
        "subitem_type": "墔囙",
        "material_properties": "坹咱",
        "delivery_warehouse": "京东",
        "supplier": "小米",
        "supplier_orderno": "Jg5tW"
    },
    {
        "fipr_no": "73182045287717",
        "material_code": "Ynr3",
        "material_name": "厅嫳姅哋",
        "specification": "199",
        "subitem_type": "嫢儫",
        "material_properties": "圎反",
        "delivery_warehouse": "京东",
        "supplier": "三星",
        "supplier_orderno": "ikGBW"
    },
    {
        "fipr_no": "73182045287717",
        "material_code": "uj6a",
        "material_name": "兴侢婐",
        "specification": "893",
        "subitem_type": "塍孍",
        "material_properties": "姖塠",
        "delivery_warehouse": "京东",
        "supplier": "苹果",
        "supplier_orderno": "5Sw1y"
    },
    {
        "fipr_no": "19048003140742",
        "material_code": "LGOa",
        "material_name": "倹嬇夼",
        "specification": "172",
        "subitem_type": "孡劕",
        "material_properties": "味売",
        "delivery_warehouse": "京东",
        "supplier": "三星",
        "supplier_orderno": "kklHB"
    },
    {
        "fipr_no": "19048003140742",
        "material_code": "AUQ0",
        "material_name": "媬嚾",
        "specification": "542",
        "subitem_type": "塀夃",
        "material_properties": "嚳垅",
        "delivery_warehouse": "淘宝",
        "supplier": "三星",
        "supplier_orderno": "YHE5u"
    },
    {
        "fipr_no": "16141721274255",
        "material_code": "oIj1",
        "material_name": "壌傐",
        "specification": "871",
        "subitem_type": "友啬",
        "material_properties": "俜傝",
        "delivery_warehouse": "淘宝",
        "supplier": "三星",
        "supplier_orderno": "YigQE"
    },
    {
        "fipr_no": "16141721274255",
        "material_code": "J5xu",
        "material_name": "孑姁嬄",
        "specification": "248",
        "subitem_type": "叶嫖",
        "material_properties": "修媀",
        "delivery_warehouse": "淘宝",
        "supplier": "三星",
        "supplier_orderno": "Ui9kq"
    }
]
//生产追溯数据
const sc_details = [
    {
        "fipr_no": "47407864367642",
        "working_procedure_code": "mp5d",
        "working_procedure_name": "工序4",
        "production_equipment": "xx1号机",
        "equipment_code": "QZSs",
        "production_time": "1985-08-03"
    },
    {
        "fipr_no": "47407864367642",
        "working_procedure_code": "6pIH",
        "working_procedure_name": "工序3",
        "production_equipment": "aa1号机",
        "equipment_code": "jHIc",
        "production_time": "1973-04-29"
    },
    {
        "fipr_no": "47407864367642",
        "working_procedure_code": "ZEQI",
        "working_procedure_name": "工序5",
        "production_equipment": "aa2号机",
        "equipment_code": "E0tp",
        "production_time": "2019-08-18"
    },
    {
        "fipr_no": "16141721274255",
        "working_procedure_code": "oPPv",
        "working_procedure_name": "工序3",
        "production_equipment": "xx1号机",
        "equipment_code": "M6Y3",
        "production_time": "1973-10-16"
    },
    {
        "fipr_no": "16141721274255",
        "working_procedure_code": "RLEh",
        "working_procedure_name": "工序4",
        "production_equipment": "cc1号机",
        "equipment_code": "VXEt",
        "production_time": "1999-02-08"
    },
    {
        "fipr_no": "73182045287717",
        "working_procedure_code": "R7J2",
        "working_procedure_name": "工序4",
        "production_equipment": "aa2号机",
        "equipment_code": "4QUU",
        "production_time": "2017-11-29"
    },
    {
        "fipr_no": "73182045287717",
        "working_procedure_code": "uqUg",
        "working_procedure_name": "工序3",
        "production_equipment": "xx1号机",
        "equipment_code": "XEVS",
        "production_time": "2003-05-18"
    },
    {
        "fipr_no": "73182045287717",
        "working_procedure_code": "AmMb",
        "working_procedure_name": "工序5",
        "production_equipment": "xx2号机",
        "equipment_code": "TLGn",
        "production_time": "1985-10-06"
    },
    {
        "fipr_no": "19048003140742",
        "working_procedure_code": "BzuM",
        "working_procedure_name": "工序4",
        "production_equipment": "xx2号机",
        "equipment_code": "iXc3",
        "production_time": "2020-10-24"
    },
    {
        "fipr_no": "19048003140742",
        "working_procedure_code": "B7xh",
        "working_procedure_name": "工序3",
        "production_equipment": "aa1号机",
        "equipment_code": "B36j",
        "production_time": "2006-01-31"
    }
]

export default {
    'get /mock-order': function (req, res) {
        return res.json(
            orderdata
        )
    },
    'get /mock-search-order': function (req, res) {
        let result, name = req.query.product_name, no = req.query.search_no;
        if (name && no) {
            //号码和名字都传入了
            result = orderdata.filter((val) => {
                if (val.product_name === name && (val.fipr_no === no || val.pr_no === no || val.order_no === no))
                    return val
            })
        }
        else if (name) {
            //只有名字
            result = orderdata.filter((val) => {
                if (val.product_name === name)
                    return val
            })
        }
        else if (no) {
            result = orderdata.filter((val) => {
                if (val.fipr_no === no || val.pr_no === no || val.order_no === no)
                    return val
            })
        }
        return res.json(result)
    },
    'get /mock-yl-details': function (req, res) {
        let result = yl_details.filter((val) => {
            if (val.fipr_no === req.query.fipr_no)
                return val
        })
        return res.json(
            result
        )
    },
    'get /mock-sc-details': function (req, res) {
        let result = sc_details.filter((val) => {
            if (val.fipr_no === req.query.fipr_no)
                return val;
        })
        return res.json(
            result
        )
    }
}