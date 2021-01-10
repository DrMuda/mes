import { get_productdata_material_list, update_productdata_material_list, get_productdata_subitem_type, get_productdata_material, get_productdata_unit, get_productdata_material_fproduct_type } from '@/services/ConfigOS/configOS'

export default {
    namespace: 'ProductData_material_list',
    state: {},
    reducers: {
        init(state, result) {
            if (result.data) {
                const data = { ...state };
                data.material_list = result.data;
                return data;
            }
        },
        init_subitemtype(state, result) {
            if (result.data) {
                const data = { ...state };
                data.subitemtype_data = result.data;
                data.select_subitem = {};
                result.data.map(val => {
                    data.select_subitem[val.subitem_type] = { text: val.subitem_type }
                })
                return data;
            }
        },
        init_material_properties(state, result) {
            if (result.data) {
                const data = { ...state };
                data.material_properties_data = result.data;
                data.select_material_properties = {};
                result.data.map(val => {
                    data.select_material_properties[val.material_properties] = { text: val.material_properties }
                })
                return data;
            }
        },
        init_unit(state, result) {
            if (result.data) {
                const data = { ...state };
                data.unit_data = result.data;
                data.select_unit={};
                result.data.map(val => {
                    data.select_unit[val.unit] = { text: val.unit }
                })
                return data;
            }
        },
        init_material_fp_type(state, result) {
            if (result.data) {
                const data = { ...state };
                data.material_fp_type = result.data;
                return data;
            }
        }

    },
    effects: {
        *getMaterialList(_, { call, put }) {
            let materiallist = yield call(get_productdata_material_list);
            yield put({
                type: 'init',
                data: materiallist
            })
        },
        *updateMaterialList(_, { call, put }) {
            let subitemdata = yield call(update_productdata_material_list, _.params);
            yield put({
                type: 'init',
                data: subitemdata
            })
        },
        *getSubitemType(_, { call, put }) {
            let data = yield call(get_productdata_subitem_type);
            yield put({
                type: 'init_subitemtype',
                data: data
            })
        },
        *getMaterialProperties(_, { call, put }) {
            let data = yield call(get_productdata_material);
            yield put({
                type: 'init_material_properties',
                data: data
            })
        },
        *getUnit(_, { call, put }) {
            let data = yield call(get_productdata_unit);
            yield put({
                type: 'init_unit',
                data: data
            })
        },
        *getMaterialFPType(_, { call, put }) {
            let data = yield call(get_productdata_material_fproduct_type);
            yield put({
                type: 'init_material_fp_type',
                data: data
            })
        }
    }
}