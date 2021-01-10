import React from 'react'
import { Card, Button, Popconfirm, Row, Col } from 'antd'
import { connect } from 'dva'
import { EditableProTable } from '@ant-design/pro-table'

const { Component } = React
const namespace = "configOS_produceConfig_workingProcedure"
const mapStateToProps = (state) => {
    const { workingProcedureList } = state[namespace]
    return {
        workingProcedureList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getWorkingProcedureList: () => {
            dispatch({
                type: `${namespace}/getWorkingProcedureList`,
            })
        },
        editWorkingProcedure: (newWorkingProcedure) => {
            dispatch({
                type: `${namespace}/editWorkingProcedure`,
                data: { newWorkingProcedure }
            })
        },
        delWorkingProcedure: (id) => {
            dispatch({
                type: `${namespace}/delWorkingProcedure`,
                data: { id }
            })
        }
    }
}
@connect(mapStateToProps, mapDispatchToProps)

class WorkingProcedure extends Component {

    columns = [
        {
            title: "工序编码",
            dataIndex: "id",
            editable: false,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
        },
        {
            title: "工序名称",
            dataIndex: "name",
            valueType: 'text',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
            },
        },
        {
            title: "操作",
            dataIndex: "operation",
            width: "200px",
            valueType: 'option',
            render: (_, record, __, action) => {
                return (
                    <>
                        <Button type='link'
                            style={{ paddingLeft: "0px" }}
                            onClick={() => {
                                action.startEditable?.(record.id)
                            }}>编辑</Button>
                        <Popconfirm
                            placement="top"
                            title="确定删除这条工序配置吗"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => {
                                this.del(record)
                            }}>
                            <Button type='link'>删除</Button>
                        </Popconfirm>
                    </>
                )
            }
        }
    ]
    tableRef = React.createRef()
    constructor(props) {
        super(props);
        this.save = this.save.bind(this)
        this.del = this.del.bind(this)
        this.state = {
            editKeys: []
        }
        this.props.getWorkingProcedureList()
    }

    del(record) {
        this.props.delWorkingProcedure(record.id)
    }

    save(newWorkingProcedure) {
        this.props.editWorkingProcedure(newWorkingProcedure)
    }

    render() {

        return (
            <Card>
                <Row justify="end">
                    <Col>
                        <Button type="primary"
                            onClick={() => {
                                const row = {
                                    id: new Date().getTime(),
                                    name: ''
                                }
                                this.tableRef?.current?.addEditRecord?.(row)
                                window.scrollTo(0, document.body.scrollHeight);
                            }}
                        >
                            添加
                        </Button>
                    </Col>
                </Row>
                <EditableProTable
                    rowKey="id"
                    actionRef={this.tableRef}
                    columns={this.columns}
                    value={this.props.workingProcedureList}
                    onChange={() => {
                        this.setState({
                            editKeys: []
                        })
                    }}
                    recordCreatorProps={false}
                    editable={{
                        onChange: (editKeys, row) => {
                            this.setState({
                                editKeys
                            })
                        },
                        onSave: (newWorkingProcedure) => {
                            console.log(newWorkingProcedure);
                            this.save(newWorkingProcedure)
                        },
                        actionRender: (_, config) => {
                            return [
                                <Button type='link'
                                    key="save"
                                    htmlType="submit"
                                    style={{ paddingLeft: "0px" }}
                                    onClick={async () => {
                                        const newWorkingProcedure = await config?.form?.validateFields()
                                        config?.onSave({
                                            ...newWorkingProcedure[config?.recordKey],
                                            id: config?.recordKey
                                        })
                                        config?.cancelEditable?.(config?.recordKey);
                                    }}>保存</Button>,
                                <Button type='link'
                                    key="cancel"
                                    style={{ paddingLeft: "0px" }}
                                    onClick={() => {
                                        config?.cancelEditable?.(config.recordKey);
                                    }}>取消</Button>
                            ]
                        },
                    }} />
            </Card>
        )
    }
}

export default WorkingProcedure