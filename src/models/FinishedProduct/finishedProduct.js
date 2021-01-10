import {getFinishedProduct,searchFinishedProduct} from '@/services/finishedProductOS'

export default {
    namespace: 'finishedProduct',
    state: {
    },
    reducers:{
        init(state,result){
            if(result.data){
                const data={};      //因为result.data是纯数组，后面datasource就难以通过this.props调用，所以在外面套一层order来调用
                data.order=result.data;
                return data      //返回获取的数据
            }
        }
    },
    effects:{
        *initorders(_,{call,put}){
            let getdata=yield call(getFinishedProduct);
            yield put({
                type:'init',
                data:getdata
            })
        },
        *searchorders(_,{call,put}){
            let getdata=yield call(searchFinishedProduct,_.params);
            yield put({
                type:'init',
                data:getdata
            })
        }
    }
}