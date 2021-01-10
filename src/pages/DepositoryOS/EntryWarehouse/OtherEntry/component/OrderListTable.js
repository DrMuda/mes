import React from 'react'
import { Component } from 'react'
import { Tabs, Table } from 'antd'
import { history } from 'umi'

class OrderListTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabKey: "",
            filter: "",
        }
    }

    render() {
        const { columns, dataSource, classify, rowClickKeyUrl } = this.props
        let TabPaneList = [
            <Tabs.TabPane key={1}
                onTabClick={(key) => {
                    this.setState({
                        tabKey: key
                    })
                }}>
                <Table columns={columns}
                    dataSource={[]} />
            </Tabs.TabPane>
        ]
        if (dataSource instanceof Array) {
            TabPaneList = []
            // 如果指定了如何分类
            if (classify) {
                // 类别classification是一个数组
                if (classify.classification instanceof Array) {
                    TabPaneList = []
                    classify.classification.map((classification, index) => {
                        let newDataSource = JSON.parse(JSON.stringify(dataSource))
                        // 每个类别包含一个title和filter函数
                        // filter传入一个指定字段的值
                        const { title, filter } = classification
                        // 如果指定了根据什么字段分类
                        if (classify.classifyBy) {
                            if (filter instanceof Function) {
                                newDataSource = newDataSource.filter((data) => {
                                    return filter(data[classify.classifyBy])
                                })
                            }
                        }
                        TabPaneList.push(
                            <Tabs.TabPane key={index}
                                tab={title}
                                onTabClick={(key) => {
                                    this.setState({
                                        tabKey: key
                                    })
                                }}>
                                <Table columns={columns}
                                    dataSource={newDataSource}
                                    onRow={(record) => {
                                        return {
                                            onClick: () => {
                                                history.push(`${rowClickKeyUrl}=${record.key}`)
                                            }
                                        }
                                    }} />
                            </Tabs.TabPane>
                        )
                        return classification
                    })
                }
            }
        }

        return (
            <Tabs>
                {TabPaneList}
            </Tabs>
        )
    }
}

export default OrderListTable