import strToJson from '../../utils/strToJson';
function getListFromServer(url, option) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open(option, url);
		xhr.send();
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4 && xhr.status == 200) {
				let list = xhr.responseText;
				resolve(list);
			} else {
			}
		};
	});
}
export default {
	namespace: 'UserList',
	state: {
		userList: [],
		newUserList: [],
		record: {},
		groupList: [],
		performanceList: [],
	},
	effects: {
		*getUserList({}, { call, put }) {
			let url = '/getUserList';
			let list = yield call(getListFromServer, url, 'GET');
			yield put({ type: 'returnUserListToBrowser', payload: list });
		},
		*getNewUserList({}, { call, put }) {
			let url = '/getNewUserList';
			let list = yield call(getListFromServer, url, 'GET');
			yield put({ type: 'returnNewUserListToBrowser', payload: list });
		},
		*getProductionRecord({ userId, recordSum }, { call, put }) {
			let url = '/getProductionRecord?userId=' + userId + '&recordSum=' + recordSum;
			//这里仅获取一个JSON数据，而不是数组
			let record = yield call(getListFromServer, url, 'GET');
			yield put({ type: 'returnRecordToBrowser', payload: record });
		},
		*getGroupList({}, { call, put }) {
			let url = '/getGroupList';
			let list = yield call(getListFromServer, url, 'GET');
			yield put({ type: 'returnGroupListToBrowser', payload: list });
		},
		*getPerformanceList({ userId }, { call, put }) {
			let url = '/getPerformanceList?userId=' + userId;
			let list = yield call(getListFromServer, url, 'GET');
			yield put({ type: 'returnPerformanceListToBrowser', payload: list });
		},
	},
	reducers: {
		returnUserListToBrowser(state, { payload: list }) {
			list = strToJson(list);
			list.map((data) => {
				data.key = data.userId;
				return data;
			});
			return {
				userList: list,
				newUserList: state.newUserList,
				record: state.record,
				groupList: state.groupList,
				performanceList: state.performanceList,
			};
		},
		returnNewUserListToBrowser(state, { payload: list }) {
			list = strToJson(list);
			list.map((data) => {
				data.key = data.id;
				return data;
			});
			return {
				userList: state.userList,
				newUserList: list,
				record: state.record,
				groupList: state.groupList,
				performanceList: state.performanceList,
			};
		},
		returnRecordToBrowser(state, { payload: record }) {
			record = JSON.parse(record);
			return {
				userList: state.userList,
				newUserList: state.newUserList,
				record: record,
				groupList: state.groupList,
				performanceList: state.performanceList,
			};
		},
		returnGroupListToBrowser(state, { payload: list }) {
			list = strToJson(list);
			list.map((data) => {
				data.key = data.id;
				return data;
			});
			return {
				userList: state.userList,
				newUserList: state.newUserList,
				record: state.record,
				groupList: list,
				performanceList: state.performanceList,
			};
		},
		returnPerformanceListToBrowser(state, { payload: list }) {
			list = strToJson(list);
			return {
				userList: state.userList,
				newUserList: state.newUserList,
				record: state.record,
				groupList: state.groupList,
				performanceList: list,
			};
		},
	},
};
