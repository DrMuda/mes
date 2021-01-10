import { queryProductionOrderplan } from '@/services/ProductionOS/productionOS'

export default {
    namespace: 'orderPlanIndex',
    state: {
        listData: [],
        currentSchedule: 2,
        orderNumber: '',
        orderProductName: '',
    },
    reducers: {
        // 设置列表数据
        setListData(store, { listData }) {
            return { ...store, listData };
        },
        // 设置排程索引
        setCurrentSchedule(store, { currentSchedule }) {
            return { ...store, currentSchedule };
        },
        // 设置订单号
        setOrderNumber(store, { orderNumber }) {
            return { ...store, orderNumber };
        },
        // 设置订单产品
        setOrderProductName(store, { orderProductName }) {
            return { ...store, orderProductName };
        },
        // 重置
        resetState(store) {
            return {
                ...store,
                orderNumber: '',
                orderProductName: '',
            }
        }

    },
    effects: {
        *queryListData(params, { call, put }) {
            let { data: listData, success } = yield call(queryProductionOrderplan, params.payload);
            if (success) {
                yield put({ type: 'setListData', listData })
            }
        },
        *resetAndQuery(params, { call, put }) {
            yield put({ type: 'resetState' });
            let { data: listData, success } = yield call(queryProductionOrderplan, params.payload);
            if (success) {
                yield put({ type: 'setListData', listData })
            }
        }
    }
}