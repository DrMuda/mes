import { Component } from 'react';
import { Card, Table, Select, Button, Modal, Form, Input, Switch } from 'antd';
import { connect } from 'dva';

const namespace = 'depositoryTypeList';
const mapStateToProps = (state, ownProps) => {
	let storageList = state[namespace].storageList;
	let depositoryList = state[namespace].depositoryList;
	return {
		storageList: storageList,
		depositoryList: depositoryList,
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getStorageList: () => {
			dispatch({
				type: `${namespace}/getStorageList`,
			});
		},
		getDepositoryList: () => {
			dispatch({
				type: `${namespace}/getDepositoryList`,
			});
		},
	};
};
let depositorySelect;
class StorageSetting extends Component {
	modalFormRef = React.createRef(); //对话框表单的ref
	tableFormRef = React.createRef(); //表格可编辑时的ref
	columns = [
		{
			title: '序号', //序号
			dataIndex: 'sequenceNumber',
			key: 'sequenceNumber',
			width: 80,
		},
		{
			title: '库位编号',
			dataIndex: 'storageId',
			key: 'storageId',
			width: '20%',
		},
		{
			title: '仓库名称',
			dataIndex: 'depositoryName',
			key: 'depositoryName',
			dataType: 'depositorySelect',
			width: '20%',
			editable: true,
		},
		{
			title: '库位名称',
			dataIndex: 'storageName',
			key: 'storageName',
			width: '20%',
			editable: true,
		},
		{
			title: '架号',
			dataIndex: 'shelfId',
			key: 'shelfId',
			width: '20%',
			editable: true,
		},
		{
			title: '操作',
			dataIndex: 'operation',
			key: 'operation',
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
				} else {
					return (
						<>
							<Button
								type='link'
								style={{ paddingLeft: '0' }}
								onClick={() => {
									this.setState(
										{
											editingKey: record.key,
										},
										() => {
											let storage = {
												depositoryName: record.depositoryId,
												storageId: record.storageId,
												storageName: record.storageName,
												shelfId: record.shelfId,
											};
											this.tableFormRef.current.setFieldsValue(storage);
										},
									);
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
				}
			},
		},
	];

	//根据editable添加单元格属性
	mergedColumns = this.columns.map((col) => {
		if (!col.editable) {
			//如果不能编辑（false），直接返回本身
			return col;
		}
		return {
			...col,
			onCell: (record, rowIndex) => {
				return {
					record,
					dataindex: col.dataIndex,
					datatype: col.dataType,
					title: col.title,
					editing: '' + this.isEditing(record), //是否正在编辑
				};
			},
		};
	});

	constructor(props) {
		super(props);
		this.updataTableData = this.updataTableData.bind(this);
		this.add = this.add.bind(this);
		this.del = this.del.bind(this);
		this.edit = this.edit.bind(this);
		this.requestServer = this.requestServer.bind(this);
		this.isEditing = this.isEditing.bind(this);
		this.editableCell = this.editableCell.bind(this);
		this.state = {
			modalIsShow: false,
			tableData: [],
			editingKey: '',
		};
		this.props.getStorageList();
		this.props.getDepositoryList();
	}
	isEditing(record) {
		//record当前行
		//当前行的键与editingKey相同时
		//返回true，表示该行正在被编辑
		if (record.key === this.state.editingKey) {
			return true;
		} else {
			return false;
		}
	}
	editableCell(cell) {
		let { editing, dataindex, datatype, title, children, record, ...restProps } = cell;
		if (editing === 'true') {
			let inputNode;
			if (datatype == 'depositorySelect') {
				inputNode = depositorySelect;
			} else {
				inputNode = <Input />;
			}
			return (
				<td {...restProps}>
					<Form.Item
						style={{ width: '100%', margin: '0px', padding: '0' }}
						name={dataindex}
						initialValue={record[dataindex]}>
						{inputNode}
					</Form.Item>
				</td>
			);
		} else {
			return <td {...restProps}>{children}</td>;
		}
	}
	updataTableData(storageList, depositoryList) {
		let tableData = [];
		storageList.map((storage, index) => {
			let operation;
			let depositoryName = '';
			if (depositoryList) {
				depositoryList.map((depository) => {
					if (depository.depositoryId == storage.depositoryId) {
						depositoryName = depository.depositoryName;
					}
				});
			}
			tableData.push({
				key: storage.storageId,
				sequenceNumber: index + 1,
				storageId: storage.storageId,
				storageName: storage.storageName,
				depositoryName: depositoryName,
				shelfId: storage.shelfId,
				operation: operation,
				depositoryId: storage.depositoryId,
			});
		});
		this.setState({
			tableData: tableData,
		});
	}
	edit(storageId) {
		let storage = JSON.stringify(this.tableFormRef.current.getFieldsValue());
		storage = JSON.parse(storage);
		for (let field in storage) {
			if (storage[field]) {
				storage[field] = storage[field].replace(/(^\s*)|(\s*$)/g, '');
				if (!storage[field]) {
					alert('不能全为空格');
					return;
				}
			} else {
				alert('未填写完整');
				return;
			}
		}
		storage.depositoryId = storage.depositoryName;
		storage.storageId = storageId;
		let url = '/api/config/depository/storageList/edit';
		this.requestServer(url, 'POST', storage).then(
			(value) => {
				this.props.getStorageList();
				this.props.getDepositoryList();
				for (let field in storage) {
					storage[field] = '';
				}
				this.tableFormRef.current.setFieldsValue(storage);
				this.setState({
					editingKey: '',
				});
			},
			(reason) => {
				alert(reason);
			},
		);
	}
	add() {
		let storage = JSON.stringify(this.modalFormRef.current.getFieldsValue());
		storage = JSON.parse(storage);
		for (let field in storage) {
			if (storage[field]) {
				storage[field] = storage[field].replace(/(^\s*)|(\s*$)/g, '');
				if (!storage[field]) {
					alert('不能全为空格');
					return;
				}
			} else {
				alert('未填写完整');
				return;
			}
		}

		let url = '/api/config/depository/storageList/add';
		this.requestServer(url, 'POST', storage).then(
			(value) => {
				alert(value);
				this.props.getStorageList();
				this.props.getDepositoryList();
				this.setState({
					modalIsShow: false,
				});
			},
			(reason) => {
				alert(reason);
			},
		);
	}
	del(storageId) {
		let url = '/api/config/depository/storageList/del?storageId=' + storageId;

		this.requestServer(url, 'POST').then(
			(value) => {
				this.props.getStorageList();
				this.props.getDepositoryList();
			},
			(reason) => {
				alert(reason);
			},
		);
	}
	requestServer(url, method, data) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.open(method, url);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
			if (data) {
				xhr.send('data=' + JSON.stringify(data));
			} else {
				xhr.send(null);
			}
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					let result = xhr.responseText;
					if (xhr.status == 200) {
						resolve(result);
					} else {
						reject(result);
					}
				}
			};
		});
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.storageList !== this.props.storageList) {
			this.updataTableData(nextProps.storageList, nextProps.depositoryList);
		}
		if (nextProps.depositoryList !== this.props.depositoryList) {
			depositorySelect = (
				<Select>
					{(() => {
						let depositoryList = this.props.depositoryList;
						let options = [];
						if (depositoryList) {
							depositoryList.map((depository, index) => {
								options.push(
									<Select.Option key={index} value={depository.depositoryId}>
										{depository.depositoryName}
									</Select.Option>,
								);
							});
						}
						return options;
					})()}
				</Select>
			);
			this.updataTableData(nextProps.storageList, nextProps.depositoryList);
		}
	}
	render() {
		depositorySelect = (
			<Select>
				{(() => {
					let depositoryList = this.props.depositoryList;
					let options = [];
					if (depositoryList) {
						depositoryList.map((depository, index) => {
							options.push(
								<Select.Option key={index} value={depository.depositoryId}>
									{depository.depositoryName}
								</Select.Option>,
							);
						});
					}
					return options;
				})()}
			</Select>
		);
		let form = (
			<Form
				ref={this.modalFormRef}
				initialValues={{
					storageId: '',
					storageName: '',
					depositoryName: '',
					shelfId: '',
				}}>
				<Form.Item labelAlign='right' label='仓库' required={true} name='depositoryId'>
					{depositorySelect}
				</Form.Item>
				<Form.Item labelAlign='right' label='库位编码' required={true} name='storageId'>
					<Input />
				</Form.Item>
				<Form.Item labelAlign='right' label='库位名称' required={true} name='storageName'>
					<Input />
				</Form.Item>
				<Form.Item labelAlign='right' label='架号' required={true} name='shelfId'>
					<Input />
				</Form.Item>
			</Form>
		);
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
						title='添加'
						onOk={() => {
							this.add();
						}}
						onCancel={() => {
							this.setState({
								modalIsShow: false,
							});
						}}>
						{form}
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
						}}></Table>
				</Form>
			</Card>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(StorageSetting);
