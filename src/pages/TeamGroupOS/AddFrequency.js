import moment from 'moment';
import React from 'react';
import { Component } from 'react';
import { Card, DatePicker, Form, Select, Row, Col, Button, Modal, Table } from 'antd';
import { connect } from 'dva';
import {
	ArrowUpOutlined,
	ArrowDownOutlined,
	PlusOutlined,
	DeleteOutlined,
} from '@ant-design/icons';
import { history } from 'umi';
import './AddFrequency.css';
import { addFrequency } from '@/services/TeamGroupOS/teamDetails';

const namespace = 'TeamDetails';
const mapStateToProps = (state) => {
	const { frequencyTypeList, workshopList } = state[namespace];
	return {
		frequencyTypeList,
		workshopList,
	};
};
const mapDispatchToprops = (dispatch) => {
	return {
		getFrequencyTypeList: () => {
			dispatch({
				type: `${namespace}/getFrequencyTypeList`,
			});
		},
		getWorkshopList: () => {
			dispatch({
				type: `${namespace}/getWorkshopList`,
			});
		},
	};
};
class AddFrequency extends Component {
	constructor(props) {
		super(props);
		this.range = this.range.bind(this);
		this.addWorkshop = this.addWorkshop.bind(this);
		this.addGroup = this.addGroup.bind(this);
		this.delWorkshop = this.delWorkshop.bind(this);
		this.delGroup = this.delGroup.bind(this);
		this.moveUp = this.moveUp.bind(this);
		this.moveDown = this.moveDown.bind(this);
		this.submit = this.submit.bind(this);
		this.state = {
			startTime: undefined,
			endTime: undefined,
			frequencyType: '',
			newFrequency: [],
			addWorkshopModalIsShow: false,
			addGroupModalIsShow: false,
			addGroupModalOpenByWorkshopId: '',
			selectedWorkshops: [],
			selectedGroups: {
				id: [],
				name: [],
			},
		};
		this.props.getFrequencyTypeList();
		this.props.getWorkshopList();
	}

	// 取指定范围整数数组
	range(start, end) {
		const result = [];
		for (let i = start; i < end; i += 1) {
			result.push(i);
		}
		return result;
	}

	// 添加车间
	addWorkshop() {
		const newFrequency = this.state.newFrequency.map((frequency) => {
			return JSON.parse(JSON.stringify(frequency));
		});
		this.props.workshopList.map((workshop) => {
			if (this.state.selectedWorkshops.indexOf(workshop.id) !== -1) {
				let exist = false;
				newFrequency.map((frequency) => {
					if (frequency.workshopId === workshop.id) {
						exist = true;
					}
					return frequency;
				});
				if (!exist) {
					newFrequency.push({
						workshopName: workshop.name,
						workshopId: workshop.id,
						groupList: [],
						groupId: [],
					});
				}
			}
			return workshop;
		});
		this.setState({
			newFrequency,
			addWorkshopModalIsShow: false,
		});
	}

	// 添加小组
	addGroup() {
		const newFrequency = this.state.newFrequency.map((frequency) => {
			return JSON.parse(JSON.stringify(frequency));
		});
		newFrequency.map((frequency) => {
			if (frequency.workshopId === this.state.addGroupModalOpenByWorkshopId) {
				const { groupList, groupId } = frequency;
				this.state.selectedGroups.id.map((id, index) => {
					const indexOf = groupId.indexOf(id);
					if (indexOf === -1) {
						groupList.push(this.state.selectedGroups.name[index]);
						groupId.push(id);
					}
					return id;
				});
				frequency.groupList = groupList;
				frequency.groupId = groupId;
			}
		});
		this.setState({
			newFrequency,
			addGroupModalIsShow: false,
			selectedGroups: {
				id: [],
				name: [],
			},
		});
	}

	// 删除车间
	delWorkshop(workshopId) {
		const newFrequency = this.state.newFrequency.map((frequency) => {
			return JSON.parse(JSON.stringify(frequency));
		});
		this.state.newFrequency.map((frequency, index) => {
			if (frequency.workshopId === workshopId) {
				newFrequency.splice(index, 1);
			}
			return frequency;
		});
		this.setState({
			newFrequency: newFrequency,
		});
	}

	// 删除小组
	delGroup(workshopId, groupId) {
		let newFrequency = this.state.newFrequency.map((frequency) => {
			return JSON.parse(JSON.stringify(frequency));
		});
		this.state.newFrequency.map((frequency, frequencyIndex) => {
			if (frequency.workshopId === workshopId) {
				frequency.groupId.map((id, index) => {
					if (groupId === id) {
						newFrequency[frequencyIndex].groupId.splice(index, 1);
						newFrequency[frequencyIndex].groupList.splice(index, 1);
					}
				});
			}
		});
		this.setState({
			newFrequency,
		});
	}

	// 上移
	moveUp(workshopId, groupId) {
		const newFrequency = this.state.newFrequency.map((frequency) => {
			return JSON.parse(JSON.stringify(frequency));
		});
		this.state.newFrequency.map((frequency, frequencyIndex) => {
			if (frequency.workshopId === workshopId) {
				frequency.groupId.map((id, index) => {
					if (groupId === id && index !== 0) {
						const tempGroupId = newFrequency[frequencyIndex].groupId[index];
						const tempGroupName = newFrequency[frequencyIndex].groupList[index];
						newFrequency[frequencyIndex].groupId.splice(index, 1);
						newFrequency[frequencyIndex].groupId.splice(index - 1, 0, tempGroupId);
						newFrequency[frequencyIndex].groupList.splice(index, 1);
						newFrequency[frequencyIndex].groupList.splice(index - 1, 0, tempGroupName);
					}
				});
			}
			return frequency;
		});
		this.setState({
			newFrequency,
		});
	}

	// 下移
	moveDown(workshopId, groupId) {
		const newFrequency = this.state.newFrequency.map((frequency) => {
			return JSON.parse(JSON.stringify(frequency));
		});
		this.state.newFrequency.map((frequency, frequencyIndex) => {
			if (frequency.workshopId === workshopId) {
				frequency.groupId.map((id, index) => {
					if (groupId === id && index !== frequency.groupId.length - 1) {
						const tempGroupId = newFrequency[frequencyIndex].groupId[index];
						const tempGroupName = newFrequency[frequencyIndex].groupList[index];
						newFrequency[frequencyIndex].groupId.splice(index, 1);
						newFrequency[frequencyIndex].groupId.splice(index + 1, 0, tempGroupId);
						newFrequency[frequencyIndex].groupList.splice(index, 1);
						newFrequency[frequencyIndex].groupList.splice(index + 1, 0, tempGroupName);
					}
				});
			}
			return frequency;
		});
		this.setState({
			newFrequency,
		});
	}

	// 提交
	async submit() {
		let flag = true;
		let frequency = {};
		frequency.groupList = [];
		if (this.state.newFrequency.length > 0) {
			this.state.newFrequency.map((tempFrequency) => {
				if (tempFrequency.groupId.length > 0) {
					frequency.groupList.push({
						groupList: tempFrequency.groupId,
						workshop: tempFrequency.workshopId,
					});
				} else {
					flag = false;
				}
			});
		} else {
			flag = false;
		}
		if (this.state.startTime) {
			frequency.startTime = this.state.startTime;
		} else {
			flag = false;
		}
		if (this.state.endTime) {
			frequency.endTime = this.state.endTime;
		} else {
			flag = false;
		}
		if (this.state.frequencyType) {
			frequency.frequencyType = this.state.frequencyType;
		} else {
			flag = false;
		}
		if (flag) {
			const result = await addFrequency({ frequency });
			if (result.success) {
				alert('新建排班成功');
				history.push('/TeamGroupOS/TeamDetails');
			} else {
				alert('新建排班失败');
			}
		} else {
			alert('信息未填写完整');
		}
	}

	render() {
		return (
			<Card>
				<Form labelAlign='right'>
					<Form.Item label='排班计划开始时间：' required={true} labelCol={{ span: 12 }}>
						<DatePicker
							style={{ width: '200px' }}
							showTime={{ format: 'HH:mm' }}
							format='YYYY-MM-DD HH:mm'
							onOk={(tempValue) => {
								if (tempValue) {
									let value = moment(tempValue).startOf('minutes');
									value = value.toArray();
									this.setState({
										startTime: `${value[0]}/${value[1] + 1}/${value[2]} ${
											value[3]
										}:${value[4]}`,
									});
								} else {
									this.setState({
										startTime: undefined,
									});
								}
							}}
							value={this.state.startTime ? moment(this.state.startTime) : ''}
							onChange={(tempValue) => {
								if (tempValue) {
									let value = moment(tempValue).startOf('minutes');
									value = value.toArray();
									this.setState({
										startTime: `${value[0]}/${value[1] + 1}/${value[2]} ${
											value[3]
										}:${value[4]}`,
									});
								} else {
									this.setState({
										startTime: undefined,
									});
								}
							}}
							disabledDate={(current) => {
								// 如果endTime不为假值，根据endTime禁用一个月前的日期
								// 否则禁用今天之前的日期
								if (current) {
									if (this.state.endTime) {
										const endTime = moment(this.state.endTime).startOf('date');
										const minTime = moment(endTime);
										// month(1)，在原日期基础上加一个月，如果类似1月31号加一个月，则会是2月29号，不会溢出
										// 一个月内的最小日期
										minTime.month(minTime.month() - 1);
										const tempCurrent = moment(current).startOf('date');
										// 禁用超出结束时间和超出一个月前的
										return (
											tempCurrent > endTime ||
											tempCurrent < minTime ||
											tempCurrent < moment()
										);
									}
									return current < moment();
								}
								return true;
							}}
							disabledTime={(date) => {
								return {
									disabledHours: () => {
										if (this.state.endTime && date) {
											const h = moment(this.state.endTime).hour();
											const endTime = moment(this.state.endTime).endOf(
												'date',
											);
											const minTime = moment(endTime);
											const tempDate = moment(date).endOf('date');
											minTime.month(minTime.month() - 1);
											if (tempDate.toString() == endTime.toString()) {
												//如果选择的时间在结束时间
												if (date.hour() > h) {
													date.hour(h);
												}
												return this.range(h + 1, 24);
											} else if (tempDate.toString() === minTime.toString()) {
												//如果选择的时间在一个月内最早的一天
												if (date.hour() < h) {
													date.hour(h);
												}
												return this.range(0, h);
											}
											return [];
										}
										return [];
									},
									disabledMinutes: () => {
										if (this.state.endTime && date) {
											const m = moment(this.state.endTime).minute();
											const endTime = moment(this.state.endTime).endOf(
												'hour',
											);
											const minTime = moment(endTime);
											const tempDate = moment(date).endOf('hour');
											minTime.month(minTime.month() - 1);
											if (tempDate.toString() === endTime.toString()) {
												if (date.minute() >= m) {
													date.minute(m - 1);
												}
												return this.range(m, 60);
											} else if (tempDate.toString() == minTime.toString()) {
												if (date.minute() <= m) {
													date.minute(m + 1);
												}
												return this.range(0, m + 1);
											}
											return [];
										}
										return [];
									},
								};
							}}
						/>
					</Form.Item>
					<Form.Item label='排班计划结束时间：' required={true} labelCol={{ span: 12 }}>
						<DatePicker
							style={{ width: '200px' }}
							showTime={{ format: 'HH:mm' }}
							format='YYYY-MM-DD HH:mm'
							onOk={(tempValue) => {
								if (tempValue) {
									let value = moment(tempValue).startOf('minutes');
									value = value.toArray();
									this.setState({
										endTime: `${value[0]}/${value[1] + 1}/${value[2]} ${
											value[3]
										}:${value[4]}`,
									});
								} else {
									this.setState({
										endTime: undefined,
									});
								}
							}}
							value={this.state.endTime ? moment(this.state.endTime) : ''}
							onChange={(tempValue) => {
								if (tempValue) {
									let value = moment(tempValue).startOf('minutes');
									value = value.toArray();
									this.setState({
										endTime: `${value[0]}/${value[1] + 1}/${value[2]} ${
											value[3]
										}:${value[4]}`,
									});
								} else {
									this.setState({
										endTime: undefined,
									});
								}
							}}
							disabledDate={(current) => {
								//如果startTime不为假值，根据startTime禁用一个月后的日期
								//否则禁用今天之前的日期
								if (this.state.startTime) {
									const startTime = moment(this.state.startTime).startOf('date');
									const maxTime = moment(startTime);
									const tempCurrent = moment(current).startOf('date');
									maxTime.month(maxTime.month() + 1);
									return tempCurrent < startTime || tempCurrent > maxTime;
								}
								return current && current < moment();
							}}
							disabledTime={(date) => {
								return {
									disabledHours: () => {
										if (this.state.startTime && date) {
											const h = moment(this.state.startTime).hour();
											const startTime = moment(this.state.startTime).startOf(
												'date',
											);
											const maxTime = moment(startTime);
											const tempDate = moment(date).startOf('date');
											maxTime.month(maxTime.month() + 1);
											if (tempDate.toString() === startTime.toString()) {
												if (date.hour() < h) {
													date.hour(h);
												}
												return this.range(0, h);
											} else if (tempDate.toString() == maxTime.toString()) {
												if (date.hour() > h) {
													date.hour(h);
												}
												return this.range(h + 1, 24);
											}
											return [];
										}
										return [];
									},
									disabledMinutes: () => {
										if (this.state.startTime && date) {
											const m = moment(this.state.startTime).minute();
											const startTime = moment(this.state.startTime).startOf(
												'hour',
											);
											const maxTime = moment(startTime);
											const tempDate = moment(date).startOf('hour');
											maxTime.month(maxTime.month() + 1);
											if (tempDate.toString() === startTime.toString()) {
												if (date.minute() <= m) {
													date.minute(m + 1);
												}
												return this.range(0, m + 1);
											} else if (tempDate.toString() == maxTime.toString()) {
												if (date.minute() >= m) {
													date.minute(m - 1);
												}
												return this.range(m, 60);
											}
											return [];
										}
										return [];
									},
								};
							}}
						/>
					</Form.Item>
					<Form.Item label='选择班次模式：' required={true} labelCol={{ span: 12 }}>
						<Select
							style={{ width: '200px' }}
							onChange={(value) => {
								if (value) {
									this.setState({
										frequencyType: value,
									});
								}
							}}>
							{(() => {
								const options = [];
								if (this.props.frequencyTypeList) {
									this.props.frequencyTypeList.map((frequencyType, index) => {
										options.push(
											<Select.Option key={index} value={frequencyType.type}>
												{frequencyType.name}
												{`(${frequencyType.timeSlotList.join('/')})`}
											</Select.Option>,
										);
									});
								}
								return options;
							})()}
						</Select>
					</Form.Item>
				</Form>
				<div>
					{/* 选择车间对话框 */}
					{(() => {
						const tableColumns = [
							{
								title: '车间编号',
								dataIndex: 'workshopId',
								key: 'workshopId',
							},
							{
								title: '车间名称',
								dataIndex: 'workshopName',
								key: 'workshopName',
							},
						];
						const tableData = [];
						const { workshopList } = this.props;
						if (workshopList) {
							workshopList.map((workshop) => {
								tableData.push({
									workshopId: workshop.id,
									workshopName: workshop.name,
									key: workshop.id,
								});
								return workshop;
							});
						}
						const addWorkshopModal = (
							<Modal
								title='选择车间'
								visible={this.state.addWorkshopModalIsShow}
								onCancel={() => {
									this.setState({
										addWorkshopModalIsShow: false,
									});
								}}
								onOk={this.addWorkshop}>
								<Table
									dataSource={tableData}
									columns={tableColumns}
									rowSelection={{
										type: 'checkbox',
										selectedRowKeys: this.state.selectedWorkshops,
										onChange: (selectedRowKeys) => {
											this.setState({
												selectedWorkshops: selectedRowKeys,
											});
										},
									}}
									onRow={(record) => {
										return {
											onClick: () => {
												const nextSelectedRowKeys = [
													...this.state.selectedWorkshops,
												];
												const index = this.state.selectedWorkshops.indexOf(
													record.key,
												);
												if (index !== -1) {
													nextSelectedRowKeys.splice(index, 1);
												} else {
													nextSelectedRowKeys.push(record.key);
												}
												this.setState({
													selectedWorkshops: nextSelectedRowKeys,
												});
											},
										};
									}}
								/>
							</Modal>
						);
						return addWorkshopModal;
					})()}
					{/* 选择班组对话框 */}
					{(() => {
						const tableColumns = [
							{
								title: '班组编号',
								dataIndex: 'groupId',
								key: 'groupId',
							},
							{
								title: '班组名称',
								dataIndex: 'groupName',
								key: 'groupName',
							},
						];
						const tableData = [];
						const { workshopList } = this.props;
						if (workshopList) {
							workshopList.map((workshop) => {
								if (this.state.addGroupModalOpenByWorkshopId === workshop.id) {
									workshop.groupList.map((group, index) => {
										tableData.push({
											groupId: workshop.groupId[index],
											groupName: workshop.name + group,
											key: workshop.groupId[index],
										});
									});
								}
								return workshop;
							});
						}
						const addGroupModal = (
							<Modal
								title='选择班组'
								visible={this.state.addGroupModalIsShow}
								onCancel={() => {
									this.setState({
										addGroupModalIsShow: false,
									});
								}}
								onOk={this.addGroup}>
								<Table
									dataSource={tableData}
									columns={tableColumns}
									rowSelection={{
										type: 'checkbox',
										selectedRowKeys: this.state.selectedGroups.id,
										onChange: (selectedRowKeys, selectedRows) => {
											const groupList = [];
											selectedRows.map((row) => {
												groupList.push(row.groupName);
											});
											this.setState({
												selectedGroups: {
													id: selectedRowKeys,
													name: groupList,
												},
											});
										},
									}}
									onRow={(record) => {
										return {
											onClick: () => {
												const nextSelectedRowKeys = [
													...this.state.selectedGroups.id,
												];
												const nextSelectedRows = [
													...this.state.selectedGroups.name,
												];
												const index = nextSelectedRowKeys.indexOf(
													record.key,
												);
												if (index !== -1) {
													nextSelectedRowKeys.splice(index, 1);
													nextSelectedRows.splice(index, 1);
												} else {
													nextSelectedRowKeys.push(record.key);
													nextSelectedRows.push(record.groupName);
												}
												this.setState({
													selectedGroups: {
														id: nextSelectedRowKeys,
														name: nextSelectedRows,
													},
												});
											},
										};
									}}
								/>
							</Modal>
						);
						return addGroupModal;
					})()}
					<Row className='row' justify='space-between' align='middle'>
						<Col>
							<h1>车间明细</h1>
						</Col>
						<Col>
							<Button
								type='primary'
								onClick={() => {
									this.setState({
										addWorkshopModalIsShow: true,
									});
								}}>
								选择排班车间
							</Button>
						</Col>
					</Row>
					<Row>
						<Col style={{ textAlign: 'center', width: '100%' }}>
							<Row className='row' justify='center' align='middle'>
								<Col
									style={{
										borderRight: '1px #a0a0a0 solid',
										minHeight: '40px',
										lineHeight: '40px',
									}}
									span={8}>
									车间名称
								</Col>
								<Col
									style={{
										borderRight: '1px #a0a0a0 solid',
										minHeight: '40px',
										lineHeight: '40px',
									}}
									span={8}>
									班组名称
								</Col>
								<Col span={8}>操作</Col>
							</Row>
							{/* 每行 */}
							{(() => {
								const newFrequency = this.state.newFrequency;
								const workshopRowList = [];
								const theLastStyle = {
									borderBottom: '0px #a0a0a0 solid ',
									minHeight: '40px',
									lineHeight: '40px',
								};
								if (newFrequency.length > 0) {
									newFrequency.map((workshop, workshopIndex) => {
										const groupRowList = [];
										if (workshop.groupList.length > 0) {
											workshop.groupList.map((group, groupIndex) => {
												groupRowList.push(
													<Row key={groupIndex}>
														<Col
															className='col'
															span={8}
															style={
																workshop.groupList.length ===
																groupIndex + 1
																	? theLastStyle
																	: {}
															}
														/>
														<Col
															className='col'
															span={8}
															style={
																workshop.groupList.length ===
																groupIndex + 1
																	? theLastStyle
																	: {}
															}>
															{group}
														</Col>
														<Col
															span={8}
															style={
																workshop.groupList.length ===
																groupIndex + 1
																	? theLastStyle
																	: {
																			borderBottom:
																				'1px #cccccc solid ',
																			minHeight: '40px',
																			lineHeight: '40px',
																	  }
															}>
															<Row justify='space-around'>
																<Col>
																	<ArrowUpOutlined />
																	<Button
																		type='link'
																		onClick={() => {
																			this.moveUp(
																				workshop.workshopId,
																				workshop.groupId[
																					groupIndex
																				],
																			);
																		}}>
																		上移
																	</Button>
																</Col>
																<Col>
																	<ArrowDownOutlined />
																	<Button
																		type='link'
																		onClick={() => {
																			this.moveDown(
																				workshop.workshopId,
																				workshop.groupId[
																					groupIndex
																				],
																			);
																		}}>
																		下移
																	</Button>
																</Col>
																<Col>
																	<DeleteOutlined />
																	<Button
																		type='link'
																		onClick={() => {
																			this.delGroup(
																				workshop.workshopId,
																				workshop.groupId[
																					groupIndex
																				],
																			);
																		}}>
																		删除
																	</Button>
																</Col>
															</Row>
														</Col>
													</Row>,
												);
											});
										}
										workshopRowList.push(
											<Row
												justify='center'
												align='middle'
												key={workshopIndex}
												className='row'>
												<Col span={24}>
													<Row>
														<Col className='col' span={8}>
															{workshop.workshopName}
														</Col>
														<Col className='col' span={8} />
														<Col
															span={8}
															style={{
																borderBottom: '1px #dddddd solid',
																minHeight: '40px',
																lineHeight: '40px',
															}}>
															<Row justify='space-around'>
																<Col>
																	<PlusOutlined />
																	<Button
																		type='link'
																		onClick={() => {
																			this.setState({
																				addGroupModalIsShow: true,
																				addGroupModalOpenByWorkshopId:
																					workshop.workshopId,
																			});
																		}}>
																		添加
																	</Button>
																</Col>
																<Col>
																	<DeleteOutlined />
																	<Button
																		type='link'
																		onClick={() => {
																			this.delWorkshop(
																				workshop.workshopId,
																			);
																		}}>
																		删除
																	</Button>
																</Col>
															</Row>
														</Col>
													</Row>
													{groupRowList}
												</Col>
											</Row>,
										);
										return workshop;
									});
									return workshopRowList;
								}
								return [];
							})()}
							<Row
								style={{
									borderBottom: '1px #a0a0a0 solid',
									height: '1px',
									boxSizing: 'border-box',
								}}
							/>
						</Col>
					</Row>
				</div>
				<Row justify='center'>
					<Col>
						<Row
							justify='space-around'
							style={{
								width: '100%',
								minWidth: '150px',
								maxWidth: '400px',
								paddingTop: '8px',
							}}>
							<Col>
								<Button onClick={this.submit}>确定</Button>
							</Col>
							<Col>
								<Button
									onClick={() => {
										history.push('/TeamGroupOS/TeamDetails');
									}}>
									取消
								</Button>
							</Col>
						</Row>
					</Col>
				</Row>
			</Card>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(AddFrequency);
