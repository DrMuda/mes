import {queryOtherEntryOrder,queryOtherEntryCargo,editOtherEntry} 
    from '@/services/DepositoryOS/EntryWarehouse/otherEntry'

export default{
    namespace:"depositoryOS_entryWarehouse_otherEntry",
    state:{
        otherEntryOrderList:[],
        cargoList:[]
	},
	
    effects: {
		*getOtherEntryOrderList(_, { call, put }) {
			const result = yield call(queryOtherEntryOrder);
			yield put({
				type: 'returnResultToBrowser',
				result,
				// 需要更新的字段
				field: 'otherEntryOrderList',
			});
		},

		*getCargoList(_, { call, put }) {
			const result = yield call(queryOtherEntryCargo);
			yield put({
				type: 'returnResultToBrowser',
				result,
				field: 'cargoList',
			});
		},
		
        *editOtherEntryOrder({data},{call,put}){
            const result = yield call(editOtherEntry,data);
            yield put({
                type:'returnResultToBrowser',
                result,
                field:"otherEntryOrderList"
            })
        }
	},

	reducers: {
		returnResultToBrowser(state, { result, field}) {
			if (result.data) {
				state[field] = result.data;
				return state;
            }
            return state;
		},
	},
}