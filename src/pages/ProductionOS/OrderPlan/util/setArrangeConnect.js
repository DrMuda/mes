import { connect } from 'dva';

const namespace = 'orderPlanArrange';

const mapStateToProps = (state) => state[namespace];

const mapDispatchToProps = (dispatch) => {
    return {
        // 设置当前步骤
        setCurrentStep: (currentStep) => {
            dispatch({ type: `${namespace}/setCurrentStep`, currentStep })
        },
        // 获取计划方案列表
        queryPlanList: () => {
            dispatch({ type: `${namespace}/queryPlanList` })
        },
        // 设置选择的计划方案
        setCheckPlanKey: (checkPlanKey) => {
            dispatch({ type: `${namespace}/setCheckPlanKey`, checkPlanKey })
        },
        // 设置选择的方案的图表数据和计划详情
        queryChartDataAndDetails:(planKey)=>{
            dispatch({ type: `${namespace}/queryChartDataAndDetails`, planKey })
        }
    };
};

export default (Component) => {
    return connect(mapStateToProps, mapDispatchToProps)(Component);
}

