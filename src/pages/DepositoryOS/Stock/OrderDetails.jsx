import React, { useEffect, useState } from 'react';
import { Descriptions, Table, message } from 'antd';
import { queryCheckDetail } from '@/services/DepositoryOS/stock';
import './css/OrderDetails.less';

const columns = [
	{
		title: '序号',
		key: 'Index',
		align: 'center',
		width: 80,
		render: (text, row, index) => `${index + 1}`,
	},
	{
		title: '盘点库位',
		dataIndex: 'shelves',
		key: 'shelves',
		align: 'center',
	},
	{
		title: '物料编号',
		dataIndex: 'cargoId',
		key: 'cargoId',
		align: 'center',
	},
	{
		title: '物料名称',
		dataIndex: 'cargoName',
		key: 'cargoName',
		align: 'center',
	},
	{
		title: '规格型号',
		dataIndex: 'SpecificationModel',
		key: 'SpecificationModel',
		align: 'center',
	},
	{
		title: '计量单位',
		dataIndex: 'unit',
		key: 'unit',
		align: 'center',
	},
	{
		title: '原库存数量',
		dataIndex: 'qriginalStockQuantity',
		key: 'qriginalStockQuantity',
		align: 'center',
	},
	{
		title: '实盘数量',
		dataIndex: 'firmOffer',
		key: 'firmOffer',
		align: 'center',
	},
	{
		title: '盈亏数量',
		dataIndex: 'breakEven',
		key: 'breakEven',
		align: 'center',
	},
];

const OrderDetails = (props) => {
	let { number, date, warehouse } = props.location.query;

	let [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		(async () => {
			let { data, success } = await queryCheckDetail({ orderNumber: number });
			if (!success) return message.error('获取盘点单详情失败');
			setDataSource(data);
		})();
	}, []);

	return (
		<div className='order-detail-box'>
			{/* 顶部区域 */}
			<div className='header-area'>
				<Descriptions bordered>
					<Descriptions.Item label='盘点单号：'>{number}</Descriptions.Item>
					<Descriptions.Item label='盘点日期：'>{date}</Descriptions.Item>
					<Descriptions.Item label='盘点仓库：'>{warehouse}</Descriptions.Item>
				</Descriptions>
			</div>
			{/* 表格区域 */}
			<div className='table-area'>
				<Table dataSource={dataSource} columns={columns} bordered={true}></Table>
			</div>
		</div>
	);
};

export default OrderDetails;
