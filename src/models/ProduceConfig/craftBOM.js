import {queryCraftBOM,
    delCraftBOM,
    editCraftBOM} from '@/services/ConfigOS/configOS'

export default{
    namespace:"configOS_produceConfig_craftBOM",
    state:{
        craftBOM:[]
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
		*getCraftBOM(_, { call, put }) {
			const result = yield call(queryCraftBOM);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'craftBOM',
			});
		},

		*delCraftBOM({data},{call,put}){
			const result = yield call(delCraftBOM,data);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'craftBOM',
			});
		},
		
		*editCraftBOM({data},{call,put}){
			const result = yield call(editCraftBOM,data);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'craftBOM',
			});
		}
	},
}