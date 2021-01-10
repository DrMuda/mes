import { useEffect, useState } from 'react';
import { history } from 'umi';
import { message, Descriptions } from 'antd';
import { queryMaintenanceDetail } from '@/services/EquipmentOS/maintenance';

const MaintenanceDetail = (props) => {
	let [detail, setDetail] = useState({});
	let [detailType, setDetailType] = useState(0);

	useEffect(() => {
		let id = props.match.params.id;

		(async () => {
			let { data, type, success } = await queryMaintenanceDetail({ id });
			if (!success) {
				message.error('获取详情失败');
				history.goBack();
				return;
			}
			type = type === '故障维护' ? 0 : 1;
			setDetail(data);
			setDetailType(type);
		})();
	}, []);

	return (
		<div style={{ padding: 15, backgroundColor: '#fff' }}>
			<Descriptions bordered column={3}>
				<Descriptions.Item label='维护单号：'>{detail?.maintainNumber}</Descriptions.Item>
				<Descriptions.Item label='故障类型：' span={detailType && 2}>
					A11
				</Descriptions.Item>
				{!detailType && (
					<Descriptions.Item label='故障单号：'>2019-04-24 18:00:00</Descriptions.Item>
				)}

				<Descriptions.Item label='设备编号：'>{detail?.equipmentNumber}</Descriptions.Item>
				<Descriptions.Item label='设备名称：'>{detail?.equipmentName}</Descriptions.Item>
				<Descriptions.Item label='所在位置：'>{detail?.address}</Descriptions.Item>

				{!detailType && (
					<>
						<Descriptions.Item label='故障开始时间：'>{Date.now()}</Descriptions.Item>
						<Descriptions.Item label='故障级别'>1级</Descriptions.Item>
						<Descriptions.Item label='故障类型：'>1级</Descriptions.Item>
						<Descriptions.Item label='故障描述' span={3}>
							<br />
							{detail?.content}
							<br />
							<br />
						</Descriptions.Item>
					</>
				)}

				<Descriptions.Item label='负责人：'>{detail?.director}</Descriptions.Item>
				<Descriptions.Item label='计划维护时间：'>
					{detail?.plannedMaintenanceTime}
				</Descriptions.Item>
				<Descriptions.Item label='实际维护时间：'>
					{detail?.plannedMaintenanceTime}
				</Descriptions.Item>
				<Descriptions.Item label='维护内容' span={1}>
					<br />
					{detail?.content}
					<br />
					<br />
				</Descriptions.Item>
			</Descriptions>
		</div>
	);
};

export default MaintenanceDetail;
