import { Radar } from '@ant-design/charts';

const DemoRadar = ({ faultData = [] }) => {
	const config = {
		data: faultData,
		xField: 'name',
		yField: 'total',
		meta: {
			total: {
				alias: '故障数',
				min: 0,
				nice: true,
			},
		},
		xAxis: {
			line: null,
			tickLine: null,
			label: {
				style: {
					fill: '#D6D4DF',
				},
			},
		},
		yAxis: {
			line: null,
			tickLine: null,
			grid: {
				line: {
					style: {
						lineDash: null,
						stroke: '#8C8C8C',
					},
				},

				alternateColor: 'rgba(0, 0, 0, 0.04)',
			},
		},
		title: {},
		// 开启辅助点
		point: {},
		area: {},
	};
	return <Radar {...config} />;
};

export default DemoRadar;
