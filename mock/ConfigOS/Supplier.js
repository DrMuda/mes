let supplier_type = [
    {
        id: '5',
        supplier_type: '外发加工商',
    },
    {
        id: '3',
        supplier_type: '原料供应商',
    },
    {
        id: '9',
        supplier_type: '废料回收商',
    }
]

let supplier_level = [
    {
        id: '2',
        supplier_level: 'A'
    },
    {
        id: '4',
        supplier_level: 'B'
    },
    {
        id: '6',
        supplier_level: 'C'
    }
]

let supplier_list = [
    {
        id: '3',
        supplier_name: '麦当当',
        supplier_phone: '13821531288',
        supplier_address: '广东省广州市',
        supplier_type: '外发加工商',
        supplier_level: 'A'
    },
    {
        id: '6',
        supplier_name: '肯打打',
        supplier_phone: '18032162239',
        supplier_address: '广东省东莞市',
        supplier_type: '原料供应商',
        supplier_level: 'B'
    },
    {
        id: '10',
        supplier_name: '必客客',
        supplier_phone: '13821531288',
        supplier_address: '广东省肇庆市',
        supplier_type: '外发加工商',
        supplier_level: 'C'
    }
]

export default {
    'get /mock-supplier-type': function (req, res) {
        return res.json(supplier_type)
    },
    'post /mock-supplier-type': function (req, res) {
        //更新数据,通过req.query[0]来判断更新、删除、新增操作
        const getdata = JSON.parse(req.query[1])
        let change_type;
        if (req.query[0] === 'update') {  //更新
            supplier_type.map(val => {
                if (val.id === getdata.id) {
                    change_type = val.supplier_type;
                    val.supplier_type = getdata.supplier_type;
                }
            })
            if (change_type) {
                supplier_list.map(val => {
                    if (val.supplier_type === change_type) {
                        val.supplier_type = getdata.supplier_type;
                    }
                })
            }
        }
        else if (req.query[0] === 'delete') {  //删除
            supplier_type = supplier_type.filter(val => {
                if (val.id !== getdata.id)
                    return val
            })
        }
        else if (req.query[0] === 'add') {      //增加
            supplier_type = supplier_type.concat(getdata)
        }
        return res.json(supplier_type)
    },
    'get /mock-supplier-level': function (req, res) {
        return res.json(supplier_level)
    },
    'post /mock-supplier-level': function (req, res) {
        //更新数据,通过req.query[0]来判断更新、删除、新增操作
        const getdata = JSON.parse(req.query[1]);
        let change_level;
        if (req.query[0] === 'update') {  //更新
            supplier_level.map(val => {
                if (val.id === getdata.id) {
                    change_level = val.supplier_level;
                    val.supplier_level = getdata.supplier_level;
                }
            })
            if (change_level) {
                supplier_list.map(val => {
                    if (val.supplier_level === change_level) {
                        val.supplier_level = getdata.supplier_level;
                    }
                })
            }
        }
        else if (req.query[0] === 'delete') {  //删除
            supplier_level = supplier_level.filter(val => {
                if (val.id !== getdata.id)
                    return val
            })
        }
        else if (req.query[0] === 'add') {      //增加
            supplier_level = supplier_level.concat(getdata)
        }
        return res.json(supplier_level)
    },
    'get /mock-supplier-list': function (req, res) {
        if (!req.query.id) {
            return res.json(supplier_list)
        }
    },
    'post /mock-supplier-list': function (req, res) {
        //更新数据,通过req.query[0]来判断更新、删除、新增操作
        const getdata = JSON.parse(req.query[1]);
        if (req.query[0] === 'update') {  //更新
            supplier_list.map(val => {
                if (val.id === getdata.id) {
                    val.supplier_name = getdata.supplier_name;
                    val.supplier_phone = getdata.supplier_phone;
                    val.supplier_address = getdata.supplier_address;
                    val.supplier_type = getdata.supplier_type;
                    val.supplier_level = getdata.supplier_level;
                }
            })
        }
        else if (req.query[0] === 'delete') {  //删除
            supplier_list = supplier_list.filter(val => {
                if (val.id !== getdata.id)
                    return val
            })
        }
        else if (req.query[0] === 'add') {      //增加
            supplier_list = supplier_list.concat(getdata)
        }
        else if (req.query[0] === 'search') {   //查询
            let search_result = [];
            if (getdata.supplier_name && getdata.supplier_phone && getdata.supplier_type && getdata.supplier_level) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_name === getdata.supplier_name && val.supplier_phone === getdata.supplier_phone && val.supplier_type === getdata.supplier_type && val.supplier_level === getdata.supplier_level)
                        return val;
                })
            }
            else if (getdata.supplier_name && getdata.supplier_phone && getdata.supplier_type) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_name === getdata.supplier_name && val.supplier_phone === getdata.supplier_phone && val.supplier_type === getdata.supplier_type)
                        return val;
                })
            }
            else if (getdata.supplier_name && getdata.supplier_phone && getdata.supplier_level) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_name === getdata.supplier_name && val.supplier_phone === getdata.supplier_phone && val.supplier_level === getdata.supplier_level)
                        return val;
                })
            }
            else if (getdata.supplier_name && getdata.supplier_type && getdata.supplier_level) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_name === getdata.supplier_name && val.supplier_type === getdata.supplier_type && val.supplier_level === getdata.supplier_level)
                        return val;
                })
            }
            else if (getdata.supplier_phone && getdata.supplier_type && getdata.supplier_level) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_phone === getdata.supplier_phone && val.supplier_type === getdata.supplier_type && val.supplier_level === getdata.supplier_level)
                        return val;
                })
            }
            else if (getdata.supplier_name && getdata.supplier_phone) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_name === getdata.supplier_name && val.supplier_phone === getdata.supplier_phone)
                        return val;
                })
            }
            else if (getdata.supplier_name && getdata.supplier_type) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_name === getdata.supplier_name && val.supplier_type === getdata.supplier_type)
                        return val;
                })
            }
            else if (getdata.supplier_phone && getdata.supplier_type) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_phone === getdata.supplier_phone && val.supplier_type === getdata.supplier_type)
                        return val;
                })
            }
            else if (getdata.supplier_name && getdata.supplier_level) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_name === getdata.supplier_name && val.supplier_level === getdata.supplier_level)
                        return val;
                })
            }
            else if (getdata.supplier_phone && getdata.supplier_level) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_phone === getdata.supplier_phone && val.supplier_level === getdata.supplier_level)
                        return val;
                })
            }
            else if (getdata.supplier_type && getdata.supplier_level) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_type === getdata.supplier_type && val.supplier_level === getdata.supplier_level)
                        return val;
                })
            }
            else if (getdata.supplier_name) {
                search_result = supplier_list.filter(val => {
                    if (val.supplier_name === getdata.supplier_name)
                        return val;
                })
            }
            else if(getdata.supplier_phone){
                search_result=supplier_list.filter(val=>{
                    if(val.supplier_phone===getdata.supplier_phone)
                        return val;
                })
            }
            else if(getdata.supplier_type){
                search_result=supplier_list.filter(val=>{
                    if(val.supplier_type===getdata.supplier_type)
                        return val;
                })
            }
            else if(getdata.supplier_level){
                search_result=supplier_list.filter(val=>{
                    if(val.supplier_level===getdata.supplier_level)
                        return val;
                })
            }

            return res.json(search_result)
        }
        return res.json(supplier_list)
    },


}