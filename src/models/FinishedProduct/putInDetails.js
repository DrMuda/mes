import {search_put_in_details,change_put_in_state} from '@/services/finishedProductOS'

export default {
    namespace: 'putInDetails',
    state: {},
    reducers:{
        init(state,result){
            if(result.data){
                const data={};
                data.putin_details=result.data;
                return data;
            }
        }
    },
    effects:{
        *get_putin_details(_,{call,put}){
            let getdetails=yield call( search_put_in_details,_.params);
            yield put({
                type:'init',
                data:getdetails
            })
        },
        *change_put_in_state(_,{call,put}){
            let changedata=yield call(change_put_in_state,_.params);
            yield put({
                type:'putInStorage/init',    //调用命名空间为putInStorage中的init方法，不加就变成本命名空间的，数据赋值错对象
                data:changedata
            })
        }
    }
}