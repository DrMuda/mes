import { Card, Row, Col, Button, Empty } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';
import Block from './component/Block';
import { history } from 'umi';

const namespace = 'TeamDetails';
const mapStateToProps = (state) => {
	let frequency = state[namespace].frequency;
	let working = state[namespace].workingGroup;
	return {
		frequency,
		working,
	};
};
const mapDispatchToprops = (dispatch) => {
	return {
		getFrequency: () => {
			dispatch({
				type: `${namespace}/getFrequency`,
			});
		},
		getWorkingGroup: () => {
			dispatch({
				type: `${namespace}/getWorkingGroup`,
			});
		},
	};
};
let interval;
//蓝黄绿红橙紫
const baseColor = ['#0099FF', '#FFCC00', '#009966', '#CC3333', '#fa8c16', '#722ed1'];
class TeamDetails extends Component {
	constructor(props) {
		super(props);
		this.getSomeGroups = this.getSomeGroups.bind(this);
		this.props.getFrequency();
		this.props.getWorkingGroup();
	}
	componentDidMount() {
		interval = setInterval(() => {
			this.props.getWorkingGroup();
		}, 60000); //每分钟获取一次正在工作的组别
	}
	componentWillUnmount() {
		//卸载组件时清除定时器
		clearInterval(interval);
	}
	getSomeGroups(groupList, start, sum) {
		//从start的位置开始，轮循获取sum个小组
		let list = [];
		for (let i = 0; i < sum; i++) {
			list.push(groupList[(start + i) % groupList.length]);
		}
		return list;
	}
	render() {
		let borderStyle = '1px solid #a0a0a0';
		let frequency = this.props.frequency;
		let working = this.props.working;
		let tableHeader = '';
		let tableBody = (
			<Card bordered>
				<Empty description='当前没有排班' />
			</Card>
		);
		let tips = (
			<p style={{ marginTop: '20px', marginBottom: '20px', fontSize: '16px' }}>
				<strong>当前工作组</strong>
			</p>
		);
		let workingGroup = (
			<Card bordered>
				<Empty description='当前没有排班' />
			</Card>
		);
		if (frequency && working) {
			if (JSON.stringify(frequency) !== '{}' && JSON.stringify(working) !== '{}') {
				tableHeader = (
					<Row style={{ height: '70px', border: borderStyle }}>
						<Col style={{ width: '70px', borderRight: borderStyle }}>
							{/* 带斜线的表头 */}
							<div
								style={{
									position: 'relative',
									width: '70px',
									height: '70px',
								}}>
								<div
									style={{
										textAlign: 'right',
										height: '35px',
										lineHeight: '35px',
										paddingRight: '5px',
									}}>
									班次
								</div>
								<div
									style={{
										textAlign: 'left',
										height: '35px',
										lineHeight: '35px',
										paddingLeft: '5px',
									}}>
									组别
								</div>
								<div
									style={{
										content: '',
										position: 'absolute',
										width: '1px',
										height: '99px', //70*1.414
										top: '-15px', //(99-70)/2
										left: '35px', //70/2
										backgroundColor: '#909090',
										display: 'block',
										transform: 'rotate(-45deg)',
									}}></div>
							</div>
						</Col>
						<Col style={{ borderRight: borderStyle, width: 'calc((100% - 70px) / 3)' }}>
							<Block
								data={['今日']}
								style={{
									height: '35px',
									borderBottom: borderStyle,
									fontWeight: 'bold',
								}}
							/>
							<Block
								data={frequency.frequencyType.timeSlotList}
								style={{ height: '35px', fontWeight: 'bold' }}
							/>
						</Col>
						<Col style={{ borderRight: borderStyle, width: 'calc((100% - 70px) / 3)' }}>
							<Block
								data={['明日']}
								style={{
									height: '35px',
									borderBottom: borderStyle,
									fontWeight: 'bold',
								}}
							/>
							<Block
								data={frequency.frequencyType.timeSlotList}
								style={{ height: '35px', fontWeight: 'bold' }}
							/>
						</Col>
						<Col style={{ width: 'calc((100% - 70px) / 3)' }}>
							<Block
								data={['后日']}
								style={{
									height: '35px',
									borderBottom: borderStyle,
									fontWeight: 'bold',
								}}
							/>
							<Block
								data={frequency.frequencyType.timeSlotList}
								style={{ height: '35px', fontWeight: 'bold' }}
							/>
						</Col>
					</Row>
				);
				tableBody = frequency.groupList.map((group, index) => {
					//计算出今、明、后天的排班
					let groupList = group.groupList;
					let frequencyType = frequency.frequencyType;
					let timeSlot = frequency.timeSlot;
					let rotation = frequency.rotation;
					//轮询获取几个小组
					let todayList = this.getSomeGroups(
						groupList,
						rotation - timeSlot + frequencyType.timeSlotByTime.length * 0,
						frequencyType.timeSlotByTime.length,
					);
					let tomorrowList = this.getSomeGroups(
						groupList,
						rotation - timeSlot + frequencyType.timeSlotByTime.length * 1,
						frequencyType.timeSlotByTime.length,
					);
					let laterList = this.getSomeGroups(
						groupList,
						rotation - timeSlot + frequencyType.timeSlotByTime.length * 2,
						frequencyType.timeSlotByTime.length,
					);
					//生成文字的对应颜色
					let set = new Set([...todayList, ...tomorrowList, ...laterList]);
					let fontColor = {};
					let counter = 0;
					set.forEach((value) => {
						fontColor[value] = baseColor[counter % baseColor.length];
						counter++;
					});
					return (
						<Row style={{ border: borderStyle, borderTop: '0' }} key={index}>
							<Col style={{ width: '70px', borderRight: borderStyle }}>
								<Block
									data={[group.workshop + '车间']}
									style={{ height: '50px', fontWeight: 'bold' }}
								/>
							</Col>
							<Col
								style={{
									borderRight: borderStyle,
									width: 'calc((100% - 70px) / 3)',
								}}>
								<Block data={todayList} fontColor={fontColor} fontWeight='bold' />
							</Col>
							<Col
								style={{
									borderRight: borderStyle,
									width: 'calc((100% - 70px) / 3)',
								}}>
								<Block
									data={tomorrowList}
									fontColor={fontColor}
									fontWeight='bold'
								/>
							</Col>
							<Col style={{ width: 'calc((100% - 70px) / 3)' }}>
								<Block data={laterList} fontColor={fontColor} fontWeight='bold' />
							</Col>
						</Row>
					);
				});
				tips = (
					<p style={{ marginTop: '20px', marginBottom: '20px', fontSize: '16px' }}>
						<strong>当前工作组</strong>
						<span style={{ marginLeft: '30px' }}>
							({working.nowTime + ' '}
							{working.timeSlotByTime[working.timeSlot]})
						</span>
					</p>
				);
				workingGroup = working.groupList.map((group, index) => {
					return (
						<Row
							style={{
								border: borderStyle,
								borderTop: index == 0 ? borderStyle : '0px',
							}}
							key={index}>
							<Col style={{ width: '70px', borderRight: borderStyle }}>
								<Block
									data={[group.group]}
									style={{ height: '50px', fontWeight: 'bold' }}
								/>
							</Col>
							<Col style={{ width: 'calc(100% - 70px)' }}>
								<Block data={group.userList} />
							</Col>
						</Row>
					);
				});
			}
		}
		return (
			<Card>
				<Row justify='end'>
					<Col style={{ margin: '0 8px 16px 0' }}>
						<Button
							style={{ background: '#1890ff', color: '#fff' }}
							onClick={() => {
								if (frequency && working) {
									if (
										JSON.stringify(frequency) !== '{}' &&
										JSON.stringify(working) !== '{}'
									) {
										history.push('/TeamGroupOS/CurrentSchedulingPlan');
									} else {
										alert('当前没有排班计划');
									}
								} else {
									alert('当前没有排班计划');
								}
							}}>
							查看当前排班计划
						</Button>
					</Col>
					<Col>
						<Button
							style={{ background: '#1890ff', color: '#fff' }}
							onClick={() => {
								history.push('/TeamGroupOS/AddFrequency');
							}}>
							新建排班
						</Button>
					</Col>
				</Row>
				{/* 排班表格 */}
				{tableHeader}
				{tableBody}
				{/* 当前工作组 */}
				{tips}
				{workingGroup}
			</Card>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(TeamDetails);
