let otherOrderList=[
    {
        creator:"李四",
        otherOrderNumber:"111",
        outTime:"2020/12/1",
        department:'department1',
        out:true,
        cargos:[
            {
                cargoId:'materielId1',
                cargoName:'物料1',
                SpecificationModel:'SpecificationModel',
                unit:'斤',
                outSum:'10',
                stock:'100',
                outWarehouse:'仓库1',
            }
        ],
    },
    {
        creator:"张三",
        otherOrderNumber:"222",
        outTime:"2020/12/5",
        department:'department2',
        out:false,
        cargos:[
            {
                cargoId:'materielId2',
                cargoName:'物料2',
                SpecificationModel:'SpecificationModel',
                unit:'瓶',
                outSum:'10',
                stock:'100',
                outWarehouse:'仓库1',
            }
        ],
    }
]
let otherCargoList=[
    {
        cargoId:'materielId1',
        cargoName:'物料1',
        SpecificationModel:'SpecificationModel',
        unit:'斤',
        stock:'100',
        registered:false
    },
    {
        cargoId:'materielId2',
        cargoName:'物料2',
        SpecificationModel:'SpecificationModel',
        unit:'瓶',
        stock:'100',
        registered:false
    },
    {
        cargoId:'materielId3',
        cargoName:'物料3',
        SpecificationModel:'SpecificationModel',
        unit:'个',
        stock:'100',
        registered:true
    },
    {
        cargoId:'materielId4',
        cargoName:'物料4',
        SpecificationModel:'SpecificationModel',
        unit:'盒',
        stock:'100',
        registered:false
    }
]
export default{
    'get /getOtherOrderList': function (req, res) {
        const urlib=require("url");
        var myobj = urlib.parse(req.url,true);
        var details = myobj.query.details;
        var otherOrderNumber  = myobj.query.otherOrderNumber;
        if(details=="true"&&otherOrderNumber!==undefined){
            let detailsOrder={};
            for(let i=0;i<otherOrderList.length;i++){
                if(otherOrderList[i].otherOrderNumber==otherOrderNumber){
                    detailsOrder=otherOrderList[i];
                    detailsOrder.cargos.map((cargo,index)=>{
                        cargo.sequenceNumber=index+1;
                        cargo.key=cargo.cargoId
                        otherCargoList.map((otherCargo)=>{
                            if(cargo.cargoId===otherCargo.cargoId){
                                cargo.cargoName=otherCargo.cargoName
                                cargo.SpecificationModel=otherCargo.SpecificationModel
                                cargo.unit=otherCargo.unit
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
            res.json(otherOrderList);
        }
    },
    'post /postOtherOrderList': function (req, res) {
        let data='';
        req.on('data',function(chunck){
            data+=chunck;
        });
        req.on('end',function(){
            data=JSON.parse(data);
            let order={
                creator:data.creator,
                otherOrderNumber:data.otherOrderNumber,
                outTime:data.outTime,
                department:data.department,
                sum:data.sum,
                out:false,
                cargos:data.selectedCargo
            }
            data.selectedCargo.map((cargo,index)=>{
                for(let i=0;i<otherCargoList.length;i++){
                    if(otherCargoList[i].cargoId==cargo.cargoId){
                        otherCargoList[i].registered=true;
                        break;
                    }
                }
            })
            otherOrderList.push(order);
            res.status(200);
            res.json("已新增出库单");
        })
    },
    'get /getOtherCargoList': function (req, res) {
        res.status(200);
        res.json(otherCargoList);
    },
    'post /checkOtherOrder': function (req, res) {
        let data='';
        req.on('data',(chunck)=>{
            data+=chunck;
        });
        req.on('end',()=>{
            for(let i=0;i<otherOrderList.length;i++){
                if(otherOrderList[i].otherOrderNumber==data){
                    otherOrderList[i].out=true;
                    break;
                }
            }
            res.status(200);
            res.json("已修改出库单信息");
        });
    }
}