import React from 'react'
import { Card, Table, Button, Row, Col, Divider } from 'antd'
import { history } from 'umi'
import SelectCargo from '@/pages/DepositoryOS/EntryWarehouse/OtherEntry/component/SelectCargo'
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    DeleteOutlined,
} from '@ant-design/icons';

const { Component } = React
const modalTableCol = [
    {
        title: "工序编码",
        dataIndex: "code"
    },
    {
        title: "工序名称",
        dataIndex: "name"
    },
]
class CraftBOM extends Component {

    columns = [
        {
            title: "序号",
            dataIndex: "sequenceNumber",
            width: "80",
            render: (_, __, index) => {
                return <>{index + 1}</>
            }
        },
        ...modalTableCol
    ]

    constructor(props) {
        super(props);
        this.state = {
            dataSource: {},
            modalIsShow: false
        }
        this.updataTableData = this.updataTableData.bind(this)
        this.moveUp = this.moveUp.bind(this)
        this.moveDown = this.moveDown.bind(this)
        this.delWorkingProcedure = this.delWorkingProcedure.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    updataTableData(dataSource, workingProcedureList, material_list) {
        let tempData = []
        let tempConfig = {}
        if (dataSource && workingProcedureList && material_list) {
            const index = material_list.findIndex?.((material) => {
                return `${material.id}` === `${dataSource.materialId}`
            })
            if (index !== -1 && index != undefined) {
                tempConfig = {
                    ...material_list[index],
                    materialId: dataSource.materialId,
                    id: dataSource.id
                }
            } else {
                tempConfig = {
                    materialId: dataSource.materialId,
                    id: dataSource.id
                }
            }
            dataSource.workingProcedureIdList?.map?.((id) => {
                const index = workingProcedureList.findIndex((workingProcedure) => {
                    return workingProcedure.id === id
                })
                if (index !== -1 && index !== undefined) {
                    tempData.push(workingProcedureList[index])
                }
            })
            this.setState({
                dataSource: {
                    ...tempConfig,
                    workingProcedureList: tempData
                }
            })
        }
    }

    moveUp(index) {
        if (index !== 0) {
            let tempData = JSON.parse(JSON.stringify(this.state.dataSource))
            let workingProcedure = tempData.workingProcedureList.splice(index, 1)[0]
            tempData.workingProcedureList.splice(index - 1, 0, workingProcedure)
            this.setState({
                dataSource: tempData
            })
        }
    }

    moveDown(index) {
        let tempData = JSON.parse(JSON.stringify(this.state.dataSource))
        if (index + 1 !== tempData?.workingProcedureList?.length) {
            let workingProcedure = tempData.workingProcedureList.splice(index, 1)[0]
            tempData.workingProcedureList.splice(index + 1, 0, workingProcedure)
            this.setState({
                dataSource: tempData
            })
        }
    }

    delWorkingProcedure(id) {
        let tempData = JSON.parse(JSON.stringify(this.state.dataSource))
        const index = tempData.workingProcedureList.findIndex((workingProcedure) => {
            return `${workingProcedure.id}` === `${id}`
        })
        if (index !== undefined && index !== -1) {
            tempData.workingProcedureList.splice(index, 1)
            this.setState({
                dataSource: tempData
            })
        }
    }

    onOk(selectRows) {
        let tempData = JSON.parse(JSON.stringify(this.state.dataSource))
        selectRows.map((row) => {
            tempData.workingProcedureList.push(row)
        })
        this.setState({
            dataSource: tempData,
            modalIsShow: false
        })
    }

    onCancel() {
        this.setState({
            modalIsShow: false
        })
    }

    async onSave() {
        const { id, materialId } = this.state.dataSource
        const workingProcedureIdList = this.state.dataSource.workingProcedureList?.map?.((workingProcedureId) => {
            return workingProcedureId.id
        })
        await this.props.editCraftBOM({ id, materialId, workingProcedureIdList })
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { dataSource, workingProcedureList, material_list } = props
        if (this.props !== props) {
            this.updataTableData(dataSource, workingProcedureList, material_list)
        }
    }

    render() {
        let columns=this.columns
        if(this.props.edit){
            columns.push(
                {
                    title: "操作",
                    dataIndex: "operation",
                    render: (_, record, index) => {
                        return (this.props.edit ?
                            <Row justify='space-around'>
                                <Col>
                                    <ArrowUpOutlined />
                                    <Button
                                        type='link'
                                        onClick={() => {
                                            this.moveUp(index);
                                        }}>
                                        上移
                                    </Button>
                                </Col>
                                <Col>
                                    <ArrowDownOutlined />
                                    <Button
                                        type='link'
                                        onClick={() => {
                                            this.moveDown(index);
                                        }}>
                                        下移
                                    </Button>
                                </Col>
                                <Col>
                                    <DeleteOutlined />
                                    <Button
                                        type='link'
                                        onClick={() => {
                                            this.delWorkingProcedure(record.id);
                                        }}>
                                        删除
                                    </Button>
                                </Col>
                            </Row>
                            :
                            <></>
                        )
                    }
                }
            )
        }
        return (
            <Card>
                <Row>
                    <Col span={12}>
                        <Row justify="end">
                            <Col>
                                物料编码：
                            </Col>
                            <Col span={12}>
                                {this.state.dataSource.material_code}
                            </Col>
                        </Row>
                        <Row justify="end">
                            <Col>
                                物料属性：
                            </Col>
                            <Col span={12}>
                                {this.state.dataSource.material_properties}
                            </Col>
                        </Row>
                    </Col>
                    <Col span={12}>
                        <Row justify="end">
                            <Col>
                                物料名称：
                            </Col>
                            <Col span={12}>
                                {this.state.dataSource.material_name}
                            </Col>
                        </Row>
                        <Row justify="end">
                            <Col>
                                规格型号：
                            </Col>
                            <Col span={12}>
                                {this.state.dataSource.specification}
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Divider />
                <Row justify="space-between"
                    style={{
                        border: "1px #f0f0f0 solid",
                        borderBottom: "0px",
                        padding: "8px"
                    }}
                    align="middle"
                >
                    <Col>工序明细</Col>
                    <Col>
                        {(() => {
                            return (this.props.edit ?
                                <Button type="primary"
                                    onClick={() => {
                                        this.setState({
                                            modalIsShow: true
                                        })
                                    }}>选择工序</Button>
                                :
                                <></>
                            )
                        })()}
                    </Col>
                </Row>
                <Table bordered style={{ width: "100%" }}
                    columns={columns}
                    dataSource={this.state.dataSource.workingProcedureList} />
                <SelectCargo visible={this.state.modalIsShow}
                    columns={modalTableCol}
                    dataSource={this.props.workingProcedureList}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    rowKey="id"
                    rowSelectionType="checkBox" />
                <Row justify="center">
                    <Col>
                        <Button style={{ margin: "8px" }}
                            htmlType="submit"
                            onClick={async () => {
                                if (this.props.edit) {
                                    await this.onSave()
                                }
                                history.push('/ConfigOS/ProduceConfig/CraftBOM')
                            }}>
                            确定
                        </Button>
                        <Button style={{ margin: "8px" }}
                            onClick={() => {
                                history.push('/ConfigOS/ProduceConfig/CraftBOM')
                            }}>
                            取消
                        </Button>
                    </Col>
                </Row>
            </Card>
        )
    }
}
export default CraftBOM