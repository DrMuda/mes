import strToJson from '../../utils/strToJson'
function getlistFromServer(url,option){
    return new Promise((resolve,reject)=>{
        let xhr=new XMLHttpRequest();
        xhr.open(option,url);
        xhr.send();
        xhr.onreadystatechange=()=>{
            if (xhr.readyState==4&&xhr.status==200){
                let list=xhr.responseText;
                resolve(list);
            }else{
            }
        };
    })
}
export default{
    namespace:'entryWarehouseSaleOrder',
    state:{
        saleNumberList:[],
        saleOrder:{}
    },
    effects:{
        *getSaleNumberList({},{call,put}){
            let url="/getSaleNumberList";
            let list = yield call(getlistFromServer,url,'GET');
            yield put({type:`returnSaleNumberListToBrowser`,payload:list});
        },
        *getSaleOrder({saleNumber},{call,put}){
            let url="/getSaleOrder?saleNumber="+saleNumber;
            let list = yield call(getlistFromServer,url,'GET');
            yield put({type:`returnSaleOrderToBrowser`,payload:list});
        }
    },
    reducers:{
        returnSaleNumberListToBrowser(state,{payload:list}){
            list=strToJson(list);
            return({
                saleOrder:state.saleOrder,
                saleNumberList:list,
            })
        },
        returnSaleOrderToBrowser(state,{payload:saleOrder}){
            saleOrder=JSON.parse(saleOrder);
            return({
                saleNumberList:state.saleNumberList,
                saleOrder:saleOrder
            })
        },
        clear(state){
            return({
                saleNumberList:state.saleNumberList,
                saleOrder:null
            })
        }
    }
}