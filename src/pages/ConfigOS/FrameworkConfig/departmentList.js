import React from 'react';
import { Component } from 'react';
import { Card, Collapse, Row, Col, Button, Modal, Form, Input } from 'antd';
import { editDepartment, delDepartment } from '@/services/ConfigOS/configOS';
import { connect } from 'dva';

const namespace = 'configOs_frameworkConfig_departmentList';

const mapStateToProps = (state) => {
	const departmentList = state[namespace].departmentList;
	return {
		departmentList,
	};
};

const mapDispatchToprops = (dispatch) => {
	return {
		getDepartmentList: () => {
			dispatch({
				type: `${namespace}/getDepartmentList`,
			});
		},
	};
};

const { Panel } = Collapse;
const width = 150;

class DepartmentList extends Component {
	modalFormRef = React.createRef();

	constructor(props) {
		super(props);
		this.departmentListRender = this.departmentListRender.bind(this);
		this.del = this.del.bind(this);
		this.add = this.add.bind(this);
		this.state = {
			departmentList: [],
			addModalIsShow: false,
			departmentId: '',
		};
		this.props.getDepartmentList();
	}

	departmentListRender() {
		const departmentList = this.props.departmentList;
		let panelList = [];
		let maxLevel = 0;
		getMaxLevel = getMaxLevel.bind(this);
		recursionMap = recursionMap.bind(this);
		if (JSON.stringify(departmentList) !== '{}') {
			if (departmentList.children.length > 0) {
				maxLevel = getMaxLevel(departmentList, 1);
				panelList = recursionMap(departmentList, 1);
			}
		}
		const header = (
			<Row justify='start' align='middle' style={{ borderBottom: '1px #a0a0a0 solid' }}>
				<Col style={{ width: '40px' }}></Col>
				{(() => {
					const cols = [];
					for (let level = 0; level < maxLevel; level += 1) {
						cols.push(
							<Col style={{ width }} key={level}>
								<span style={{ width: '16px' }} />
								{level + 1}级部门
							</Col>,
						);
					}
					return cols;
				})()}
				<Col style={{ width }}>操作</Col>
			</Row>
		);
		return (
			<>
				{header}
				<Collapse bordered={false} accordion>
					{panelList}
				</Collapse>
			</>
		);
		function getMaxLevel(parentDepartment, level) {
			for (let i = 0; i < parentDepartment.children.length; i += 1) {
				const department = parentDepartment.children[i];
				if (department.children && department.children.length > 0) {
					maxLevel = getMaxLevel(department, level + 1);
				} else if (level > maxLevel) {
					maxLevel = level;
				}
			}
			return maxLevel;
		}
		function recursionMap(parentDepartment, level) {
			try {
				const list = parentDepartment.children.map((department) => {
					const header = (
						<Row justify='start' align='middle' key={department.id}>
							{(() => {
								const cols = [];
								for (let i = 1; i <= maxLevel; i += 1) {
									if (i !== level) {
										if (i < level) {
											cols.push(
												<Col style={{ width: width - 16 }} key={i} />,
											);
										} else {
											cols.push(<Col style={{ width }} key={i} />);
										}
									} else {
										cols.push(
											<Col style={{ width }} key={i}>
												{department.name}
											</Col>,
										);
									}
								}
								cols.push(
									<Col key={'operation'} style={{ width }}>
										<Button
											type='link'
											style={{ paddingLeft: '0px' }}
											onClick={(e) => {
												e.stopPropagation();
												this.add(department.id);
											}}>
											添加
										</Button>
										<Button
											type='link'
											style={{ paddingLeft: '0px', paddingRight: '0px' }}
											onClick={(e) => {
												e.stopPropagation();
												this.del(department.id);
											}}>
											删除
										</Button>
									</Col>,
								);
								return cols;
							})()}
						</Row>
					);
					if (department.children && department.children.length > 0) {
						const childList = recursionMap(department, level + 1);
						return (
							<Panel header={header} key={department.id}>
								<Collapse bordered={false}>{childList}</Collapse>
							</Panel>
						);
					}
					return <Panel header={header} key={department.id} />;
				});
				return list;
			} catch (e) {
				console.error(e);
				return [];
			}
		}
	}

	add(departmentId) {
		this.setState({
			departmentId,
		});
		this.setState({
			addModalIsShow: true,
		});
	}

	del(departmentId) {
		delDepartment({
			id: departmentId,
		});
		this.props.getDepartmentList();
	}

	save() {
		const { departmentName } = this.modalFormRef.current.getFieldsValue();
		if (departmentName) {
			editDepartment({
				id: this.state.departmentId,
				name: departmentName,
			});
			this.props.getDepartmentList();
			this.setState({
				addModalIsShow: false,
			});
		}
	}

	render() {
		return (
			<Card>
				<Modal
					visible={this.state.addModalIsShow}
					title='添加部门'
					onCancel={() => {
						this.setState({
							addModalIsShow: false,
						});
					}}
					okButtonProps={{ hidden: true }}
					cancelButtonProps={{ hidden: true }}>
					<Form ref={this.modalFormRef}>
						<Form.Item
							label='部门名称'
							name='departmentName'
							rules={[
								{
									required: true,
									message: '请填写部门名称',
								},
							]}>
							<Input />
						</Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							onClick={() => {
								this.save();
							}}>
							确定
						</Button>
						<Button
							onClick={() => {
								this.setState({
									addModalIsShow: false,
								});
							}}>
							取消
						</Button>
					</Form>
				</Modal>
				<Row justify='space-between' align='middle' style={{ height: '50px' }}>
					<Col>部门列表</Col>
					<Col>
						<Button
							type='primary'
							onClick={() => {
								if (this.props.departmentList) {
									this.add(this.props.departmentList.id);
								} else {
									this.add('');
								}
							}}>
							添加
						</Button>
					</Col>
				</Row>
				{this.departmentListRender()}
			</Card>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(DepartmentList);
