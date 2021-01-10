import { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Space, DatePicker } from 'antd';
const { RangePicker } = DatePicker;
import { queryFaultList } from '@/services/EquipmentOS/faultos';
import setIndexColumns from './utils/setIndexColumns';
import './Index.less';


const FaultOS = () => {
	let tableRef = useRef();
	let [stateFilter, setStateFilter] = useState('-1');
	let [dateFilter, setDateFilter] = useState('0');
	let [rangeDate, setRangeDate] = useState([null, null]);

	// 选择的筛选方式
	const checkFilter = (type, key) => {
		if (type === 'left') {
			setStateFilter(key);
		} else if (type === 'right') {
			setDateFilter(key);
		}
		// 重新获取数据
		tableRef.current.reload();
	};

	// 筛选按钮组——左侧
	const LeftFilterButtonGroup = () => {
		return (
			<div className='fault-page-actions'>
				<Space>
					<span
						className={`actions ${stateFilter === '-1' && 'active'}`}
						onClick={() => checkFilter('left', '-1')}>
						全部
					</span>
					<span
						className={`actions ${stateFilter === '0' && 'active'}`}
						onClick={() => checkFilter('left', '0')}>
						待处理
					</span>
					<span
						className={`actions ${stateFilter === '1' && 'active'}`}
						onClick={() => checkFilter('left', '1')}>
						处理中
					</span>
					<span
						className={`actions ${stateFilter === '2' && 'active'}`}
						onClick={() => checkFilter('left', '2')}>
						已处理
					</span>
				</Space>
			</div>
		);
	};

	// 筛选按钮组——右侧
	const RightFilterButtonGroup = () => {
		return (
			<div className='fault-page-actions'>
				<Space>
					<span
						className={`actions ${dateFilter === '0' && 'active'}`}
						onClick={() => checkFilter('right', '0')}>
						今日
					</span>
					<span
						className={`actions ${dateFilter === '1' && 'active'}`}
						onClick={() => checkFilter('right', '1')}>
						本周
					</span>
					<span
						className={`actions ${dateFilter === '2' && 'active'}`}
						onClick={() => checkFilter('right', '2')}>
						本月
					</span>
					<span
						className={`actions ${dateFilter === '3' && 'active'}`}
						onClick={() => checkFilter('right', '3')}>
						本年
					</span>
				</Space>
			</div>
		);
	};

	// 设置日期范围
	const getRangeDate = (moment, dateArr) => {
		setRangeDate(dateArr);
		// 重新获取数据
		tableRef.current.reload();
	};

	return (
		<div>
			<ProTable
				actionRef={tableRef}
				columns={setIndexColumns}
				request={async () => {
					let querystring = {
						stateFilter,
						dateFilter,
						rangeDateStart: rangeDate[0],
						rangeDateEnd: rangeDate[1],
					};

					let { data, success } = await queryFaultList(querystring);
					if (success) {
						return { data, success };
					}
				}}
				defaultData={[]}
				search={false}
				toolBarRender={() => [
					<RightFilterButtonGroup />,
					<RangePicker onChange={getRangeDate} />,
				]}
				rowKey='key'
				headerTitle={<LeftFilterButtonGroup />}
			/>
		</div>
	);
};

export default FaultOS;
