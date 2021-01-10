import React from 'react';
import { Component } from 'react';
import { Card, Table, Button, Modal, Form, Input } from 'antd';
import { connect } from 'dva';

const namespace = 'depositoryTypeList';
const mapStateToProps = (state) => {
	const depositoryTypeList = state[namespace].depositoryTypeList;
	return {
		depositoryTypeList: depositoryTypeList,
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		getDepositoryTypeList: () => {
			dispatch({
				type: `${namespace}/getDepositoryTypeList`,
			});
		},
	};
};

class DepositoryType extends Component {
	modalFormRef = React.createRef(); // 对话框表单的ref

	tableFormRef = React.createRef(); // 表格可编辑时的ref

	columns = [
		{
			title: '序号', // 序号
			dataIndex: 'sequenceNumber',
			key: 'squencyNumber',
			width: 80,
		},
		{
			title: '仓库类型',
			dataIndex: 'depositoryType',
			key: 'depositoryType',
			editable: true,
			align: 'center',
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
			align: 'left',
			width: 200,
			render: (_, record) => {
				if (this.isEditing(record)) {
					return (
						<>
							<Button
								type='link'
								style={{ paddingLeft: '0' }}
								onClick={() => {
									this.edit(record.key);
								}}>
								保存
							</Button>
							<Button
								type='link'
								style={{ paddingLeft: '0' }}
								onClick={() => {
									this.setState({
										editingKey: '',
									});
								}}>
								取消
							</Button>
						</>
					);
				}
				return (
					<>
						<Button
							type='link'
							style={{ paddingLeft: '0' }}
							onClick={() => {
								this.setState({
									editingKey: record.key,
								});
							}}>
							编辑
						</Button>
						<Button
							type='link'
							style={{ paddingLeft: '0' }}
							onClick={() => {
								this.del(record.key);
							}}>
							删除
						</Button>
					</>
				);
			},
		},
	];

	// 根据editable添加单元格属性
	mergedColumns = this.columns.map((col) => {
		if (!col.editable) {
			// 如果不能编辑（false），直接返回本身
			return col;
		}
		return {
			...col,
			onCell: (record) => {
				return {
					record,
					dataindex: col.dataIndex,
					title: col.title,
					editing: '' + this.isEditing(record), // 是否正在编辑
				};
			},
		};
	});

	constructor(props) {
		super(props);
		this.edit = this.edit.bind(this);
		this.del = this.del.bind(this);
		this.add = this.add.bind(this);
		this.requestServer = this.requestServer.bind(this);
		this.updataTableData = this.updataTableData.bind(this);
		this.isEditing = this.isEditing.bind(this);
		this.editableCell = this.editableCell.bind(this);
		this.state = {
			modalIsShow: false,
			tableData: [],
			editingKey: '', //正在被编辑的行的行键
		};
		this.props.getDepositoryTypeList();
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		// props发生改变时，更新表格数据
		if (nextProps.depositoryTypeList !== this.props.depositoryTypeList) {
			this.updataTableData(nextProps.depositoryTypeList);
		}
	}

	editableCell(cell) {
		const { editing, dataindex, title, children, record, ...restProps } = cell;

		if (editing === 'true') {
			return (
				<td {...restProps}>
					<Form.Item
						style={{ width: '100%', margin: '0px', padding: '0' }}
						name={dataindex}
						initialValue={record.depositoryType}>
						<Input style={{ width: '100px' }} />
					</Form.Item>
				</td>
			);
		}
		return <td {...restProps}>{children}</td>;
	}

	isEditing(record) {
		// record当前行
		// 当前行的键与editingKey相同时
		// 返回true，表示该行正在被编辑
		if (record.key === this.state.editingKey) {
			return true;
		}
		return false;
	}

	edit(depositoryTypeId) {
		const depositoryTypeName = this.tableFormRef.current.getFieldsValue().depositoryType;
		const temp = depositoryTypeName.replace(/(^\s*)|(\s*$)/g, '');
		if (temp) {
			const url = `/api/config/depository/depositoryTypeList/edit?depositoryTypeName=${temp}
				&depositoryTypeId=${depositoryTypeId}`;
			this.requestServer(url, 'POST').then(
				() => {
					this.props.getDepositoryTypeList();
					this.state.editingKey = '';
				},
				(reason) => {
					alert(JSON.parse(reason).data);
					this.state.editingKey = '';
				},
			);
		} else if (depositoryTypeName) {
			alert('不能只有空格');
		} else {
			alert('请填写仓库类型');
		}
	}

	del(depositoryTypeId) {
		const url = `/api/config/depository/depositoryTypeList/del?depositoryTypeId=${depositoryTypeId}`;
		this.requestServer(url, 'POST').then(
			(value) => {
				alert(JSON.parse(value).data);
				this.props.getDepositoryTypeList();
			},
			(reason) => {
				alert(JSON.parse(reason).data);
			},
		);
	}

	add(depositoryTypeName) {
		const temp = depositoryTypeName.replace(/(^\s*)|(\s*$)/g, '');
		if (temp) {
			const url = `/api/config/depository/depositoryTypeList/add?depositoryTypeName=${temp}`;
			this.requestServer(url, 'POST').then(
				(value) => {
					alert(JSON.parse(value).data);
					this.props.getDepositoryTypeList();
					this.setState({
						modalIsShow: false,
					});
				},
				(reason) => {
					alert(JSON.parse(reason).data);
				},
			);
		} else if (depositoryTypeName) {
			alert('不能只有空格');
		} else {
			alert('请填写仓库类型');
		}
	}

	requestServer(url, method) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.send();
			xhr.onreadystatechange = () => {
				if (xhr.readyState === 4) {
					const result = xhr.responseText;
					if (xhr.status === 200) {
						resolve(result);
					} else {
						reject(result);
					}
				}
			};
		});
	}

	updataTableData(depositoryTypeList) {
		if (depositoryTypeList) {
			const nextDepositoryTypeList = depositoryTypeList.map((depositoryType, index) => {
				return {
					depositoryType: depositoryType.name,
					key: depositoryType.id,
					sequenceNumber: index + 1,
				};
			});
			this.setState({
				tableData: nextDepositoryTypeList,
			});
		}
	}

	render() {
		return (
			<Card>
				<div
					style={{
						padding: '8px',
						height: '50px',
						marginBottom: '8px',
						background: '#FAFAFA',
						display: 'flex',
						alignItems: 'center',
					}}>
					<Button
						onClick={() => {
							this.setState({
								modalIsShow: true,
							});
						}}
						type='primary'>
						添加
					</Button>
					<Modal
						visible={this.state.modalIsShow}
						title='添加仓库类型'
						onOk={() => {
							// 获取表单
							const depositoryTypeName = this.modalFormRef.current.getFieldsValue()
								.depositoryTypeName;
							this.add(depositoryTypeName);
						}}
						onCancel={() => {
							this.setState({
								modalIsShow: false,
							});
						}}>
						<Form ref={this.modalFormRef}>
							<Form.Item
								labelAlign='right'
								label='仓库类型'
								required={true}
								name='depositoryTypeName'>
								<Input />
							</Form.Item>
						</Form>
					</Modal>
				</div>
				<Form ref={this.tableFormRef}>
					<Table
						columns={this.mergedColumns}
						dataSource={this.state.tableData}
						components={{
							body: {
								cell: this.editableCell,
							},
						}}
					/>
				</Form>
			</Card>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositoryType);
