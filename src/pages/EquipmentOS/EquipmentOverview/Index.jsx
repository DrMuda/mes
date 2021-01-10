// 设备总览
import React, { Component } from 'react';
import { Radio } from 'antd';
import Pip from './components/Pie';
import EquipmentWorkModal from './components/EquipmentWorkModal';
import './Index.less';
// import { AlertOutlined } from '@ant-design/icons';
import WarningList from '@/components/WarningList/Index';
import { queryAllData } from '@/services/EquipmentOS/overview';

class EquipmentOverview extends Component {
	state = {
		pieData: [], // 饼形图数据
		warnList: [], // 警报信息
		matrixSourceData: [], // 设备矩阵源数据
		matrix: [], // 设备矩阵DOM
		filterType: '0', // 车间筛选
		isModalVisible: false, // 设备工作信息模态框
		EquipmentWorkDetail: {}, // 设备工作信息
	};

	constructor(props) {
		super(props);
		this.toDetail = this.toDetail.bind(this);
		this.queryFilterData = this.queryFilterData.bind(this);
	}

	componentDidMount() {
		// 初始化数据
		this.initData({filterType: this.state.filterType});
	}

	// 初始化数据
	async initData(params) {
		let res = await queryAllData(params);
		this.setState(
			{
				pieData: res.data.pieData,
				warnList: res.data.warnList,
				matrixSourceData: res.data.matrixSourceData,
			},
			() => {
				this.mapMatrix();
			},
		);
	}

	// 跳转至详情页
	toDetail(id) {
		this.props.history.push({
			pathname: '/EquipmentOS/EquipmentOverview/ViewDetail',
			query: {
				id,
			},
		});
	}

	// 遍历数据生成网格
	mapMatrix() {
		let arr = [];
		let colCount = 0;

		this.state.matrixSourceData.forEach((item) => {
			if (arr[item.x]) {
				arr[item.x][item.y] = (
					<span
						className={`matrix-item state-${item.state}`}
						key={`${item.x}${item.y}`}
						onClick={this.showModal.bind(this, item)}>
						{item.txt}
					</span>
				);
			} else {
				// 不存在，则添加在至新数组
				if (arr[item.x - 1]) {
					// 记录最大列数
					colCount < arr[item.x - 1].length && (colCount = arr[item.x - 1].length);

					arr[item.x - 1] = [
						<div className='rows' key={`row-${item.x}`}>
							<span key={`row-no-${item.x}`}>第{item.x}排</span>
							{arr[item.x - 1].map((el) => el)}
						</div>,
					];
				}

				arr[item.x] = [
					<span
						className={`matrix-item state-${item.state}`}
						key={`${item.x}${item.y}`}
						onClick={this.showModal.bind(this, item)}>
						{item.txt}
					</span>,
				];
			}
		});

		let lastIdx = arr.length - 1;
		// 记录最大列数
		colCount < arr[lastIdx].length && (colCount = arr[lastIdx].length);

		arr[lastIdx] = [
			<div className='rows' key={`row-${arr[lastIdx].x}`}>
				<span key={`row-no-${arr[lastIdx].x}`}>第{lastIdx + 1}排</span>
				{arr[lastIdx].map((el) => el)}
			</div>,
		];

		let cols = [];

		for (let i = 0; i < colCount; i++) {
			cols.push(
				<span className='matrix-footer' key={`cols-${i}`}>
					{' '}
					第{i + 1}列{' '}
				</span>,
			);
		}

		this.setState({
			matrix: arr,
			matrixCols: cols,
		});
	}

	// 点击时，弹出设备工作数据
	showModal(item) {
		this.setState({
			isModalVisible: true,
			EquipmentWorkDetail: item,
		});
	}

	// 关闭Model
	closeModal(flag) {
		this.setState({
			isModalVisible: flag,
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
		return (
			<>
				<div className='small-chart-area'>
					<div className='chart-list'>
						{this.state.pieData.map((item, idx) => {
							return (
								<div className='chart-item' key={`pies-${idx}`}>
									<div className='chart'>
										<Pip configData={item} />
									</div>{' '}
									<p>梳棉工序</p>{' '}
								</div>
							);
						})}
					</div>
					{/* ------------------------------------------------------------------------------------ */}
					<div className='legend-area'>
						<div>
							<i className='color-pointer'></i>开工率
						</div>
						<div>
							<i className='color-pointer'></i>故障率
						</div>
						<div>
							<i className='color-pointer'></i>未开工率
						</div>
					</div>
				</div>
				{/* ------------------------------------------------------------------------------------ */}
				<div className='detail-area'>
					<div className='grid-chart-box'>
						<div className='filter-btns'>
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
						</div>
						{/* 网格区域 */}
						<div className='matrix'>
							{this.state.matrix}

							{/* 列脚 */}
							<div className='rows'>
								<span></span>
								{this.state.matrixCols}
							</div>
						</div>
						<div className='tag-title'>
							<div className='tag'>
								<i className='icon'></i> <span>工作中</span>
							</div>
							<div className='tag'>
								<i className='icon'></i> <span>故障中</span>
							</div>
							<div className='tag'>
								<i className='icon'></i> <span>未工作</span>
							</div>
						</div>
					</div>
					<div className='warn-msg-box'>
						<WarningList warningList={this.state.warnList} onClick={this.toDetail} />
					</div>
				</div>
				{/* Modal */}
				<EquipmentWorkModal {...this.state} closeModal={this.closeModal.bind(this)} />
			</>
		);
	}
}

export default EquipmentOverview;
