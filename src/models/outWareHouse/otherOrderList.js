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
    namespace:"outWarehouseOtherOrderList",
    state:{
        data:[]
    },
    effects:{
        *getOtherOrderList({status},{call,put}){
            let url="/getOtherOrderList"
            let list=yield call(getlistFromServer,url,'GET')
            yield put({type:'otherListToBrowser',payload:list,status})
        },
    },
    reducers:{
        otherListToBrowser(state,{payload:list,status}){
            list=strToJson(list);
            let temp=[]
            list.map((data,index)=>{
                data.key=data.otherOrderNumber;
                if(status=="1"){
                    temp.push(data);
                }else if(status=="2"){
                    if(!data.out){
                        temp.push(data);
                    }
                }else if(status=="3"){
                    if(data.out){
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