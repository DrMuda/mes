import { getput_in_storage, search_put_in_storage} from '@/services/finishedProductOS'

export default {
    namespace: 'putInStorage',
    state: {
    },
    reducers: {
        init(state, result) {
            if (result.data) {
                const data = {};      //因为result.data是纯数组，后面datasource就难以通过this.props调用，所以在外面套一层order来调用
                data.put_in_all = result.data;
                //通过map，或者filter过滤出是否入库的数据
                data.put_in_true = data.put_in_all.filter((val) => {
                    if (val.put_in_state==='true') {
                        return val
                    }
                })
                data.put_in_false = data.put_in_all.filter((val) => {
                    if (val.put_in_state==='false') {
                        return val
                    }
                })
                return data      //返回获取的数据
            }
        }
    },
    effects:{
        *get_put_in_data(_,{call ,put }){
            let getdata=yield call(getput_in_storage);
            yield put({
                type:'init',
                data:getdata
            })
        },
        *search_put_in(_,{call , put}){
            let getdata=yield call(search_put_in_storage,_.params);
            yield put({
                type:'init',
                data:getdata
            })
        }
    }
}