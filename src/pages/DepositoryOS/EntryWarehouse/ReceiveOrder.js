import { Tabs, Card, Table, Button, Input, Row, Col } from 'antd';
import { Component } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
const { TabPane } = Tabs;

const namespace = 'entryWarehouseReceiveOrderList';

const mapStateToProps = (state) => {
	let list = state[namespace].data;
	return {
		list,
	};
};
const mapDispatchToprops = (dispatch) => {
	return {
		getReceiveOrderList: (activeKey) => {
			dispatch({
				type: `${namespace}/getReceiveOrderList`,
				status: activeKey,
			});
		},
	};
};
const rowClickKeyUrl = '/DepositoryOS/EntryWarehouse/ReceiveOrderDetails?details=true&receiveOrderNumber'
const tableCol = [
	{
		title: '入库单号',
		dataIndex: 'receiveOrderNumber',
		key: 'receiveOrderNumber',
		align: 'center',
	},
	{
		title: '供应商送货单号',
		dataIndex: 'supplierNumber',
		key: 'supplierNumber',
		align: 'center',
		textWrap: 'word-break',
	},
	{
		title: '供应商名称',
		dataIndex: 'supplierName',
		key: 'supplierName',
		align: 'center',
	},
	{
		title: '入库时间',
		dataIndex: 'receiveTime',
		key: 'receiveTime',
		align: 'center',
	},
	{
		title: '订单数量',
		dataIndex: 'orderSum',
		key: 'sum',
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
            if (record.entry) {
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
				'/DepositoryOS/EntryWarehouse/ReceiveOrderDetails?details=true&receiveOrderNumber=' +
					record.key,
			);
		}, // 点击行
	};
};
let tableData = [];
class ReceiveOrder extends Component {
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
				receiveOrderNumber: '',
				supplierNumber: '',
				supplierName: '',
				receiveTime: '',
			},
		};
		this.props.getReceiveOrderList('1');
	}
	addOrder() {
		history.push('/DepositoryOS/EntryWarehouse/AddReceiveOrder');
	}
	onChange(activeKey) {
		this.props.getReceiveOrderList(activeKey);
	}
	//过滤入库单列表
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
					placeholder='入库单号'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.receiveOrderNumber}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.receiveOrderNumber = e.target.value;
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
					placeholder='供应送货单号'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.supplierNumber}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.supplierNumber = e.target.value;
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
					placeholder='供应商'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.supplierName}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.supplierName = e.target.value;
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
					placeholder='入库时间'
					style={{ width: '100px', marginRight: '8px' }}
					value={this.state.filter.receiveTime}
					onChange={(e) => {
						let filterTemp = this.state.filter;
						filterTemp.receiveTime = e.target.value;
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
									receiveOrderNumber: '',
									supplierNumber: '',
									supplierName: '',
									receiveTime: '',
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
					<TabPane tab='待入库' key='2'>
						{table}
					</TabPane>
					<TabPane tab='已入库' key='3'>
						{table}
					</TabPane>
				</Tabs>
			</Card>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(ReceiveOrder);
