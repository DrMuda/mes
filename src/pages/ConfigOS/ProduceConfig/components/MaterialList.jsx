import React from 'react'
import { Component } from 'react'
import { Button, Table } from 'antd'
import { history } from 'umi'

class MaterialList extends Component {

    columns = [
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
                            history.push(`/ConfigOS/ProduceConfig/ShowSubMaterial?id=${record.id}`);
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
                        history.push(`/ConfigOS/ProduceConfig/EditSubMaterial?id=${record.id}`);
                    }}
                >
                    管理BOM
            </Button>
        }
    ]
    constructor(props) {
        super(props);
        this.state = {
            tabKey: "",
            filter: "",
        }
    }

    render() {
        let { dataSource, onRowSelect } = this.props
        if (dataSource instanceof Array) {
            dataSource = dataSource.map((data) => {
                return {
                    key: data.id,
                    ...data
                }
            })
        }
        return (
            <Table columns={this.columns}
                dataSource={dataSource}
                rowSelection={{
                    type: "checkbox",
                    onChange: (selectedRowKeys) => {
                        onRowSelect(selectedRowKeys)
                    },
                }}
                onRow={(record) => {
                    return {
                        onClick: () => {
                            console.log(record.id);
                        }
                    }
                }} />
        )
    }
}
export default MaterialList