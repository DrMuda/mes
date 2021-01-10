import {
	queryFrequency,
	queryWorkingGroup,
	queryFrequencyType,
	queryWorkshopList,
} from '@/services/TeamGroupOS/teamDetails';

export default {
	namespace: 'TeamDetails',
	state: {
		frequency: {},
		workingGroup: {},
		frequencyTypeList: [],
		workshopList: [],
	},
	effects: {
		*getFrequency(_, { call, put }) {
			const result = yield call(queryFrequency);
			yield put({ type: 'returnResultToBrowser', payload: result, field: 'frequency' });
		},
		*getWorkingGroup(_, { call, put }) {
			const result = yield call(queryWorkingGroup);
			yield put({ type: 'returnResultToBrowser', payload: result, field: 'workingGroup' });
		},
		*getFrequencyTypeList(_, { call, put }) {
			const result = yield call(queryFrequencyType);
			yield put({
				type: 'returnResultToBrowser',
				payload: result,
				field: 'frequencyTypeList',
			});
		},
		*getWorkshopList(_, { call, put }) {
			const result = yield call(queryWorkshopList);
			yield put({ type: 'returnResultToBrowser', payload: result, field: 'workshopList' });
		},
	},

	reducers: {
		returnResultToBrowser(state, { payload: result, field }) {
			if (result.success) {
				state[field] = result.data;
			}
			return state;
		},
	},
};
