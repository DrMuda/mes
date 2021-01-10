import { useEffect } from 'react';
import { Steps, Button, Result } from 'antd';
import connectRedux from './util/setArrangeConnect';
import ArrangeChart from './components/ArrangeChart';
import ArrangeTable from './components/ArrangeTable';
import './css/Arrange.less';

const { Step } = Steps;

// 选择某项计划时
const checkPlan = (planKey, props) => {
	let { setCheckPlanKey, queryChartDataAndDetails } = props;
	// 设置当前选择的方案的key
	setCheckPlanKey(planKey);
	// 查询该方案的图表信息和详细列表
	queryChartDataAndDetails();
};

// 设置步骤条区域
const setStep = (props) => {
	const steps = [
		{
			title: '选择计划方案',
			content: props.planList.map((item) => {
				return (
					<ArrangeChart
						planList={item.list}
						key={`arrange-chart-${item.planKey}`}
						title={item.title}
						planKey={item.planKey}
						onClick={checkPlan.bind(null, item.planKey, props)}
					/>
				);
			}),
		},
		{
			title: '确认计划方案',
			content: (
				<>
					<ArrangeChart
						planList={props.checkPlanChartData?.list}
						key={`arrange-chart-${props.checkPlanChartData?.planKey}`}
						title='各订单计划方案概况'
						planKey={props.checkPlanChartData?.planKey}
					/>
					<div className='table-area'>
						<h4 className='table-title'>各订单计划方案详情</h4>
						<ArrangeTable planDetails={props.checkPlanDetails} />
					</div>
				</>
			),
		},
		{
			title: '完成',
			content: <Result status='success' title='操作成功' />,
		},
	];
	return steps;
};

// 界面组件
const Arrange = (props) => {
	useEffect(() => {
		// 获取订单计划方案列表
		props.queryPlanList();
	}, []);

	const steps = setStep(props);

	return (
		<div className='arrange-area'>
			<Steps current={props.currentStep}>
				{steps.map((item) => (
					<Step key={item.title} title={item.title} />
				))}
			</Steps>

			<div className='steps-content'>{steps[props.currentStep].content}</div>

			<div className='steps-action'>
				{props.currentStep > 0 && props.currentStep < steps.length - 1 && (
					<>
						<Button
							type='primary'
							style={{ margin: '0 8px' }}
							onClick={() => props.setCurrentStep(props.currentStep + 1)}>
							确认并发布
						</Button>
						<Button
							style={{ margin: '0 8px' }}
							onClick={() => props.setCurrentStep(props.currentStep - 1)}>
							返回上一步
						</Button>
					</>
				)}
				{props.currentStep === steps.length - 1 && (
					<>
						<Button
							className='finish-action-btn'
							type='primary'
							key='detail'
							onClick={() => {
								let { orderNumber } = props.location.query;
								if (!orderNumber) return;
								// 跳转至订单详情页
								props.history.push(
									`/ProductionOS/OrderPlan/OrderInfo?orderNumber=${orderNumber}`,
								);
								props.setCurrentStep(0);
							}}>
							查看详情
						</Button>
						,
						<Button
							className='finish-action-btn'
							key='backoff'
							// 跳转订单首页
							onClick={() => {
								props.history.push('/ProductionOS/OrderPlan');
								props.setCurrentStep(0);
							}}>
							返回
						</Button>
						,
					</>
				)}
			</div>
		</div>
	);
};

export default connectRedux(Arrange);
