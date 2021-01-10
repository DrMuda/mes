import React, { Component } from 'react'

import EditTable from './components/EditTable'
import { connect } from 'dva'

const namespace = 'ProductData_unit'
@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        get_unit() {
            dispatch({
                type: namespace + '/getUnit'
            })
        },
        update_unit(query) {
            dispatch({
                type: namespace + '/updateUnit',
                params: query
            })
        }
    }
})
export default class Unit extends Component {

    columns = [
        {
            title: '序号',
            key: 'index',
            align: 'center',
            width: 130,
            render: (a, b, c) => {
                return c + 1;
            }
        },
        {
            title: '单位',
            dataIndex: 'unit',
            align: 'center',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ]
            }
        },
        {
            title: '操作',
            valueType: 'option',
            width: 300,
            align: 'center',
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action.startEditable?.(record.id);
                    }}
                >
                    编辑
            </a>,
                <a
                    key="delete"
                    onClick={() => {
                        this.props.update_unit(['delete', record])
                    }}
                >
                    删除
            </a>
            ],
        }
    ]

    componentDidMount(){
        this.props.get_unit();
    }

    render() {
        return (
            <div>
                <EditTable
                    columns={this.columns}
                    data={this.props.unit_data}
                    update_data={this.props.update_unit}
                />
            </div>
        )
    }
}
