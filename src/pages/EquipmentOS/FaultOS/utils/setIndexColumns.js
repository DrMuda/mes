import { Link } from 'umi'
import { Button, Modal, Input, Form } from 'antd';


const { confirm } = Modal;


// 显示生成维护单的模态框
function showConfirm() {
	let date = '';
	let content = '';

	const setDate = ({ target: { value } }) => {
		date = value;
	};
	const setContent = ({ target: { value } }) => {
		content = value;
	};

	confirm({
		content: (
			<>
				<Form
					layout='horizontal'
				>
					<Form.Item label='计划维护时间：'>
						<Input placeholder='请输入计划维护时间' onChange={setDate} />
					</Form.Item>
					<Form.Item label='&emsp;&emsp;维护内容：'>
						<Input placeholder="请输入维护内容" onChange={setContent} />
					</Form.Item>
				</Form>
			</>
		),
		icon: null,
		onOk(close) {
			// 提交 date, content 至后端
			close();
		},
	});
}

const columns = [
	{
		title: '故障单号',
		dataIndex: 'number',
		key: 'number',
		search: false,
		render: (text) => {
			return <Link to={`/EquipmentOS/FaultOS/Detail/${text}`}>{text}</Link>
		}
	},
	{
		title: '设备编号',
		dataIndex: 'equipmentNumber',
		key: 'equipmentNumber',
		search: false,
	},
	{
		title: '设备名称',
		dataIndex: 'name',
		key: 'name',
		search: false,
	},
	{
		title: '所在位置',
		dataIndex: 'address',
		key: 'address',
		search: false,
	},
	{
		title: '故障级别',
		dataIndex: 'level',
		key: 'level',
		search: false,
	},
	{
		title: '故障类型',
		dataIndex: 'content',
		key: 'content',
		search: false,
	},
	{
		title: '故障开始时间',
		dataIndex: 'occurrenceDate',
		key: 'occurrenceDate',
		search: false,
		sorter: (a, b) => a.occurrenceDate - b.occurrenceDate,
	},
	{
		title: '故障完成时间',
		dataIndex: 'completionDate',
		key: 'completionDate',
		search: false,
		sorter: (a, b) => a.completionDate - b.completionDate,
	},
	{
		title: '故障单当前状态',
		key: 'status',
		dataIndex: 'status',
		width: 120,
		filter: true,
	},
	{
		title: '操作',
		key: 'option',
		width: 220,
		valueType: 'option',
		align: 'center',
		render: (_, row) => {
			let el = [];
			if (row.status === '待处理') {
				el.push(
					<Button type='primary' size='small' key='1' onClick={showConfirm}>
						生产维护单
					</Button>,
					<Button
						type='primary'
						size='small'
						key='2'
						style={{ borderColor: '#009966', backgroundColor: '#009966' }}>
						已知晓
					</Button>,
				);
			}
			return el;
		},
	},
];


export default columns;