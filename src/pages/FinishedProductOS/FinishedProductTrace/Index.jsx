import React, { Component } from 'react'
import { Table, Button } from 'antd';
import { connect } from 'dva'
import style from './css/index.less'
import { Link } from 'umi'


const namespace='finishedProduct'

@connect((state)=>{
    return{...state[namespace]}
},(dispatch)=>{
    return {
        initorder(){
            dispatch({
                type: namespace+'/initorders'
            })
        },
        searchorder(query){
            dispatch({
                type:namespace+'/searchorders',
                params: query
            })
        }
    }
})

export default class FinishedProduct extends Component {

    columns = [
        {
            title: '成品批号',
            dataIndex: 'fipr_no',
            key: 'fipr_no',
            align: 'center'
        },
        {
            title: '生产单号',
            dataIndex: 'pr_no',
            key: 'pr_no',
            align: 'center'
        },
        {
            title: '订单编号',
            dataIndex: 'order_no',
            key: 'order_no',
            align: 'center'
        },
        {
            title: '产品名称',
            dataIndex: 'product_name',
            key: 'product_name',
            align: 'center'
        },
        {
            title: '产品数量',
            dataIndex: 'product_num',
            key: 'product_num',
            align: 'center'
        },
        {
            title: '规格型号',
            dataIndex: 'specification',
            key: 'specification',
            align: 'center'
        },
        {
            title: '计量单位',
            dataIndex: 'unit',
            key: 'unit',
            align: 'center'
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => {
                return (<Link to={{
                    pathname: '/FinishedProductOS/TraceDetails',
                    state: {
                        ...record
                    }
                }}><button style={{ color: 'black' }}>详情</button></Link>)
            },
            align: 'center'
        }
    ]

    componentDidMount() {
        this.props.initorder()   //异步请求初始化数据
    }
    clearinput = () => {
        this.refs.input_lotNo.value = '';
        this.refs.input_proName.value = ''
        this.props.initorder();  //清空输入框并返回所有数据
    }
    search = () => {
        if (this.refs.input_proName.value && !this.refs.input_lotNo.value) {   //名称有值，单号没值
            this.props.searchorder({
                "product_name": this.refs.input_proName.value,
            })
        }
        else if (this.refs.input_lotNo.value && !this.refs.input_proName.value) {   //单号有值，名称没值
            this.props.searchorder({
                "search_no": this.refs.input_lotNo.value,
            })
        }
        else if (this.refs.input_proName.value && this.refs.input_lotNo.value) {  //都有值
            this.props.searchorder({
                "product_name": this.refs.input_proName.value,
                "search_no": this.refs.input_lotNo.value,
            })
        }
    }
    render() {
        return (
            <div>
                <div className='clearfix' className={style.bgc}>
                    <Button type="primary" size='large' className={style.btn_clear} onClick={this.clearinput}>清空</Button>
                    <Button type='default' size='large' className={style.btn_search} onClick={this.search}>查询</Button>
                    <div className={style.finish_product_header}>
                        <input ref='input_lotNo' style={{ width: '240px' }} className={style.input1} placeholder="成品批号或生产单号或订单编号" />
                        <input ref='input_proName' style={{ width: '150px' }} className={style.input2} placeholder="产品名称" />
                    </div>
                </div>
                    <Table
                        columns={this.columns}
                        dataSource={this.props.order}
                        pagination={{position:['bottomCenter']}}
                        rowKey={(value) => {
                            return value.fipr_no + Math.random()
                        }} />
            </div>
        )
    }
}
