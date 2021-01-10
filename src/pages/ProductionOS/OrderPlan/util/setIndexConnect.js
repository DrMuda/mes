import { connect } from 'dva';

const namespace = 'orderPlanIndex';

const mapStateToProps = (state) => state[namespace];

const mapDispatchToProps = (dispatch) => {
    return {
        // 查询数据
        queryListData(params = {}) {
            dispatch({ type: `${namespace}/queryListData`, payload: params });
        },
        // 设置排程tab
        setCurrentSchedule(currentSchedule) {
            dispatch({ type: `${namespace}/setCurrentSchedule`, currentSchedule });
        },
        // 设置订单编号
        setOrderNumber(orderNumber) {
            dispatch({ type: `${namespace}/setOrderNumber`, orderNumber });
        },
        // 设置订单名称
        setOrderProductName(orderProductName) {
            dispatch({ type: `${namespace}/setOrderProductName`, orderProductName });
        },
        // 重置搜索字段
        resetAndQuery(params = {}) {
            dispatch({ type: `${namespace}/resetAndQuery`, payload: params });
        },
    };
};

export default (Component) => {
    return connect(mapStateToProps, mapDispatchToProps)(Component);
}

