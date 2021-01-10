import { get_supplier_listdata, update_supplier_list, get_supplier_typedata, get_supplier_leveldata ,search_supplier_listdata} from '@/services/ConfigOS/configOS'

export default {
  namespace: 'supplier_list',
  state: {},
  reducers: {
    init(state, result) {
      if (result.data) {
        const data = { ...state };
        data.list_data = result.data;
        return data;
      }
    },
    inittype(state, result) {
      if (result.data) {
        const data = { ...state };
        data.type_data = {};
        data.type = result.data;
        result.data.map(val => {
          data.type_data[val.supplier_type] = { text: val.supplier_type }
        })
        return data
      }
    },
    initlevel(state, result) {
      if (result.data) {
        const data = { ...state };
        data.level_data = {};
        data.level = result.data;
        result.data.map(val => {
          data.level_data[val.supplier_level] = { text: val.supplier_level }
        })
        return data
      }
    }
  },
  effects: {
    *getList(_, { call, put }) {
      let listdata = yield call(get_supplier_listdata);
      yield put({
        type: 'init',
        data: listdata
      })
    },
    *getType(_, { call, put }) {
      let typedata = yield call(get_supplier_typedata);
      yield put({
        type: 'inittype',
        data: typedata
      })
    },
    *getLevel(_, { call, put }) {
      let leveldata = yield call(get_supplier_leveldata);
      yield put({
        type: 'initlevel',
        data: leveldata
      })
    },
    *updateList(_, { call, put }) {
      let updatedata = yield call(update_supplier_list, _.params);
      yield put({
        type: 'init',
        data: updatedata
      })
    },
    *searchList(_, { call, put }) {
      let listdata = yield call(search_supplier_listdata, _.params);
      yield put({
        type: 'init',
        data: listdata
      })
    }
  }
}