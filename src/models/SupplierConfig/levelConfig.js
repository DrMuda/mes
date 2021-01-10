import { get_supplier_leveldata, update_supplier_leveldata} from '@/services/ConfigOS/configOS'

export default {
  namespace: 'supplier_level',
  state: {},
  reducers: {
    init(state, result) {
      if (result.data) {
        const data = {};
        data.level_data = result.data;
        return data;
      }
    }
  },
  effects: {
    *getLevel(_, { call, put }) {
      let leveldata = yield call(get_supplier_leveldata);
      yield put({
        type: 'init',
        data: leveldata
      })
    },
    *updateLevel(_, { call, put }) {
      let typedata = yield call(update_supplier_leveldata, _.params);
      yield put({
        type: 'init',
        data: typedata
      })
    }
  }
}