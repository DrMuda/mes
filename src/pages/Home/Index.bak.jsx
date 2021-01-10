import React, { Component } from 'react';
import { queryWarnList } from '@/services/home';
import WarningList from '@/components/WarningList/Index';
import './css/Index.less';
import StateChart from './components/ChartsBak/StateChart';
import YieldChart from './components/ChartsBak/YieldChart';
import ProgressChart from './components/ChartsBak/ProgressChart';
import QuantityChart from './components/ChartsBak/QuantityChart';

export default class Index extends Component {
	state = {
		warningList: [],
		stateChartData: [],
		yieldChartData: [],
		progressChartData: [],
		quantityChartData: [],
	};

	componentDidMount() {
		this.initData();
	}

	initData() {
		queryWarnList().then((res) => {
			this.setState({
				warningList: res.warningList,
				stateChartData: res.StateChartData,
				yieldChartData: res.YieldChartData,
				progressChartData: res.ProgressChartData,
				quantityChartData: res.QuantityChartData,
			});
		});
	}

	render() {
		return (
			<div className='home-container'>
				<div className='top-area'>
					<div className='left-chart-box'>
						<div className='chart-box'>
							<p style={{ textAlign: 'center', fontSize: '18px' }}>各物料-各订单数量</p>
							<div>
								{/* 必须用div包起来，勿删！ */}
								<QuantityChart quantityChartData={this.state.quantityChartData} />
							</div>
						</div>
						<div className='state-box'>
							<div className='stock'>
								<div className='table-key'>
									<span>剩余库存</span>
								</div>
								<ul className='list'>
									<li>XX件</li>
									<li>XX件</li>
									<li>XX件</li>
									<li>XX件</li>
									<li>XX件</li>
									<li>XX件</li>
									<li>XX件</li>
								</ul>
							</div>
							<div className='state'>
								<div className='table-key'>
									<span>库存状态</span>
								</div>
								<ul className='list'>
									<li className='normal'>正常</li>
									<li className='lack'>缺货</li>
									<li className='normal'>正常</li>
									<li className='lack'>缺货</li>
									<li className='normal'>正常</li>
									<li className='lack'>缺货</li>
									<li className='normal'>正常</li>
								</ul>
							</div>
						</div>
					</div>
					<div className='right-chart-box'>
						<p style={{ textAlign: 'center', fontSize: '18px' }}>各订单进度对比图</p>
						<div>
							{/* 必须用div包起来，勿删！ */}
							<ProgressChart progressChartData={this.state.progressChartData} />
						</div>
					</div>
				</div>
				<div className='bottom-area'>
					<div className='items'>
						<WarningList warningList={this.state.warningList} />
					</div>
					<div className='items'>
						<p style={{ textAlign: 'center' }}>车间设备状态</p>
						<StateChart stateChartData={this.state.stateChartData} />
					</div>
					<div className='items'>
						<p style={{ textAlign: 'center' }}>截止XX日XX时各设备产量对比图</p>
						<YieldChart yieldChartData={this.state.yieldChartData} />
					</div>
				</div>
			</div>
		);
	}
}
