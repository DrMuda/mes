import { Area } from '@ant-design/charts';

const YieldMap = ({ yieldData = [] }) => {
	const config = {
		data: yieldData,
		xField: 'date',
		yField: 'yieldNumber',
		xAxis: {
			tickCount: 6,
		},
		yAxis: {
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
		meta: {
			yieldNumber: {
				alias: '累计产量',
			},
		},
	};
	return <Area {...config} />;
};

export default YieldMap;
