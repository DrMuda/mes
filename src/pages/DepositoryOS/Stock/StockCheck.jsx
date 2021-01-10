import { useState, useRef } from 'react';
import { Button, DatePicker, Input } from 'antd';
import ProTable from '@ant-design/pro-table';
import setStockCheckColumns from './utils/setStockCheckColumns';
import { queryCheck } from '@/services/DepositoryOS/stock';
import './css/StockCheck.less';

const StockCheck = (props) => {
	let [activeKey, setActiveKey] = useState('0');
	let refTable = useRef({});

	// 查询表格数据
	const newlyAdded = () => {
		props.history.push({
			pathname: `/DepositoryOS/Stock/NewlyForm`,
		});
	};

	// 选择搜索日期
	function selectSearchDate(moment, dateString) {
		console.log(dateString);
	}

	return (
		<>
			<div className='header-area'>
				<div className='action-area'>
					<div className='btns-area'>
						<Button type='primary' onClick={() => newlyAdded()}>
							新增
						</Button>
					</div>
					<div className='search-area'>
						<Input placeholder='盘点单号' style={{ width: 200, margin: '0 10px' }} />
						<DatePicker onChange={selectSearchDate} />
						<Input placeholder='仓库' style={{ width: 60, margin: '0 10px' }} />
						<Button type='primary' style={{ margin: '0 10px' }}>
							查询
						</Button>
						<Button type='danger'>清空</Button>
					</div>
				</div>
			</div>
			<ProTable
				actionRef={refTable}
				columns={setStockCheckColumns(refTable)}
				request={(params, sorter, filter) => {
					// 表单搜索项会从 params 传入，传递给后端接口。
					// 此处发送请求获取数据
					return queryCheck({ type: activeKey });
				}}
				toolbar={{
					menu: {
						type: 'tab',
						activeKey,
						items: [
							{
								key: '0',
								label: <span>全部</span>,
							},
							{
								key: '1',
								label: <span>待盘点</span>,
							},
							{
								key: '2',
								label: <span>已盘点</span>,
							},
						],
						onChange: (key) => {
							// 设置新数据与tab标签页选中
							setActiveKey(key);
							// 重新加载表格数据
							refTable.current?.reload();
						},
					},
				}}
				rowKey='key'
				pagination={{
					showQuickJumper: true,
				}}
				search={false}
				dateFormatter='string'
			/>
		</>
	);
};

export default StockCheck;
