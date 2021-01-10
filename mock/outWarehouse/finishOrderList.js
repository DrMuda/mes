let finishOrderList=[
    {
        creator:"张三",
        finishOrderNumber:"111",
        customerName:"客户1",
        outTime:"2020/12/1",
        saleNumber:"aaa",
        out:true,
        saleOrder:[
            {
                warehouse:'仓库1',
                finishedProductId:'finishedProductId1',
                finishedProductName:"成品1",
                unit:"斤",
                sum:"10",
                deliveredSum:"10",
                thisTimeDeliveredSum:"5",
                SpecificationModel:'SpecificationModel',
                stock:"100"
            }
        ],
    },
    {
        creator:"张三",
        finishOrderNumber:"222",
        customerName:"客户2",
        outTime:"2020/12/5",
        saleNumber:"bbb",
        out:false,
        saleOrder:[
            {
                warehouse:'仓库1',
                finishedProductId:'finishedProductId2',
                finishedProductName:"成品2",
                unit:"盒",
                sum:"20",
                deliveredSum:"10",
                thisTimeDeliveredSum:"5",
                SpecificationModel:'SpecificationModel',
                stock:"100"
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
        SpecificationModel:"SpecificationModel1",
        unit:"斤",
        thisTimeDeliveredSum:"5",
        stock:"100",
        registered:false,
    },
    {
        saleNumber:"saleNumber2",
        warehouse:"仓库2",
        finishedProductId:"finishedProductId2",
        finishedProductName:"成品2",
        sum:"10",
        deliveredSum:"10",
        SpecificationModel:"SpecificationModel2",
        unit:"斤",
        thisTimeDeliveredSum:"5",
        stock:"100",
        registered:false,
    },
]
export default{
    'get /getFinishOrderList': function (req, res) {
        const urlib=require("url");
        var myobj = urlib.parse(req.url,true);
        var details = myobj.query.details;
        var finishOrderNumber  = myobj.query.finishOrderNumber;
        if(details=="true"&&finishOrderNumber!==undefined){
            let detailsOrder={};
            for(let i=0;i<finishOrderList.length;i++){
                if(finishOrderList[i].finishOrderNumber==finishOrderNumber){
                    detailsOrder=finishOrderList[i];
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
            res.json(finishOrderList);
        }
    },
    'post /postFinishOrderList': function (req, res) {
        let data='';
        req.on('data',function(chunck){
            data+=chunck;
        });
        req.on('end',function(){
            data=JSON.parse(data);
            let order={
                creator:data.creator,
                finishOrderNumber:data.finishOrderNumber,
                saleNumber:data.saleNumber,
                customerName:data.customerName,
                outTime:data.outTime,
                out:false,
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
            finishOrderList.push(order);
            res.status(200);
            res.json("已新增出库单");
        })
    },
    'get /outWarehouse/getSaleNumberList': function (req, res) {
        let saleNumberList=[];
        saleOrderList.map((saleOrder)=>{
            if(!saleOrder.registered){
                saleNumberList.push(saleOrder.saleNumber)
            }
        })
        res.status(200);
        res.json(saleNumberList);
    },
    'get /outWarehouse/getSaleOrder': function (req, res) {
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
    'post /checkFinishOrder': function (req, res) {
        let data='';
        req.on('data',(chunck)=>{
            data+=chunck;
        });
        req.on('end',()=>{
            for(let i=0;i<finishOrderList.length;i++){
                if(finishOrderList[i].finishOrderNumber==data){
                    finishOrderList[i].out=true;
                    break;
                }
            }
            res.status(200);
            res.json("已修改出库单信息");
        });
    },
}