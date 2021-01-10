import {get_productdata_material_fproduct_type ,update_productdata_material_fproduct_type } from '@/services/ConfigOS/configOS'

export default {
    namespace: 'ProductData_material_fproduct_type',
    state: {},
    reducers: {
        init(state, result) {
            if (result.data) {
                const data = {};
                data.material_fproduct_type = result.data;
                return data;
            }
        }
    },
    effects: {
        *getMaterial_fp_type(_, { call, put }) {
            let material_fproduct_type = yield call(get_productdata_material_fproduct_type);
            yield put({
                type: 'init',
                data: material_fproduct_type
            })
        },
        *updateMaterial_fp_type(_, { call, put }) {
            let material_fproduct_type = yield call(update_productdata_material_fproduct_type, _.params);
            yield put({
                type: 'init',
                data: material_fproduct_type
            })
        }
    }
}