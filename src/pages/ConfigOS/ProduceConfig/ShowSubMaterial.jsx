import React from 'react'
import { Card, Button, Popconfirm, Row, Col } from 'antd'
import { connect } from 'dva'
import { history } from 'umi'
import MaterialDetail from './components/MaterialDetail'

const { Component } = React

const namespace = "configOS_produceConfig_materialBOM"
const mapStateToProps = (state) => {
    const { material_list } = state["ProductData_material_list"]
    const { materialBOM } = state[namespace]
    return {
        material_list,
        materialBOM
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMaterialList: () => {
            dispatch({
                type: `ProductData_material_list/getMaterialList`,
            })
        },
        getMaterialBOM: () => {
            dispatch({
                type: `${namespace}/getMaterialBOM`
            })
        },
        delMaterialBOM: (idList) => {
            dispatch({
                type: `${namespace}/delMaterialBOM`,
                data: { idList }
            })
        },
        editMaterialBOM: (newConfig) => {
            dispatch({
                type: `${namespace}/editMaterialBOM`,
                data: { newConfig }
            })
        }
    }
}


class ShowSubMaterial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: {}
        }
        this.updataTableData = this.updataTableData.bind(this)
        this.props.getMaterialList()
        this.props.getMaterialBOM()
    }

    updataTableData(tempMaterialBOM) {
        let { id } = history.location.query
        id = id ? id : "1"
        console.log(id);
        const materialBOM = tempMaterialBOM?.children?.filter((child) => {
            console.log(`${child.id}`,`${id}`)
            return `${child.id}` === `${id}`
        })
        console.log(materialBOM);
        if(materialBOM?.length>0){
            this.setState({
                dataSource: materialBOM[0]
            })
        }else{
            this.setState({
                dataSource: []
            })
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { material_list, materialBOM } = props
        if (props !== this.props) {
            if (material_list && materialBOM && material_list.length > 0 && JSON.stringify(materialBOM) !== "{}") {
                this.updataTableData(materialBOM)
            }
        }
    }

    render() {
        return (
            <MaterialDetail
                material_list={this.props.material_list}
                edit={false}
                dataSource={this.state.dataSource}
            />
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowSubMaterial)