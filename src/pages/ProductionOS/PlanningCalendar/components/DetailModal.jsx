import React from 'react';
import { Modal, Progress } from 'antd';
import './css/detailModal.less';

// 渲染列表
function RenderList(list) {
	if (!list || !Array.isArray(list) || list.length === 0) return [];

	return list.map((order, index) => {
		return (
			<ul className='order-list' key={`order-list-${index}`}>
				<li className='order-item'>
					<p>订单编号：{order.orderId}</p>
					<p>
						{order.number} {order.productName}
					</p>
					<p>计划产量：{order.yield}</p>
					<div className='progress-box'>
						<span>计划完成总进度：</span>
						<Progress percent={order.progress} status='active' strokeWidth={16} />
					</div>
				</li>
			</ul>
		);
	});
}

const DetailModal = (props) => {
	return (
		<div>
			<Modal
				title={props.anyDateOrderInfo.date}
				visible={props.isModalVisible}
				footer={false}
				onCancel={props.onCloseModal}>
				<div className='list-box'>{RenderList(props.anyDateOrderInfo.data)}</div>
			</Modal>
		</div>
	);
};

export default DetailModal;
