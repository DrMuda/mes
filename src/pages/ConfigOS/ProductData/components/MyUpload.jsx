import React, { Component } from 'react'
import { Upload, Button, message } from 'antd'
import XLSX from 'xlsx'
import style from '../css/showtable.less'
export default class MyUpload extends Component {

    state = {
        fileList: []
    }
    uploadchange = (e) => {
        const self = this;
        let check = /(.xlsx)|(.xls)$/g;
        let checkresult = check.test(e.file.name);
        let fileList = [...e.fileList];
        //限制上传的文件只能有一个
        fileList = fileList.slice(-1);
        this.setState({
            fileList
        })
        if (checkresult) {  //为true，说明为xlsx文件
            const reader = new FileReader();
            if (e.file.status !== 'uploading') {
                //当读取文件完成时会调用onload方法
                reader.onload = (function (theFile) {
                    return function (e) {
                        let binary = '';
                        var wb, outdata;
                        const bytes = new Uint8Array(e.target.result);
                        const length = bytes.byteLength;
                        for (let i = 0; i < length; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        wb = XLSX.read(binary, {
                            type: 'binary'
                        });
                        //这里的outdata就是导出的excel里的数据
                        outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                        self.setState({
                            dataSource: outdata,
                            up: false
                        });
                        let postdata = [];
                        if (outdata.length !== 0) {   //排除了excel为空数据的情况
                            if (outdata[0]['id'] && outdata[0]['规格型号'] && outdata[0]['子项类型'] && outdata[0]['物料属性'] && outdata[0]['基本计量单位']) {//代表导入的excel文件中字段名为中文
                                let material_fp_type, allcheck = false;//allcheck验证所有字段必须齐全才导入数据
                                if (outdata[0]['物料编码'] && outdata[0]['物料名称']) {
                                    material_fp_type = '物料';
                                    allcheck = true;
                                }
                                else if (outdata[0]['成品编码'] && outdata[0]['成品名称']) {
                                    material_fp_type = '成品';
                                    allcheck = true;
                                }
                                if (allcheck) {
                                    outdata.map(val => {
                                        postdata.push({
                                            id: val['id'],
                                            material_code: val[material_fp_type + '编码'],
                                            material_name: val[material_fp_type + '名称'],
                                            material_finishedproduct_type: material_fp_type,
                                            specification: val['规格型号'],
                                            subitem_type: val['子项类型'],
                                            material_properties: val['物料属性'],
                                            unit: val['基本计量单位'],
                                            min_stock_num: val['最小库存数量'],
                                            max_stock_num: val['最大库存数量'],
                                            reference_cost_price: val['参考成本价'],
                                            warehouse: val['仓库'],
                                            loss_num: val['损耗']
                                        })
                                    })
                                }
                                if (postdata.length !== 0) {
                                    self.props.update_data(['add', ...postdata]);
                                }
                            }
                            // console.log('postdata', typeof postdata, postdata);
                            // console.log('outdata', typeof outdata, outdata);
                        }

                    };
                })(fileList[0].originFileObj);
                reader.readAsArrayBuffer(fileList[0].originFileObj)
            }

        }
    }

    beforeupload = (file) => {
        let postfile = false;
        if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
            postfile = true;
        }
        if (!postfile) {
            message.error('You can only upload xlsx file!');
        }
        return postfile
    }

    render() {
        return (
            <div>
                <Upload beforeUpload={this.beforeupload} onChange={this.uploadchange} fileList={this.state.fileList} showUploadList={false} >
                    <Button size='large' style={{ marginRight: '10px' }} className={style.radius_btn}>导入</Button>
                </Upload>
            </div>
        )
    }
}
