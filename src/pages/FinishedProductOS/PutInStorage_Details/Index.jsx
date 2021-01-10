import React, { Component } from 'react'
import style from './css/index.less'
import { Table, Descriptions } from 'antd'
import { connect } from 'dva'
import html2canvas from 'html2canvas';


const namespace = 'putInDetails';
@connect((state) => {
    return { ...state[namespace] }
}, (dispatch) => {
    return {
        get_putIn_details(query) {
            dispatch({
                type: namespace + '/get_putin_details',
                params: query
            })
        },
        changeState(query){
            dispatch({
                type:namespace+'/change_put_in_state',
                params:query
            })
        }
    }
})

export default class Index extends Component {

    columns = [
        {
            title: '序号',
            key: 'index',
            align: 'center',
            render: (text, record, index) => {
                return `00${index + 1}`
            }
        },
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
        },
        {
            title: '入库数量',
            key: 'put_in_num',
            dataIndex: 'put_in_num',
            align: 'center'
        },
        {
            title: '入库仓位',
            key: 'put_in_position',
            dataIndex: 'put_in_position',
            align: 'center'
        }
    ]
    state = {
        put_in_no: '',
        fipr_no: '',
        put_in_time: '',
        maker: '',
        put_in_state: ''
    }
    componentDidMount() {
        if (this.props.location.state) {
            this.props.get_putIn_details({
                "put_in_no": this.props.location.state.put_in_no
            });
            this.setState({
                put_in_no: this.props.location.state.put_in_no,
                fipr_no: this.props.location.state.fipr_no,
                put_in_time: this.props.location.state.put_in_time,
                maker: this.props.location.state.document_maker,
                put_in_state: this.props.location.state.put_in_state
            })
        }
    }

    render() {
        let labelStyle = {
            width: "150px",
            textAlign: 'center'
        }
        return (
            <div className={style.bgc}>
                <div id='print'>
                    <div className={style.details_list}>
                        <Descriptions title="货物入库详细"
                            bordered layout="horizontal"
                            column={2}>
                            <Descriptions.Item label="入库单号"
                                labelStyle={labelStyle}>{this.state.put_in_no}</Descriptions.Item>
                            <Descriptions.Item label="成品批号"
                                labelStyle={labelStyle}>{this.state.fipr_no}</Descriptions.Item>
                            <Descriptions.Item label="入库时间"
                                labelStyle={labelStyle}>{this.state.put_in_time}</Descriptions.Item>
                            <Descriptions.Item label="制单人"
                                labelStyle={labelStyle}>{this.state.maker}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                    <Table
                        bordered='true'
                        columns={this.columns}
                        dataSource={this.props.putin_details}
                        rowKey={(value) => {
                            return value.finished_product_code + Math.random()
                        }}
                    />
                </div>
                <div className={style.footer_btn}>
                    <button className={style.btn_enter} onClick={
                        () => {
                            new html2canvas(document.getElementById('print')).then(canvas => {
                                let oImg = "<img src='" + canvas.toDataURL('image/jpeg', 1) +
                                    "' style='width:100%;' />"
                                let wind = window.open("");
                                wind.document.body.innerHTML = oImg;
                                setTimeout(() => { wind.print(); wind.close(); }, 1)
                            })
                        }}>打印</button>
                    <button className={style.btn_exam} hidden={this.state.put_in_state==='true'} onClick={()=>{
                        this.props.changeState({"put_in_no":this.state.put_in_no})
                        alert('审核通过！')
                        this.props.history.go(-1)
                    }}>审核</button>
                    <button onClick={() => {
                        this.props.history.go(-1)
                    }}>取消</button>
                </div>
            </div>
        )
    }
}
