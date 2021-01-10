import React from 'react'
import { Component } from 'react'
import { connect } from 'dva'
import { Button, Card, Row, Col } from 'antd'
import { history } from 'umi'
import Search from './component/Search'
import OrderListTable from './component/OrderListTable'

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
        }
    }
}

// 用于跳转详情页的基础URL
const rowClickKeyUrl="/DepositoryOS/EntryWarehouse/OtherEntryDetails?otherEntryNumber"

// 用于搜索功能的输入框字段
const searchFields = [
    {
        key: "otherEntryNumber",
        placeholder: "其他入库单号"
    },
    {
        key: "entryTime",
        placeholder: "入库时间"
    }
]

const columns = [
    {
        title: "其他入库单号",
        dataIndex: "otherEntryNumber",
        key: "otherEntryNumber",
        align: "center"
    },
    {
        title: "入库日期",
        dataIndex: "entryTime",
        key: "entryTime",
        align: "center"
    },
    {
        title: "入库数量",
        dataIndex: "orderSum",
        key: "orderSum",
        align: "center"
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
]
class OtherEntryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterKeys: {},
            tableData: []
        }
        this.onSearch = this.onSearch.bind(this)
        this.initTableData = this.initTableData.bind(this)
        this.props.getOtherEntryOrderList()
    }

    onSearch(filterKeys) {
        if (JSON.stringify(filterKeys) === "{}") {
            filterKeys = {
                otherEntryNumber: "",
                entryTime: ""
            }
        }
        this.setState({ filterKeys }, () => {
            const { otherEntryOrderList } = this.props
            this.initTableData(otherEntryOrderList)
                .then(() => {
                    const tempTableData = []
                    this.state.tableData.map((data) => {
                        const keys = Object.keys(filterKeys)
                        let flag = false
                        keys.map((key) => {
                            if (data[key].indexOf(filterKeys[key].replace(/(^\s*)|(\s*$)/g, "")) !== -1) {
                                flag = true
                            }
                        })
                        if (flag) {
                            tempTableData.push(data)
                        }
                        return null
                    })
                    this.setState({
                        tableData: tempTableData
                    })
                })
        })
    }

    initTableData(otherEntryOrderList) {
        return new Promise((resolve) => {
            if (otherEntryOrderList instanceof Array) {
                const tempOrderList = otherEntryOrderList.map((data) => {
                    if (data.cargos instanceof Array) {
                        return {
                            ...data,
                            key: data.otherEntryNumber,
                            orderSum: data.cargos.length
                        }
                    }
                    return {
                        ...data,
                        orderSum: 0
                    }
                })
                this.setState({
                    tableData: tempOrderList
                }, () => {
                    resolve()
                })
            }
        })
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { otherEntryOrderList } = props
        this.initTableData(otherEntryOrderList)
    }

    render() {
        return (
            <Card>
                <Row justify="space-between">
                    <Col>
                        <Button type="primary"
                            onClick={()=>{
                                history.push('/DepositoryOS/EntryWarehouse/AddOtherEntry')
                            }}>新增</Button>
                    </Col>
                    <Col>
                        <Search filterKeys={this.state.filterKeys}
                            onSearch={this.onSearch}
                            fields={searchFields} />
                    </Col>
                </Row>
                <OrderListTable columns={columns}
                    dataSource={this.state.tableData}
                    classify={{
                        classifyBy: "entry",
                        classification: [
                            { title: "全部" },
                            { title: "待入库", filter: (value) => value === false },
                            { title: "已入库", filter: (value) => value === true },
                        ]
                    }}
                    rowClickKeyUrl={rowClickKeyUrl} />
            </Card>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(OtherEntryList)