import {get_productdata_subitem_type,update_productdata_subitem_type} from '@/services/ConfigOS/configOS'

export default{
    namespace:'ProductData_subitem_type',
    state:{},
    reducers:{
        init(state, result) {
            if (result.data) {
                const data = {};
                data.subitem_type_data = result.data;
                return data;
            }
        }
    },
    effects:{
        *getSubitem(_, { call, put }) {
            let subitemdata = yield call(get_productdata_subitem_type);
            yield put({
                type: 'init',
                data: subitemdata
            })
        },
        *updateSubitem(_, { call, put }) {
            let subitemdata = yield call(update_productdata_subitem_type, _.params);
            yield put({
                type: 'init',
                data: subitemdata
            })
        }
    }
}