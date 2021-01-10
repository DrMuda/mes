import {getdetails_yl,getdetails_sc} from '@/services/finishedProductOS'

export default{
    namespace:'traceDetails',
    state:{
    },
    reducers:{
        inityl(state,result){
            if(result.data){
                const data={};     
                data.trace_yl=result.data;
                return data     
            }
        },
        initsc(state,result){
            if(result.data){
                const data={...state};    
                data.trace_sc=result.data;
                return data      
            }
        }
        
    },
    effects:{
        *get_trace_yl(_,{ call ,put }){
            let getdetails=yield call(getdetails_yl,_.params)
            yield put({
                type:'inityl',
                data:getdetails
            })
        },
        *get_trace_sc(_,{ call ,put }){
            let getdetails=yield call(getdetails_sc,_.params)
            yield put({
                type:'initsc',
                data:getdetails
            })
        }

    }
}