import React, { Component } from 'react';
import { Tabs, Table, Descriptions } from 'antd';
import { connect } from 'dva'
import style from './css/index.less'
const { TabPane } = Tabs;

const namespace = 'traceDetails'

@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        getdetails_yl(query) {
            dispatch({
                type: namespace + '/get_trace_yl',
                params: query
            })
        },
        getdetails_sc(query) {
            dispatch({
                type: namespace + '/get_trace_sc',
                params: query
            })
        }
    }
}
)


class TraceDetails extends Component {

    columns_yl = [
        {
            title: '序号',
            key: 'yl_index',
            // dataIndex:'',
            align: 'center',
            render: (text, record, index) => {
                return index + 1
            }
        },
        {
            title: '物料编码',
            dataIndex: 'material_code',
            key: 'material_code',
            align: 'center'
        },
        {
            title: '物料名称',
            dataIndex: 'material_name',
            key: 'material_name',
            align: 'center'
        },
        {
            title: '规格型号',
            dataIndex: 'specification',
            key: 'specification',
            align: 'center'
        },
        {
            title: '子项类型',
            dataIndex: 'subitem_type',
            key: 'subitem_type',
            align: 'center'
        },
        {
            title: '物料属性',
            dataIndex: 'material_properties',
            key: 'material_properties',
            align: 'center'
        },
        {
            title: '发货仓库',
            dataIndex: 'delivery_warehouse',
            key: 'delivery_warehouse',
            align: 'center'
        },
        {
            title: '供应商',
            dataIndex: 'supplier',
            key: 'supplier',
            align: 'center'
        },
        {
            title: '供应商单号',
            dataIndex: 'supplier_orderno',
            key: 'supplier_orderno',
            align: 'center'
        }
    ]
    columns_sc = [
        {
            title: '序号',
            key: 'sc_index',
            // dataIndex:'',
            align: 'center',
            render: (text, record, index) => {
                return `00${index + 1}`
            }
        },
        {
            title: '工序编码',
            dataIndex: 'working_procedure_code',
            key: 'working_procedure_code',
            align: 'center'
        },
        {
            title: '工序名称',
            dataIndex: 'working_procedure_name',
            key: 'working_procedure_name',
            align: 'center'
        },
        {
            title: '生产设备',
            dataIndex: 'production_equipment',
            key: 'production_equipment',
            align: 'center'
        },
        {
            title: '设备编码',
            dataIndex: 'equipment_code',
            key: 'equipment_code',
            align: 'center'
        },
        {
            title: '生产时间',
            dataIndex: 'production_time',
            key: 'production_time',
            align: 'center'
        }
    ]

    state = {
        fipr_no: '',
        pr_no: '',
        order_no: '',
        product_name: '',
        product_num: '',
        specification: ''
    }

    componentDidMount() {
        //实际环境中，点击操作后跳转到详情页，通过传递过来的成品批号去获取详情信息,也可能通过一个接口获取两个数据
        if (this.props.location.state) {
            this.props.getdetails_yl({
                "fipr_no": this.props.location.state.fipr_no
            });
            this.props.getdetails_sc({
                "fipr_no": this.props.location.state.fipr_no
            })
            this.setState({
                fipr_no: this.props.location.state.fipr_no,
                pr_no: this.props.location.state.pr_no,
                order_no: this.props.location.state.order_no,
                product_name: this.props.location.state.product_name,
                product_num: this.props.location.state.product_num,
                specification: this.props.location.state.specification
            })
        }

    }

    render() {
        let labelStyle={
            width:"150px",
            textAlign:'center'
        }
        return (
            <div className={style.bgc}>
                <div className={style.showdetails}>
                    <div>
                        <Descriptions title="成品追溯详情"
                            bordered layout="horizontal"
                            column={2}>
                            <Descriptions.Item label="成品批号"
                                labelStyle={labelStyle}>{this.state.fipr_no}</Descriptions.Item>
                            <Descriptions.Item label="生产单号"
                                labelStyle={labelStyle}>{this.state.pr_no}</Descriptions.Item>
                            <Descriptions.Item label="订单编号"
                                labelStyle={labelStyle}>{this.state.order_no}</Descriptions.Item>
                            <Descriptions.Item label="产品名称"
                                labelStyle={labelStyle}>{this.state.product_name}
                            </Descriptions.Item>
                            <Descriptions.Item label="产品数量"
                                labelStyle={labelStyle}>{this.state.product_num}
                            </Descriptions.Item>
                            <Descriptions.Item label="产品规格"
                                labelStyle={labelStyle}>{this.state.specification}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <div className='tabs_underline'>
                    <Tabs defaultActiveKey="1" type='card'>
                        <TabPane tab="原料追溯" key="1">
                            <Table
                                bordered='true'
                                columns={this.columns_yl}
                                dataSource={this.props.trace_yl}
                                rowKey={(value) => {
                                    return value.material_code + Math.random()
                                }}
                            />
                        </TabPane>
                        <TabPane tab="生产追溯" key="2">
                            <Table
                                bordered='true'
                                columns={this.columns_sc}
                                dataSource={this.props.trace_sc}
                                rowKey={(value) => {
                                    return value.equipment_code + Math.random()
                                }}
                            />
                        </TabPane>
                    </Tabs>
                </div>
                <div className={style.footer_btn}>
                    <button className={style.btn_enter}>确定</button>
                    <button onClick={() => {
                        this.props.history.go(-1)
                    }}>取消</button>
                </div>
            </div>

        );
    }
}

export default TraceDetails;