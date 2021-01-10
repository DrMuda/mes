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
    namespace:"entryWarehouseReturnOrderList",
    state:{
        data:[]
    },
    effects:{
        *getReturnOrderList({status},{call,put}){
            let url="/getReturnOrderList"
            let list=yield call(getlistFromServer,url,'GET')
            yield put({type:'returnListToBrowser',payload:list,status})
        },
    },
    reducers:{
        returnListToBrowser(state,{payload:list,status}){
            list=strToJson(list);
            let temp=[]
            list.map((data,index)=>{
                data.key=data.returnOrderNumber;
                if(status=="1"){
                    temp.push(data);
                }else if(status=="2"){
                    if(!data.entry){
                        temp.push(data);
                    }
                }else if(status=="3"){
                    if(data.entry){
                        temp.push(data);
                    }
                }
            })
            return {
                data:temp
            };
        }
    }
}