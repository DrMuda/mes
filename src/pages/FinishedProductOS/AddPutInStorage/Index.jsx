import React, { Component } from 'react'
import { Form, Row, Col, Input, Button, Table, Modal, Select } from 'antd'
import style from './css/index.less'
import { connect } from 'dva'
import { history } from 'umi'


const { Option } = Select;


const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const ModalTableColumns = [
    {
        title: '成品编码',
        key: 'finished_product_code',
        dataIndex: 'finished_product_code',
        align: 'center'
    },
    {
        title: '成品名称',
        key: 'finished_product_name',
        dataIndex: 'finished_product_name',
        align: 'center'
    },
    {
        title: '规格型号',
        key: 'specification',
        dataIndex: 'specification',
        align: 'center'
    },
    {
        title: '计量单位',
        key: 'unit',
        dataIndex: 'unit',
        align: 'center'
    }
]

const putin_position = [
    {
        id: 'north',
        name: '北仓'
    },
    {
        id: 'south',
        name: '南仓'
    },
    {
        id: 'west',
        name: '西仓'
    }
]



const namespace = 'addPutInStorage';
@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        getgoodslist() {
            dispatch({
                type: namespace + '/getGoodsList',
            })
        },
        add_PutInStorage(query) {
            dispatch({
                type: namespace + '/addPutInStorage',
                params: query
            })
        },
        add_PutInStorage_Details(query) {
            dispatch({
                type: namespace + '/addPutInStorageDetails',
                params: query
            })
        }
    }
})

export default class Index extends Component {

    formRef = React.createRef();
    Tablecolumns = [
        {
            title: '序号',
            key: 'index',
            align: 'center',
            render: (text, record, index) => {
                return index + 1
            }
        },
        ...ModalTableColumns,
        {
            title: '入库数量',
            key: 'input_put_in_num',
            dataIndex: 'input_put_in_num',
            align: 'center'
        },
        {
            title: '入库仓位',
            key: 'select_put_in_position',
            dataIndex: 'select_put_in_position',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                return (<Button type='link' onClick={() => {
                    let newselectedrowkeys = [];
                    let newtablelist = [];
                    this.state.tabledata.map((val) => {
                        if (val.finished_product_code !== record.finished_product_code) {
                            newselectedrowkeys.push(val.finished_product_code)
                            newtablelist.push(val)
                        }

                    })
                    this.setState({
                        tabledata: newtablelist,
                        selectedRowKeys: newselectedrowkeys
                    })
                }}>删除</Button>)

            },
            align: 'center',
        }
    ]

    state = {
        isModalvisible: false,
        selectedRows: [],
        selectedRowKeys: [],
        tabledata: [],//入库货物数据
    }

    openGoods = () => {
        this.props.getgoodslist();
        this.setState({
            isModalvisible: true
        })
    }

    chooseGoods = () => {
        //添加货物信息，然后关闭对话框
        let here_tabledata = [];
        this.state.selectedRows.map((val, index) => {
            here_tabledata.push({
                ...val,
                input_put_in_num: <Input style={{ width: "150px" }}
                    onChange={
                        (e) => {
                            let newdata = [];
                            this.state.tabledata.map((value) => {
                                if (value.finished_product_code === val.finished_product_code) {
                                    let temp = value;
                                    temp.put_in_num = e.target.value;
                                    newdata.push(temp)
                                } else {
                                    newdata.push(value)
                                }

                            })
                            this.setState({
                                tabledata: newdata
                            })

                        }
                    } />,
                select_put_in_position: <Select style={{ width: "120px" }}
                    onChange={
                        (key) => {
                            let newdata = [];
                            this.state.tabledata.map((value) => {
                                if (value.finished_product_code === val.finished_product_code) {
                                    let temp = value;
                                    temp.put_in_position = key;
                                    newdata.push(temp)
                                } else {
                                    newdata.push(value)
                                }
                            })
                            this.setState({
                                tabledata: newdata,
                            })

                        }
                    }
                >
                    {
                        (() => {
                            let options = [];
                            putin_position.map((val) => {
                                options.push(<Option key={val.id} value={val.name}>{val.name}</Option>)
                            })
                            return options
                        })()
                    }
                </Select>,
            })
        })

        this.setState({
            tabledata: here_tabledata,
            isModalvisible: false
        })
    }



    changegoodslist = (selectedRowKeys, selectedRows) => {
        this.setState({
            selectedRows: selectedRows,
            selectedRowKeys: selectedRowKeys
        })
    }


    add_putinstorage = () => {
        let filedName = ['put_in_no', 'fipr_no', 'put_in_time'];
        let filedValue = {}, flag = true;
        for (let i = 0; i < filedName.length; i++) {
            filedValue[filedName[i]] = this.formRef.current.getFieldValue(filedName[i])
        }

        if (!filedValue.fipr_no)
            flag = false;
        if (!this.state.tabledata.length) {
            flag = false;
        }

        //计算入库总量，用于成品入库的数据提交
        let sum = 0;
        this.state.tabledata.map((val) => {
            if (val.put_in_num)
                sum += parseInt(val.put_in_num);
            else {
                flag = false
            }
            if (!val.put_in_position)
                flag = false
        })

        //最终提交的成品入库数据
        let putinstorage_data = {
            ...filedValue,
            put_in_num: sum,
            put_in_state: false,
            document_maker: '煎包'
        }

        //最终提交的成品入库详情页数据
        let putin_details_data = []
        this.state.tabledata.map(val => {
            putin_details_data.push({
                put_in_no: (filedValue.put_in_no).toString(),
                finished_product_code: val.finished_product_code,
                finished_product_name: val.finished_product_name,
                specification: val.specification,
                unit: val.unit,
                put_in_num: val.put_in_num,
                put_in_position: val.put_in_position
            })
        })

        if (flag) {
            alert('填写完整，准备提交')
            this.props.add_PutInStorage(putinstorage_data)
            this.props.add_PutInStorage_Details(putin_details_data)
            history.push('/FinishedProductOS/PutInStorage')
        }
        else {
            alert('信息未填写完整')
        }
    }

    componentDidMount() {
        let time = new Date().getTime();
        this.formRef.current.setFieldsValue({
            put_in_no: time
        })
    }


    render() {
        return (
            <div className={style.form}>
                <Form {...layout} ref={this.formRef}>
                    <Row>
                        <Col span={12}>
                            <Form.Item
                                label="入库单号"
                                name="put_in_no">
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="成品批号"
                                name="fipr_no"
                                required={true}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="入库时间"
                                name="put_in_time"
                                required={true}
                                initialValue={(new Date().toLocaleDateString()).replace(/\//g, '-')}>
                                <Input readOnly />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div className={style.table}>
                                <div className={style.tableheader}>
                                    <span style={{ fontSize: '20px' }}>入库明细</span>
                                    <Button type="primary" className={style.selectBtn} onClick={this.openGoods}>选择货物</Button>
                                    <Modal visible={this.state.isModalvisible}
                                        onCancel={() => {
                                            this.setState({ isModalvisible: false })
                                        }}
                                        onOk={this.chooseGoods}
                                    >
                                        <span>选择货物</span>
                                        <Table
                                            columns={ModalTableColumns}
                                            dataSource={this.props.goodslist}
                                            rowSelection={{
                                                type: 'checkbox',
                                                onChange: this.changegoodslist,
                                                selectedRowKeys: this.state.selectedRowKeys
                                            }}
                                            rowKey={(val) => {
                                                return val.finished_product_code
                                            }}
                                        />
                                    </Modal>
                                </div>
                                <Table columns={this.Tablecolumns}
                                    dataSource={this.state.tabledata}
                                    rowKey={val => {
                                        return val.finished_product_code + val.finished_product_name
                                    }}
                                >
                                </Table>
                                <div className={style.bottom_btn}>
                                    <Button className={style.enter_btn} onClick={this.add_putinstorage}>确定</Button>
                                    <Button onClick={() => {
                                        this.props.history.go(-1)
                                    }}>取消</Button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}
