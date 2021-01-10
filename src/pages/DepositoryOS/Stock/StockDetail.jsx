import { queryDetail } from '@/services/DepositoryOS/stock';
import ProTable from '@ant-design/pro-table';
import { Button, Input, Space } from 'antd';
import { useState, useRef } from 'react';
import './css/StockDetail.less';

const columns = [
	{
		title: '物料名称',
		dataIndex: 'name',
		render: (_) => <a>{_}</a>,
	},
	{
		title: '物料编码',
		dataIndex: 'systemCoding',
		valueEnum: {
			all: { text: '全部' },
			付小小: { text: '付小小' },
			曲丽丽: { text: '曲丽丽' },
			林东东: { text: '林东东' },
			陈帅帅: { text: '陈帅帅' },
			兼某某: { text: '兼某某' },
		},
	},
	{
		title: '规格型号',
		dataIndex: 'model',
	},
	{
		title: '子项类型',
		dataIndex: 'warehouseType',
	},
	{
		title: '所在仓库',
		key: 'since',
		dataIndex: 'warehouse',
	},
	{
		title: '所在仓位',
		key: 'positions',
		dataIndex: 'positions',
	},
	{
		title: '仓库总量',
		key: 'totalWarehouse',
		dataIndex: 'totalWarehouse',
		sorter: (a, b) => a.containers - b.containers,
	},
	{
		title: '可用数量',
		key: 'availableQuantity',
		dataIndex: 'availableQuantity',
		sorter: (a, b) => a.containers - b.containers,
	},
	{
		title: '最低值',
		key: 'minimum',
		dataIndex: 'minimum',
	},
	{
		title: '最高值',
		key: 'peak',
		dataIndex: 'peak',
	},
	{
		title: '采购价',
		key: 'cost',
		dataIndex: 'cost',
		sorter: (a, b) => a.containers - b.containers,
	},
];

const StockDetail = () => {
	let [activeKey, setActiveKey] = useState('0');
	let [warehouseType, setWarehouseType] = useState('-1');
	let tableRef = useRef({});

	// 重新加载数据
	const reloadData = (type, val) => {
		if (type === 'warehouseType') {
			setWarehouseType(val);
		} else if (type === 'activeKey') {
			setActiveKey(val);
		}
		tableRef.current.reload();
	};

	// 筛选栏
	const FilterBar = () => {
		return (
			<div className='filter-bar'>
				<Space direction='vertical'>
					<Space>
						<span
							className={`action ${warehouseType === '-1' && 'active'}`}
							onClick={() => reloadData('warehouseType', '-1')}>
							全部
						</span>
						<span
							className={`action ${warehouseType === '0' && 'active'}`}
							onClick={() => reloadData('warehouseType', '0')}>
							原料
						</span>
						<span
							className={`action ${warehouseType === '1' && 'active'}`}
							onClick={() => reloadData('warehouseType', '1')}>
							备品
						</span>
						<span
							className={`action ${warehouseType === '2' && 'active'}`}
							onClick={() => reloadData('warehouseType', '2')}>
							成品
						</span>
					</Space>
					<Space>
						<span
							className={`action ${activeKey === '0' && 'active'}`}
							onClick={() => reloadData('activeKey', '0')}>
							全部
						</span>
						<span
							className={`action ${activeKey === '1' && 'active'}`}
							onClick={() => reloadData('activeKey', '1')}>
							缺货
						</span>
						<span
							className={`action ${activeKey === '2' && 'active'}`}
							onClick={() => reloadData('activeKey', '2')}>
							超仓
						</span>
					</Space>
				</Space>
			</div>
		);
	};

	// 清空表格数据
	const clearData = () => {
		tableRef.current.reload();
	};

	return (
		<>
			<div className='header-area'>
				<div className='action-area'>
					<div className='btns-area'>
						<FilterBar />
					</div>
					<div className='search-area'>
						<Input placeholder='物料名称' style={{ width: 200, margin: '0 10px' }} />
						<Input placeholder='物料编码' style={{ width: 200, margin: '0 10px' }} />
						<Input placeholder='仓库' style={{ width: 80, margin: '0 10px' }} />
						<Button type='primary' style={{ margin: '0 10px' }}>
							查询
						</Button>
						<Button type='danger' onClick={() => clearData()}>
							清空
						</Button>
					</div>
				</div>
			</div>
			<ProTable
				actionRef={tableRef}
				columns={columns}
				request={(_params, _sorter, _filter) => {
					// 表单搜索项会从 params 传入，传递给后端接口。
					// 此处发送请求获取数据
					return queryDetail({ type: activeKey, warehouseType });
				}}
				rowKey='key'
				search={false}
				dateFormatter='string'
				toolBarRender={false}
			/>
		</>
	);
};

export default StockDetail;
