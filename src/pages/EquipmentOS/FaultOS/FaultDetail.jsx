import { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { queryFaultDetail } from '@/services/EquipmentOS/faultos';

const FaultDetail = (props) => {
	let { id } = props.match.params;
	let [detail, setDetail] = useState({});

	useEffect(() => {
		(async () => {
			let { data, success } = await queryFaultDetail({ id });
			if (success) {
				setDetail(data);
			}
		})();
	}, []);

	return (
		<div style={{ backgroundColor: '#fff' }}>
			<Descriptions bordered>
				<Descriptions.Item label='故障单号：'>{detail?.number}</Descriptions.Item>
				<Descriptions.Item label='所在位置'>A11</Descriptions.Item>
				<Descriptions.Item label='故障开始时间：'>2019-04-24 18:00:00</Descriptions.Item>
				<Descriptions.Item label='故障完成时间：'>2019-04-24 18:00:00</Descriptions.Item>

				<Descriptions.Item label='设备编号'>{Date.now()}</Descriptions.Item>
				<Descriptions.Item label='设备名称'>XXXXXX</Descriptions.Item>
				<Descriptions.Item label='所在位置'>XXXXXX</Descriptions.Item>

				<Descriptions.Item label='故障级别'>1级</Descriptions.Item>
				<Descriptions.Item label='故障类型：'>1级</Descriptions.Item>
				<Descriptions.Item label='故障问题'>
					没电了
					<br />
					没油了
					<br />
					没水了
					<br />
					螺丝坏了
					<br />
				</Descriptions.Item>
			</Descriptions>
		</div>
	);
};

export default FaultDetail;
