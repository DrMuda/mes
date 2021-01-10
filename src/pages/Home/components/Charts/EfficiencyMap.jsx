import { DualAxes } from '@ant-design/charts';

const EfficiencyMap = ({ efficiencyMapData = [] }) => {
	const config = {
		data: [efficiencyMapData, efficiencyMapData],
		xField: 'time',
		yField: ['value', 'count'],
		color:['#124174', '#33CCFF'],
		meta: {
			value: {
				alias: '实际产量',
			},
			count: {
				alias: '生产效率',
			},
		},
		legend: {
			position: 'right',
		},
		xAxis: {
			label: {
				formatter: (val) => ''.concat(val, '日'),
			},
			tickCount: 12,
		},
		yAxis: {
			count: {
				min: 0,
				label: {
					formatter: (val) => ''.concat(val, '%'),
				},
				grid: {
					line: null,
				},
			},
			value: {
				min: 0,
				max: 25000,
				grid: {
					line: {
						style: {
							stroke: '#124174',
							lineWidth: 1,
							lineDash: [10, 2],
						},
					},
				},
			},
		},
		geometryOptions: [
			{ geometry: 'column', columnWidthRatio: 0.4, color: '#1890FF' },
			{
				geometry: 'line',
				lineStyle: { lineWidth: 2,  },
				color: '#33CCFF',
				point: {
					shape: 'circle',
					size: 3,
					style: {
						opacity: 0.5,
						
					},
				},
			},
		],
		interactions: [{ type: 'element-highlight' }, { type: 'active-region' }],
	};
	return <DualAxes {...config} />;
};

export default EfficiencyMap;
