import { Component } from 'react'
import { Card, Descriptions,Button,
    Row,Col, Table} from 'antd'
import { history } from 'umi';
import {connect} from 'dva'
import html2canvas from 'html2canvas';
const namespace="entryWarehouseReceiveOrderDetails"
const mapStateToProps=(state)=>{
    const details=state[namespace].data
    return {
        details
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        getDetails(receiveOrderNumber){
            dispatch({
                type:`${namespace}/getDetails`,
                receiveOrderNumber:receiveOrderNumber
            })
        }
    }
}
const columns=[
    {
        title:"序号",
        dataIndex:"sequenceNumber",
        key:"sequenceNumber",
        align:"center"
    },
    {
        title:"物料编号",
        dataIndex:"cargoId",
        key:"cargoId",
        align:"center"
    },
    {
        title:"物料名称",
        dataIndex:"cargoName",
        key:"cargoName",
        align:"center"
    },
    {
        title:"规格型号",
        dataIndex:"SpecificationModel",
        key:"SpecificationModel",
        align:"center"
    },
    {
        title:"计量单位",
        dataIndex:"unit",
        key:"unit",
        align:"center"
    },
    {
        title:"入库数量",
        dataIndex:"sum",
        key:"sum",
        align:"center"
    },
    {
        title:"入库仓位",
        dataIndex:"warehouse",
        key:"warehouse",
        align:"center"
    }
]
let tableData=[]
class Details extends Component {
    constructor(props){
        super(props);
        this.check=this.check.bind(this);
    }
    componentDidMount(){
        let receiveOrderNumber=history.location.query.receiveOrderNumber;
        this.props.getDetails(receiveOrderNumber);
    }
    check(){
        new Promise((resolve)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('POST','/checkReceiveOrder');
            xhr.send(this.props.details.receiveOrderNumber);
            xhr.onreadystatechange=()=>{
                if (xhr.readyState==4&&xhr.status==200){
                    let msg=xhr.responseText;
                    resolve(msg);
                }else{
                }
            };
        }).then(value=>{
            alert(value);
            history.push('/DepositoryOS/EntryWarehouse/ReceiveOrder');
        });
    }
    render() {
        const { print, check } = history.location.query
        const checkButton = <Button
            onClick={this.check} >审核</Button>
        const printButton = <Button onClick={
            () => {
                new html2canvas(document.getElementById('print')).then(canvas => {
                    const oImg = "<img src='" + canvas.toDataURL('image/jpeg', 1) +
                        "' style='width:90%;' />";
                    const wind = window.open("");
                    wind.document.body.innerHTML = oImg;
                    setTimeout(() => { wind.print(); wind.close(); }, 1)
                })
            }
        }>打印</Button>
        let labelStyle={
            width:"150px"
        }
        tableData=this.props.details.cargos
        let content=<div>
            <Descriptions title="入库单详细信息" 
                bordered layout="horizontal" 
                column={2}>
                <Descriptions.Item label="入库单号"
                    labelStyle={labelStyle}>{this.props.details.receiveOrderNumber}</Descriptions.Item>
                <Descriptions.Item label="供应商送货单号" 
                    labelStyle={labelStyle}>{this.props.details.supplierNumber}</Descriptions.Item>
                <Descriptions.Item label="供应商" 
                    labelStyle={labelStyle}>{this.props.details.supplierName}</Descriptions.Item>
                <Descriptions.Item label="入库时间"
                    labelStyle={labelStyle}>{this.props.details.receiveTime}</Descriptions.Item>
                <Descriptions.Item label="制单人"
                    labelStyle={labelStyle}>{this.props.details.creator}
                </Descriptions.Item>
            </Descriptions>
            <Table dataSource={tableData}
                columns={columns}
                bordered={true}>
            </Table>
        </div>
        return (
            <Card>
                <Card id="print">
                    {content}
                </Card>
                <Row justify="center">
                    <Col>
                        {print ? printButton : <></>}
                        {check ? checkButton : <></>}
                    </Col>
                </Row>
            </Card>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Details);