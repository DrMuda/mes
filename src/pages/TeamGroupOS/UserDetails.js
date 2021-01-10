import { Component } from 'react';
import { Card, Row, Col, Button, Modal, Form, Input, Select } from 'antd';
import { connect } from 'dva';
import { history } from 'umi';
import { Chart } from '@antv/g2';
import ProTable from '@ant-design/pro-table';
import Block from './component/Block';
const namespace = 'UserList';
const mapStateToProps = (state) => {
	let productionRecord = state[namespace].record;
	let groupList = state[namespace].groupList;
	let performanceList = state[namespace].performanceList;
	return {
		productionRecord,
		groupList,
		performanceList,
	};
};
const mapDispatchToprops = (dispatch) => {
	return {
		getProductionRecord: (userId) => {
			dispatch({
				type: `${namespace}/getProductionRecord`,
				userId: userId,
			});
		},
		getPerformanceList: (userId) => {
			dispatch({
				type: `${namespace}/getPerformanceList`,
				userId: userId,
			});
		},
		getGroupList: () => {
			dispatch({
				type: `${namespace}/getGroupList`,
			});
		},
	};
};
//展示多少条记录
const showRecordSum = 5;
//图表展示多少个月
const showMonths = 12;
class UserDetails extends Component {
	formRef = React.createRef();
	constructor(props) {
		super(props);
		this.renderPerformance = this.renderPerformance.bind(this);
		this.changeUserInfo = this.changeUserInfo.bind(this);
		this.submit = this.submit.bind(this);
		this.state = {
			isModalShow: false,
			userId: '',
			userNewInfo: {
				name: '',
				id: '',
				group: '',
			},
		};
	}
	componentDidMount() {
		this.props.getProductionRecord(history.location.query.userId);
		this.props.getPerformanceList(history.location.query.userId);
		this.props.getGroupList();
		//记录初始的人员工号，用于修改人员信息
		this.setState({
			userId: history.location.query.userId,
		});
	}
	//渲染月度绩效图表
	renderPerformance() {
		let dataList = this.props.performanceList;
		if (dataList && dataList.toString() != '') {
			dataList.sort((a, b) => {
				let aTime = new Date(a).getTime();
				let bTime = new Date(b).getTime();
				return aTime - bTime;
			});
			if (dataList.length > showMonths) {
				dataList = dataList.slice(dataList.length - showMonths);
			}
			let chartData = [];
			dataList.map((data) => {
				let planOutput = data.planOutput;
				let realOutput = data.realOutput;
				chartData.push({ month: data.date, output: planOutput, type: '计划产量' });
				chartData.push({ month: data.date, output: realOutput, type: '实际产量' });
				chartData.push({
					month: data.date,
					efficiency: parseInt((realOutput / planOutput) * 100),
					type: '效率',
				});
			});
			//图表数据
			const chart = new Chart({
				container: 'container',
				autoFit: true,
				padding: [50, 130, 20, 40],
			});
			chart.data(chartData);
			//绘制区间
			chart
				.interval()
				//数据调整
				.adjust([
					{
						//分组
						type: 'dodge',
						//每一组之间的间隙为0.1个柱子宽度
						marginRatio: 0.1,
						dodgeBy: 'type',
					},
				])
				.position('month*output')
				.color('type', (type) => {
					if (type == '计划产量') {
						return '#003a8c';
					} else if (type == '实际产量') {
						return '#d46b08';
					} else {
						return '#434343';
					}
				});
			//绘制线
			chart
				.line()
				.position('month*efficiency')
				.color('type', () => '#434343');
			//指定坐标轴最大最小值、刻度数量
			chart.scale('output', {
				min: 0,
				max: 1000,
				tickCount: 10,
			});
			chart.scale('efficiency', {
				min: 0,
				max: 200,
				tickCount: 10,
				formatter: (v, k) => {
					//v是刻度的值，k是第几个刻度
					return v + '%';
				},
			});
			chart.scale('month', {
				formatter: (v, k) => {
					//只显示月份
					return v.split('/')[1] + '月';
				},
			});
			//指定图例位置
			chart.legend({
				position: 'right',
			});
			//图表提示文本
			chart.annotation().text({
				content: '月度绩效',
				//位置，[x,y]
				//{month:"6月",output:"900"}
				position: ['45%', '-10%'],
				//文本在顶层
				top: true,
				//文本样式
				style: {
					fontSize: 30,
					opacity: 0.6,
				},
			});
			chart.tooltip({
				shared: true,
			});
			chart.interaction('active-region');
			chart.render();
		}
	}
	changeUserInfo() {
		this.setState({
			isModalShow: true,
		});
	}
	//编辑人员卡片提交数据
	submit() {
		let name = this.formRef.current.getFieldValue('name');
		let id = this.formRef.current.getFieldValue('id');
		let group = this.formRef.current.getFieldValue('group');
		//去头尾空格
		name = name.replace(/(^\s*)|(\s*$)/g, '');
		id = id.replace(/(^\s*)|(\s*$)/g, '');
		group = group.replace(/(^\s*)|(\s*$)/g, '');
		let flag = true;
		if (!name) {
			flag = false;
		} else if (!id) {
			flag = false;
		} else if (!group) {
			flag = false;
		}
		if (flag) {
			new Promise((resolve, reject) => {
				let xhr = new XMLHttpRequest();
				xhr.open(
					'POST',
					'/updataUser?userId=' +
						this.state.userId +
						'&newId=' +
						id +
						'&newName=' +
						name +
						'&newGroup=' +
						group,
				);
				xhr.send(null);
				xhr.onreadystatechange = () => {
					if (xhr.readyState == 4) {
						if (xhr.status == 200) {
							let msg = xhr.responseText;
							resolve(msg);
						} else {
							reject('人员信息未修改');
						}
					}
				};
			}).then(
				(value) => {
					alert(value);
					history.push('/TeamGroupOS/UserDetails?userId=' + id);
					this.props.getProductionRecord(id);
					this.setState({
						userId: id,
						isModalShow: false,
					});
				},
				(reason) => {
					alert(reason);
					this.setState({
						isModalShow: false,
					});
				},
			);
		} else {
			alert('信息未填写完整');
		}
	}
	//当props发生改变时会被调用
	//目前不推荐使用，但是只能用这个
	UNSAFE_componentWillReceiveProps(props) {
		//刚开始渲染时，DOM树还没有生成，柱状图无法找到容器，会报错
		//所以先判断容器是否存在，在后面重新渲染时就能找到容器
		if (document.getElementById('container') != null) {
			//判断productionRecord是否为空对象，空对象没有数据，也就不需要生成图表
			if (JSON.stringify(props.productionRecord) != '{}') {
				//由于是追加的形式，所以需要清除原来的内容
				document.getElementById('container').innerHTML = null;
				this.renderPerformance();
			}
		}
	}
	render() {
		//编辑人员信息的表单
		let pRecord = this.props.productionRecord;
		let form = (
			<Form
				style={{ width: '400px', margin: '0 auto', marginTop: '10px' }}
				ref={this.formRef}
				initialValues={{
					name: pRecord.userName,
					id: pRecord.userId,
					group: pRecord.userGroupId,
				}}>
				<Form.Item label={'姓名'} name='name' required={true}>
					<Input />
				</Form.Item>
				<Form.Item label={'工号'} name='id' required={true}>
					<Input />
				</Form.Item>
				<Form.Item label={'组别'} name='group' required={true}>
					<Select>
						{(() => {
							let options = [];
							if (this.props.groupList.length != 0) {
								this.props.groupList.map((group) => {
									group.team.map((team, index) => {
										options.push(
											<Select.Option
												value={group.id + '-' + (index + 1)}
												key={group.id + '-' + (index + 1)}>
												{group.name + team}
											</Select.Option>,
										);
									});
								});
							}
							return options;
						})()}
					</Select>
				</Form.Item>
			</Form>
		);
		//人员信息卡片
		let userCard = (
			<Card
				bordered={true}
				style={{ border: '1px solid #a0a0a0', width: '100%', height: '100%' }}>
				<p style={{ fontSize: '30px', fontWeight: 'bold' }}>{pRecord.userName}</p>
				<Row justify={'space-between'}>
					<Col>
						<Row>
							<Col>工号：{pRecord.userId}</Col>
						</Row>
						<Row>
							<Col>组别：{pRecord.userGroup}</Col>
						</Row>
					</Col>
					<Col>
						<Button onClick={this.changeUserInfo}>编辑</Button>
						<Modal
							visible={this.state.isModalShow}
							onCancel={() => {
								this.setState({
									isModalShow: false,
								});
							}}
							onOk={this.submit}
							title='编辑'>
							{form}
						</Modal>
					</Col>
				</Row>
			</Card>
		);
		let tableColumns;
		let tableDataSource;
		if (JSON.stringify(pRecord) !== '{}') {
			//固定的两列
			tableColumns = [
				{
					title: <Block data={['序号', '日期']} fontWeight='bold' />,
					dataIndex: 'sequenceNumberAndDate',
					key: 'sequenceNumberAndDate',
					align: 'center',
				},
				{
					title: (
						<Block data={['生产成品', '设备数量', '设备总产量']} fontWeight='bold' />
					),
					dataIndex: 'overview',
					key: 'overview',
					align: 'center',
				},
			];
			let equipmentSum = pRecord.equipmentSum;
			//根据设备数量生成不定数量列
			for (let i = 0; i < equipmentSum; i++) {
				let col = {};
				col.title = <Block data={['负责设备', '设备产量']} fontWeight='bold' />;
				col.dataIndex = 'equipment' + (i + 1);
				col.key = 'equipment' + (i + 1);
				col.align = 'center';
				tableColumns.push(col);
			}
			tableDataSource = [];
			if (pRecord.dataList.length != 0) {
				let sequenceNumber = 1;
				//根据日期升序排序
				pRecord.dataList.sort((a, b) => {
					let aTime = new Date(a.date).getTime();
					let bTime = new Date(b.date).getTime();
					return aTime - bTime;
				});
				if (pRecord.dataList.length > showRecordSum) {
					pRecord.dataList = pRecord.dataList.slice(
						pRecord.dataList.length - showRecordSum,
					);
				}
				pRecord.dataList.map((data) => {
					let row = {};
					let totalOuput = 0;
					if (data.equipment.length != 0) {
						data.equipment.map((equipment, index) => {
							totalOuput += equipment.output;
							row['equipment' + (index + 1)] = (
								<Block data={[equipment.id, equipment.output + '斤']} />
							);
						});
					}
					row.sequenceNumberAndDate = <Block data={[sequenceNumber, data.date]} />;
					row.overview = (
						<Block
							data={[
								data.productType,
								data.equipment.length + '台',
								totalOuput + '斤',
							]}
						/>
					);
					row.key = sequenceNumber;
					tableDataSource.push(row);
					sequenceNumber++;
				});
			}
		}
		return (
			<Card style={{ width: '1024px', margin: '0 auto' }}>
				<Row justify='start' align='middle' id='containerRow'></Row>
				<Row justify='start' align='middle'>
					<Col style={{ width: 300, height: 180, padding: '10px' }}>
						{/* 人员卡片 */}
						{userCard}
					</Col>
					<Col style={{ border: '1px solid #a0a0a0', padding: '10px' }} flex='auto'>
						{/* 柱状图容器 */}
						<div
							id='container'
							style={{ width: '100%', height: 250, padding: '10px' }}></div>
					</Col>
				</Row>
				<ProTable
					columns={tableColumns}
					bordered={true}
					dataSource={tableDataSource}
					search={false}
					toolbar={{
						settings: [],
					}}></ProTable>
			</Card>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(UserDetails);
