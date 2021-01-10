import React, { Component } from 'react'
import SupplierList from './components/SupplierList'

import { connect } from 'dva'





const namespace = 'supplier_list';
@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        get_supplier_list() {
            dispatch({
                type: namespace + '/getList'
            })
        },
        get_supplier_type() {
            dispatch({
                type: namespace + '/getType'
            })
        },
        get_supplier_level() {
            dispatch({
                type: namespace + '/getLevel'
            })
        },
        update_supplier_list(query) {
            dispatch({
                type: namespace + '/updateList',
                params: query
            })
        },
        search_supplier_list(query) {
            dispatch({
                type: namespace + '/searchList',
                params: query
            })
        }
    }
})
export default class List extends Component {



    componentDidMount() {
        this.props.get_supplier_list();
        this.props.get_supplier_type();
        this.props.get_supplier_level();

    }

    render() {
        return (
            <div>
                <SupplierList
                    valuetype={this.props.type_data}
                    type={this.props.type}
                    valuelevel={this.props.level_data}
                    level={this.props.level}
                    data={this.props.list_data}
                    update_list={this.props.update_supplier_list}
                    search_list={this.props.search_supplier_list}
                    getsupplier_list={this.props.get_supplier_list}
                />
            </div>
        )
    }
}
