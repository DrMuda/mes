import { Rose } from '@ant-design/charts';

const EquipmentWorkMap = ({ equipmentWorkData = [] }) => {
	let config = {
		data: equipmentWorkData,
		xField: 'type',
		yField: 'value',
		seriesField: 'type',
		innerRadius: 0.2,
		radius: 0.9,
		legend: {
			position: 'right',
			itemHeight: 24,
			offsetX: -50,
			itemName: {
				style: { fill: '#ebe7e7', fontSize: 16 },
			},
			itemValue: {
				style: { fill: '#ebe7e7', fontSize: 16 },
				formatter: (text, item, index) => `   ${equipmentWorkData[index]?.value} 台`,
			},
		},
		label: {
			content: (text) => {
				return `${text?.value} %`;
			},
			offset: -20,
			style: { fill: '#ffffff', fontSize: 14 },
		},
		sectorStyle: {
			lineWidth: 0,
		},
		color: ['#2A75D6', '#E94C3D', '#BABCC6'],
	};
	return (
		<div style={{height: '80%'}}>
			<Rose {...config} />
		</div>
	);
};

export default EquipmentWorkMap;
