import { useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import connectRedux from './util/setIndexConnect';
import setColumns from './util/setIndexColumns';
import './css/Index.less';

// 排程筛选组件
const ScheduleFilter = (props) => {
	let { currentSchedule } = props;

	const switchSchedule = (idx) => {
		props.reloadScheduleData(idx);
	};

	return (
		<ul className='schedule-state-list'>
			<li
				className={`schedule-state-item ${currentSchedule === 2 && 'action'}`}
				onClick={switchSchedule.bind(null, 2)}>
				全部
			</li>
			<li
				className={`schedule-state-item ${currentSchedule === 1 && 'action'}`}
				onClick={switchSchedule.bind(null, 1)}>
				已排程
			</li>
			<li
				className={`schedule-state-item ${currentSchedule === 0 && 'action'}`}
				onClick={switchSchedule.bind(null, 0)}>
				未排程
			</li>
		</ul>
	);
};

// 页面组件
const OrderPlan = (props) => {
	const {
		queryListData,
		setCurrentSchedule,
		setOrderNumber,
		setOrderProductName,
		resetAndQuery,
	} = props;

	// 查询
	const findDataList = (params = {}) => {
		queryListData({
			currentSchedule: props.currentSchedule,
			orderNumber: props.orderNumber,
			orderProductName: props.orderProductName,
			...params,
		});
	};

	// 重载排程数据
	const reloadScheduleData = async (currentSchedule) => {
		setCurrentSchedule(currentSchedule);
		findDataList({ currentSchedule });
	};

	// 获取用户输入的订单编号
	const getInputOrderNumber = ({ target: { value } }) => {
		setOrderNumber(value.trim());
	};

	// 获取用户输入的订单名
	const getInputOrderProductName = ({ target: { value } }) => {
		setOrderProductName(value.trim());
	};

	// 重置搜索数据
	const resetSearch = () => {
		// 重置所有检索字段，并重新检索
		resetAndQuery();
	};

	// 初始化数据
	useEffect(() => {
		findDataList();
	}, []);

	return (
		<>
			<div className='header-area'>
				<div className='action-area'>
					<div className='btns-area'>
						<Button type='primary'>新增</Button>
					</div>
					<div className='search-area'>
						<Input
							placeholder='订单编号'
							style={{ width: 200, margin: '0 10px' }}
							value={props.orderNumber}
							onChange={getInputOrderNumber}
						/>
						<Input
							placeholder='订单产品'
							style={{ width: 200, margin: '0 10px' }}
							value={props.orderProductName}
							onChange={getInputOrderProductName}
						/>
						<Button
							type='primary'
							style={{ margin: '0 10px' }}
							onClick={() => findDataList()}>
							查询
						</Button>
						<Button type='danger' onClick={() => resetSearch()}>
							清空
						</Button>
					</div>
				</div>
				<div className='switch-schedule'>
					<ScheduleFilter
						currentSchedule={props.currentSchedule}
						reloadScheduleData={reloadScheduleData}
					/>
				</div>
			</div>
			<Table columns={setColumns(findDataList)} dataSource={props.listData} />
		</>
	);
};

export default connectRedux(OrderPlan);
