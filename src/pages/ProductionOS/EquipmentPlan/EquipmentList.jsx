import React, { Component } from 'react';
import { List, Card, Radio } from 'antd';
import { queryProductionPlan, queryProductionDetail } from '@/services/ProductionOS/productionOS';
import PlanList from './components/PlanList';

const titleStyle = {
	textAlign: 'center',
	fontSize: '16px',
	fontWeight: 'bold',
};

const data = [
	{
		key: 0,
		title: <h3 style={titleStyle}>设备明细</h3>,
	},
	{
		key: 1,
		title: <h3 style={titleStyle}>当前任务</h3>,
	},
	{
		key: 2,
		title: <h3 style={titleStyle}>后续任务</h3>,
	},
];

export default class Index extends Component {
	state = {
		listData: {},
		filterType: '0',
	};

	constructor(props) {
		super(props);
		this.toDetail = this.toDetail.bind(this);
		this.queryFilterData = this.queryFilterData.bind(this);
	}

	componentDidMount() {
		this.initData({ filterType: this.state.filterType });
	}

	// 配置数据
	async initData(params) {
		const {
			data: { equipmentDetails, CurrentOrder, ordersContinuously },
		} = await queryProductionPlan(params);

		const listData = {
			0: equipmentDetails,
			1: CurrentOrder,
			2: ordersContinuously,
		};

		this.setState({
			listData,
		});
	}

	// 点击标题跳转详情页
	async toDetail(id) {
		// 根据id请求设备详细信息
		const detail = await queryProductionDetail(id);
		// 跳转至详情页
		this.props.history.push({
			pathname: '/ProductionOS/EquipmentPlan/PlanDetail',
			query: {
				detail: detail.data.data, // 本设备的详细信息
				chartData: detail.data.chartData, // 数据图
			},
		});
	}

	// 按车间筛选
	queryFilterData(e) {
		let value = e.target.value;
		this.setState(
			{
				filterType: value,
			},
			() => {
				this.initData({ filterType: this.state.filterType });
			},
		);
	}

	render() {
		const { listData } = this.state;
		return (
			<div style={{ padding: 15, backgroundColor: '#fff' }}>
				<Radio.Group
					style={{ marginBottom: 16 }}
					onChange={this.queryFilterData}
					value={this.state.filterType}>
					<Radio.Button value='0'>梳棉车间</Radio.Button>
					<Radio.Button value='1'>并条车间</Radio.Button>
					<Radio.Button value='2'>粗纱车间</Radio.Button>
					<Radio.Button value='3'>细纱车间</Radio.Button>
					<Radio.Button value='4'>络筒车间</Radio.Button>
				</Radio.Group>
				<List
					grid={{ gutter: 1, column: 3 }}
					dataSource={data}
					renderItem={(item) =>
						JSON.stringify(listData) === '{}' ? (
							''
						) : (
							<List.Item>
								<Card title={item.title}>
									<PlanList
										dataSource={listData[item.key]}
										onClick={this.toDetail}
									/>
								</Card>
							</List.Item>
						)
					}
				/>
			</div>
		);
	}
}
