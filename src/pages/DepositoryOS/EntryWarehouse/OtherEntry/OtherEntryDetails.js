import React from 'react'
import { Component } from 'react'
import { connect } from 'dva'
import { Card, Button, Row, Col } from 'antd'
import { history } from 'umi'
import html2canvas from 'html2canvas';
import OrderDetail from './component/OrderDetail'

const namespace = "depositoryOS_entryWarehouse_otherEntry"
const mapStateToProps = (state) => {
    const { otherEntryOrderList } = state[namespace]
    return { otherEntryOrderList }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getOtherEntryOrderList() {
            dispatch({
                type: `${namespace}/getOtherEntryOrderList`
            })
        },
        editOtherEntryOrder(newOrder) {
            dispatch({
                type: `${namespace}/editOtherEntryOrder`,
                data: { newOrder }
            })
        }
    }
}

const descriptions = [
    {
        label: "其他入库单号",
        field: "otherEntryNumber"
    },
    {
        label: "入库时间",
        field: "entryTime"
    },
    {
        label: "制单人",
        field: "creator"
    }
]
const columns = [
    {
        title: "序号",
        dataIndex: "sequenceNumber",
        key: "sequenceNumber",
        align: "center"
    },
    {
        title: "物料编号",
        dataIndex: "cargoId",
        key: "cargoId",
        align: "center"
    },
    {
        title: "物料名称",
        dataIndex: "cargoName",
        key: "cargoName",
        align: "center"
    },
    {
        title: "规格型号",
        dataIndex: "specificationModel",
        key: "specificationModel",
        align: "center"
    },
    {
        title: "计量单位",
        dataIndex: "unit",
        key: "unit",
        align: "center"
    },
    {
        title: "入库数量",
        dataIndex: "entrySum",
        key: "entrySum",
        align: "center"
    },
    {
        title: "入库仓位",
        dataIndex: "entryWarehouse",
        key: "entryWarehouse",
        align: "center"
    },
    {
        title: "入库原因",
        dataIndex: "reason",
        key: "reason",
        align: "center"
    }
]


class OtherEntryDetails extends Component {
    constructor(props) {
        super(props);
        this.check = this.check.bind(this)
        this.state = {
            otherEntryOrder: {}
        }
        this.props.getOtherEntryOrderList()
    }

    check() {
        this.setState({
            otherEntryOrder: {
                ...this.state.otherEntryOrder,
                entry: true
            }
        }, () => {
            this.props.editOtherEntryOrder(this.state.otherEntryOrder)
            history.push('/DepositoryOS/EntryWarehouse/OtherEntryList');
        })
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { otherEntryOrderList } = props
        const { otherEntryNumber } = history.location.query
        const otherEntryOrder = otherEntryOrderList.filter((order) => {
            return order.otherEntryNumber === otherEntryNumber
        })[0]
        this.setState({
            otherEntryOrder
        })
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
        const { otherEntryOrder } = this.state
        return (
            <Card>
                <Card id="print">
                    <OrderDetail title="其他入库明细"
                        descriptions={descriptions}
                        table={{ columns }}
                        order={otherEntryOrder} />
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
export default connect(mapStateToProps, mapDispatchToProps)(OtherEntryDetails)