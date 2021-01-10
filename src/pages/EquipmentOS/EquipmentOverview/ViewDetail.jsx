import React, { Component } from 'react';
import { Descriptions, Badge } from 'antd';

import './ViewDetail.less';

export default class ViewDetail extends Component {
	render() {
		// this.props.location.query.id

		return (
			<div className='view-detail-box'>
				<Descriptions bordered>
					<Descriptions.Item label='设备名称'>
						{this.props.location.query.id}
					</Descriptions.Item>
					<Descriptions.Item label='所在位置'>A11</Descriptions.Item>
					<Descriptions.Item label='故障级别'>1级</Descriptions.Item>
					<Descriptions.Item label='机器编号'>{Date.now()}</Descriptions.Item>
					<Descriptions.Item label='故障时间'>2019-04-24 18:00:00</Descriptions.Item>
					<Descriptions.Item label='当前状态'>
						<Badge status='success' text='工作中' />
					</Descriptions.Item>
					<Descriptions.Item label='负责人' span={3}>
						黄某人
					</Descriptions.Item>
					<Descriptions.Item label='故障问题'>
						没电了
						<br />
						没油了
						<br />
						没水了
						<br />
						螺丝坏了
						<br />
						蒸汽机不想上班
						<br />
					</Descriptions.Item>
				</Descriptions>
			</div>
		);
	}
}
