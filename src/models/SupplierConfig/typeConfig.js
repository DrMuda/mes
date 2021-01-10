import { get_supplier_typedata, update_supplier_typedata } from '@/services/ConfigOS/configOS'

export default {
    namespace: 'supplier_type',
    state: {},
    reducers: {
        init(state, result) {
            if (result.data) {
                const data = {};
                data.type_data = result.data;
                return data;
            }
        }
    },
    effects: {
        *getType(_, { call, put }) {
            let typedata = yield call(get_supplier_typedata);
            yield put({
                type: 'init',
                data: typedata
            })
        },
        *updateType(_, { call, put }) {
            let typedata = yield call(update_supplier_typedata, _.params);
            yield put({
                type: 'init',
                data: typedata
            })
        }
    }
}