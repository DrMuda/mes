import React from 'react'
import { Component } from 'react'
import { Descriptions, Table} from 'antd'

/**
 * @param {String} title 详情页的标题
 * @param {Array} order 一个单子
 * @param {Object} table 表格，每个单子的子项，包含columns
 * @param {Object} descriptions 描述列表的相关配置，包含label、field
 */
class OrderDetail extends Component{
    constructor(props) {
        super(props);
    }
    
    render(){
        const labelStyle={
            width:"150px"
        }
        const {title,descriptions,table,order}=this.props
        let Item=[]
        if(descriptions instanceof Array){
            descriptions.map((description)=>{
                const {label,field}=description
                Item.push(
                    <Descriptions.Item label={label}
                        key={field}
                        labelStyle={labelStyle}>
                        {order[field]}
                    </Descriptions.Item>
                )
            })
        }
        let tableData=[]
        if(order.cargos instanceof Array){
            tableData=order.cargos.map((cargo,index)=>{
                return {
                    ...cargo,
                    key:cargo.cargoId,
                    sequenceNumber:index+1
                }
            })
        }
        return(
            <div>
                <Descriptions title={title} 
                    bordered layout="horizontal" 
                    column={2}>
                    {Item}
                </Descriptions>
                <Table dataSource={tableData}
                    columns={table.columns}
                    bordered={true}>
                </Table>
            </div>
        )
    }
}

export default OrderDetail