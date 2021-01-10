import React, { Component } from 'react'

import { connect } from 'dva'
import Edittable from './components/Edittable'

const namespace = 'supplier_level'
@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        get_level() {
            dispatch({
                type: namespace + '/getLevel'
            })
        },
        update_level(query) {
            dispatch({
                type: namespace + '/updateLevel',
                params: query
            })
        }
    }
})

export default class Level extends Component {

    columns = [
        {
            title: '序号',
            key: 'index',
            align: 'center',
            width: 130,
            render: (a, b, index) => {
                return index + 1;
            },
        },
        {
            title: '供应商级别',
            dataIndex: 'supplier_level',
            align: 'center',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ],
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
                        // console.log('_', _);
                        action.startEditable?.(record.id);
                    }}
                >
                    编辑
            </a>,
                <a
                    key="delete"
                    onClick={() => {
                        // console.log('_', _);
                        this.props.update_level(['delete', record])
                    }}
                >
                    删除
            </a>
            ],
        }
    ]

    componentDidMount(){
        this.props.get_level();
    }

    render() {
        return (
            <div>
                <Edittable
                    columns={this.columns}
                    data={this.props.level_data}
                    update_type={this.props.update_level}
                />
            </div>
        )
    }
}
