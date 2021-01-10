import React, { PureComponent } from 'react';
import './css/PlanList.less';

let clicks = [];

export default class PlanList extends PureComponent {
	renderList() {
		const currentClicks = clicks.slice();
		clicks = [];
		const { listData } = this.props.dataSource;

		return listData.map((rows, index) => {
			return (
				<div className='list-item' key={`list-item-${index}`}>
					{rows.list.map((data, idx) => {
						return  currentClicks[0] && currentClicks[0][idx] === true ? (
							<span
								key={`list-item-data-${idx}`}
								onClick={this.toDetail.bind(this, rows.id)}
								className='to-detail'>
								{data}
							</span>
						) : (
							<span key={`list-item-data-${idx}`}>{data}</span>
						);
					})}
				</div>
			);
		});
	}

	toDetail(id) {
		this.props.onClick(id);
	}

	renderHeader() {
		return this.props.dataSource.listHead.map((title, index) => {
			if (typeof title === 'string') {
				return <span key={title}>{title}</span>;
			}

			if (Object.prototype.toString.call(title).slice(8, -1) === 'Object' && title.title) {
				if (title.onclick === true) {
					clicks.push({
						[index]: true,
					});
				}

				return <span key={title.title}>{title.title}</span>;
			}

			return '';
		});
	}

	render() {
		return (
			<div className='plan-list'>
				{/* 列头 */}
				<div className='header-title'>{this.renderHeader()}</div>

				{/* ---------------- */}
				{this.renderList()}
			</div>
		);
	}
}
