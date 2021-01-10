import {
    Form, Input, Button, Select,
    Row, Col, DatePicker, Table, Modal, Breadcrumb, Card
} from 'antd'
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
const modalTableCol = [
    {
        title: '物料编号',
        dataIndex: 'cargoId',
        key: 'cargoId',
        align: 'center'
    },
    {
        title: '物料名称',
        dataIndex: 'cargoName',
        key: 'cargoName',
        align: 'center'
    },
    {
        title: '规格型号',
        dataIndex: 'SpecificationModel',
        key: 'SpecificationModel',
        align: 'center'
    },
    {
        title:'计量单位',
        dataIndex:"unit",
        key:"unit",
        align:"center"
    }
]
const tableCol = [
    {
        title: '序号',
        dataIndex: 'sequenceNumber',
        key: 'sequenceNumber',
        align: 'center'
    },
    ...modalTableCol,
    {
        title: '入库数量',
        dataIndex: 'sum',
        key: 'sum',
        width:"100px",
        align: 'center'
    },
    {
        title: '入库仓位',
        dataIndex: 'warehouse',
        key: 'warehouse',
        width:"120px",
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
const supplierList=[
    {
        supplierNumber:"supplier1",
        supplierName:"供应商1",
    },
    {
        supplierNumber:"supplier2",
        supplierName:"供应商2",
    },
    {
        supplierNumber:"supplier3",
        supplierName:"供应商3",
    }
]
const namespace = "entryWarehouseReceiveCargo";
const mapStateToProps = (state) => {
    let receiveCargoList = state[namespace].data;
    let temp = [];
    receiveCargoList.map((data, index) => {
        if (!data.registered) {
            temp.push(data);
        }
    })
    receiveCargoList = temp;
    return {
        receiveCargoList,
    }
}
const mapDispatchToprops = (dispatch) => {
    return {
        getReceiveCargoList: () => {
            dispatch({
                type: `${namespace}/getReceiveCargoList`
            })
        }
    }
}
class AddOrder extends Component {
    formRef = React.createRef();
    constructor(props) {
        sessionStorage.creator="刘一";
        super(props);
        this.choseCargo = this.choseCargo.bind(this);
        this.modalOnOk = this.modalOnOk.bind(this);
        this.modalOnCancel = this.modalOnCancel.bind(this);
        this.cancel = this.cancel.bind(this);
        this.submit = this.submit.bind(this)
        this.postReceiveOrderToServer = this.postReceiveOrderToServer.bind(this)
        this.updateTableData = this.updateTableData.bind(this)
        this.modalTableOnRow = this.modalTableOnRow.bind(this);
        this.modalTableRowSelectionOnChange = this.modalTableRowSelectionOnChange.bind(this);
        this.state = {
            selectedCargo:[],
            sum: "",
            warehouse: "",
            tableData: [],
            isModalVisible: false,
            selectedRowKeys: [],
        }
    }
    modalTableRowSelectionOnChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedCargo: selectedRows,
            selectedRowKeys: selectedRowKeys
        })
    };
    componentDidMount() {
        let time = new Date().getTime();
        this.formRef.current.setFieldsValue({
            receiveOrderNumber: time
        })
    }
    updateTableData() {
        let tableDataTemp=[]
        this.state.selectedCargo.map((cargo,index)=>{
            tableDataTemp.push({
                key: cargo.cargoId,
                sequenceNumber:index+1,
                ...(cargo),
                sum: <Input onChange={
                    (e) => {
                        let selectedCargoTemp=[]
                        this.state.selectedCargo.map((selectedCargo)=>{
                            if(cargo.cargoId===selectedCargo.cargoId){
                                let temp=selectedCargo
                                temp.sum=e.target.value
                                selectedCargoTemp.push(temp)
                            }else{
                                selectedCargoTemp.push(selectedCargo)
                            }
                        })
                        this.setState({
                            selectedCargo: selectedCargoTemp
                        })
                    }
                    }
                    style={{paddingLeft:'5px',paddingRight:'5px'}}></Input>,
                warehouse: <Select style={{ width: "100%" }}
                    onChange={
                        (key) => {
                            let selectedCargoTemp=[]
                            this.state.selectedCargo.map((selectedCargo)=>{
                                if(cargo.cargoId===selectedCargo.cargoId){
                                    let temp=selectedCargo
                                    temp.warehouse=key
                                    selectedCargoTemp.push(temp)
                                }else{
                                    selectedCargoTemp.push(selectedCargo)
                                }
                            })
                            this.setState({
                                selectedCargo: selectedCargoTemp
                            })
                        }
                    }>
                    {(()=>{
                        let options=[]
                        warehouseList.map((warehouse)=>{
                            options.push(<Option key={warehouse.id} value={warehouse.name}>{warehouse.name}</Option>);
                        })
                        return options
                    })()}
                </Select>,
                operation:<Button type="link"
                    onClick={()=>{
                        let nextSelectedCargo=[]
                        let nextSelectedRowKeys=[]
                        this.state.selectedCargo.map((selectedCargo,index)=>{
                            if(cargo.cargoId!==selectedCargo.cargoId){
                                nextSelectedCargo.push(selectedCargo);
                                nextSelectedRowKeys.push(selectedCargo.cargoId);
                            }
                        })
                        this.setState({
                            selectedCargo:nextSelectedCargo,
                            selectedRowKeys: nextSelectedRowKeys,
                        },()=>{
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
            "receiveOrderNumber",
            "supplierName",
            "supplierNumber",
            "receiveTime",
        ];
        let fieldValue = {
            receiveOrderNumber: '',
            supplierName: '',
            supplierNumber: '',
            receiveTime: '',
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
            selectedCargo:this.state.selectedCargo,
        }
        let flag = true;
        let isNumber=true;
        for (let field in all) {
            if (!all[field]) {
                flag = false;
                break;
            }
            if(field==="selectedCargo"){
                if(all[field].toString()===""){
                    flag=false
                }
                all[field].map((cargo,index)=>{
                    if(!cargo.sum){
                        flag = false;
                    }
                    if(!cargo.warehouse){
                        flag = false;
                    }
                    let regExp=new RegExp("^[0-9]*$",'g');
                    isNumber=regExp.test(cargo.sum);
                })
            }
        }
        if (flag) {
            if (!isNumber) {
                alert("入库数量只能填写数字");
            }else{
                this.postReceiveOrderToServer("/postReceiveOrderList", "post",
                    all).then(
                        value => {
                            alert(value);
                            history.push('/DepositoryOS/EntryWarehouse/ReceiveOrder');
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
        history.push('/DepositoryOS/EntryWarehouse/ReceiveOrder');
    }
    choseCargo() {
        this.props.getReceiveCargoList();
        this.setState({
            isModalVisible: true
        });
    }
    postReceiveOrderToServer(url, option, data) {
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
                        reject("新增失败");
                    }
                }
            };
        })
    }
    modalOnOk() {
        this.updateTableData();
        this.setState({
            isModalVisible: false
        });
    }
    modalOnCancel() {
        this.setState({
            isModalVisible: false
        });
    }
    modalTableOnRow(record) {
        return {
            onClick: event => {
                let nextSelectedCargo=[]
                let nextSelectedRowKeys=[]
                let exist=false
                this.state.selectedCargo.map((cargo)=>{
                    if(record.cargoId===cargo.cargoId){
                        exist=true
                    }else{
                        nextSelectedCargo.push(cargo);
                        nextSelectedRowKeys.push(cargo.cargoId);
                    }
                })
                if(!exist){
                    nextSelectedCargo.push({
                        cargoId: record.cargoId,
                        cargoName: record.cargoName,
                        SpecificationModel: record.SpecificationModel,
                        unit:record.unit,
                        registered: true
                    });
                    nextSelectedRowKeys.push(record.cargoId);
                }
                this.setState({
                    selectedCargo: nextSelectedCargo,
                    selectedRowKeys: nextSelectedRowKeys,
                })
            }
        }
    }
    render() {
        return (
            <Card style={{width:"1280px"}}>
                <div id="context">
                    <Form {...layout} ref={this.formRef}>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="入库单号"
                                    name="receiveOrderNumber">
                                    <Input readOnly/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="供应商"
                                    name="supplierName"
                                    required={true}>
                                    <Select>
                                        {(()=>{
                                            let options=[]
                                            supplierList.map((supplier)=>{
                                                options.push(<Option key={supplier.supplierNumber} value={supplier.supplierName}>{supplier.supplierName}</Option>);
                                            })
                                            return options
                                        })()}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="供应商单号"
                                    name="supplierNumber"
                                    required={true}>
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="入库时间"
                                    name="receiveTime"
                                    required={true}
                                    initialValue={(new Date().toLocaleDateString())}>
                                    <Input readOnly/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <div className="tableheader">
                                    <span>入库明细</span>
                                    <Button className="choseCargo"
                                        type="primary"
                                        htmlType="button"
                                        onClick={this.choseCargo}>选择货物</Button>
                                    <Modal visible={this.state.isModalVisible}
                                        onCancel={this.modalOnCancel}
                                        onOk={this.modalOnOk}>
                                        <Table dataSource={this.props.receiveCargoList}
                                            columns={modalTableCol}
                                            rowSelection={{
                                                type: 'checkbox',
                                                selectedRowKeys: this.state.selectedRowKeys,
                                                onChange: this.modalTableRowSelectionOnChange
                                            }}
                                            onRow={this.modalTableOnRow}>
                                        </Table>
                                    </Modal>
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