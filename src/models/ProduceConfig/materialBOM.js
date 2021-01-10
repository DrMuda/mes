import {
    queryMaterialBOM,
    delMaterialBOM,
    editMaterialBOM
} from '@/services/ConfigOS/configOS'

export default{
    namespace:"configOS_produceConfig_materialBOM",
    state:{
        materialBOM:[]
    },
    
	reducers: {
		returnResultToBowser(state, { result, field }) {
			if (result.data) {
				state[field] = result.data;
			}
			return state;
		},
    },
    
	effects: {
		*getMaterialBOM(_, { call, put }) {
			const result = yield call(queryMaterialBOM);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'materialBOM',
			});
		},

		*delMaterialBOM({data},{call,put}){
			const result = yield call(delMaterialBOM,data);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'materialBOM',
			});
		},
		
		*editMaterialBOM({data},{call,put}){
			const result = yield call(editMaterialBOM,data);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'materialBOM',
			});
		}
	},
}