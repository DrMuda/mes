import './css/ArrangeChart.less';

const RenderDateBar = ({ startDate, endDate, className }) => {
	// 1. 盘点日期是否是小于当前时间，小于则从当前时间开始
	let currentDate = new Date();
	let startDays = 0; // 开始日期差(left)
	let endDays = 0; // 结束日期差
	let totalDays = 0; // 总日期差(width)

	let startDateObj = new Date(startDate);
	let endDateObj = new Date(endDate);
	let isToday = false; // 是否是今天

	if (startDateObj <= currentDate) {
		// 结束日期不用盘点，因为结束日期不可能小于开始日期
		startDateObj.setTime(currentDate.getTime());
		isToday = true;
	}

	// 得到日期差
	startDays = Math.ceil((startDateObj - currentDate) / (1000 * 60 * 60 * 24));
	endDays = Math.ceil((endDateObj - currentDate) / (1000 * 60 * 60 * 24));
	totalDays = endDays - startDays;

	// console.log('left-start：', startDays, 'left-end：', endDays, 'width：', totalDays);

	let customStyle = {
		left: startDays * 6.5,
		width: totalDays * 6.5,
	};

	return (
		<div className='progress-box'>
			<div className={`progress-bar ${className}`} style={customStyle}>
				{!isToday && <span className='start-date'>{startDate}</span>}
				<span className='end-date'>{endDate}</span>
			</div>
		</div>
	);
};

const RenderOrderPlanItem = ({ planList }) => {
	return planList.map((item, index) => {
		let orderPlanItemClassName = ['order-plan-item'];
		item.isCurrent && orderPlanItemClassName.push('current');
		item.isAffected && orderPlanItemClassName.push('affected');

		let customerRequestDate = item.customerRequestDate;
		let scheduledDate = item.scheduledDate;

		return (
			<li className={orderPlanItemClassName.join(' ')} key={`order-plan-item-${index}`}>
				<div className='field'>
					<div className='top-area'>
						<p>订单编号：{item.orderNumber}</p>
					</div>
					<div className='bottom-area'>
						<p>{item.types.join(' | ')}</p>
					</div>
				</div>
				<div className='chart-box'>
					<div className='top-area'>
						<RenderDateBar
							className='progress-bar-1'
							startDate={customerRequestDate.start}
							endDate={customerRequestDate.end}
						/>
					</div>
					<div className='bottom-area'>
						<RenderDateBar
							className='progress-bar-2'
							startDate={scheduledDate.start}
							endDate={scheduledDate.end}
						/>
					</div>
				</div>
			</li>
		);
	});
};

const ArrangeChart = (props) => {
	const check = () => {
		props.onClick(props.planKey);
	};

	return (
		<div className='arrange-chart-area'>
			<div className='top-area'>
				<h4>{props.title}：</h4>
				<div className='legend-area'>
					<div className='legend-item'>
						<span className='legend-progress-bar legend-1'></span>
						<span className='legend-text'>客户要求日期</span>
					</div>
					<div className='legend-item'>
						<span className='legend-progress-bar legend-2'></span>
						<span className='legend-text'>排程预计日期</span>
					</div>
				</div>
			</div>
			{/* -------------------------------------------------- */}
			<ul className='order-plan-list'>
				<RenderOrderPlanItem planList={props.planList} />
			</ul>
			{/* -------------------------------------------------- */}
			{props.onClick && (
				<div className='bottom-area'>
					<button className='check-plan' onClick={check}>
						选择
					</button>
				</div>
			)}
		</div>
	);
};

export default ArrangeChart;
