import React from 'react'
import { Component } from 'react'
import { history } from 'umi'
import { connect } from 'dva'
import { Card, Button, Row, Col, Input, Select, Table, Form } from 'antd'
import SelectCargo from './component/SelectCargo'
import { editOtherEntry } from '@/services/DepositoryOS/EntryWarehouse/otherEntry'
import './css/addOrder.css'

const namespace = "depositoryOS_entryWarehouse_otherEntry"
const mapStateToProps = (state) => {
    const { cargoList } = state[namespace]
    return { cargoList }
}
const mapDispatchToProps = (dispatch) => {
    return {
        editOtherEntryOrder(newOrder) {
            dispatch({
                type: `${namespace}/editOtherEntryOrder`,
                data: { newOrder }
            })
        },
        getCargoList() {
            dispatch({
                type: `${namespace}/getCargoList`
            })
        }
    }
}
const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};
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
        dataIndex: 'specificationModel',
        key: 'specificationModel',
        align: 'center'
    },
    {
        title: '计量单位',
        dataIndex: "unit",
        key: "unit",
        align: "center"
    }
]
const warehouseList = [
    {
        id: "warehouse1",
        name: "仓库1",
    },
    {
        id: "warehouse2",
        name: "仓库2",
    },
    {
        id: "warehouse3",
        name: "仓库3",
    },
]
class AddOtherEntry extends Component {
    formRef = React.createRef()

    tableCol = [
        {
            title: '序号',
            dataIndex: 'sequenceNumber',
            key: 'sequenceNumber',
            align: 'center'
        },
        ...modalTableCol,
        {
            title: '入库数量',
            dataIndex: 'entrySum',
            key: 'entrySum',
            width: "100px",
            align: 'center',
        },
        {
            title: '入库仓位',
            dataIndex: 'entryWarehouse',
            key: 'entryWarehouse',
            width: "120px",
            align: 'center'
        },
        {
            title:"入库原因",
            dataIndex:"reason",
            key:"reason",
            width:"200px",
            align:"center"
        },
        {
            title: "操作",
            dataIndex: "operation",
            key: "operation",
            width: "60px",
            align: "center",
            render: (_, record) => {
                return <Button type="link"
                    onClick={() => {
                        this.delRow(record.cargoId);
                    }}>删除</Button>
            }
        }
    ]

    constructor(props) {
        super(props);
        this.updataTableData = this.updataTableData.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.submit = this.submit.bind(this)
        this.delRow = this.delRow.bind(this)
        this.state = {
            tableData: [],
            selectedRows: [],
            modalIsShow: false,
        }
        this.props.getCargoList()
    }

    updataTableData() {
        const { selectedRows } = this.state
        if (selectedRows instanceof Array) {
            let tempTableData = selectedRows.map((cargo, index) => {
                return {
                    ...cargo,
                    key: cargo.cargoId,
                    sequenceNumber: index + 1,
                    entrySum:
                        <Input style={{ width: "100%" }}
                            onChange={(e) => {
                                const { selectedRows } = this.state
                                let nextSelectedRows = selectedRows.map((row) => {
                                    if (row.cargoId === cargo.cargoId) {
                                        return {
                                            ...row,
                                            entrySum: e.target.value
                                        }
                                    }
                                    return row
                                })
                                this.setState({
                                    selectedRows: nextSelectedRows
                                })
                            }} />,
                    entryWarehouse:
                        <Select style={{ width: "100%" }}
                            onChange={(value) => {
                                const { selectedRows } = this.state
                                let nextSelectedRows = selectedRows.map((row) => {
                                    if (row.cargoId === cargo.cargoId) {
                                        return {
                                            ...row,
                                            entryWarehouse: value
                                        }
                                    }
                                    return row
                                })

                                this.setState({
                                    selectedRows: nextSelectedRows
                                })
                            }}>
                            {(() => {
                                return warehouseList.map((warehouse) => {
                                    return <Select.Option
                                        key={warehouse.id}
                                        value={warehouse.id}
                                    >
                                        {warehouse.name}
                                    </Select.Option>
                                })
                            })()}
                        </Select>,
                    reason:<Input style={{ width: "100%" }}
                        onChange={(e) => {
                            const { selectedRows } = this.state
                            let nextSelectedRows = selectedRows.map((row) => {
                                if (row.cargoId === cargo.cargoId) {
                                    return {
                                        ...row,
                                        reason: e.target.value
                                    }
                                }
                                return row
                            })
                            this.setState({
                                selectedRows: nextSelectedRows
                            })
                        }} />
                }
            })
            this.setState({
                tableData: tempTableData
            })
        }
    }

    onOk(selectedRows) {
        selectedRows = selectedRows.filter((row) => {
            const index = this.state.selectedRows.findIndex((row2) => {
                return row.cargoId === row2.cargoId
            })
            return index === -1
        })
        this.setState({
            selectedRows: [
                ...this.state.selectedRows,
                ...selectedRows
            ],
            modalIsShow: false
        }, () => {
            this.updataTableData()
        })
    }

    onCancel() {
        this.setState({
            modalIsShow: false
        })
    }

    delRow(cargoId) {
        if(cargoId){
            const nextSelectedRows=[]
            this.state.selectedRows.map((row)=>{
                if(row.cargoId!==cargoId){
                    nextSelectedRows.push(row)
                }
                return null
            })
            this.setState({
                selectedRows:nextSelectedRows
            },()=>{
                this.updataTableData()
            })
        }
    }

    async submit() {
        const {
            otherEntryNumber,
            entryTime
        } = this.formRef.current.getFieldsValue()
        const newOrder = {
            creator: "张三",
            otherEntryNumber: `${otherEntryNumber}`,
            entryTime,
            entry: false,
            cargos: this.state.selectedRows,
        }
        let flag=0
        if(newOrder.cargos instanceof Array){
            if(newOrder.cargos.length<=0){
                flag=1
            }else{
                newOrder.cargos.map((cargo)=>{
                    for(let field in cargo){
                        if(cargo[field]===""||cargo[field]===undefined){
                            flag=2
                            break;
                        }else if(typeof(cargo[field])=='string'){
                                if(cargo[field].replace(/(^\s*)|(\s*$)/g,"")===""){
                                    flag=3
                                    break;
                            }
                        }
                    }
                })
            }
        }else{
            flag=1
        }
        switch(flag){
            case 0:
                const result = await editOtherEntry({ newOrder })
                if (result.success) {
                    alert("添加成功")
                    history.push("/DepositoryOS/EntryWarehouse/OtherEntryList");
                } else {
                    alert("添加失败")
                }
                break;
            case 1:
                alert("未选择任何一行")
                break;
            case 2:
                alert("未填写完整")
                break;
            case 3:
                alert("不能全为空格")
                break;
        }
    }

    render() {
        return (
            <Card style={{ width: "1280px" }}>
                <div id="context">
                    <Form {...layout} ref={this.formRef}>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    label="其他入库单号"
                                    name="otherEntryNumber"
                                    initialValue={new Date().getTime()}>
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="入库时间"
                                    name="entryTime"
                                    initialValue={(new Date().toLocaleDateString())}>
                                    <Input readOnly />
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
                                        onClick={() => {
                                            this.setState({
                                                modalIsShow: true
                                            })
                                        }}>选择货物</Button>
                                </div>
                                <Table className="tablebody"
                                    dataSource={this.state.tableData}
                                    columns={this.tableCol}
                                    bordered={true}
                                    pagination={false}>
                                </Table>
                            </Col>
                        </Row>
                        <Row justify="space-around">
                            <Col sapn={3}>
                                <Button style={{ margin: "20px" }}
                                    htmlType='submit'
                                    onClick={this.submit}>确定</Button>
                                <Button style={{ margin: "20px" }}
                                    htmlType='button'
                                    onClick={this.cancel}>取消</Button>
                            </Col>
                        </Row>

                        <SelectCargo visible={this.state.modalIsShow}
                            columns={modalTableCol}
                            dataSource={this.props.cargoList}
                            onOk={this.onOk}
                            onCancel={this.onCancel}
                            rowKey="cargoId"
                            rowSelectionType="checkBox" />
                    </Form>
                </div>
            </Card>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddOtherEntry)