import {getMaterialRequisition} from '@/services/ProductionOS/productionOS'

export default {
    namespace: 'material_requisition',
    state: {},
    reducers: {
        init(state, result) {
            if (result.data) {
                const data = { ...state };
                data.material_requisition = result.data;
                console.log('返回的数据',data);
                return data      //返回获取的数据
            }
        }
    },
    effects: {
        *getMaterialRequisition(_, { call, put }) {
            let data = yield call(getMaterialRequisition);
            yield put({
                type: 'init',
                data: data
            })
        }
    }
}