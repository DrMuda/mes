import React, { Component } from 'react'
import MaterialFProductList from './components/MaterialFProductList'

import { connect } from 'dva'

const namespace = 'ProductData_material_list';
@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        get_material_list() {
            dispatch({
                type: namespace + '/getMaterialList'
            })
        },
        update_material_list(query) {
            dispatch({
                type: namespace + '/updateMaterialList',
                params: query
            })
        },
        get_subitemtype() {
            dispatch({
                type: namespace + '/getSubitemType'
            })
        },
        get_material_properties() {
            dispatch({
                type: namespace + '/getMaterialProperties'
            })
        },
        get_unit() {
            dispatch({
                type: namespace + '/getUnit'
            })
        },
        get_material_fp_type() {
            dispatch({
                type: namespace + '/getMaterialFPType'
            })
        }
    }
})
export default class Material_FinishedProduct_List extends Component {

    
    componentDidMount() {
        this.props.get_material_list()
        this.props.get_subitemtype()
        this.props.get_material_properties()
        this.props.get_unit()
        this.props.get_material_fp_type()
    }

    render() {
        return (
            <div>
                <MaterialFProductList
                    get_material_list={this.props.get_material_list}
                    data={this.props.material_list}
                    update_data={this.props.update_material_list}
                    subitemtype_data={this.props.subitemtype_data}  //带data的为新增页面的下拉框数据
                    material_properties_data={this.props.material_properties_data}
                    unit_data={this.props.unit_data}
                    material_fp_type={this.props.material_fp_type}
                    select_subitem={this.props.select_subitem}  //带select的为编辑的下拉框数据
                    select_material_properties={this.props.select_material_properties}
                    select_unit={this.props.select_unit}
                />
            </div>
        )
    }
}
