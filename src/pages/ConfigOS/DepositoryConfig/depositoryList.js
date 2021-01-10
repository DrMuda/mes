import { Component } from 'react';
import { Card, Table, Select, Button, Modal, Form, Input, Switch } from 'antd';
import { connect } from 'dva';

const namespace = 'depositoryTypeList';
const mapStateToProps = (state, ownProps) => {
	let depositoryTypeList = state[namespace].depositoryTypeList;
	let depositoryList = state[namespace].depositoryList;
	return {
		depositoryList: depositoryList,
		depositoryTypeList: depositoryTypeList,
	};
};
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getDepositoryTypeList: () => {
			dispatch({
				type: `${namespace}/getDepositoryTypeList`,
			});
		},
		getDepositoryList: () => {
			dispatch({
				type: `${namespace}/getDepositoryList`,
			});
		},
	};
};
let depositoryTypeSelect;
class DepositoryList extends Component {
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
			title: '仓库类型',
			dataIndex: 'depositoryTypeName',
			key: 'depositoryTypeName',
			dataType: 'depositoryTypeSelect',
			editable: true,
			width: '10%',
		},
		{
			title: '仓库编号',
			dataIndex: 'depositoryId',
			key: 'depositoryId',
			editable: true,
			width: '10%',
		},
		{
			title: '仓库名称',
			dataIndex: 'depositoryName',
			key: 'depositoryName',
			editable: true,
			width: '10%',
		},
		{
			title: '仓库地址',
			dataIndex: 'depositoryAddress',
			key: 'depositoryAddress',
			editable: true,
			width: '10%',
		},
		{
			title: '负责人',
			dataIndex: 'directorName',
			key: 'directorName',
			editable: true,
			width: '10%',
		},
		{
			title: '联系电话',
			dataIndex: 'directorTelNumber',
			key: 'directorTelNumber',
			editable: true,
			width: '10%',
		},
		{
			title: '是否启用',
			dataIndex: 'enable',
			key: 'enable',
			width: 150,
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
											let tempRecord = JSON.parse(JSON.stringify(record));
											tempRecord.depositoryTypeName = record.depositoryTypeId;
											this.tableFormRef.current.setFieldsValue(tempRecord);
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
		this.props.getDepositoryList();
		this.props.getDepositoryTypeList();
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
		let inputNode;
		if (editing === 'true') {
			if (datatype == 'depositoryTypeSelect') {
				inputNode = depositoryTypeSelect;
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
	updataTableData(depositoryList, depositoryTypeList) {
		let tableData = [];
		depositoryList.map((depository, index) => {
			let depositoryTypeName;
			let operation;
			depositoryTypeList.map((depositoryType) => {
				if (depositoryType.id == depository.depositoryTypeId) {
					depositoryTypeName = depositoryType.name;
				}
			});
			tableData.push({
				key: depository.depositoryId,
				sequenceNumber: index + 1,
				depositoryTypeName: depositoryTypeName,
				depositoryTypeId: depository.depositoryTypeId,
				depositoryId: depository.depositoryId,
				depositoryName: depository.depositoryName,
				depositoryAddress: depository.depositoryAddress,
				directorName: depository.directorName,
				directorTelNumber: depository.directorTelNumber,
				enable: (
					<Switch
						checkedChildren='启用'
						unCheckedChildren='停用'
						checked={depository.enable}
						onClick={() => {
							let url = '/api/config/depository/depositoryList/edit';
							let newDepository = {
								depositoryId: depository.depositoryId,
								enable: !depository.enable,
							};
							this.requestServer(url, 'POST', newDepository).then(
								(value) => {
									this.props.getDepositoryList();
									this.props.getDepositoryTypeList();
								},
								(reason) => {
									alert(reason);
								},
							);
						}}
					/>
				),
				operation: operation,
			});
		});
		this.setState({
			tableData: tableData,
		});
	}
	edit(depositoryId) {
		let depository = JSON.stringify(this.tableFormRef.current.getFieldsValue());
		depository = JSON.parse(depository);
		for (let field in depository) {
			if (depository[field]) {
				depository[field] = depository[field].replace(/(^\s*)|(\s*$)/g, '');
				if (!depository[field]) {
					alert('不能全为空格');
					return;
				}
			} else {
				alert('未填写完整');
				return;
			}
		}
		depository = {
			depositoryTypeId: depository.depositoryTypeName,
			depositoryId: depository.depositoryId,
			depositoryName: depository.depositoryName,
			depositoryAddress: depository.depositoryAddress,
			directorName: depository.directorName,
			directorTelNumber: depository.directorTelNumber,
		};
		depository.depositoryId = depositoryId;
		let url = '/api/config/depository/depositoryList/edit';
		this.requestServer(url, 'POST', depository).then(
			(value) => {
				this.props.getDepositoryList();
				this.props.getDepositoryTypeList();
				for (let field in depository) {
					depository[field] = '';
				}
				this.tableFormRef.current.setFieldsValue(depository);
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
		let depository = JSON.stringify(this.modalFormRef.current.getFieldsValue());
		depository = JSON.parse(depository);
		for (let field in depository) {
			if (depository[field]) {
				depository[field] = depository[field].replace(/(^\s*)|(\s*$)/g, '');
				if (!depository[field]) {
					alert('不能全为空格');
					return;
				}
			} else {
				alert('未填写完整');
				return;
			}
		}
		depository.enable = true;

		let url = '/api/config/depository/depositoryList/add';
		this.requestServer(url, 'POST', depository).then(
			(value) => {
				alert(value);
				this.setState(
					{
						modalIsShow: false,
					},
					() => {
						this.props.getDepositoryList();
						this.props.getDepositoryTypeList();
					},
				);
			},
			(reason) => {
				alert(reason);
			},
		);
	}
	del(depositoryId) {
		let url = '/api/config/depository/depositoryList/del?depositoryId=' + depositoryId;
		this.requestServer(url, 'POST').then(
			(value) => {
				this.props.getDepositoryList();
				this.props.getDepositoryTypeList();
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
		if (nextProps.depositoryList !== this.props.depositoryList) {
			this.updataTableData(nextProps.depositoryList, nextProps.depositoryTypeList);
		}
		if (nextProps.depositoryTypeList !== this.props.depositoryTypeList) {
			depositoryTypeSelect = (
				<Select>
					{(() => {
						let depositoryTypeList = nextProps.depositoryTypeList;
						let options = [];
						if (depositoryTypeList) {
							depositoryTypeList.map((depositoryType) => {
								options.push(
									<Select.Option
										key={depositoryType.id}
										value={depositoryType.id}>
										{depositoryType.name}
									</Select.Option>,
								);
							});
						}
						return options;
					})()}
				</Select>
			);
			this.updataTableData(nextProps.depositoryList, nextProps.depositoryTypeList);
		}
	}
	render() {
		let form = (
			<Form
				ref={this.modalFormRef}
				initialValues={{
					depositoryName: '',
					depositoryTypeId: '',
					directorTelNumber: '',
					depositoryId: '',
					director: '',
					depositoryAddress: '',
				}}>
				<Form.Item
					labelAlign='right'
					label='仓库名称'
					required={true}
					name='depositoryName'>
					<Input />
				</Form.Item>
				<Form.Item
					labelAlign='right'
					label='仓库类型'
					required={true}
					name='depositoryTypeId'>
					{depositoryTypeSelect}
				</Form.Item>
				<Form.Item
					labelAlign='right'
					label='联系电话'
					required={true}
					name='directorTelNumber'>
					<Input />
				</Form.Item>
				<Form.Item labelAlign='right' label='仓库编号' required={true} name='depositoryId'>
					<Input />
				</Form.Item>
				<Form.Item labelAlign='right' label='负责人' required={true} name='directorName'>
					<Input />
				</Form.Item>
				<Form.Item labelAlign='right' label='地址' required={true} name='depositoryAddress'>
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
export default connect(mapStateToProps, mapDispatchToProps)(DepositoryList);
