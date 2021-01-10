function requestServer(url, option) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.open(option, url);
		xhr.send();
		xhr.onreadystatechange = () => {
			if (xhr.readyState == 4) {
				let result = xhr.responseText;
				if (xhr.status == 200) {
					resolve(result);
				} else {
					reject(result);
				}
			}
		};
	});
}
export default {
	namespace: 'depositoryTypeList',
	state: {
		depositoryTypeList: [],
		depositoryList: [],
		storageList: [],
	},
	effects: {
		*getDepositoryTypeList({}, { call, put }) {
			let result = yield call(
				requestServer,
				'/api/config/depository/depositoryTypeList',
				'GET',
			);
			yield put({
				type: 'returnResultToBrowser',
				data: result,
				//需要更新的字段
				field: 'depositoryTypeList',
			});
		},
		*getDepositoryList({}, { call, put }) {
			let result = yield call(requestServer, '/api/config/depository/depositoryList', 'GET');
			yield put({
				type: 'returnResultToBrowser',
				data: result,
				field: 'depositoryList',
			});
		},
		*getStorageList({}, { call, put }) {
			let result = yield call(requestServer, '/api/config/depository/storageList', 'GET');
			yield put({
				type: 'returnResultToBrowser',
				data: result,
				field: 'storageList',
			});
		},
	},
	reducers: {
		returnResultToBrowser(state, { data: result, field: field }) {
			result = JSON.parse(result);
			if (result.data) {
				state[field] = result.data;
				return state;
			}
		},
	},
};
