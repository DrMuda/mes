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
    namespace:'entryWarehouseReceiveCargo',
    state:{
        data:[],
    },
    effects:{
        *getReceiveCargoList({},{call,put}){
            let url="/getReceiveCargoList";
            let list = yield call(getlistFromServer,url,'GET');
            yield put({type:`returnListToBrowser`,payload:list});
        }
    },
    reducers:{
        returnListToBrowser(state,{payload:list}){
            list=strToJson(list);
            list.map((data,index)=>{
                data.key=data.cargoId;
                return data
            })
            return({
                data:list,
            })
        }
    }
}