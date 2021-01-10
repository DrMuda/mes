import React, { useState, useRef, useEffect } from 'react';
import { Form, Row, Col, Input, Button, Tabs, Modal, Select, InputNumber, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import MyUpload from './MyUpload'
import ExportJsonExcel from "js-export-excel"

import style from '../css/showtable.less'
import { EditableProTable } from '@ant-design/pro-table';

const { TabPane } = Tabs;
const { Option } = Select;

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 14,
    },
};

const warehouse = ['1-广东仓', '2-广东仓', '3-广东仓']
const select_warehouse = {}
warehouse.map(val => {
    select_warehouse[val] = { text: val }
})



export default (props) => {

    const public_columns = [
        {
            title: '规格型号',
            dataIndex: 'specification',
            align: 'center',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ]
            }
        },
        {
            title: '子项类型',
            dataIndex: 'subitem_type',
            align: 'center',
            valueType: 'select',
            valueEnum: props.select_subitem,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ]
            }
        },
        {
            title: '物料属性',
            dataIndex: 'material_properties',
            align: 'center',
            valueType: 'select',
            valueEnum: props.select_material_properties,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ]
            }
        },
        {
            title: '基本计量单位',
            dataIndex: 'unit',
            align: 'center',
            valueType: 'select',
            valueEnum: props.select_unit,
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ]
            }
        },
        {
            title: '最小库存数量',
            dataIndex: 'min_stock_num',
            align: 'center',
        },
        {
            title: '最大库存数量',
            dataIndex: 'max_stock_num',
            align: 'center',
        },
        {
            title: '参考成本价',
            dataIndex: 'reference_cost_price',
            align: 'center',
        },
        {
            title: '仓库',
            dataIndex: 'warehouse',
            align: 'center',
            valueType: 'select',
            valueEnum: select_warehouse,
        },
        {
            title: '损耗',
            dataIndex: 'loss_num',
            align: 'center',
        },
        {
            title: '操作',
            valueType: 'option',
            width: 200,
            align: 'center',
            render: (text, record, _, action) => [
                <Button
                    key="editable"
                    className={style.btn_editandsave}
                    onClick={() => {
                        action.startEditable?.(record.id);
                    }}
                >
                    编辑
            </Button>,
                <Button
                    key="delete"
                    className={style.btn_delete}
                    onClick={() => {
                        props.update_data(['delete', record])
                    }}
                >
                    删除
            </Button>
            ],
        }
    ]
    const material_columns = [
        {
            title: '',
            key: 'index',
            align: 'center',
            width: 50,
            render: (a, b, c) => {
                return c + 1;
            }
        },
        {
            title: '物料编码',
            dataIndex: 'material_code',
            align: 'center',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ]
            }
        },
        {
            title: '物料名称',
            dataIndex: 'material_name',
            align: 'center',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ]
            }
        },
        ...public_columns

    ]
    const finished_product_columns = [
        {
            title: '',
            key: 'index',
            align: 'center',
            width: 50,
            render: (a, b, c) => {
                return c + 1;
            }
        },
        {
            title: '成品编码',
            dataIndex: 'material_code',
            align: 'center',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ]
            }
        },
        {
            title: '成品名称',
            dataIndex: 'material_name',
            align: 'center',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '此项为必填项',
                    },
                ]
            }
        },
        ...public_columns
    ]



    const actionRef = useRef();
    const form_ref = useRef();
    const filename_ref = useRef();
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [xuanran, setXuanran] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modal_filename, setmodal_filename] = useState(false);
    const [choosekey, setchoosekey] = useState('1')

    function tabs_change(key) {
        setchoosekey(key)
    }

    function modalCancel() {
        form_ref.current.resetFields();
        setIsModalVisible(false)
    }
    function modalOk() {
        form_ref.current.validateFields().then(value => {
            const postdata = {
                id: (Math.random() * 1000000).toFixed(0),
                ...value
            };
            if (form_ref.current.getFieldValue('max_stock_num') < form_ref.current.getFieldValue('min_stock_num')) {
                alert('库存数量最大值不可小于最小值！')
            }
            else {
                props.update_data(['add', postdata])
                form_ref.current.resetFields();
                setIsModalVisible(false)
            }
        }).catch(error => { })
    }
    function exportfile() {
        setmodal_filename(true)
    }
    function filenameOK() {
        if (!filename_ref.current.state.value) {
            message.error('文件名不得为空！');
        }
        else {
            exportExcel(filename_ref.current.state.value)
            filename_ref.current.state.value=''
            setmodal_filename(false)
        }
    }
    function filenameCancel() {
        setmodal_filename(false)
    }

    function exportExcel(FileName) {
        let columns, ReqDetailList;
        if (choosekey === '1') {    //物料
            columns = material_columns.slice(1, material_columns.length - 1);
            ReqDetailList = props.data.filter(val => {
                if (val.material_finishedproduct_type === '物料')
                    return val
            });
        }
        else if (choosekey === '2') {   //成品
            columns = finished_product_columns.slice(1, finished_product_columns.length - 1);
            ReqDetailList = props.data.filter(val => {
                if (val.material_finishedproduct_type === '成品')
                    return val
            });
        }

        let columns_title=columns.map(item => item.title);
        columns_title.unshift('id');
        let columns_dataindex=columns.map(item => item.dataIndex);
        columns_dataindex.unshift('id');

        console.log('dataindex',columns_dataindex);
        const option = {};
        option.fileName = FileName;
        option.datas = [
            {
                sheetData: ReqDetailList.map(item => {
                    const result = {};
                    columns_dataindex.forEach(c => {
                        result[c] = item[c];
                    });
                    return result;
                }),
                sheetName: 'ExcelName',     // Excel文件名称
                sheetFilter: columns_dataindex,
                sheetHeader: columns_title,
                // sheetFilter: columns.map(item => item.dataIndex),
                // sheetHeader: columns.map(item => item.title),
                columnWidths: columns.map(() => 7),
            },
        ];
        const toExcel = new ExportJsonExcel(option);
        toExcel.saveExcel();
    }


    useEffect(() => {
        setTimeout(() => {
            setXuanran(xuanran + 1);  //令组件挂载后多渲染一次，解决点击按钮获取不到actionref.current的bug
        }, 40);
    }, [])

    return (
        <>
            <div style={{ backgroundColor: '#fafafa', padding: '10px' }} >
                <div className='clearfix'>
                    <Button size='large' style={{ float: 'right' }} className={style.radius_btn} onClick={exportfile}>导出</Button>
                    <Modal centered={true} title='导出文件名' visible={modal_filename} onOk={filenameOK} onCancel={filenameCancel}>
                        <Input ref={filename_ref} onPressEnter={filenameOK} autoFocus></Input>
                    </Modal>
                    <div style={{ float: 'right' }}>
                        <MyUpload update_data={props.update_data}></MyUpload>
                    </div>
                    <Button type='primary' size='large' className={style.radius_btn}
                        style={{ float: 'right' }}
                        onClick={() => {
                            setIsModalVisible(true)
                        }}
                        icon={<PlusOutlined />}
                    >添加</Button>
                </div>
                <div className='tabs_underline' style={{ marginLeft: '10px' }}>
                    <Tabs defaultActiveKey='1' className='tabs_font-size' onChange={tabs_change}>
                        <TabPane tab="物料" key="1" >
                            <EditableProTable
                                pagination={{ position: ['bottomCenter'], defaultPageSize: '10' }}
                                rowKey="id"
                                actionRef={actionRef}
                                recordCreatorProps={
                                    false
                                }
                                columns={material_columns}
                                value={(() => {
                                    let resultdata = []
                                    if (props.data) {
                                        resultdata = props.data.filter(val => {
                                            if (val.material_finishedproduct_type === '物料')
                                                return val
                                        })
                                        return resultdata
                                    }
                                })()}
                                onChange={(next, prev) => {
                                    // console.log('onchange的a,b', next, prev);
                                    // actionRef.current?.cancelEditable?.(prevKey);
                                }}
                                editable={{
                                    type: 'multiple',
                                    editableKeys,
                                    onSave: async (a, the_change) => {
                                        // console.log('onsave的a,b ya', a, the_change);
                                        props.data.map(val => {
                                            if (the_change.id === val.id) {    //找到该id，为更新操作
                                                val = the_change;
                                                props.update_data(['update', val])
                                            }
                                        })
                                    },
                                    onChange: (a) => { setEditableRowKeys(a) },
                                    actionRender: (row, config) => [
                                        <Button
                                            key='save'
                                            className={style.btn_editandsave}
                                            onClick={
                                                () => {
                                                    // console.log('row', row);
                                                    // console.log('config', config);
                                                    config.form.validateFields(); //解决新增的时候直接点击保存不校验是否位空的错误

                                                    if (config.form.getFieldsValue()[row.id].material_code && config.form.getFieldsValue()[row.id].material_name
                                                        && config.form.getFieldsValue()[row.id].specification && config.form.getFieldsValue()[row.id].subitem_type
                                                        && config.form.getFieldsValue()[row.id].material_properties && config.form.getFieldsValue()[row.id].unit
                                                    ) {
                                                        let post = config.form.getFieldsValue()[row.id];
                                                        let newdata = {
                                                            id: row.id,
                                                            material_code: post.material_code,
                                                            material_name: post.material_name,
                                                            specification: post.specification,
                                                            subitem_type: post.subitem_type,
                                                            material_properties: post.material_properties,
                                                            unit: post.unit,
                                                            min_stock_num: post.min_stock_num,
                                                            max_stock_num: post.max_stock_num,
                                                            reference_cost_price: post.reference_cost_price,
                                                            loss_num: post.loss_num,
                                                            warehouse: post.warehouse
                                                        }
                                                        if (parseInt(newdata.min_stock_num) > parseInt(newdata.max_stock_num)) {
                                                            alert('库存数量最大值不可小于最小值!')
                                                        }
                                                        else {
                                                            config.onSave(row, newdata)   //row为该行所有数据，传递给onsave的第一个参数。newdata传递给onsave的第二个参数
                                                            config?.cancelEditable?.(config.recordKey)
                                                        }
                                                    }
                                                }}
                                        >保存</Button>,
                                        <Button key='save'
                                            onClick={
                                                () => {
                                                    config?.cancelEditable?.(config.recordKey)
                                                }
                                            }
                                        >取消</Button>,
                                    ]
                                }}
                            />
                        </TabPane>
                        <TabPane tab="成品" key="2" >
                            <EditableProTable
                                pagination={{ position: ['bottomCenter'], defaultPageSize: '10' }}
                                rowKey="id"
                                actionRef={actionRef}
                                recordCreatorProps={
                                    false
                                }
                                columns={finished_product_columns}
                                value={(() => {
                                    let resultdata = []
                                    if (props.data) {
                                        resultdata = props.data.filter(val => {
                                            if (val.material_finishedproduct_type === '成品')
                                                return val
                                        })
                                        return resultdata
                                    }
                                })()}
                                onChange={(next, prev) => {
                                }}
                                editable={{
                                    type: 'multiple',
                                    editableKeys,
                                    onSave: async (a, the_change) => {
                                        props.data.map(val => {
                                            if (the_change.id === val.id) {    //找到该id，为更新操作
                                                val = the_change;
                                                props.update_data(['update', val])
                                            }
                                        })
                                    },
                                    onChange: (a) => { setEditableRowKeys(a) },
                                    actionRender: (row, config) => [
                                        <Button
                                            key='save'
                                            className={style.btn_editandsave}
                                            onClick={
                                                () => {
                                                    // console.log('row', row);
                                                    // console.log('config', config);
                                                    config.form.validateFields(); //解决新增的时候直接点击保存不校验是否位空的错误

                                                    if (config.form.getFieldsValue()[row.id].material_code && config.form.getFieldsValue()[row.id].material_name
                                                        && config.form.getFieldsValue()[row.id].specification && config.form.getFieldsValue()[row.id].subitem_type
                                                        && config.form.getFieldsValue()[row.id].material_properties && config.form.getFieldsValue()[row.id].unit
                                                    ) {
                                                        let post = config.form.getFieldsValue()[row.id];
                                                        //验证仓库数量是否为数字，最小数量是否比最大数量小
                                                        let newdata = {
                                                            id: row.id,
                                                            material_code: post.material_code,
                                                            material_name: post.material_name,
                                                            specification: post.specification,
                                                            subitem_type: post.subitem_type,
                                                            material_properties: post.material_properties,
                                                            unit: post.unit,
                                                            min_stock_num: post.min_stock_num,
                                                            max_stock_num: post.max_stock_num,
                                                            reference_cost_price: post.reference_cost_price,
                                                            loss_num: post.loss_num,
                                                            warehouse: post.warehouse
                                                        }
                                                        if (parseInt(newdata.min_stock_num) > parseInt(newdata.max_stock_num)) {
                                                            alert('库存数量最大值不可小于最小值!')
                                                        }
                                                        else {
                                                            config.onSave(row, newdata)   //row为该行所有数据，传递给onsave的第一个参数。newdata传递给onsave的第二个参数
                                                            config?.cancelEditable?.(config.recordKey)
                                                        }
                                                    }
                                                }}
                                        >保存</Button>,
                                        <Button key='save'
                                            onClick={
                                                () => {
                                                    config?.cancelEditable?.(config.recordKey)
                                                }
                                            }
                                        >取消</Button>,
                                    ]
                                }}
                            />
                        </TabPane>
                    </Tabs>

                    <Modal width={'60%'} title='添加' visible={isModalVisible} onOk={modalOk} onCancel={modalCancel}>
                        <Form {...layout} ref={form_ref} initialValues={{ warehouse: '1-广东仓' }}>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="类型："
                                        name="material_finishedproduct_type"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请选择添加类型！',
                                            },
                                        ]}>
                                        <Select>
                                            {
                                                (() => {
                                                    let options = [];
                                                    Array.isArray(props.material_fp_type) && props.material_fp_type.map(val => {
                                                        options.push(<Option key={val.id} value={val.material_finishedproduct_type}>{val.material_finishedproduct_type}</Option>)
                                                    })
                                                    return options;
                                                })()
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="物料(成品)编码："
                                        name="material_code"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写物料(成品)编码！',
                                            },
                                        ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="物料(成品)名称："
                                        name="material_name"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写物料(成品)名称！',
                                            },
                                        ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="规格型号："
                                        name="specification"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请填写规格型号！',
                                            },
                                        ]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="子项类型："
                                        name="subitem_type"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请选择子项类型！',
                                            },
                                        ]}>
                                        <Select>
                                            {
                                                (() => {
                                                    let options = [];
                                                    Array.isArray(props.subitemtype_data) && props.subitemtype_data.map(val => {
                                                        options.push(<Option key={val.id} value={val.subitem_type}>{val.subitem_type}</Option>)
                                                    })
                                                    return options;
                                                })()
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="物料(成品)属性："
                                        name="material_properties"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请选择物料(成品)属性！',
                                            },
                                        ]}>
                                        <Select>
                                            {
                                                (() => {
                                                    let options = [];
                                                    Array.isArray(props.material_properties_data) && props.material_properties_data.map(val => {
                                                        options.push(<Option key={val.id} value={val.material_properties}>{val.material_properties}</Option>)
                                                    })
                                                    return options;
                                                })()
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="基本计量单位："
                                        name="unit"
                                        rules={[
                                            {
                                                required: true,
                                                message: '请选择基本计量单位！',
                                            },
                                        ]}>
                                        <Select>
                                            {
                                                (() => {
                                                    let options = [];
                                                    Array.isArray(props.unit_data) && props.unit_data.map(val => {
                                                        options.push(<Option key={val.id} value={val.unit}>{val.unit}</Option>)
                                                    })
                                                    return options;
                                                })()
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="仓库："
                                        name="warehouse"
                                    >
                                        <Select>
                                            <Option key='op1' value='1-广东仓'>1-广东仓</Option>
                                            <Option key='op2' value='2-广东仓'>2-广东仓</Option>
                                            <Option key='op3' value='3-广东仓'>3-广东仓</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="参考成本价："
                                        name="reference_cost_price"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="损耗："
                                        name="loss_num"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Form.Item
                                        label="最小库存数量："
                                        name="min_stock_num"
                                    >
                                        <InputNumber style={{ width: '322px' }} max={9999999} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        label="最大库存数量："
                                        name="max_stock_num"
                                    >
                                        <InputNumber style={{ width: '322px' }} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                </div>
            </div>

        </>
    )

}