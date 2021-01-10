import { Bullet } from '@ant-design/charts';

const StockMap = ({ stockData = [] }) => {
	let config = {
		data: stockData,
		height: '5px',
		measureField: 'measures',
		rangeField: 'ranges',
		targetField: 'target',
		xField: 'productName',
		color: {
			range: '#5B8FF9',
			measure: '#5E92F8',
			target: '#ffffff',
		},
		xAxis: { line: null },
		yAxis: false,
		meta: {
			productName: {
				alias: '产品',
			},
			measures: {
				alias: '当前产量',
			},
			target: {
				alias: '目标产量',
			},
		},
		size: {
			range: [20],
			measure: [20],
			target: [10],
		},
		label: null,
		bulletStyle: {
			target: {
				style: {
					lineWidth: 5,
				},
			},
		},
		tooltip: {
			formatter: (datum) => {
				let name;
				let value;
				if (datum.hasOwnProperty('target')) {
					name = '最低值';
					value = datum.target;
				} else if (datum.hasOwnProperty('measures')) {
					name = '当前库存';
					value = datum.measures;
				}
				return {
					name,
					value,
				};
			},
		},
	};
	return <Bullet {...config} />;
};

export default StockMap;
