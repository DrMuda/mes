import { Tabs, Card, Table, Button, Input, Row, Col } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
const { TabPane } = Tabs;

const namespace = 'outWarehouseOtherOrderList';

const mapStateToProps = (state) => {
	let list = state[namespace].data;
	return {
		list,
	};
};

const mapDispatchToprops = (dispatch) => {
	return {
		getOtherOrderList: (activeKey) => {
			dispatch({
				type: `${namespace}/getOtherOrderList`,
				status: activeKey,
			});
		},
	};
};
const rowClickKeyUrl="/DepositoryOS/OutWarehouse/OtherOrderDetails?details=true&otherOrderNumber"
const tableCol = [
	{
		title: '其他出库单号',
		dataIndex: 'otherOrderNumber',
		key: 'otherOrderNumber',
		align: 'center',
	},
	{
		title: '领用部门',
		dataIndex: 'department',
		key: 'department',
		align: 'center',
	},
	{
		title: '出库日期',
		dataIndex: 'outTime',
		key: 'outTime',
		align: 'center',
	},
	{
		title: '发货数量',
		dataIndex: 'deliveredSum',
		key: 'deliveredSum',
		align: 'center',
	},
    {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        align: "left",
        width: 200,
        render: (_, record) => {
            const style = {
                color: 'white',
                backgroundColor: '#1890ff',
                fontSize: '12px',
                width: '50px',
                height: '30px',
                padding: '0px',
            };
            const printButton=
            <Button style={style}
                key="print"
                onClick={(e)=>{
                    e.stopPropagation()
                    history.push(`${rowClickKeyUrl}=${record.key}&print=true`)
                }}>打印</Button>
            const checkButton=
            <Button style={style}
                key="check"
                onClick={(e)=>{
                    e.stopPropagation()
                    history.push(`${rowClickKeyUrl}=${record.key}&check=true`)
                }}>审核</Button>
            if (record.out) {
                return (printButton)
            }
            return ([printButton,checkButton])
        }
    }
];
const onRow = (record) => {
	return {
		onClick: (event) => {
			history.push(
				'/DepositoryOS/OutWarehouse/OtherOrderDetails?details=true&otherOrderNumber=' +
					record.key,
			);
		}, // 点击行
	};
};

let tableData = [];
class OtherOrder extends Component {
	itemRef = React.createRef();
	constructor(props) {
		super(props);
		this.addOrder = this.addOrder.bind(this);
		this.addButton = (
			<Button type='primary' onClick={this.addOrder}>
				新增
			</Button>
		);
		this.onChange = this.onChange.bind(this);
		this.filterOrderList = this.filterOrderList.bind(this);
		this.state = {
			filter: {
				otherOrderNumber: '',
				department: '',
				outTime: '',
			},
		};
		this.props.getOtherOrderList('1');
	}
	addOrder() {
		history.push('/DepositoryOS/OutWarehouse/AddOtherOrder');
	}
	onChange(activeKey) {
		this.props.getOtherOrderList(activeKey);
	}
	//过滤
	filterOrderList() {
		let listTemp = [];
		if (this.props.list) {
			this.props.list.map((order, index) => {
				let canPush = true; //为true即可以推入到orderList数组
				for (let field in order) {
					//只要canPush为false，则该行记录不被推入
					//也无需比较后续的字段
					if (canPush) {
						if (this.state.filter[field] !== undefined) {
							canPush = exist(
								order[field],
								this.state.filter[field].replace(/(^\s*)|(\s*$)/g, ''),
							);
						}
					} else {
						break;
					}
				}
				if (canPush) {
					listTemp.push(order);
				}
			});
		}
		return listTemp;
		function exist(orderValue, filterValue) {
			if (orderValue.toString().indexOf(filterValue) !== -1) {
				return true;
			} else {
				return false;
			}
		}
	}
	UNSAFE_componentWillReceiveProps(props) {
		tableData = props.list;
		if (tableData) {
			tableData.map((data) => {
				let deliveredSum = 0;
				data.cargos.map((cargo) => {
					deliveredSum += parseInt(cargo.outSum);
				});
				data.deliveredSum = deliveredSum;
				return data;
			});
		}
	}
	render() {
		let table = (
			<Table
				dataSource={tableData}
				columns={tableCol}
				onRow={onRow}
				pagination={{ position: ['bottomCenter'] }}></Table>
		);
		let search = (
			<>
				<Input
					placeholder='其他出库单号'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.otherOrderNumber}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.otherOrderNumber = e.target.value;
						this.setState({
							filter: filterTemp,
						});
					}}
					onPressEnter={() => {
						tableData = this.filterOrderList();
						this.forceUpdate();
					}}
				/>
				<Input
					placeholder='领用部门'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.department}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.department = e.target.value;
						this.setState({
							filter: filterTemp,
						});
					}}
					onPressEnter={() => {
						tableData = this.filterOrderList();
						this.forceUpdate();
					}}
				/>
				<Input
					placeholder='出库时间'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.outTime}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.outTime = e.target.value;
						this.setState({
							filter: filterTemp,
						});
					}}
					onPressEnter={() => {
						tableData = this.filterOrderList();
						this.forceUpdate();
					}}
				/>
				<Button
					onClick={() => {
						tableData = this.filterOrderList();
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
									otherOrderNumber: '',
									department: '',
									outTime: '',
								},
							},
							() => {
								tableData = this.filterOrderList();
								this.forceUpdate();
							},
						);
					}}
					style={{ background: '#1890ff', color: '#fff', marginRight: '8px' }}>
					清空
				</Button>
			</>
		);
		return (
			<Card>
				<Row justify='space-between'>
					<Col>{this.addButton}</Col>
					<Col>{search}</Col>
				</Row>
				<Tabs onChange={this.onChange}>
					<TabPane tab='全部' key='1'>
						{table}
					</TabPane>
					<TabPane tab='待出库' key='2'>
						{table}
					</TabPane>
					<TabPane tab='已出库' key='3'>
						{table}
					</TabPane>
				</Tabs>
			</Card>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(OtherOrder);
