import React, { Component } from 'react'
import EditTable from './components/EditTable'
import { connect } from 'dva'


const namespace = 'ProductData_material_fproduct_type';
@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        get_material_fp_type() {
            dispatch({
                type: namespace + '/getMaterial_fp_type'
            })
        },
        update_material_fp_type(query) {
            dispatch({
                type: namespace + '/updateMaterial_fp_type',
                params: query
            })
        }
    }
})
export default class Material_FinishedProduct_Type extends Component {

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
            title: '类型',
            dataIndex: 'material_finishedproduct_type',
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
                        this.props.update_material_fp_type(['delete', record])
                    }}
                >
                    删除
            </a>
            ],
        }
    ]

    componentDidMount() {
        this.props.get_material_fp_type();
    }
    render() {
        return (
            <div>
                <EditTable
                    columns={this.columns}
                    data={this.props.material_fproduct_type}
                    update_data={this.props.update_material_fp_type}
                />
            </div>
        )
    }
}
