import { queryProductionOrderPlanList, queryCheckPlanChartDataAndDetails } from '@/services/ProductionOS/productionOS';

const namespace = 'orderPlanArrange'

export default {
    namespace,
    state: {
        planList: [], // 计划方案列表
        currentStep: 0, // 当前进行到的步骤
        checkPlanKey: '', // 选择的计划方案
        checkPlanChartData: {}, // 选择的方案的图表数据
        checkPlanDetails: [], // 选择的方案的计划详情
    },
    reducers: {
        // 设置当前步骤索引
        setCurrentStep(store, { currentStep }) {
            currentStep < 0 && (currentStep = 0);
            return { ...store, currentStep };
        },
        // 设置计划方案列表
        setPlanList(store, { planList }) {
            return { ...store, planList };
        },
        // 设置当前选择的计划方案
        setCheckPlanKey(store, { checkPlanKey }) {
            return { ...store, checkPlanKey };
        },
        // 设置选择的方案的图表数据和计划详情
        setCheckPlanChartDataAndDetails(store, { checkPlanChartData, checkPlanDetails }) {
            return { ...store, checkPlanChartData, checkPlanDetails };
        },
    },
    effects: {
        *queryPlanList(params, { call, put }) {
            let { data: planList, success } = yield call(queryProductionOrderPlanList);

            if (success) {
                yield put({ type: 'setPlanList', planList })
            }
        },
        *queryChartDataAndDetails(params, { select, call, put }) {

            let { currentStep, planKey } = yield select(state => {
                return {
                    currentStep: state[namespace].currentStep,
                    planKey: state[namespace].checkPlanKey
                }
            });

            let { checkPlanChartData, checkPlanDetails, success } = yield call(queryCheckPlanChartDataAndDetails, { planKey });

            // console.log(data);

            if (success) {
                yield put({ type: 'setCheckPlanChartDataAndDetails', checkPlanChartData, checkPlanDetails });
                yield put({ type: 'setCurrentStep', currentStep: currentStep + 1 });
            }
        }
    }
}