import {
    queryWorkingProcedure,
    delWorkingProcedure,
    editWorkingProcedure
} from '@/services/ConfigOS/configOS'

export default{
    namespace:"configOS_produceConfig_workingProcedure",
    state:{
        workingProcedureList:[]
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
		*getWorkingProcedureList(_, { call, put }) {
			const result = yield call(queryWorkingProcedure);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'workingProcedureList',
			});
		},

		*delWorkingProcedure({data},{call,put}){
			const result = yield call(delWorkingProcedure,data);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'workingProcedureList',
			});
		},
		
		*editWorkingProcedure({data},{call,put}){
			const result = yield call(editWorkingProcedure,data);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'workingProcedureList',
			});
		}
	},
}