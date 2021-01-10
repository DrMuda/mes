import { Component } from 'react'
import { Card, Descriptions,Button,
    Row,Col, Table} from 'antd'
import { history } from 'umi';
import {connect} from 'dva'
import html2canvas from 'html2canvas';
const namespace="outWarehouseOtherOrderDetails"
const mapStateToProps=(state)=>{
    const details=state[namespace].data
    return {
        details
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        getDetails(otherOrderNumber){
            dispatch({
                type:`${namespace}/getDetails`,
                otherOrderNumber:otherOrderNumber
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
        title:"出库数量",
        dataIndex:"outSum",
        key:"outSum",
        align:"center"
    },
    {
        title:"出库仓位",
        dataIndex:"outWarehouse",
        key:"outWarehouse",
        align:"center"
    },
    {
        title:"实时库存",
        dataIndex:"stock",
        key:"stock",
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
        let otherOrderNumber=history.location.query.otherOrderNumber;
        this.props.getDetails(otherOrderNumber);
    }
    check(){
        new Promise((resolve)=>{
            let xhr=new XMLHttpRequest();
            xhr.open('POST','/checkOtherOrder');
            xhr.send(this.props.details.otherOrderNumber);
            xhr.onreadystatechange=()=>{
                if (xhr.readyState==4&&xhr.status==200){
                    let msg=xhr.responseText;
                    resolve(msg);
                }else{
                }
            };
        }).then(value=>{
            alert(value);
            history.push('/DepositoryOS/OutWarehouse/OtherOrder');
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
            <Descriptions title="其他出库单明细" 
                bordered layout="horizontal" 
                column={2}>
                <Descriptions.Item label="出库单号"
                    labelStyle={labelStyle}>{this.props.details.otherOrderNumber}</Descriptions.Item>
                <Descriptions.Item label="领用部门" 
                    labelStyle={labelStyle}>{this.props.details.department}</Descriptions.Item>
                <Descriptions.Item label="出库时间" 
                    labelStyle={labelStyle}>{this.props.details.outTime}</Descriptions.Item>
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