import {get_productdata_material,update_productdata_material} from '@/services/ConfigOS/configOS'

export default{
    namespace:'ProductData_materialproperties',
    state:{},
    reducers:{
        init(state, result) {
            if (result.data) {
                const data = {};
                data.materialproperties_data = result.data;
                return data;
            }
        }
    },
    effects:{
        *getMaterial(_, { call, put }) {
            let materialdata = yield call(get_productdata_material);
            yield put({
                type: 'init',
                data: materialdata
            })
        },
        *updateMaterial(_, { call, put }) {
            let materialdata = yield call(update_productdata_material, _.params);
            yield put({
                type: 'init',
                data: materialdata
            })
        }
    }
}