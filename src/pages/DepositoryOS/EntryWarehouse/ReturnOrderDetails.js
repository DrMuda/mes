import { Component } from 'react'
import { Card, Descriptions,Button,
    Row,Col, Table} from 'antd'
import { history } from 'umi';
import {connect} from 'dva'
import html2canvas from 'html2canvas';
const namespace="entryWarehouseReturnOrderDetails"
const mapStateToProps=(state)=>{
    const details=state[namespace].data
    return {
        details
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        getDetails(returnOrderNumber){
            dispatch({
                type:`${namespace}/getDetails`,
                returnOrderNumber:returnOrderNumber
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
        title:"成品编号",
        dataIndex:"finishedProductId",
        key:"finishedProductId",
        align:"center"
    },
    {
        title:"成品名称",
        dataIndex:"finishedProductName",
        key:"finishedProductName",
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
        title:"订单数量",
        dataIndex:"sum",
        key:"sum",
        align:"center"
    },
    {
        title:"已发货数量",
        dataIndex:"deliveredSum",
        key:"deliveredSum",
        align:"center"
    },
    {
        title:"退货数量",
        dataIndex:"returnSum",
        key:"returnSum",
        align:"center"
    },
    {
        title:"入库仓位",
        dataIndex:"warehouse",
        key:"warehouse",
        align:"center"
    },
    {
        title:"退货原因",
        dataIndex:"returnReason",
        key:"returnReason",
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
        let returnOrderNumber=history.location.query.returnOrderNumber;
        this.props.getDetails(returnOrderNumber);
    }
    check(){
        new Promise((resolve)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('POST','/checkReturnOrder');
            xhr.send(this.props.details.returnOrderNumber);
            xhr.onreadystatechange=()=>{
                if (xhr.readyState==4&&xhr.status==200){
                    let msg=xhr.responseText;
                    resolve(msg);
                }else{
                }
            };
        }).then(value=>{
            alert(value);
            history.push('/DepositoryOS/EntryWarehouse/ReturnOrder');
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
        tableData=this.props.details.saleOrder
        if(tableData){
            tableData.map((data,index)=>{
                data.sequenceNumber=index+1
            })
        }
        let content=<div>
            <Descriptions title="退货单详细信息" 
                bordered layout="horizontal" 
                column={2}>
                <Descriptions.Item label="退货单号"
                    labelStyle={labelStyle}>{this.props.details.returnOrderNumber}</Descriptions.Item>
                <Descriptions.Item label="客户名称" 
                    labelStyle={labelStyle}>{this.props.details.customerName}</Descriptions.Item>
                <Descriptions.Item label="销售单号" 
                    labelStyle={labelStyle}>{this.props.details.saleNumber}</Descriptions.Item>
                <Descriptions.Item label="退货时间"
                    labelStyle={labelStyle}>{this.props.details.returnTime}</Descriptions.Item>
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