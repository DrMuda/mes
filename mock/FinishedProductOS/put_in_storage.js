//成品入库数据
const putinstorage_data = [
    {
        "put_in_no": "36016945",
        "fipr_no": "75767251681893",
        "put_in_time": "1976-05-05",
        "put_in_num": "235",
        "put_in_state": 'false',
        "document_maker":'张三'
    },
    {
        "put_in_no": "71739158",
        "fipr_no": "83787271656621",
        "put_in_time": "2013-06-18",
        "put_in_num": "557",
        "put_in_state": 'true',
        "document_maker":'李四'
    },
    {
        "put_in_no": "65792883",
        "fipr_no": "82431981436318",
        "put_in_time": "2008-12-02",
        "put_in_num": "525",
        "put_in_state": 'true',
        "document_maker":'王五'
    },
    {
        "put_in_no": "62813076",
        "fipr_no": "67984228455455",
        "put_in_time": "1975-07-21",
        "put_in_num": "527",
        "put_in_state": 'false',
        "document_maker":'刘六'
    }
]

//成品入库详情数据
let putinstorage_details =[
    {
        "put_in_no":'36016945',
        "finished_product_code":'GTR',
        "finished_product_name":'成品1号',
        "specification":'ACF5',
        "unit":'个',
        "put_in_num":'234',
        "put_in_position":'广州北仓'
    },
    {
        "put_in_no":'36016945',
        "finished_product_code":'GTR-S',
        "finished_product_name":'成品2号',
        "specification":'ACF3',
        "unit":'个',
        "put_in_num":'168',
        "put_in_position":'广州北仓'
    },
    {
        "put_in_no":'71739158',
        "finished_product_code":'TR',
        "finished_product_name":'成品3号',
        "specification":'ACF5',
        "unit":'个',
        "put_in_num":'234',
        "put_in_position":'广州南仓'
    },
    {
        "put_in_no":'71739158',
        "finished_product_code":'TR',
        "finished_product_name":'成品3号',
        "specification":'ACF5',
        "unit":'件',
        "put_in_num":'134',
        "put_in_position":'广州南仓'
    },
    {
        "put_in_no":'65792883',
        "finished_product_code":'BTW',
        "finished_product_name":'成品4号',
        "specification":'ACF5',
        "unit":'个',
        "put_in_num":'648',
        "put_in_position":'广州东仓'
    },
    {
        "put_in_no":'62813076',
        "finished_product_code":'BTW-w',
        "finished_product_name":'成品5号',
        "specification":'ACF5',
        "unit":'桶',
        "put_in_num":'142',
        "put_in_position":'广州东仓'
    }
]

//选择货物列表数据
let goodslist_data=[
    {
        "finished_product_code":'FP-C1',
        "finished_product_name":'成品1号',
        "specification":'型号X',
        "unit":'个'
    },
    {
        "finished_product_code":'FP-C2',
        "finished_product_name":'成品2号',
        "specification":'型号J',
        "unit":'件'
    },
    {
        "finished_product_code":'FP-C3',
        "finished_product_name":'成品3号',
        "specification":'型号Z',
        "unit":'条'
    },
    {
        "finished_product_code":'FP-C4',
        "finished_product_name":'成品4号',
        "specification":'型号X',
        "unit":'片'
    }
]



export default{
    'get /mock-instorage': function (req, res) {
        return res.json(
            putinstorage_data
        )
    },
    'get /mock-search-instorage': function (req, res) {
        let result, putIn_no = req.query.put_in_no, fipr_no = req.query.fipr_no, date = req.query.put_in_time;
        if (putIn_no && fipr_no && date) {
            result = putinstorage_data.filter((val) => {
                if (val.put_in_no === putIn_no && val.fipr_no === fipr_no && val.put_in_time === date) {
                    return val;
                }
            })
        }
        else if (putIn_no && fipr_no) {
            result = putinstorage_data.filter((val) => {
                if (val.put_in_no === putIn_no && val.fipr_no === fipr_no)
                    return val;
            })
        }
        else if (putIn_no && date) {
            result = putinstorage_data.filter((val) => {
                if (val.put_in_no === putIn_no && val.put_in_time === date)
                    return val
            })
        }
        else if (fipr_no && date) {
            result = putinstorage_data.filter((val) => {
                if (val.fipr_no === fipr_no && val.put_in_time === date)
                    return val;
            })
        }
        else if (putIn_no) {
            result = putinstorage_data.filter((val) => {
                if (val.put_in_no === putIn_no)
                    return val;
            })
        }
        else if (fipr_no) {
            result = putinstorage_data.filter((val) => {
                if (val.fipr_no === fipr_no)
                    return val;
            })
        }
        else if (date) {
            result = putinstorage_data.filter((val) => {
                if (val.put_in_time === date)
                    return val;
            })
        }
        return res.json(
            result
        )
    },
    'get /mock-search-instorage-details': function(req,res){
        let result,putin_no=req.query.put_in_no;
        result=putinstorage_details.filter((val)=>{
            if(putin_no===val.put_in_no)
                return val;
        })
        return res.json(
            result
        );
    },
    'post /mock-putin-storage-changeState':function(req,res){
        //修改入库状态
        let result,putin_no=req.query.put_in_no;
        result=putinstorage_data.filter((val)=>{
            if(putin_no===val.put_in_no){
                val.put_in_state='true';
            }
            return val;
        })
        return res.json(result)
    },
    'get /mock-goodslist':function(req,res){
        return res.json(
            goodslist_data
        )
    },
    'post /mock-instorage':function (req,res){
        putinstorage_data.push(req.query)
        return res.json(
            putinstorage_data
        )
    },
    'post /mock-search-instorage-details': function(req,res){
        for(let i in req.query){
            putinstorage_details=putinstorage_details.concat(JSON.parse(req.query[i]))
        }
    },
}