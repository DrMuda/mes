let receiveOrderList=[
    {
        creator:"张三",
        receiveOrderNumber:"111",
        supplierNumber:"supplier111",
        supplierName:"供应商1",
        receiveTime:"2020/12/1",
        entry:true,
        cargos:[
            {
                sum:"2",
                warehouse:'仓库1',
                cargoId:'materielId1',
            }
        ]
    },
    {
        creator:"李四",
        receiveOrderNumber:"222",
        supplierNumber:"supplier111",
        supplierName:"供应商2",
        receiveTime:"2020/12/5",
        entry:false,
        cargos:[
            {
                sum:"2",
                warehouse:'仓库2',
                cargoId:'materielId2',
            }
        ]
    }
]
let receiveCargoList=[
    {
        cargoId:'materielId1',
        cargoName:'物料1',
        SpecificationModel:'SpecificationModel',
        registered:false,
        unit:"斤"
    },
    {
        cargoId:'materielId2',
        cargoName:'物料2',
        SpecificationModel:'SpecificationModel',
        registered:false,
        unit:"瓶"
    },
    {
        cargoId:'materielId3',
        cargoName:'物料3',
        SpecificationModel:'SpecificationModel',
        registered:true,
        unit:"盒"
    },
    {
        cargoId:'materielId4',
        cargoName:'物料4',
        SpecificationModel:'SpecificationModel',
        registered:false,
        unit:"个"
    }
]
export default{
    'get /getReceiveOrderList': function (req, res) {
        const urlib=require("url");
        var myobj = urlib.parse(req.url,true);
        var details = myobj.query.details;
        var receiveOrderNumber  = myobj.query.receiveOrderNumber;
        if(details=="true"&&receiveOrderNumber!==undefined){
            let detailsOrder={};
            for(let i=0;i<receiveOrderList.length;i++){
                if(receiveOrderList[i].receiveOrderNumber==receiveOrderNumber){
                    detailsOrder=receiveOrderList[i];
                    detailsOrder.cargos.map((cargo,index)=>{
                        cargo.sequenceNumber=index+1;
                        cargo.key=cargo.cargoId
                        receiveCargoList.map((receiveCargo)=>{
                            if(cargo.cargoId===receiveCargo.cargoId){
                                cargo.cargoName=receiveCargo.cargoName
                                cargo.SpecificationModel=receiveCargo.SpecificationModel
                                cargo.unit=receiveCargo.unit
                            }
                        })
                        return cargo
                    })
                    break;
                }
            }
            res.status(200);
            res.json(detailsOrder);
        }else{
            res.status(200);
            res.json(receiveOrderList);
        }
    },
    'post /postReceiveOrderList': function (req, res) {
        let data='';
        req.on('data',function(chunck){
            data+=chunck;
        });
        req.on('end',function(){
            data=JSON.parse(data);
            let order={
                creator:data.creator,
                receiveOrderNumber:data.receiveOrderNumber,
                supplierNumber:data.supplierNumber,
                supplierName:data.supplierName,
                receiveTime:data.receiveTime,
                entry:false,
                cargos:data.selectedCargo
            }
            data.selectedCargo.map((cargo,index)=>{
                for(let i=0;i<receiveCargoList.length;i++){
                    if(receiveCargoList[i].cargoId==cargo.cargoId){
                        receiveCargoList[i].registered=true;
                        break;
                    }
                }
            })
            receiveOrderList.push(order);
            res.status(200);
            res.json("已新增入库单");
        })
    },
    'get /getReceiveCargoList': function (req, res) {
        res.status(200);
        res.json(receiveCargoList);
    },
    'post /checkReceiveOrder': function (req, res) {
        let data='';
        req.on('data',(chunck)=>{
            data+=chunck;
        });
        req.on('end',()=>{
            for(let i=0;i<receiveOrderList.length;i++){
                if(receiveOrderList[i].receiveOrderNumber==data){
                    receiveOrderList[i].entry=true;
                    break;
                }
            }
            res.status(200);
            res.json("已修改入库单信息");
        });
    }
}