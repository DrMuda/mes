import React, { Component, createRef } from 'react';
import { Bar } from '@ant-design/charts';

const config = {
	xField: 'DateRange',
	yField: 'orderId',
	seriesField: 'type',
	isGroup: true, // 分组
	isRange: true, // 区间显示
	// label: {
	// 	position: 'middle',
	// 	layout: [{ type: 'interval-adjust-position' }, { type: 'adjust-color' }],
	// },
	tooltip: {
		fields: ['type', 'DateRange', 'demand', 'month'],
		shared: true,
		showCrosshairs: true, // 展示 Tooltip 辅助线
		crosshairs: {
			// xy辅助线
			type: 'y',
			follow: true,
			// 辅助线样式
			line: {
				style: {
					stroke: 'red',
					lineWidth: 2,
					strokeOpacity: 0.7,
					shadowColor: 'black',
					shadowBlur: 10,
					shadowOffsetX: 5,
					shadowOffsetY: 5,
					cursor: 'pointer',
				},
			},
		},
		formatter: (datum) => {
			const { month, DateRange, demand } = datum;

			const el = `
				<span>开工日：${month[0]}月${DateRange[0]}日 &emsp;</span>
				<span>完工日：${month[1]}月${DateRange[1]}日 &emsp;</span>
				<span>产量：${demand} </span>
			`;

			return {
				name: datum.type,
				value: el,
			};
		},
	},
	meta: {
		DateRange: {
			alias: '区间',
		},
		demand: {
			alias: '产量',
		},
		month: {
			alias: '月',
		},
		type: {
			alias: '类型',
		},
	},
	// 设置滚动条
	scrollbar: { type: 'vertical' },
};

export default class Chart extends Component {
	constructor(props) {
		super(props);
		this.chartRef = createRef();
	}

	// 点击图表元素时，虽然该功能最后不一定会要求实现
	// handleClick = (ref) => {
	// 	ref.on('plot:click', (e) => {
	// 		if (!e.data) return;
	// 		const currentBarData = e.data.data;
	// 		console.log('鼠标点击');
	// 	});
	// };

	render() {
		return (
			<Bar
				{...config}
				data={this.props.chartData || []}
				// chartRef={(ref) => {
				// 	this.handleClick(ref);
				// }}
			/>
		);
	}
}
