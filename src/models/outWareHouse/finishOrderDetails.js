function getDetailsFromServer(url,option){
    return new Promise((resolve,reject)=>{
        let xhr=new XMLHttpRequest();
        xhr.open(option,url);
        xhr.send();
        xhr.onreadystatechange=()=>{
            if (xhr.readyState==4&&xhr.status==200){
                let details=xhr.responseText;
                resolve(details);
            }else{
            }
        };
    })
}
export default{
    namespace:"outWarehouseFinishOrderDetails",
    state:{
        data:{}
    },
    effects:{
        *getDetails({finishOrderNumber},{call,put}){
            let url="/getFinishOrderList?details=true&finishOrderNumber="+finishOrderNumber;
            let details=yield call(getDetailsFromServer,url,'GET')
            yield put({type:'returnDetailsToBrowser',payload:details})
        },
    },
    reducers:{
        returnDetailsToBrowser(state,{payload:details}){
            details=JSON.parse(details);
            return {
                data:details
            }
        }
    }
}