import { Component } from 'react';
import { Card, Row, Col, Input, Button, Select, Divider } from 'antd';

import ProCard from '@ant-design/pro-card';
import { connect } from 'dva';
import './CurrentSchedulingPlan.css';
const namespace = 'TeamDetails';
const mapStateToProps = (state) => {
	let frequency = state[namespace].frequency;
	return {
		frequency,
	};
};
const mapDispatchToprops = (dispatch) => {
	return {
		getFrequency: () => {
			dispatch({
				type: `${namespace}/getFrequency`,
			});
		},
	};
};
class CurrentSchedulingPlan extends Component {
	constructor(props) {
		super(props);
		this.createWeekOnDate = this.createWeekOnDate.bind(this);
		this.createFrequencyByWeek = this.createFrequencyByWeek.bind(this);
		this.state = {
			//过滤关键字
			filter: {
				workshopAndGropuName: '',
			},
			//第几周，0是第一周
			week: 4,
			//当前日期处于第几周
			currentWeek: 0,
			//每周的对应的日期
			//[[第一周、第一天日期,第一周、第二天日期,...],[]]
			weekOnDate: [],
			//当前周的排班
			frequencyByWeek: {},
		};
		this.props.getFrequency();
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		this.createWeekOnDate(nextProps.frequency);
	}
	createWeekOnDate(frequency) {
		if (frequency) {
			let startTime = new Date(frequency.startTime.split(' ')[0]);
			let endTime = new Date(frequency.endTime.split(' ')[0]);
			let week = startTime.toDateString().split(' ')[0];
			let weekOnDate = [];
			let tempStartTime;
			//通过bind改变getWeekOnDate的this指向
			getWeekOnDate = getWeekOnDate.bind(this);
			switch (week) {
				case 'Mon':
					weekOnDate = getWeekOnDate(startTime, endTime);
					break;
				case 'Tue':
					tempStartTime = startTime.getTime() - 1000 * 60 * 60 * 24 * 1;
					tempStartTime = new Date(tempStartTime);
					weekOnDate = getWeekOnDate(tempStartTime, endTime);
					break;
				case 'Wed':
					tempStartTime = startTime.getTime() - 1000 * 60 * 60 * 24 * 2;
					tempStartTime = new Date(tempStartTime);
					weekOnDate = getWeekOnDate(tempStartTime, endTime);
					break;
				case 'Thu':
					tempStartTime = startTime.getTime() - 1000 * 60 * 60 * 24 * 3;
					tempStartTime = new Date(tempStartTime);
					weekOnDate = getWeekOnDate(tempStartTime, endTime);
					break;
				case 'Fri':
					tempStartTime = startTime.getTime() - 1000 * 60 * 60 * 24 * 4;
					tempStartTime = new Date(tempStartTime);
					weekOnDate = getWeekOnDate(tempStartTime, endTime);
					break;
				case 'Sat':
					tempStartTime = startTime.getTime() - 1000 * 60 * 60 * 24 * 5;
					tempStartTime = new Date(tempStartTime);
					weekOnDate = getWeekOnDate(tempStartTime, endTime);
					break;
				case 'Sun':
					tempStartTime = startTime.getTime() - 1000 * 60 * 60 * 24 * 6;
					tempStartTime = new Date(tempStartTime);
					weekOnDate = getWeekOnDate(tempStartTime, endTime);
					break;
			}
			this.setState(
				{
					weekOnDate: weekOnDate,
				},
				() => {
					this.createFrequencyByWeek(frequency);
				},
			);
		}
		function getWeekOnDate(startTime, endTime) {
			let lastDay = false;
			let weekOnDate = [];
			let temp = [];
			for (let i = 1; !lastDay; i++) {
				let date = new Date(startTime.getTime() + 1000 * 60 * 60 * 24 * (i - 1));
				temp.push(date.toLocaleDateString());
				// 确定当前是第几周
				if (date.toLocaleDateString() == new Date().toLocaleDateString()) {
					this.setState({
						week: weekOnDate.length,
						currentWeek: weekOnDate.length,
					});
				}
				//每七天作为一组
				if (i % 7 == 0) {
					weekOnDate.push(temp);
					temp = [];
				}
				//当到达结束日期且到达一周的最后一天周日，结束循环
				if (
					new Date(date).getTime() >= endTime.getTime() &&
					date.toString().split(' ')[0] == 'Sun'
				) {
					lastDay = true;
				}
			}
			return weekOnDate;
		}
	}
	//过滤
	filterFrequency(frequency) {
		let frequencyTemp = {};
		if (frequency) {
			for (let workshopName in frequency) {
				let workshop = frequency[workshopName];
				for (let groupName in workshop) {
					let list = workshop[groupName];
					let canPush = true;
					canPush = exist(
						workshopName,
						this.state.filter.workshopAndGropuName.replace(/(^\s*)|(\s*$)/g, ''),
					);
					canPush = exist(
						groupName,
						this.state.filter.workshopAndGropuName.replace(/(^\s*)|(\s*$)/g, ''),
					);

					if (canPush) {
						if (frequencyTemp[workshopName]) {
							frequencyTemp[workshopName][groupName] = list;
						} else {
							frequencyTemp[workshopName] = {};
							frequencyTemp[workshopName][groupName] = list;
						}
					}
				}
			}
		}
		return frequencyTemp;
		function exist(orderValue, filterValue) {
			if (orderValue.toString().indexOf(filterValue) !== -1) {
				return true;
			} else {
				return false;
			}
		}
	}
	createFrequencyByWeek(frequency) {
		let frequencyType = frequency.frequencyType;
		//周一作为一周的开始
		//把所选周的 周一的日期加上 一天排班中 的第一班 的开始时间
		let MondayTime =
			this.state.weekOnDate[this.state.week][0] +
			' ' +
			frequencyType.timeSlotByTime[0].split('-')[0];
		let startTime =
			frequency.startTime.split(' ')[0] + ' ' + frequencyType.timeSlotByTime[0].split('-')[0];

		//得到距离排班开始时间到所选周一的毫秒数
		let day = new Date(MondayTime) - new Date(startTime);
		//毫秒=>秒=>分=>时=>天
		day = parseInt(day / 1000 / 60 / 60 / 24);
		let totalDays = new Date(frequency.endTime) - new Date(frequency.startTime);
		totalDays = parseInt(totalDays / 1000 / 60 / 60 / 24);
		let row = {};
		//计算出一周的排班
		frequency.groupList.map((group, index) => {
			let groupList = group.groupList;
			let list = [];
			for (let i = 0; i < 7; i++) {
				let tempDay = day + i;
				let rotation = tempDay * frequencyType.timeSlotList.length;
				if (tempDay < 0 || tempDay >= totalDays) {
					list.push([]);
				} else {
					list.push(
						getSomeGroups(groupList, rotation, frequencyType.timeSlotList.length),
					);
				}
			}
			//改变数据以坐标的形式储存
			let templist = {};
			// {
			//     "梳棉一组":["0-0","0-1"]
			//     "梳棉二组":["0-0","0-1"]
			// }
			//先预设templist的键，防止出现二组排在一组之前的情况
			groupList.map((groupName) => {
				templist[groupName] = [];
			});
			list.map((l, week) => {
				l.map((group, index) => {
					templist[group].push(week + '-' + index);
				});
			});
			row[group.workshop] = templist;
		});
		row = this.filterFrequency(row);
		this.setState({
			frequencyByWeek: row,
		});
		//轮询获取几个小组
		function getSomeGroups(groupList, start, sum) {
			let list = [];
			for (let i = 0; i < sum; i++) {
				list.push(groupList[(start + i) % groupList.length]);
			}
			return list;
		}
	}
	render() {
		//搜索功能与查看某一周
		let search = (
			<Row justify='space-between' align='middle' style={{ height: '60px' }}>
				<Col>
					<Input
						placeholder='车间名称或班组名称'
						style={{ width: '100px', marginRight: '8px' }}
						value={this.state.filter.workshopAndGropuName}
						onChange={(e) => {
							let filterTemp = this.state.filter;
							filterTemp.workshopAndGropuName = e.target.value;
							this.setState({
								filter: filterTemp,
							});
						}}
						onPressEnter={() => {
							this.createFrequencyByWeek(this.props.frequency);
							this.forceUpdate();
						}}
					/>
					<Button
						onClick={() => {
							this.createFrequencyByWeek(this.props.frequency);
							this.forceUpdate();
						}}
						style={{ background: '#389e0d', color: '#fff', marginRight: '8px' }}>
						查询
					</Button>
					<Button
						onClick={() => {
							this.setState(
								{
									filter: {
										workshopAndGropuName: '',
									},
								},
								() => {
									this.createFrequencyByWeek(this.props.frequency);
									this.forceUpdate();
								},
							);
						}}
						style={{ background: '#1890ff', color: '#fff', marginRight: '8px' }}>
						清空
					</Button>
				</Col>
				<Col>
					<Button
						onClick={() => {
							this.setState(
								{
									week: this.state.currentWeek,
								},
								() => {
									this.createFrequencyByWeek(this.props.frequency);
								},
							);
						}}
						style={{ width: '100px' }}>
						返回本周
					</Button>
					<Divider type='vertical' style={{ background: '#a0a0a0', height: '50px' }} />
					<Select
						onChange={(value) => {
							this.setState(
								{
									week: value,
								},
								() => {
									this.createFrequencyByWeek(this.props.frequency);
								},
							);
						}}
						value={this.state.week}
						style={{ width: '100px' }}>
						{(() => {
							let options = [];
							let weekInCN = [
								'第一周',
								'第二周',
								'第三周',
								'第四周',
								'第五周',
								'第六周',
								'第七周',
								'第八周',
								'第九周',
								'第十周',
							];
							if (this.state.weekOnDate) {
								this.state.weekOnDate.map((a, index) => {
									if (index < weekInCN.length) {
										options.push(
											<Select.Option key={index} value={index}>
												{weekInCN[index]}
											</Select.Option>,
										);
									} else {
										options.push(
											<Select.Option key={index} value={index}>
												{'第' + (index + 1) + '周'}
											</Select.Option>,
										);
									}
								});
							}
							return options;
						})()}
					</Select>
				</Col>
			</Row>
		);
		let minCellHeight = 25;
		let main = () => {
			let rowList = [];
			let sequenceNumber = 0;
			let frequencyByWeek = this.state.frequencyByWeek;
			for (let workshopName in frequencyByWeek) {
				let workshop = frequencyByWeek[workshopName];
				for (let groupName in workshop) {
					sequenceNumber++;
					let group = workshop[groupName];
					let table = new Array();
					if (JSON.stringify(frequencyByWeek) !== '{}') {
						//初始化表格，全部先不打勾
						for (let week = 0; week < 7; week++) {
							table[week] = new Array();
							for (
								let timeSlot = 0;
								timeSlot < this.props.frequency.frequencyType.timeSlotList.length;
								timeSlot++
							) {
								table[week][timeSlot] = (
									<ProCard
										className='nopadding mincell'
										key={week + '-' + timeSlot}></ProCard>
								);
							}
						}
					}
					group.map((coordinate) => {
						let week = parseInt(coordinate.split('-')[0]);
						let timeSlot = parseInt(coordinate.split('-')[1]);
						table[week][timeSlot] = (
							<ProCard className='nopadding mincell' key={week + '-' + timeSlot}>
								√
							</ProCard>
						);
					});
					rowList.push(
						<ProCard
							split='vertical'
							style={{ height: 'auto', borderTop: '1px solid #a0a0a0' }}
							key={sequenceNumber}>
							<ProCard
								style={{ lineHeight: minCellHeight * 3 + 'px' }}
								className='nopadding'>
								{sequenceNumber}
							</ProCard>
							<ProCard
								style={{ lineHeight: minCellHeight * 3 + 'px' }}
								className='nopadding'>
								{workshopName}
							</ProCard>
							<ProCard
								style={{ lineHeight: minCellHeight * 3 + 'px' }}
								className='nopadding'>
								{groupName}
							</ProCard>
							<ProCard split='horizontal'>
								{(() => {
									let typeList = [];
									this.props.frequency.frequencyType.timeSlotList.map(
										(timeSlot, index) => {
											typeList.push(
												<ProCard className='nopadding mincell' key={index}>
													{timeSlot}
												</ProCard>,
											);
										},
									);
									return typeList;
								})()}
							</ProCard>
							{(() => {
								let row = [];
								table.map((col, index) => {
									row.push(
										<ProCard split='horizontal' key={index}>
											{col}
										</ProCard>,
									);
								});
								return row;
							})()}
						</ProCard>,
					);
				}
			}
			return rowList;
		};
		return (
			<Card>
				<Row justify='center' style={{ borderBottom: '1px #000 solid', height: '100px' }}>
					<Col span={8} style={{ minWidth: '300px' }}>
						<Row justify='end' style={{ marginBottom: '16px' }}>
							<Col>排班计划开始时间：</Col>
							<Col span={12}>2020/12/01 0:00</Col>
						</Row>
						<Row justify='end'>
							<Col>班次：</Col>
							<Col span={12}>正常生产班次</Col>
						</Row>
					</Col>
					<Col span={8} style={{ minWidth: '300px' }}>
						<Row justify='end'>
							<Col>排班计划结束时间：</Col>
							<Col span={12}>2020/12/31 24:00</Col>
						</Row>
					</Col>
				</Row>
				{search}
				<Row>
					<ProCard
						title='排班详情'
						split='horizontal'
						bordered
						headerBordered
						style={{ border: '1px solid #a0a0a0' }}>
						<ProCard
							split='vertical'
							style={{ height: 'auto', borderTop: '1px solid #a0a0a0' }}>
							<ProCard
								style={{ lineHeight: minCellHeight * 2 + 'px' }}
								className='nopadding'>
								序号
							</ProCard>
							<ProCard
								style={{ lineHeight: minCellHeight * 2 + 'px' }}
								className='nopadding'>
								车间
							</ProCard>
							<ProCard
								style={{ lineHeight: minCellHeight * 2 + 'px' }}
								className='nopadding'>
								班组
							</ProCard>
							<ProCard
								style={{ lineHeight: minCellHeight * 2 + 'px' }}
								className='nopadding'>
								班次类型
							</ProCard>
							{(() => {
								let proCardList = [];
								if (this.state.weekOnDate[this.state.week]) {
									this.state.weekOnDate[this.state.week].map((date, index) => {
										let weekInCN = [
											'周一',
											'周二',
											'周三',
											'周四',
											'周五',
											'周六',
											'周日',
										];
										proCardList.push(
											<ProCard split='horizontal' key={index}>
												<ProCard className='nopadding mincell'>
													{weekInCN[index]}
												</ProCard>
												<ProCard className='nopadding mincell'>
													{date.split('/')[1] + '/' + date.split('/')[2]}
												</ProCard>
											</ProCard>,
										);
									});
								}
								return proCardList;
							})()}
						</ProCard>
						{main()}
					</ProCard>
				</Row>
			</Card>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(CurrentSchedulingPlan);
