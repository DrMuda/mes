import React, { Component } from 'react';
import { List } from 'antd';
import Chart from './components/Chart';
import './css/planDetail.less';

export default class PlanDetail extends Component {
	state = {
		chartData: [],
	};

	componentDidMount() {
		const { detail, chartData } = this.props.history.location.query;
		this.detail = detail;
		this.setState({
			chartData,
		});
	}

	render() {
		return (
			<div className='plan-detail'>
				<List size='small' header={null} footer={null}>
					<List.Item>
						<span className='item-key'>设备名称：</span>
						{this.detail?.euipmentName}
					</List.Item>
					<List.Item>
						<span className='item-key'>隶属工序：</span>
						{this.detail?.belong}
					</List.Item>
					<List.Item>
						<span className='item-key'>所在位置：</span>
						{this.detail?.position}
					</List.Item>
					<List.Item>
						<span className='item-key'>设备型号：</span>
						{this.detail?.euipmentModel}
					</List.Item>
				</List>
				<div className='chart-box'>
					<Chart chartData={this.state.chartData} />
				</div>
			</div>
		);
	}
}
