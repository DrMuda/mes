import {get_goodslist,add_putinstorage,add_putinstorage_details} from '@/services/finishedProductOS'

export default{
    namespace:'addPutInStorage',
    state:{},
    reducers:{
        init(state,result){
            if(result.data){
                const data={};
                data.goodslist=result.data;
                return data;
            }
        },
        test(state,result){
            if(result.data){
                const data={};
                data.test=result.data;
                return data;
            }
        }
    },
    effects:{
        *getGoodsList(_,{call,put}){
            let getlist=yield call(get_goodslist);
            yield put({
                type:'init',
                data:getlist
            })
        },
        *addPutInStorage(_,{call,put}){
            let getdata=yield call(add_putinstorage,_.params);
            yield put({
                type:'putInStorage/init',    //获取数据后，给回putinstorage的命名空间处理数据
                data:getdata
            })
        },
        *addPutInStorageDetails(_,{call,put}){
            //添加详情数据，因为详情页是查询的结果，所以这里不返回结果，添加详情数据即可
            let getdata=yield call(add_putinstorage_details,_.params); 
            yield put({
                type:'test',
                data:getdata
            })
        }
    }
}