import React from 'react'
import CraftDetail from './components/CraftDetail'
import { Card } from 'antd'
import { connect } from 'dva'
import { history } from 'umi'
const { Component } = React
const namespace = "configOS_produceConfig_craftBOM"

const mapStateToProps = (state) => {
    const { material_list } = state["ProductData_material_list"]
    const { workingProcedureList } = state["configOS_produceConfig_workingProcedure"]
    const { craftBOM } = state[namespace]
    return {
        material_list,
        workingProcedureList,
        craftBOM
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getMaterialList: () => {
            dispatch({
                type: `ProductData_material_list/getMaterialList`,
            })
        },
        getWorkingProcedureList: () => {
            dispatch({
                type: `configOS_produceConfig_workingProcedure/getWorkingProcedureList`
            })
        },
        getCraftBOM: () => {
            dispatch({
                type: `${namespace}/getCraftBOM`
            })
        },
        delCraftBOM: (idList) => {
            dispatch({
                type: `${namespace}/delCraftBOM`,
                data: { idList }
            })
        },
        editCraftBOM: (newConfig) => {
            dispatch({
                type: `${namespace}/editCraftBOM`,
                data: { newConfig }
            })
        }
    }
}
class EditCraftBOM extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: {}
        }
        this.updataTableData = this.updataTableData.bind(this)
        props.getCraftBOM()
        props.getMaterialList()
        props.getWorkingProcedureList()
    }

    updataTableData(tempCraftBOM) {
        let { id } = history.location.query
        id = id ? id : "1"
        const craftBOM = tempCraftBOM?.filter((child) => {
            return `${child.id}` === `${id}`
        })
        if (craftBOM?.length > 0) {
            this.setState({
                dataSource: craftBOM[0]
            })
        } else {
            this.setState({
                dataSource: []
            })
        }
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { material_list, craftBOM } = props
        if (props !== this.props) {
            if (material_list && craftBOM && material_list.length > 0 && JSON.stringify(craftBOM) !== "{}") {
                this.updataTableData(craftBOM)
            }
        }
    }

    render() {
        return (
            <Card>
                <CraftDetail
                    editCraftBOM={this.props.editCraftBOM}
                    dataSource={this.state.dataSource}
                    edit={true}
                    onSave={this.onSave}
                    material_list={this.props.material_list}
                    workingProcedureList={this.props.workingProcedureList} />
            </Card>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCraftBOM)