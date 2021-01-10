import React, { Component } from 'react';
import { AlertOutlined } from '@ant-design/icons';
import './css/Index.less';

export default class Index extends Component {
	constructor(props) {
		super(props);
		this.sendListItemId = this.sendListItemId.bind(this);
	}

	sendListItemId(id) {
		if (this.props.onClick) {
			this.props.onClick(id);
		}
	}

	render() {
		return (
			<div className='warning-list-box'>
				<h2 className='warning-title'>
					<AlertOutlined className='warn-icon' />
					警报信息
				</h2>
				<div className='list-view'>
					<div className='list-head'>
						<div className='process'>隶属工序</div>
						<div className='name'>设备名</div>
						<div className='desc'>故障问题</div>
						<div className='state'>状态</div>
					</div>
					<ul className='list'>
						{this.props.warningList.map((item, idx) => {
							return (
								<li
									className='info-item'
									key={item.id}
									onClick={this.sendListItemId.bind(this, item.id)}>
									<div className='process'>{item.process}</div>
									<div className='name'>
										{item.name} {idx}
									</div>
									<div className='desc'>{item.desc}</div>
									<div className='state'>{item.state}</div>
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		);
	}
}
