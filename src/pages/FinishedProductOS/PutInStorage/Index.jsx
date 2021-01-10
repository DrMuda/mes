import React, { Component } from 'react'
import style from './css/index.less'
import { Table, Tabs, Button, DatePicker } from 'antd';
import { connect } from 'dva'
import { Link } from 'umi'

const { TabPane } = Tabs;

const namespace = 'putInStorage'

@connect((state) => {
    return {
        ...state[namespace]
    }
}, (dispatch) => {
    return {
        initput_in() {
            dispatch({
                type: namespace + '/get_put_in_data'
            })
        },
        search_put_in(query) {
            dispatch({
                type: namespace + '/search_put_in',
                params: query
            })
        }
    }
})

export default class Put_in_storage extends Component {
    state = {
        date: ''    //时间选择器绑定moment值
    }

    columns = [
        {
            title: '入库单号',
            key: 'put_in_no',
            dataIndex: 'put_in_no',
            align: 'center',
            render: (_, record) => {
                return (<Link to={{
                    pathname: '/FinishedProductOS/PutInStorage_Details',
                    state: {
                        ...record
                    }
                }}>{record.put_in_no}</Link>)
            }
        },
        {
            title: '成品批号',
            key: 'fipr_no',
            dataIndex: 'fipr_no',
            align: 'center'
        },
        {
            title: '入库时间',
            key: 'put_in_time',
            dataIndex: 'put_in_time',
            align: 'center'
        },
        {
            title: '入库数量',
            key: 'put_in_num',
            dataIndex: 'put_in_num',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => {
                if (record.put_in_state==='false') {
                    return (
                        <div>
                            <Link to={{
                                pathname: '/FinishedProductOS/PutInStorage_Details',
                                state: {
                                    ...record
                                }
                            }}><Button type='primary' className={style.yuanjiao_btn}>审核</Button></Link>
                            <Link to={{
                                pathname: '/FinishedProductOS/PutInStorage_Details',
                                state: {
                                    ...record
                                }
                            }}><Button type='primary' className={style.yuanjiao_btn}>打印</Button></Link>
                        </div>
                    )
                }
                else {
                    return <Link to={{
                        pathname: '/FinishedProductOS/PutInStorage_Details',
                        state: {
                            ...record
                        }
                    }}><Button type='primary' className={style.yuanjiao_btn} style={{ marginLeft: '-75px' }}>打印</Button></Link>
                }
            }
        },
    ]
    put_in_true_columns = [
        {
            title: '入库单号',
            key: 'put_in_no',
            dataIndex: 'put_in_no',
            align: 'center',
            render: (_, record) => {
                return (<Link to={{
                    pathname: '/FinishedProductOS/PutInStorage_Details',
                    state: {
                        ...record
                    }
                }}>{record.put_in_no}</Link>)
            }
        },
        {
            title: '成品批号',
            key: 'fipr_no',
            dataIndex: 'fipr_no',
            align: 'center'
        },
        {
            title: '入库时间',
            key: 'put_in_time',
            dataIndex: 'put_in_time',
            align: 'center'
        },
        {
            title: '入库数量',
            key: 'put_in_num',
            dataIndex: 'put_in_num',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            align: 'center',
            render: (_, record) => {
                return <Link to={{
                    pathname: '/FinishedProductOS/PutInStorage_Details',
                    state: {
                        ...record
                    }
                }}><Button type='primary' className={style.yuanjiao_btn}>打印</Button></Link>
            }
        },
    ]
    onChange = (data, datastring) => {
        this.setState({
            date: data
        })
    }

    clearinput = () => {
        this.refs.input_fipr_no.value = '',
            this.refs.input_put_in_no.value = '',
            this.setState({
                date: ''
            })
        this.props.initput_in();
        // console.log(this.state.date.format('YYYY-MM-DD'));  //需要传递时间值时要先转换date格式
    }

    search = () => {
        const putIn_no = this.refs.input_put_in_no.value,
            fipr_no = this.refs.input_fipr_no.value;
        let inTime;
        if (this.state.date) {
            inTime = this.state.date.format('YYYY-MM-DD');
        }

        if (putIn_no && fipr_no && inTime) {
            this.props.search_put_in({
                "put_in_no": putIn_no,
                "fipr_no": fipr_no,
                "put_in_time": inTime
            })
        }
        else if (putIn_no && fipr_no) {
            this.props.search_put_in({
                "put_in_no": putIn_no,
                "fipr_no": fipr_no,
            })
        }
        else if (putIn_no && inTime) {
            this.props.search_put_in({
                "put_in_no": putIn_no,
                "put_in_time": inTime
            })
        }
        else if (fipr_no && inTime) {
            this.props.search_put_in({
                "fipr_no": fipr_no,
                "put_in_time": inTime
            })
        }
        else if (putIn_no) {
            this.props.search_put_in({
                "put_in_no": putIn_no
            })
        }
        else if (fipr_no) {
            this.props.search_put_in({
                "fipr_no": fipr_no
            })
        }
        else if (inTime) {
            this.props.search_put_in({
                "put_in_time": inTime
            })
        }
    }

    componentDidMount() {
        this.props.initput_in()
    }

    render() {
        return (
            <div>
                <div style={{ marginBottom: '15px' }} className='clearfix'>
                    <Link to={{
                        pathname: '/FinishedProductOS/AddPutInStorage'
                    }}><Button type='primary' size='large' className={style.btn_new}>新增</Button></Link>
                    <Button type="primary" size='large' className={style.btn_clear} onClick={this.clearinput}>清空</Button>
                    <Button type='default' size='large' className={style.btn_search} onClick={this.search}>查询</Button>
                    <DatePicker ref='datapicker' style={{ width: '120px', borderColor: '#838383' }} onChange={this.onChange} placeholder='入库时间' className={style.datapicker} value={this.state.date} />
                    <input ref='input_fipr_no' className={style.input1} placeholder='成品批号' style={{ width: '140px' }} />
                    <input ref='input_put_in_no' className={style.input2} placeholder='入库单号' style={{ width: '140px' }} />
                </div>
                <div className='tabs_underline'>
                    <Tabs defaultActiveKey="1" className='tabs_font-size'>
                        <TabPane tab="全部" key="1" >
                            <Table
                                columns={this.columns}
                                dataSource={this.props.put_in_all}
                                pagination={{ position: ['bottomCenter'] }}
                                rowKey={(value) => {
                                    return value.put_in_no + Math.random()
                                }}
                            />
                        </TabPane>
                        <TabPane tab="待入库" key="2">
                            <Table
                                columns={this.columns}
                                dataSource={this.props.put_in_false}
                                pagination={{ position: ['bottomCenter'] }}
                                rowKey={(value) => {
                                    return value.put_in_no + Math.random()
                                }}
                            />
                        </TabPane>
                        <TabPane tab="已入库" key="3">
                            <Table
                                columns={this.put_in_true_columns}
                                dataSource={this.props.put_in_true}
                                pagination={{ position: ['bottomCenter'] }}
                                rowKey={(value) => {
                                    return value.put_in_no + Math.random()
                                }}
                            />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
