import React from 'react'
import { Component } from 'react'
import {Modal, Table} from 'antd'

class SelectCargo extends Component{
    constructor(props) {
        super(props);
        this.onRowClick=this.onRowClick.bind(this)
        this.onRowSelectionChange=this.onRowSelectionChange.bind(this)
        this.state={
            selectedRowKeys:[],
            selectedRows:[]
        }
    }

    onRowClick(record){
        const {selectedRowKeys,selectedRows}=this.state
        let nextSelectedRowKeys=[]
        let nextSelectedRows=[]
        const rowKeysIndex=selectedRowKeys.findIndex((rowKey)=>{
            return rowKey===record.key
        })
        const rowsIndex=selectedRows.findIndex((row)=>{
            return row.key===record.key
        })
        if(rowKeysIndex !==-1&&rowsIndex!==-1){
            nextSelectedRowKeys=selectedRowKeys.filter((_,index)=>{
                return index!==rowKeysIndex
            })
            nextSelectedRows=selectedRows.filter((_,index)=>{
                return index!==rowsIndex
            })
        }else{
            if(this.props.rowSelectionType==="checkBox"){
                nextSelectedRowKeys=[
                    ...selectedRowKeys,
                    record.key
                ]
                nextSelectedRows=[
                    ...selectedRows,
                    record
                ]
            }else if(this.props.rowSelectionType==="radio"){
                nextSelectedRowKeys=[
                    record.key
                ]
                nextSelectedRows=[
                    record
                ]
            }
            selectedRowKeys.push(record.key)
            selectedRows.push(record)
        }
        this.setState({
            selectedRowKeys:nextSelectedRowKeys,
            selectedRows:nextSelectedRows
        })
    }
    
    onRowSelectionChange(selectedRowKeys, selectedRows){
        this.setState({
            selectedRowKeys,
            selectedRows
        })
    }

    render(){
        try{

            const { visible, columns, dataSource, onOk,
                onCancel, rowKey, rowSelectionType } = this.props
            return (
                <Modal visible={visible}
                    onOk={() => {
                        onOk(this.state.selectedRows)
                        this.setState({
                            selectedRowKeys: [],
                            selectedRows: []
                        })
                    }}
                    onCancel={() => {
                        onCancel()
                        this.setState({
                            selectedRowKeys: [],
                            selectedRows: []
                        })
                    }}>
                    <Table columns={columns}
                        pagination={{
                            defaultPageSize: 5
                        }}
                        dataSource={dataSource.map((data) => {
                            return {
                                ...data,
                                key: data[rowKey]
                            }
                        })}
                        onRow={(record) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record)
                                }
                            }
                        }}
                        rowSelection={{
                            type: rowSelectionType,
                            selectedRowKeys: this.state.selectedRowKeys,
                            onChange: this.onRowSelectionChange
                        }}
                    />
                </Modal>
            )
        }catch(e){
            console.error(e);
            return <>出错了</>
        }
    }
}
export default SelectCargo