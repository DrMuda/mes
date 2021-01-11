import React from 'react'
import { Card, Button, Row, Col } from 'antd'
import { connect } from 'dva'
import { history } from 'umi'
import Search from '@/pages/DepositoryOS/EntryWarehouse/OtherEntry/component/Search'
import MaterialList from './components/MaterialList'
import SelectCargo from '@/pages/DepositoryOS/EntryWarehouse/OtherEntry/component/SelectCargo'


const { Component } = React
const namespace = "configOS_produceConfig_craftBOM"

const mapStateToProps = (state) => {
    const { material_list } = state["ProductData_material_list"]
    const { craftBOM } = state[namespace]
    return {
        material_list,
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
const columns = [
    {
        title: "序号",
        dataIndex: "sequenceNumber",
        width: "80px",
        render: (_, __, index) => {
            return <span>{index + 1}</span>
        }
    },
    {
        title: "物料编码",
        dataIndex: "material_code",
        render: (text, record) => {
            return (
                <Button type="link"
                style={{padding:0}}
                    onClick={() => {
                        history.push(`/ConfigOS/ProduceConfig/ShowCraftBOM?id=${record.id}`);
                    }}>{text}</Button>
            )
        }
    },
    {
        title: "名称",
        dataIndex: "material_name"
    },
    {
        title: "规格型号",
        dataIndex: "specification"
    },
    {
        title: "子项类型",
        dataIndex: "subitem_type"
    },
    {
        title: "物料属性",
        dataIndex: "material_properties"
    },
    {
        title: "基本计量单位",
        dataIndex: "unit"
    },
    {
        title: "工序",
        dataIndex: "operation",
        width: 80,
        render: (_, record) =>
            <Button
                type="primary"
                onClick={() => {
                    history.push(`/ConfigOS/ProduceConfig/EditCraftBOM?id=${record.id}`);
                }}
            >
                修改
        </Button>
    }
]
const fields = [
    {
        placeholder: "产品名称或编码",
        key: "materialNameAndCode"
    },
    {
        placeholder: "规格型号",
        key: "specification"
    }
]

const modalTableCol = [
    {
        title: '产品编号',
        dataIndex: 'material_code',
        key: 'material_code',
        align: 'center'
    },
    {
        title: '产品名称',
        dataIndex: 'material_name',
        key: 'material_name',
        align: 'center',
        width: 100,
        textWrap: 'word-break',

    },
    {
        title: '规格型号',
        dataIndex: 'specification',
        key: 'specification',
        align: 'center'
    },
    {
        title: '参考成本价',
        dataIndex: 'reference_cost_price',
        align: 'center'
    },
    {
        title: '最新采购价',
        dataIndex: 'latest_purchase_price',
        align: 'center',
        render: () => {
            return <span>无</span>
        }
    },
    {
        title: '物料属性',
        dataIndex: 'material_properties',
        align: 'center'
    },
    {
        title: '计量单位',
        dataIndex: "unit",
        key: "unit",
        align: "center"
    }
]

class CraftBOM extends Component {

    constructor(props) {
        super(props);
        this.onSearch = this.onSearch.bind(this)
        this.updataTableData = this.updataTableData.bind(this)
        this.onRowSelect = this.onRowSelect.bind(this)
        this.del = this.del.bind(this);
        this.add = this.add.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.state = {
            dataSource: [],
            filterKeys: {
                materialNameAndCode: "",
                specification: "",
            },
            selectedRowKeys: [],
            modalIsShow: false
        }

        props.getMaterialList()
        props.getCraftBOM()
    }

    onSearch(filterKeys) {
        if (filterKeys) {
            this.setState({
                filterKeys: {
                    materialNameAndCode: "",
                    specification: "",
                    ...filterKeys
                }
            }, () => {
                const { material_list, craftBOM } = this.props
                this.updataTableData(material_list, craftBOM)
            })
        }
    }

    onRowSelect(selectedRowKeys) {
        this.setState({
            selectedRowKeys
        })
    }

    del() {
        this.props.delCraftBOM(this.state.selectedRowKeys)
    }

    add() {
        this.setState({
            modalIsShow: true
        })
    }

    async onOk(selectedRows) {
        const row = selectedRows[0]
        const id = new Date().getTime()
        await this.props.editCraftBOM({
            id,
            materialId: row.id,
            used_num: null,
            children: []
        })

        this.setState({
            modalIsShow: false
        }, () => {
            history.push(`/ConfigOS/ProduceConfig/EditCraftBOM?id=${id}`)
        })
    }

    onCancel() {
        this.setState({
            modalIsShow: false
        })
    }

    updataTableData(material_list, craftBOM) {
        let dataSource = []
        if (material_list?.length > 0 && craftBOM?.length > 0) {
            craftBOM?.map((child) => {
                const index = material_list.findIndex((material) => {
                    return `${material.id}` === `${child.materialId}`
                })
                if (index !== -1 && material_list[index].material_finishedproduct_type === "物料") {
                    dataSource.push({
                        ...material_list[index],
                        id: child.id,
                        materialId: child.materialId,
                        key: child.id
                    })

                }
            })
        }
        dataSource = dataSource.filter((data) => {
            const { materialNameAndCode, specification } = this.state.filterKeys
            const index1 = data.material_name.indexOf(materialNameAndCode?.replace(/(^\s*)|(\s*$)/g, ""))
            const index2 = data.material_code.indexOf(materialNameAndCode?.replace(/(^\s*)|(\s*$)/g, ""))
            const index3 = data.specification.indexOf(specification?.replace(/(^\s*)|(\s*$)/g, ""))
            if ((index1 !== -1 || index2 !== -1) && index3 !== -1) {
                return true
            } else {
                return false
            }
        })
        this.setState({ dataSource })
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { material_list, craftBOM } = props
        if (props !== this.props) {
            this.updataTableData(material_list, craftBOM);
        }
    }

    render() {
        let { material_list } = this.props
        material_list = material_list ? material_list : []
        return (
            <Card>
                <Row justify="end">
                    <Col>
                        <Search fields={fields} onSearch={this.onSearch} />
                        <Button type="primary"
                            style={{ marginRight: "8px" }}
                            onClick={this.add}>新增</Button>
                        <Button type="primary" danger onClick={this.del}>删除</Button>
                    </Col>
                </Row>
                <MaterialList dataSource={this.state.dataSource}
                    columns={columns}
                    onRowSelect={this.onRowSelect} />
                <SelectCargo visible={this.state.modalIsShow}
                    columns={modalTableCol}
                    dataSource={material_list?.filter?.((material) => {
                        return material.material_finishedproduct_type === "物料"
                    })}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    rowKey="id"
                    rowSelectionType="radio" />
            </Card>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CraftBOM)