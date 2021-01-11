import React from 'react'
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


class EditSubMaterial extends Component {
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
        const materialBOM = tempMaterialBOM?.children?.filter((child) => {
            return `${child.id}` === `${id}`
        })
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
        let { isNewMaterial } = history.location.query
        return (
            <MaterialDetail
                isNewMaterial={isNewMaterial? true : false}
                material_list={this.props.material_list}
                edit={true}
                dataSource={this.state.dataSource}
                editMaterialBOM={this.props.editMaterialBOM}
                delMaterialBOM={this.props.delMaterialBOM}
            />
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditSubMaterial)