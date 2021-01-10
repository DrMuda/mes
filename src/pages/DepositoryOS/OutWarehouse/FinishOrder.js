import { Tabs, Card, Table, Button, Input, Row, Col } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
const { TabPane } = Tabs;

const namespace = 'outWarehouseFinishOrderList';

const mapStateToProps = (state) => {
	let list = state[namespace].data;
	return {
		list,
	};
};
const mapDispatchToprops = (dispatch) => {
	return {
		getFinishOrderList: (activeKey) => {
			dispatch({
				type: `${namespace}/getFinishOrderList`,
				status: activeKey,
			});
		},
	};
};

const rowClickKeyUrl = '/DepositoryOS/OutWarehouse/FinishOrderDetails?details=true&finishOrderNumber'
const tableCol = [
	{
		title: '出库单号',
		dataIndex: 'finishOrderNumber',
		key: 'finishOrderNumber',
		align: 'center',
	},
	{
		title: '客户名称',
		dataIndex: 'customerName',
		key: 'customerName',
		align: 'center',
		textWrap: 'word-break',
	},
	{
		title: '出库日期',
		dataIndex: 'outTime',
		key: 'outTime',
		align: 'center',
	},
	{
		title: '销售单号',
		dataIndex: 'saleNumber',
		key: 'saleNumber',
		align: 'center',
	},
	{
		title: '发货数量',
		dataIndex: 'deliveredSum',
		key: 'deliveredSum',
		anlign: 'center',
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
				'/DepositoryOS/OutWarehouse/FinishOrderDetails?details=true&finishOrderNumber=' +
					record.key,
			);
		}, // 点击行
	};
};
let tableData = [];
class FinishOrder extends Component {
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
				finishOrderNumber: '',
				saleNumber: '',
				customerName: '',
				outTime: '',
			},
		};
		this.props.getFinishOrderList('1');
	}
	addOrder() {
		history.push('/DepositoryOS/OutWarehouse/AddFinishOrder');
	}
	onChange(activeKey) {
		this.props.getFinishOrderList(activeKey);
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
				data.saleOrder.map((order) => {
					deliveredSum += parseInt(order.deliveredSum);
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
					placeholder='出库单号'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.finishOrderNumber}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.finishOrderNumber = e.target.value;
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
					placeholder='销售单号'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.saleNumber}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.saleNumber = e.target.value;
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
					placeholder='客户名称'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.customerName}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.customerName = e.target.value;
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
					placeholder='退货时间'
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
									finishOrderNumber: '',
									saleNumber: '',
									customerName: '',
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
export default connect(mapStateToProps, mapDispatchToprops)(FinishOrder);
