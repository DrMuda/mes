import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { queryProductionOrderPlanDetail } from '@/services/ProductionOS/productionOS';
import Charts from './components/PlanInfoChart';
import './css/OrderInfo.less';

// 订单信息组件
const OrderInfoComponent = ({ orderDetail }) => {
	return (
		<div className='order-info'>
			<h4 className='sub-title'>订单信息</h4>
			<ul className='info-list'>
				<li className='info-item'>
					<span className='key'>订单编号：</span>
					<span className='val'>{orderDetail?.orderNumber}</span>
				</li>
				<li className='info-item'>
					<span className='key'>订单产品：</span>
					<span className='val'>{orderDetail?.productName}</span>
				</li>
				<li className='info-item'>
					<span className='key'>订单数量：</span>
					<span className='val'>{orderDetail?.orders}</span>
				</li>
				<li className='info-item'>
					<span className='key'>规格型号：</span>
					<span className='val'>{orderDetail?.model}</span>
				</li>
				<li className='info-item'>
					<span className='key'>客户要求日期：</span>
					<span className='val'>{orderDetail?.endDate}</span>
				</li>
				<li className='info-item'>
					<span className='key'>订单创建时间：</span>
					<span className='val'>{orderDetail?.createTime}</span>
				</li>
			</ul>
		</div>
	);
};

// 计划信息组件
const PlanInfoComponent = (props) => {
	let {
		orderDetail: { planCreateDate, planStartDate, planFinishDate, productionStatus },
		chartData,
	} = props;

	return (
		<div className='plan-info'>
			<h4 className='sub-title'>计划信息</h4>
			<ul className='plan-list'>
				<li className='plan-item'>
					<span className='key'>计划创建时间：</span>
					<span className='val'>{planCreateDate}</span>
				</li>
				<li className='plan-item'>
					<span className='key'>计划开始时间：</span>
					<span className='val'>{planStartDate}</span>
				</li>
				<li className='plan-item'>
					<span className='key'>计划完成时间：</span>
					<span className='val'>{planFinishDate}</span>
				</li>
				<li className='plan-item'>
					<span className='key'>当前生产状态：</span>
					<span className='val'>{productionStatus?.desc}</span>
				</li>
			</ul>

			{/* -------------------------------- */}

			<div className='chart-box'>
				<Charts chartData={chartData} />
			</div>
		</div>
	);
};

// 生产信息
const ProductionInfoComponent = ({ productionInfo }) => {
	const columns = [
		{
			title: '工序编号',
			dataIndex: 'processNumber',
		},
		{
			title: '工序名称',
			dataIndex: 'processName',
		},
		{
			title: '设备数量',
			dataIndex: 'numbers',
		},
		{
			title: '设备明细',
			dataIndex: 'detailed',
		},
		{
			title: '工序开工日期',
			dataIndex: 'startDate',
		},
		{
			title: '工序完成日期',
			dataIndex: 'finishDate',
		},
	];
	return (
		<div className='production-info'>
			<h4 className='sub-title'>生产单信息</h4>
			<ul className='plan-list'>
				<li className='plan-item'>
					<span className='key'>生产单号：</span>
					<span className='val'>{productionInfo?.productionNumber}</span>
				</li>
				<li className='plan-item'>
					<span className='key'>成品批号：</span>
					<span className='val'>{productionInfo?.productionBatchNumber}</span>
				</li>
				<li className='plan-item'>
					<span className='key'>所需物料：</span>
					<span className='val'>{productionInfo?.materialsRequired}</span>
				</li>
			</ul>
			<div className='table-area'>
				<Table bordered columns={columns} dataSource={productionInfo?.processList} />
			</div>
		</div>
	);
};

// 页面组件
const OrderInfo = (props) => {
	let [orderDetail, setOrderDetail] = useState({});
	let [chartData, setchartData] = useState([]);
	let [productionInfo, setProductionInfo] = useState([]);

	useEffect(() => {
		let orderNumber = props.location.query?.orderNumber || null;

		(async () => {
			let { data, chartData, productionInfo, success } = await queryProductionOrderPlanDetail(
				{
					orderNumber,
				},
			);

			if (success) {
				setOrderDetail(data);
				setchartData(chartData);
				setProductionInfo(productionInfo);
			}
		})();
	}, []);

	return (
		<div className='order-info-page'>
			<OrderInfoComponent orderDetail={orderDetail} />
			<PlanInfoComponent orderDetail={orderDetail} chartData={chartData} />
			<ProductionInfoComponent productionInfo={productionInfo} />
		</div>
	);
};

export default OrderInfo;
