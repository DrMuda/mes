import React, { Component } from 'react'
import { Table, Button } from 'antd'
import { Link } from 'umi'
import style from './css/index.less'
import { connect } from 'dva'

const namespace = 'material_requisition';
@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        get_material_requisition() {
            dispatch({
                type: namespace + '/getMaterialRequisition'
            })
        }
    }
})

export default class Index extends Component {

    columns = [
        {
            title: '领料单号',
            dataIndex: 'material_requisition_no',
            key: 'material_requisition_no',
            align: 'center',
            render:(_,record)=>{
                return (<Link to={{
                    pathname: '/ProductionOS/ProductionPicking/MaterialRequisitionDetails',
                    state: {
                        ...record
                    }
                }}>{record.material_requisition_no}</Link>)
            }
        },
        {
            title: '生产单号',
            dataIndex: 'production_no',
            key: 'production_no',
            align: 'center',
        },
        {
            title: '领料部门',
            dataIndex: 'material_requisition_department',
            key: 'material_requisition_department',
            align: 'center',
        },
        {
            title: '领料日期',
            dataIndex: 'material_requisition_date',
            key: 'material_requisition_date',
            align: 'center',
        },
        {
            title: '领料人',
            dataIndex: 'material_collector',
            key: 'material_collector',
            align: 'center',
        },
        {
            title: '审核人',
            dataIndex: 'reviewer',
            key: 'reviewer',
            align: 'center',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                if (!record.reviewer) {
                    return (
                        <div>
                            <Link to={{
                                pathname: '/ProductionOS/ProductionPicking/MaterialRequisitionDetails',
                                state: {
                                    ...record
                                }
                            }}><Button style={{ color: 'black' }} className={style.radius_btn}>修改</Button></Link>
                            <Button type='primary' className={style.radius_btn}>审核</Button>
                            <Link to={{
                                pathname: '/ProductionOS/ProductionPicking/MaterialRequisitionDetails',
                                state: {
                                    ...record
                                }
                            }}><Button type='primary' className={style.radius_btn}>打印</Button></Link>
                        </div>
                    )
                }
                else {
                    return (
                        <div>
                            <Link to={{
                                pathname: '/ProductionOS/ProductionPicking/MaterialRequisitionDetails',
                                state: {
                                    ...record
                                }
                            }}><Button type='primary' className={style.radius_btn}>打印</Button></Link>
                        </div>
                    )
                }
            },
            align: 'center'
        }
    ]


    componentDidMount() {
        this.props.get_material_requisition()
    }

    render() {
        return (
            <div>
                <Table
                    columns={this.columns}
                    dataSource={this.props.material_requisition}
                    pagination={{ position: ['bottomCenter'] }}
                    rowKey={(value) => {
                        return value.material_requisition_no + Math.random()
                    }}
                />
            </div>
        )
    }
}
