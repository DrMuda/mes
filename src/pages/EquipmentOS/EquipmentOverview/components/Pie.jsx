import React, { Component } from 'react';
import { Pie } from '@ant-design/charts';

export default class PieComponent extends Component {
	render() {
		let config = {
			appendPadding: 10,
			data: this.props.configData,
			angleField: 'value',
			colorField: 'type',
			color: ['#2ca02c', '#d62728', '#E4E4E4'],
			radius: 0.9,
			legend: this.props.legend || false,
			label: {
				type: 'inner',
				offset: '-30%',
				content: function content(_ref) {
					var percent = _ref.percent;
					return ''.concat((percent * 100) | 0, '%');
				},
				style: {
					fill: '#222',
					fontSize: 14,
					textAlign: 'center',
				},
			},
			interactions: [{ type: 'element-active' }],
		};

		return <Pie {...config} />;
	}
}
