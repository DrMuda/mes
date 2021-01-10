import { get_productdata_unit,update_productdata_unit } from '@/services/ConfigOS/configOS'

export default {
    namespace: 'ProductData_unit',
    state: {},
    reducers: {
        init(state, result) {
            if (result.data) {
                const data = {};
                data.unit_data = result.data;
                return data;
            }
        }
    },
    effects: {
        *getUnit(_, { call, put }) {
            let unitdata = yield call(get_productdata_unit);
            yield put({
                type: 'init',
                data: unitdata
            })
        },
        *updateUnit(_, { call, put }) {
            let unitdata = yield call(update_productdata_unit, _.params);
            yield put({
                type: 'init',
                data: unitdata
            })
        }
    }
}