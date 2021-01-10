import React from 'react';
import { Modal } from 'antd';

const EquipmentWorkModal = (props) => {
	const handleOk = () => {
		props.closeModal(false);
	};

	const handleCancel = () => {
		props.closeModal(false);
	};

	return (
		<>
			<Modal
				title='XXX 设备工作数据'
				visible={props.isModalVisible}
				centered
				destroyOnClose
				width={800}
				footer={null}
				onOk={handleOk}
				onCancel={handleCancel}>
				<p>
					<strong>位置：</strong>
					{props.EquipmentWorkDetail.x + 1}行{props.EquipmentWorkDetail.y + 1}列
				</p>
				<p>
					<strong>机器名：</strong>
					{props.EquipmentWorkDetail.txt}
				</p>
				<p>机器正在工作，年产1000万吨</p>
			</Modal>
		</>
	);
};

export default EquipmentWorkModal;
