import React from 'react'
import { Component } from 'react'
import { Table } from 'antd'

class MaterialList extends Component {

    
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
            <Table columns={this.props.columns}
                dataSource={dataSource}
                rowSelection={{
                    type: "checkbox",
                    onChange: (selectedRowKeys) => {
                        onRowSelect(selectedRowKeys)
                    },
                }} />
        )
    }
}
export default MaterialList