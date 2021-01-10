import {
    Form, Input, Button, Select,
    Row, Col, DatePicker, Table, 
    Modal, Card} from 'antd'
import { Component } from 'react'
import { history } from 'umi'
import { connect } from 'dva'
import './addOrder.css'
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
const { Option } = Select;
const tableCol = [
    {
        title: '序号',
        dataIndex: 'sequenceNumber',
        key: 'sequenceNumber',
        align: 'center'
    },
    {
        title: '成品编号',
        dataIndex: 'finishedProductId',
        key: 'finishedProductId',
        align: 'center'
    },
    {
        title: '成品名称',
        dataIndex: 'finishedProductName',
        key: 'finishedProductName',
        align: 'center'
    },
    {
        title: '规格型号',
        dataIndex: 'SpecificationModel',
        key: 'SpecificationModel',
        align: 'center'
    },
    {
        title: '订单数量',
        dataIndex: 'sum',
        key: 'sum',
        align: 'center'
    },
    {
        title: '已发货数量',
        dataIndex: 'deliveredSum',
        key: 'deliveredSum',
        align: 'center'
    },
    {
        title: '退货数量',
        dataIndex: 'returnSum',
        key: 'returnSum',
        width: '100px',
        align: 'center'
    },
    {
        title: '入库仓位',
        dataIndex: 'warehouse',
        key: 'warehouse',
        width: '120px',
        align: 'center'
    },
    {
        title: '退货原因',
        dataIndex: 'returnReason',
        key: 'returnReason',
        width: '200px',
        align: 'center'
    },
    {
        title:"操作",
        dataIndex:"operation",
        key:"operation",
        width:"60px",
        align:"center"
    }
]
const warehouseList=[
    {
        id:"warehouse1",
        name:"仓库1",
    },
    {
        id:"warehouse2",
        name:"仓库2",
    },
    {
        id:"warehouse3",
        name:"仓库3",
    },
]
const namespace = "entryWarehouseSaleOrder";
const mapStateToProps = (state) => {
    let saleNumberList = state[namespace].saleNumberList;
    let saleOrder = state[namespace].saleOrder;
    return {
        saleNumberList,
        saleOrder
    }
}
const mapDispatchToprops = (dispatch) => {
    return {
        getSaleNumberList: () => {
            dispatch({
                type: `${namespace}/getSaleNumberList`
            })
        },
        getSaleOrder:(saleNumber)=>{
            dispatch({
                type: `${namespace}/getSaleOrder`,
                saleNumber:saleNumber
            })
        },
        clear:()=>{
            dispatch({
                type:`${namespace}/clear`,
            })
        }
    }
}
class AddOrder extends Component {
    formRef = React.createRef();
    constructor(props) {
        sessionStorage.creator="刘一";
        super(props);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this)
        this.postReturnOrderToServer = this.postReturnOrderToServer.bind(this)
        this.updateTableData = this.updateTableData.bind(this)
        this.saleNumberOnChange=this.saleNumberOnChange.bind(this);
        this.state = {
            tableData: [],
            selectedSaleOrder:[]
        }
        this.props.getSaleNumberList();
    }
    componentDidMount() {
        let time = new Date().getTime();
        this.formRef.current.setFieldsValue({
            returnOrderNumber: time
        })
    }
    componentWillUnmount(){
        this.props.clear()
    }
    updateTableData() {
        let tableDataTemp=[]
        this.state.selectedSaleOrder.map((order,index)=>{
            tableDataTemp.push({
                key: order.saleNumber,
                sequenceNumber:index+1,
                ...(order),
                returnSum: <Input onChange={(e) => {
                        let selectedSaleOrderTemp=[]
                        this.state.selectedSaleOrder.map((selectedSaleOrder)=>{
                            if(order.saleNumber===selectedSaleOrder.saleNumber){
                                let temp=selectedSaleOrder
                                temp.returnSum=e.target.value
                                selectedSaleOrderTemp.push(temp)
                            }else{
                                selectedSaleOrderTemp.push(selectedSaleOrder)
                            }
                        })
                        this.setState({
                            selectedSaleOrder: selectedSaleOrderTemp
                        })
                    }}
                    style={{paddingLeft:'5px',paddingRight:'5px'}}></Input>,
                warehouse: <Select style={{ width: "100%" }}
                    onChange={(key)=>{
                        let selectedSaleOrderTemp=[]
                        this.state.selectedSaleOrder.map((selectedSaleOrder)=>{
                            if(order.saleNumber===selectedSaleOrder.saleNumber){
                                let temp=selectedSaleOrder
                                temp.warehouse=key
                                selectedSaleOrderTemp.push(temp)
                            }else{
                                selectedSaleOrderTemp.push(selectedSaleOrder)
                            }
                        })
                        this.setState({
                            selectedSaleOrder: selectedSaleOrderTemp
                        })
                    }}>
                    {(()=>{
                        let options=[]
                        warehouseList.map((warehouse)=>{
                            options.push(<Option key={warehouse.id} value={warehouse.name}>{warehouse.name}</Option>);
                        })
                        return options
                    })()}
                </Select>,
                returnReason:<Input onChange={(e) => {
                    let selectedSaleOrderTemp=[]
                    this.state.selectedSaleOrder.map((selectedSaleOrder)=>{
                        if(order.saleNumber===selectedSaleOrder.saleNumber){
                            let temp=selectedSaleOrder
                            temp.returnReason=e.target.value
                            selectedSaleOrderTemp.push(temp)
                        }else{
                            selectedSaleOrderTemp.push(selectedSaleOrder)
                        }
                    })
                    this.setState({
                        selectedSaleOrder: selectedSaleOrderTemp
                    })
                }}/>,
                operation:<Button type="link"
                    onClick={()=>{
                        let nextSaleOrder=[]
                        this.state.selectedSaleOrder.map((selectedSaleOrder,index)=>{
                            if(order.saleNumber!==selectedSaleOrder.saleNumber){
                                nextSaleOrder.push(selectedSaleOrder);
                            }
                        })
                        this.setState({
                            selectedSaleOrder:nextSaleOrder,
                        },()=>{
                            if(this.formRef.current){
                                this.formRef.current.setFieldsValue({
                                    saleNumber:""
                                })
                            }
                            this.updateTableData()
                        })
                    }}>删除</Button>
            })
        })
        this.setState({
            tableData: tableDataTemp
        })
    }
    submit() {
        let getFieldValue = this.formRef.current.getFieldValue
        let fieldName = [
            "returnOrderNumber",
            "customerName",
            "saleNumber",
            "returnTime",
        ];
        let fieldValue = {
            returnOrderNumber: '',
            customerName: '',
            saleNumber: '',
            returnTime: '',
        }
        for (let i = 0; i < fieldName.length; i++) {
            let value = getFieldValue(fieldName[i]);
            if (value) {
                if(typeof value==="string"){
                    value=value.replace(/(^\s*)|(\s*$)/g, "")
                }
            } else {
                value = "";
            }
            fieldValue[fieldName[i]] = value;
        }
        let all = {
            creator:sessionStorage.creator,
            ...fieldValue,
            selectedSaleOrder:this.state.selectedSaleOrder
        }
        let flag = true;
        let isNumber=true;
        let returnSumTooLarge=false
        for (let field in all) {
            if (!all[field]) {
                flag = false;
                break;
            }
            if(field==="selectedSaleOrder"){
                if(all[field].toString()===""){
                    flag=false
                }
                all[field].map((saleOrder,index)=>{
                    if(!saleOrder.returnSum){
                        flag = false;
                    }
                    if(!saleOrder.warehouse){
                        flag = false;
                    }
                    if(!saleOrder.returnReason){
                        flag = false;
                    }
                    if(saleOrder.returnSum>parseInt(saleOrder.deliveredSum)){
                        returnSumTooLarge=true
                    }
                    let regExp=new RegExp("^[0-9]*$",'g');
                    isNumber=regExp.test(saleOrder.returnSum);
                })
                
            }
        }
        if (flag) {
            if (!isNumber) {
                alert("退货数量只能填写数字");
            }else if(returnSumTooLarge){
                alert("退货数量不能大于发货数量")
            }else{
                this.postReturnOrderToServer("/postReturnOrderList", "post",
                    all).then(
                        value => {
                            alert(value);
                            history.push('/DepositoryOS/EntryWarehouse/ReturnOrder');
                        },
                        reason=>{
                            alert(reason);
                        }
                    )
            }
        } else {
            alert("信息未填写完整");
        }
    }
    cancel() {
        history.push('/DepositoryOS/EntryWarehouse/ReturnOrder');
    }
    postReturnOrderToServer(url, option, data) {
        return new Promise((resolve, reject) => {
            let xhr = new XMLHttpRequest();
            xhr.open(option, url);
            xhr.send(JSON.stringify(data));
            xhr.onreadystatechange = () => {
                if (xhr.readyState == 4){
                    if(xhr.status == 200) {
                        let msg = xhr.responseText;
                        resolve(msg);
                    }else{
                        reject("新增失败")
                    }
                }
            };
        })
    }
    saleNumberOnChange(value){
        this.props.getSaleOrder(value);
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(JSON.stringify(nextProps.saleOrder)!=="{}"&&nextProps.saleOrder){
            this.setState({
                selectedSaleOrder:[nextProps.saleOrder]
            },()=>{
                this.updateTableData();
            })
        }
    }
    render() {
        return (
            <Card style={{minWidth:"1280px"}}>
                <div id="context">
                    <Form {...layout} ref={this.formRef}>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="退货单号"
                                    name="returnOrderNumber">
                                    <Input readOnly value="单号" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="客户名称"
                                    name="customerName"
                                    required={true}>
                                    <Input />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="销售单号"
                                    name="saleNumber"
                                    required={true}>
                                    <Select onChange={this.saleNumberOnChange}>
                                        {(()=>{
                                            let saleNumberList=this.props.saleNumberList
                                            let options=[]
                                            if(saleNumberList){
                                                saleNumberList.map((saleNumber)=>{
                                                    options.push(
                                                        <Option key={saleNumber} value={saleNumber}>{saleNumber}</Option>
                                                    );
                                                })
                                            }
                                            return options
                                        })()}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="退货时间"
                                    name="returnTime"
                                    required={true}
                                    initialValue={new Date().toLocaleDateString()}>
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className="tableheader">
                                    <span>退货明细</span>
                                </div>
                                <Table className="tablebody"
                                    dataSource={this.state.tableData}
                                    columns={tableCol}
                                    bordered={true}
                                    pagination={false}>
                                </Table>
                            </Col>
                        </Row>
                        <Row justify="space-around">
                            <Col sapn={3}>
                                <Button style={{ margin: "20px" }} htmlType='submit' onClick={this.submit}>确定</Button>
                                <Button style={{ margin: "20px" }} htmlType='button' onClick={this.cancel}>取消</Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </Card>
        )
    }
};
export default connect(mapStateToProps, mapDispatchToprops)(AddOrder);