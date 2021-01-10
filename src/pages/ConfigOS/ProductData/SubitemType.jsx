import React, { Component } from 'react'
import EditTable from './components/EditTable'
import { connect } from 'dva'


const namespace='ProductData_subitem_type';
@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        get_subitem() {
            dispatch({
                type: namespace + '/getSubitem'
            })
        },
        update_subitem(query) {
            dispatch({
                type: namespace + '/updateSubitem',
                params: query
            })
        }
    }
})

export default class SubitemType extends Component {

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
            title: '子项类型',
            dataIndex: 'subitem_type',
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
                        this.props.update_subitem(['delete', record])
                    }}
                >
                    删除
            </a>
            ],
        }
    ]

    componentDidMount(){
        this.props.get_subitem();
    }

    render() {
        return (
            <div>
                <EditTable
                    columns={this.columns}
                    data={this.props.subitem_type_data}
                    update_data={this.props.update_subitem}
                />
            </div>
        )
    }
}
