import React from 'react'
import { Table, Input, Button, Form, Row, Col } from 'antd'
import { history } from 'umi'
import SelectCargo from '@/pages/DepositoryOS/EntryWarehouse/OtherEntry/component/SelectCargo'
const { Component } = React

const columns = [
    {
        title: "层级",
        dataIndex: "level"
    },
    {
        title: "物料编码",
        dataIndex: "material_code"
    },
    {
        title: "物料名称",
        dataIndex: "material_name"
    },
    {
        title: "规格型号",
        dataIndex: "specification"
    },
    {
        title: "计量单位",
        dataIndex: "unit"
    },
    {
        title: "用量",
        dataIndex: "used_num"
    },
    {
        title: "损耗",
        dataIndex: "loss_num"
    },
    {
        title: "子项类型",
        dataIndex: "subitem_type"
    },
    {
        title: "发货仓库",
        dataIndex: "warehouse"
    },
    {
        title: "物料属性",
        dataIndex: "material_properties"
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

let tableData = []

class MaterialDetail extends Component {
    formRef = React.createRef()
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            modalIsShow: false,
            parentId: "",
            changeInfo: []
        }
        this.updataTableData = this.updataTableData.bind(this)
        this.multilevelExpansion = this.multilevelExpansion.bind(this)
        this.onOk = this.onOk.bind(this)
        this.onCancel = this.onCancel.bind(this)
        this.add = this.add.bind(this)
        this.onSave = this.onSave.bind(this)
    }

    updataTableData(material_list, dataSource) {
        tableData = []
        this.multilevelExpansion(material_list, dataSource, null, null)
        this.setState({
            tableData
        })
    }

    multilevelExpansion(material_list, materialBOM, level, parentId) {

        const index = material_list.findIndex(material => {
            return `${material.id}` === `${materialBOM.materialId}`
        })
        // 先处理当前层级数据
        const id = parentId ? `${parentId}-${materialBOM.id}` : `${materialBOM.id}`
        tableData.push({
            ...material_list[index],
            level: level ? level : "无",
            id: id,
            materialId: materialBOM.materialId,
            used_num: materialBOM.used_num,
            key: id
        })
        // 然后处理下一层级的数据
        materialBOM?.children?.map((child, index) => {
            if (level) {
                this.multilevelExpansion(material_list, child, `${level}.${index + 1}`, id)
            } else {
                this.multilevelExpansion(material_list, child, `${index + 1}`, id)
            }
        })
    }

    add(parentId) {
        this.setState({
            parentId,
            modalIsShow: true
        })
    }

    async onOk(selectedRows) {
        const row = selectedRows[0]
        const id = `${this.state.parentId}-${new Date().getTime()}`
        await this.props.editMaterialBOM({
            id,
            materialId: row.id,
            used_num: null,
            children: []
        })

        this.setState({
            modalIsShow: false,
        })
    }

    async onSave() {
        const newConfigList = this.state.changeInfo
        newConfigList.map(async (config) => {
            await this.props.editMaterialBOM(config)
        })
    }

    onCancel() {
        this.setState({
            modalIsShow: false
        })
    }

    UNSAFE_componentWillReceiveProps(props) {
        const { material_list, dataSource } = props
        if (material_list && dataSource && material_list.length > 0 && JSON.stringify(dataSource) !== "{}") {
            this.updataTableData(material_list, dataSource)
        }
    }

    render() {
        const {
            edit,
            material_list
        } = this.props

        let editColumns = [
            {
                title: "操作",
                dataIndex: "operation",
                width: 200,
                render: (_, record, index) => {
                    const addButton = <Button type="primary"
                        onClick={() => {
                            this.add(record.id);
                        }}>添加</Button>
                    const delButton = <Button type="primary" danger
                        onClick={()=>{
                            this.props.delMaterialBOM([record.id])
                        }}>删除</Button>
                    if (index === 0) {
                        return addButton
                    }
                    return <>{addButton}{delButton}</>
                }
            },
            ...columns
        ]

        editColumns[6] = {
            title: "用量",
            dataIndex: "used_num",
            render: (text, record, index) => {
                if (index === 0) {
                    return <span>{text}</span>
                }
                return <Form.Item
                    initialValue={text}
                    rules={[{
                        required:true,
                        message:"此项为必填项"
                    }]}
                    name={record.id}>
                    <Input style={{ width: 100 }}
                        autoFocus={text === undefined ? true : false}
                        onChange={(e)=>{
                            console.log(this.state)
                            const index=this.state.changeInfo.findIndex((info)=>{
                                return info.id === record.id
                            })
                            if(index!==-1){
                                let newInfo = JSON.parse(JSON.stringify(this.state.changeInfo))
                                newInfo[index].used_num=e.target.value
                                this.setState({
                                    changeInfo:newInfo
                                })
                            }else{
                                this.setState({
                                    changeInfo: [
                                        ...this.state.changeInfo,
                                        {
                                            id: record.id,
                                            used_num: e.target.value
                                        }
                                    ]
                                })
                            }
                        }} />
                </Form.Item>
            }
        }

        return <Form ref={this.formRef}>
            <Table
                columns={edit ? editColumns : columns}
                dataSource={this.state.tableData}
            ></Table>

            <Row justify="center">
                <Col>
                    <Button style={{ margin: "8px" }}
                        htmlType="submit"
                        onClick={() => {
                            this.onSave()
                            history.push('/ConfigOS/ProduceConfig/MaterialBOM')
                        }}>
                        确定
                    </Button>
                    <Button style={{ margin: "8px" }}
                        onClick={() => {
                            history.push('/ConfigOS/ProduceConfig/MaterialBOM')
                        }}>
                        取消
                    </Button>
                </Col>
                <SelectCargo visible={this.state.modalIsShow}
                    columns={modalTableCol}
                    dataSource={(() => {
                        const newMaterial_list = material_list?.filter?.((material) => {
                            return material.material_finishedproduct_type === "物料"
                        })
                        return newMaterial_list ? newMaterial_list : []
                    })()}
                    onOk={this.onOk}
                    onCancel={this.onCancel}
                    rowKey="id"
                    rowSelectionType="radio" />
            </Row>
        </Form>
    }
}
export default MaterialDetail