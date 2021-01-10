import { Table } from 'antd';

const columns = [
	{
		title: '订单编号',
		dataIndex: 'orderNumber',
		align: 'center',
		render: (value, row, index) => {
			const obj = {
				children: value,
				props: {
					rowSpan: 5,
				},
			};

			if (index % 5 === 0) {
				obj.props.rowSpan = 5;
			} else {
				obj.props.rowSpan = 0;
			}

			return obj;
		},
	},
	{
		title: '生产单号',
        dataIndex: 'productionNumber',
        align: 'center',
		render: (value, row, index) => {
			const obj = {
				children: value,
				props: {
					rowSpan: 5,
				},
			};

			if (index % 5 === 0) {
				obj.props.rowSpan = 5;
			} else {
				obj.props.rowSpan = 0;
			}

			return obj;
		},
	},
	{
        title: '工序编号',
        align: 'center',
		dataIndex: 'processNumber',
	},
	{
        title: '工序名称',
        align: 'center',
		dataIndex: 'processName',
	},
	{
        title: '设备数量',
        align: 'center',
		dataIndex: 'equipmentNumber',
		render: (text) => {
			return `${text} 台`;
		},
	},
	{
        title: '设备明细',
        align: 'center',
		dataIndex: 'equipmentDetail',
	},
	{
        title: '工序开工日期',
        align: 'center',
		dataIndex: 'processStartDate',
	},
	{
        title: '工序完成日期',
        align: 'center',
		dataIndex: 'processFinishDate',
	},
];

const ArrangeTable = (props) => {
	return <Table columns={columns} dataSource={props.planDetails} bordered />;
};

export default ArrangeTable;
