import { queryFrequencyType, editFrequencyType, delFrequencyType } from '@/services/ConfigOS/configOS';

export default {
	namespace: 'configOS_frameworkConfig_frequencyType',
	state: {
		frequencyTypeList: [],
	},
	reducers: {
		returnResultToBowser(state, { result, field }) {
			if (result.data) {
				state[field] = result.data;
				return state;
			} else {
				return state;
			}
		},
	},
	effects: {
		*getFrequencyTypeList(_, { call, put }) {
			let result = yield call(queryFrequencyType);
			yield put({
				type: 'returnResultToBowser',
				result: result,
				field: 'frequencyTypeList',
			});
		},
	},
};
