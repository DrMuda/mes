let returnOrderList=[
    {
        creator:"张三",
        returnOrderNumber:"111",
        customerName:"客户1",
        returnTime:"2020/12/1",
        saleNumber:"aaa",
        orderSum:"2",
        entry:true,
        saleOrder:[
            {
                warehouse:'仓库1',
                finishedProductId:'finishedProductId1',
                finishedProductName:"成品1",
                unit:"斤",
                sum:"10",
                deliveredSum:"10",
                returnSum:"2",
                SpecificationModel:'SpecificationModel',
                returnReason:"拍多了"
            }
        ],
    },
    {
        creator:"张三",
        returnOrderNumber:"222",
        customerName:"客户2",
        returnTime:"2020/12/5",
        saleNumber:"bbb",
        orderSum:"2",
        entry:false,
        saleOrder:[
            {
                warehouse:'仓库1',
                finishedProductId:'finishedProductId2',
                finishedProductName:"成品2",
                unit:"盒",
                sum:"20",
                deliveredSum:"10",
                returnSum:"2",
                SpecificationModel:'SpecificationModel',
                returnReason:"质量有问题"
            }
        ],
    }
]
let saleOrderList=[
    {
        saleNumber:"saleNumber1",
        warehouse:"仓库1",
        finishedProductId:"finishedProductId1",
        finishedProductName:"成品1",
        sum:"20",
        deliveredSum:"10",
        returnReason:"质量有问题",
        SpecificationModel:"SpecificationModel1",
        unit:"斤",
        registered:false,
    },
    {
        saleNumber:"saleNumber2",
        warehouse:"仓库2",
        finishedProductId:"finishedProductId2",
        finishedProductName:"成品2",
        sum:"10",
        deliveredSum:"10",
        returnReason:"拍多了",
        SpecificationModel:"SpecificationModel2",
        unit:"斤",
        registered:false,
    },
]
export default{
    'get /getReturnOrderList': function (req, res) {
        const urlib=require("url");
        var myobj = urlib.parse(req.url,true);
        var details = myobj.query.details;
        var returnOrderNumber  = myobj.query.returnOrderNumber;
        if(details=="true"&&returnOrderNumber!==undefined){
            let detailsOrder={};
            for(let i=0;i<returnOrderList.length;i++){
                if(returnOrderList[i].returnOrderNumber==returnOrderNumber){
                    detailsOrder=returnOrderList[i];
                    detailsOrder.saleOrder.map((product)=>{
                        product.key=product.finishedProductId
                    })
                    break;
                }
            }
            res.status(200);
            res.json(detailsOrder);
        }else{
            res.status(200);
            res.json(returnOrderList);
        }
    },
    'post /postReturnOrderList': function (req, res) {
        let data='';
        req.on('data',function(chunck){
            data+=chunck;
        });
        req.on('end',function(){
            data=JSON.parse(data);
            let order={
                creator:data.creator,
                returnOrderNumber:data.returnOrderNumber,
                saleNumber:data.saleNumber,
                customerName:data.customerName,
                returnTime:data.returnTime,
                entry:false,
                saleOrder:data.selectedSaleOrder
            }
            data.selectedSaleOrder.map((saleOrder,index)=>{
                for(let i=0;i<saleOrderList.length;i++){
                    if(saleOrderList[i].finishedProductId==saleOrder.finishedProductId){
                        saleOrderList[i].registered=true;
                        break;
                    }
                }
            })
            returnOrderList.push(order);
            res.status(200);
            res.json("已新增退库单");
        })
    },
    'get /getSaleNumberList': function (req, res) {
        let saleNumberList=[];
        saleOrderList.map((saleOrder)=>{
            if(!saleOrder.registered){
                saleNumberList.push(saleOrder.saleNumber)
            }
        })
        res.status(200);
        res.json(saleNumberList);
    },
    'get /getSaleOrder': function (req, res) {
        const urlib=require("url");
        var myobj = urlib.parse(req.url,true);
        var saleNumber  = myobj.query.saleNumber;
        let i=0;
        for(i=0;i<saleOrderList.length;i++){
            if(saleOrderList[i].saleNumber===saleNumber){
                res.status(200);
                res.json(saleOrderList[i]);
                break;
            }
        }
        if(i>=saleOrderList.length){
            res.status(500);
            res.json("没有该销售单");
        }
    },
    'post /checkReturnOrder': function (req, res) {
        let data='';
        req.on('data',(chunck)=>{
            data+=chunck;
        });
        req.on('end',()=>{
            for(let i=0;i<returnOrderList.length;i++){
                if(returnOrderList[i].returnOrderNumber==data){
                    returnOrderList[i].entry=true;
                    break;
                }
            }
            res.status(200);
            res.json("已修改入库单信息");
        });
    },
}