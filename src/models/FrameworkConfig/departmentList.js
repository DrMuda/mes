import { queryDepartment } from '@/services/ConfigOS/configOS';

export default {
	namespace: 'configOs_frameworkConfig_departmentList',
	state: {
		departmentList: {},
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
		*getDepartmentList(_, { call, put }) {
			const result = yield call(queryDepartment);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'departmentList',
			});
		},
	},
};
