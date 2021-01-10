import { useEffect } from 'react';
import { connect } from 'dva';
import YieldMap from './components/Charts/YieldMap';
import StockMap from './components/Charts/StockMap';
import EnvironmentMap from './components/Charts/EnvironmentMap';
import EquipmentWorkMap from './components/Charts/EquipmentWorkMap';
import FaultMap from './components/Charts/FaultMap';
import EfficiencyMap from './components/Charts/EfficiencyMap';
import ProgressMap from './components/Charts/ProgressMap';
import NoticeList from './components/NoticeList';
import CardItems from './components/CardItems';
import './css/Index.less';
const namespace = 'homePage';

const BorderArea = () => {
	return (
		<>
			<div className='border-area bdr-1'></div>
			<div className='border-area bdr-2'></div>
			<div className='border-area bdr-3'></div>
			<div className='border-area bdr-4'></div>
		</>
	);
};

// 首页界面
const Home = (props) => {
	useEffect(() => {
		props.initData();
	}, []);

	// 头部区域
	const HeaderTitle = () => {
		return (
			<div className='header-title'>
				<h4>生产计划执行监控中心</h4>
			</div>
		);
	};

	// 左侧区域
	const LeftMain = () => {
		return (
			<div className='main-content left-main'>
				<div className='chart-item-area'>
					<BorderArea />
					<span className='sub-title'>本月产量累计</span>
					<div className='detail-box'>
						<div className='yield'>251,525</div>
						<div>
							<p>计划数</p>
							<p>300,000</p>
						</div>
					</div>
					<div className='chart-slot'>
						<YieldMap yieldData={props.yieldData} />
					</div>
				</div>
				<div className='chart-item-area'>
					<BorderArea />
					<span className='sub-title'>库存状态</span>
					<div className='chart-slot'>
						<StockMap stockData={props.stockData} />
					</div>
				</div>
				<div className='chart-item-area'>
					<BorderArea />
					<span className='sub-title'>环境监测</span>
					<div className='chart-slot'>
						<EnvironmentMap environmentData={props.environmentData} />
					</div>
				</div>
			</div>
		);
	};

	// 中间区域
	const CenterMain = () => {
		let orderProgressData = props?.progressMapData?.orderProgressData || [];
		let orderDetailData = props?.progressMapData?.orderDetailData || {};
		let orderDetailDataList = orderDetailData.data || [];
		return (
			<div className='main-content center-main'>
				<div className='chart-item-area'>
					<BorderArea />
					<span className='sub-title'>订单生产进度</span>
					<div className='chart-slot'>
						<div className='production-speed'>
							<div className='order-detail-box'>
								<p className='small-title'>
									年度订单情况
									<span className='start-time'>
										开始于{orderDetailData?.startTime}
									</span>
								</p>
								<div className='card-detail'>
									{orderDetailDataList.map((item, idx) => {
										return (
											<CardItems
												orderDetailData={item}
												index={idx}
												key={`card-detail-${idx}`}
											/>
										);
									})}
								</div>
							</div>
							<div className='progress-box'>
								<p className='small-title'>生产中订单进度</p>
								<div className='ring-progress-chart-box'>
									{orderProgressData.map((item, idx) => {
										return (
											<ProgressMap
												key={`ring-progress-chart-${idx}`}
												index={idx}
												orderProgressData={item}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className='chart-item-area'>
					<BorderArea />
					<span className='sub-title'>日生产效率</span>
					<div className='chart-slot'>
						<EfficiencyMap efficiencyMapData={props.efficiencyMapData} />
					</div>
				</div>
			</div>
		);
	};

	// 右侧区域
	const RightMain = () => {
		return (
			<div className='main-content right-main'>
				<div className='chart-item-area'>
					<BorderArea />
					<span className='sub-title'>设备运转</span>
					<div className='chart-slot' style={{ paddingTop: 24 }}>
						<EquipmentWorkMap equipmentWorkData={props.equipmentWorkData} />
					</div>
				</div>
				<div className='chart-item-area'>
					<BorderArea />
					<span className='sub-title'>故障雷达图</span>
					<div className='chart-slot'>
						<FaultMap faultData={props.faultData} />
					</div>
				</div>
				<div className='chart-item-area'>
					<BorderArea />
					<span className='sub-title'>实时事件推送</span>
					<div className='chart-slot'>
						<NoticeList noticeListData={props.noticeListData} />
					</div>
				</div>
			</div>
		);
	};

	// 主区域
	const HomeMain = () => {
		return (
			<div className='home-main'>
				<LeftMain />
				<CenterMain />
				<RightMain />
			</div>
		);
	};

	return (
		<div className='home-page'>
			<HeaderTitle />
			<HomeMain />
		</div>
	);
};

// --------------------------------------------------------------

const mapStateToProps = (state) => state[namespace];

const mapDispatchToProps = (dispatch) => {
	return {
		initData() {
			dispatch({ type: `${namespace}/initData` });
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
