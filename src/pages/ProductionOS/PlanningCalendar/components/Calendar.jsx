import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment';
import { Calendar, Select, Row, Col, Button } from 'antd';
import {
	queryProductionCalendar,
	queryProductionCalendarOrderInfo,
} from '@/services/ProductionOS/productionOS';

// 设置星期展示格式
moment.updateLocale('zh-cn', {
	weekdaysMin: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
});

const CalendarComponent = (props) => {
	// 日历数据
	let [listData, setListData] = useState([]);
	// 当前点击的日期
	// 当前点击的日期
	let yearRef = useRef();
	let monthRef = useRef();
	let dateRef = useRef();

	// 页面加载完毕则查询数据
	useEffect(() => {
		queryDateList();
	}, []);

	// 取出每一天对应列表中的数据
	function getListData(value) {
		let date = value.date();
		return listData[date] || [];
	}

	// 获取日期数据
	async function queryDateList() {
		let { data } = await queryProductionCalendar();
		// 处理数据
		let newArr = [];
		for (const key in data) {
			if (data.hasOwnProperty.call(data, key)) {
				newArr[key] = data[key];
			}
		}
		setListData(newArr);
	}

	//  展开数据
	function showTargetDataModel() {
		let modelControl = new Promise((resolve) => resolve()).then(async () => {
			let year = yearRef.current;
			let month = monthRef.current;
			let date = dateRef.current;
			// 发送请求获取数据
			let { data, success } = await queryProductionCalendarOrderInfo({ year, month, date });
			// 触发弹框
			props.onClick({ data, success, date: `${year}年${month + 1}月${date}日` });
			modelControl = null;
		});
	}

	// 渲染每一个日期列表项
	let firstIndex = -1; // 当月1号
	let lastIndex = -1; // 下月1号
	let isThisMonth = false; // 是否本月

	function dateCellRender(value) {
		const listData = getListData(value);
		// 得到号
		const date = value.date();

		// 解决ant design calendar 会默认获取3个月数据导致数据重叠的问题
		if (firstIndex === 1 && lastIndex === 1) {
			resetDateCellArr();
		}
		// 设置本月最后一个索引
		if (date === 1 && firstIndex !== -1 && lastIndex === -1) {
			isThisMonth = false;
			lastIndex = date;
		}

		// 设置本月第一个索引
		if (date === 1 && firstIndex === -1 && lastIndex === -1) {
			isThisMonth = true;
			firstIndex = date;
		}

		const el = (
			<ul className='events'>
				{listData.map((item, index) =>
					isThisMonth ? (
						<li key={`${item.content}-${index}`} onClick={() => showTargetDataModel()}>
							{item.content}本月
						</li>
					) : (
						<li
							key={`${item.content}-${index}`}
							className='not-this-month'
							onClick={() => showTargetDataModel()}>
							{item.content}不是本月
						</li>
					),
				)}
			</ul>
		);

		return el;
	}

	// 清空日期数组
	async function resetDateCellArr(moment) {
		firstIndex = -1;
		lastIndex = -1;
		isThisMonth = false;

		if (!moment) return;

		// 设置当前点击的日期
		yearRef.current = moment.year();
		monthRef.current = moment.month();
		dateRef.current = moment.date();
	}

	// 自定义头部渲染
	function headerRender({ value, onChange }) {
		// 记录今天的日期
		const today = moment().locale('zh-cn');
		const start = 0;
		const end = 12;
		const monthOptions = [];

		const current = value.clone();
		const localeData = value.localeData();

		const months = [];
		for (let i = 0; i < 12; i++) {
			current.month(i);
			months.push(localeData.monthsShort(current));
		}

		for (let index = start; index < end; index++) {
			monthOptions.push(
				<Select.Option className='month-item' key={`${index}`}>
					{months[index]}
				</Select.Option>,
			);
		}
		const month = value.month();

		const year = value.year();
		const options = [];
		for (let i = year - 10; i < year + 10; i += 1) {
			options.push(
				<Select.Option key={i} value={i} className='year-item'>
					{i}
				</Select.Option>,
			);
		}
		return (
			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginBottom: 15,
					padding: 8,
				}}>
				<Row gutter={8}>
					<Col>
						<Button
							style={{ marginRight: '8px' }}
							onClick={() => {
								onChange(today);
							}}>
							返回今天
						</Button>
						<Select
							dropdownMatchSelectWidth={false}
							className='my-year-select'
							onChange={(newYear) => {
								const now = value.clone().year(newYear);
								onChange(now);
							}}
							value={String(year)}>
							{options}
						</Select>
					</Col>
					<Col>
						<Select
							dropdownMatchSelectWidth={false}
							value={String(month)}
							onChange={(selectedMonth) => {
								const newValue = value.clone();
								newValue.month(parseInt(selectedMonth, 10));
								onChange(newValue);
							}}>
							{monthOptions}
						</Select>
					</Col>
				</Row>
			</div>
		);
	}

	return (
		<div>
			<Calendar
				headerRender={headerRender}
				dateCellRender={dateCellRender}
				onSelect={resetDateCellArr}
			/>
		</div>
	);
};

export default CalendarComponent;
