import { queryHomeData } from '@/services/home';
const namespace = 'homePage';

export default {
    namespace,
    state: {
        yieldData: []
    },
    reducers: {
        setDataCollection(store, { data }) {
            return { ...store, ...data };
        }
    },
    effects: {
        *initData(params, { call, put }) {
            let { data, success } = yield call(queryHomeData);
            if (success) {
                yield put({ type: 'setDataCollection', data });
            }
        }
    }
}