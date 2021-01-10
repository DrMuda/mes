import ProTable from '@ant-design/pro-table';
import { Button, Input, Card, Row, Col } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
const namespace = 'UserList';
const mapStateToProps = (state) => {
	let userList = state[namespace].userList;
	return {
		userList,
	};
};
const mapDispatchToprops = (dispatch) => {
	return {
		getUserList: () => {
			dispatch({
				type: `${namespace}/getUserList`,
			});
		},
	};
};

const columns = [
	{
		title: '姓名',
		dataIndex: 'name',
		align: 'center',
	},
	{
		title: '工号',
		dataIndex: 'userId',
		align: 'center',
	},
	{
		title: '组别',
		dataIndex: 'team',
		align: 'center',
	},
	{
		title: '人员状态',
		dataIndex: 'userStatus',
		align: 'center',
	},
	{
		title: '负责设备数量',
		dataIndex: 'equipmentSum',
		align: 'center',
	},
	{
		title: '具体设备',
		dataIndex: 'equipments',
		align: 'center',
	},
	{
		title: '设备状态',
		dataIndex: 'equipmentStatus',
		align: 'center',
	},
];
let tableData = [];
class UserList extends Component {
	constructor(props) {
		super(props);
		this.filter = this.filter.bind(this);
		this.deleteSelected = this.deleteSelected.bind(this);
		this.state = {
			userList: [],
			selectedRowKeys: [],
			filter: {
				name: '',
				userId: '',
				team: '',
			},
		};
		this.props.getUserList();
	}
	UNSAFE_componentWillReceiveProps(props) {
		tableData = props.userList;
	}
	//过滤
	filter() {
		let listTemp = [];
		if (this.props.userList) {
			this.props.userList.map((user, index) => {
				let canPush = true; //为true即可以推入到userList数组
				for (let field in user) {
					//只要canPush为false，则该行记录不被推入
					//也无需比较后续的字段
					if (canPush) {
						if (this.state.filter[field] !== undefined) {
							//判断是否存在user[field]中子字符串filter[field]
							//子字符串去头尾空格
							canPush = exist(
								user[field],
								this.state.filter[field].replace(/(^\s*)|(\s*$)/g, ''),
							);
						}
					} else {
						break;
					}
				}
				if (canPush) {
					listTemp.push(user);
				}
			});
		}
		return listTemp;
		function exist(userValue, filterValue) {
			if (userValue.toString().indexOf(filterValue) !== -1) {
				return true;
			} else {
				return false;
			}
		}
	}
	deleteSelected() {
		new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			let userId = this.state.selectedRowKeys.toString();
			xhr.open('POST', '/deleteUser');
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
			xhr.send('userId=' + userId);
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4) {
					if (xhr.status == 200) {
						let msg = xhr.responseText;
						resolve(msg);
					} else {
						reject('删除失败');
					}
				}
			};
		}).then(
			(value) => {
				this.props.getUserList();
				alert(value);
			},
			(reason) => {
				alert(reason);
			},
		);
	}
	render() {
		let search = (
			<>
				<Input
					placeholder='姓名'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.name}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.name = e.target.value;
						this.setState({
							filter: filterTemp,
						});
					}}
					onPressEnter={() => {
						tableData = this.filter();
						this.forceUpdate();
					}}
				/>
				<Input
					placeholder='工号'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.userId}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.userId = e.target.value;
						this.setState({
							filter: filterTemp,
						});
					}}
					onPressEnter={() => {
						tableData = this.filter();
						this.forceUpdate();
					}}
				/>
				<Input
					placeholder='组别'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.team}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.team = e.target.value;
						this.setState({
							filter: filterTemp,
						});
					}}
					onPressEnter={() => {
						tableData = this.filter();
						this.forceUpdate();
					}}
				/>
				<Button
					onClick={() => {
						tableData = this.filter();
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
									name: '',
									userId: '',
									group: '',
								},
							},
							() => {
								tableData = this.filter();
								this.forceUpdate();
							},
						);
					}}
					style={{ background: '#1890ff', color: '#fff', marginRight: '8px' }}>
					清空
				</Button>
			</>
		);
		tableData.map((data) => {
			let equipmentStatus = [];
			let equipments = [];
			//对具体设备与设备状态列进行处理
			if (data.equipmentStatus) {
				data.equipmentStatus.map((status, index) => {
					equipmentStatus.push(
						<Row justify='center' key={index}>
							<Col>{status}</Col>
						</Row>,
					);
				});
				data.equipmentStatus = equipmentStatus;
			}
			//对具体设备与设备状态列进行处理
			if (data.equipments) {
				data.equipments.map((equipment, index) => {
					equipments.push(
						<Row justify='center' key={index}>
							<Col>{equipment}</Col>
						</Row>,
					);
				});
				data.equipments = equipments;
			}
			if (data.userStatus === '工作中') {
				data.userStatusCode = 1;
			} else {
				data.userStatusCode = 0;
			}
			return data;
		});
		//通过userStatusCode排序
		tableData.sort((a, b) => {
			return b.userStatusCode - a.userStatusCode;
		});
		return (
			<Card>
				<Row justify='space-between' style={{ marginBottom: '8px' }}>
					<Col>
						<Button
							key='add'
							onClick={() => {
								history.push('/TeamGroupOS/AddUser');
							}}
							style={{ marginRight: '8px', background: '#1890ff', color: '#fff' }}>
							新增
						</Button>
						<Button
							key='del'
							onClick={this.deleteSelected}
							style={{ background: '#1890ff', color: '#fff' }}>
							删除
						</Button>
					</Col>
					<Col>{search}</Col>
				</Row>
				<ProTable
					columns={columns}
					dataSource={tableData}
					search={false}
					toolBarRender={false}
					onRow={(record) => {
						return {
							onClick: () => {
								history.push('/TeamGroupOS/UserDetails?userId=' + record.key);
							},
						};
					}}
					rowSelection={{
						type: 'checkBox',
						selectedRowKeys: this.state.selectedRowKeys,
						onChange: (selectedRowKeys) => {
							this.setState({
								selectedRowKeys: selectedRowKeys,
							});
						},
					}}
				/>
			</Card>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(UserList);
