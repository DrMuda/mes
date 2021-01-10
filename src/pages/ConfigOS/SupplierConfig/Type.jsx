import React, { Component } from 'react'

import { connect } from 'dva'
import Edittable from './components/Edittable'

const namespace = 'supplier_type'
@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        get_type() {
            dispatch({
                type: namespace + '/getType',
            })
        },
        update_type(query) {
            dispatch({
                type: namespace + '/updateType',
                params: query
            })
        }
    }
})
export default class Type extends Component {


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
            title: '供应商类型',
            dataIndex: 'supplier_type',
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
                        this.props.update_type(['delete', record])
                    }}
                >
                    删除
            </a>
            ],
        },
    ];


    componentDidMount() {
        this.props.get_type();
    }

    render() {
        return (
            <div>
                <Edittable 
                    data={this.props.type_data}
                    columns={this.columns}
                    update_type={this.props.update_type}
                />
            </div>
        )
    }
}
