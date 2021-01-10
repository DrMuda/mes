import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import style from '../css/showtable.less'
import { EditableProTable } from '@ant-design/pro-table';




export default (props) => {


    const actionRef = useRef();
    const [editableKeys, setEditableRowKeys] = useState([]);
    const [xuanran, setXuanran] = useState(0)


    useEffect(() => {
        setTimeout(() => {
            setXuanran(xuanran + 1);  //令组件挂载后多渲染一次，解决点击按钮获取不到actionref.current的bug
        }, 40);
    }, [])

    return (
        <>
            <div style={{ backgroundColor: '#fafafa', padding: '10px' }} className='clearfix'>
                <Button type='primary' size='large' className={style.radius_btn}
                    style={{ float: 'right' }}
                    onClick={() => {
                        actionRef.current?.addEditRecord?.({
                            id: (Math.random() * 1000000).toFixed(0),
                        });
                        window.scrollTo(0, document.body.scrollHeight);
                    }}
                    icon={<PlusOutlined />}
                >添加</Button>
            </div>
            <EditableProTable
                rowKey="id"
                actionRef={actionRef}
                recordCreatorProps={
                    false
                }
                columns={props.columns}
                value={props.data}
                onChange={(next, prev) => {
                    // console.log('onchange的a,b', next, prev);
                    // actionRef.current?.cancelEditable?.(prevKey);
                }}
                editable={{
                    type: 'multiple',
                    editableKeys,
                    onSave: async (a, the_change) => {
                        // console.log('onsave的a,b ya', a, the_change);
                        let flag = true;//用于判断添加还是修改
                        props.data.map(val => {
                            if (the_change.id === val.id) {    //找到该id，为更新操作
                                if (val.unit) {  //组件复用时判断
                                    val.unit = the_change.unit
                                    props.update_data(['update', val])
                                }
                                if (val.material_properties) {
                                    val.material_properties = the_change.material_properties
                                    props.update_data(['update', val])
                                }
                                if (val.subitem_type) {
                                    val.subitem_type = the_change.subitem_type
                                    props.update_data(['update', val])
                                }
                                if (val.material_finishedproduct_type) {
                                    val.material_finishedproduct_type = the_change.material_finishedproduct_type
                                    props.update_data(['update', val])
                                }
                                flag = false;   //flase,就不进行下面的添加操作
                            }
                        })
                        if (flag) {
                            //添加操作
                            if (the_change.unit) {
                                props.update_data(['add', {
                                    id: the_change.id,
                                    unit: the_change.unit
                                }])
                            }
                            else if (the_change.material_properties) {
                                props.update_data(['add', {
                                    id: the_change.id,
                                    material_properties: the_change.material_properties
                                }])
                            }
                            else if (the_change.subitem_type) {
                                props.update_data(['add', {
                                    id: the_change.id,
                                    subitem_type: the_change.subitem_type
                                }])
                            }
                            else if (the_change.material_finishedproduct_type) {
                                props.update_data(['add', {
                                    id: the_change.id,
                                    material_finishedproduct_type: the_change.material_finishedproduct_type
                                }])
                            }


                        }


                    },
                    onChange: (a) => { setEditableRowKeys(a) },
                    actionRender: (row, config) => [
                        <a
                            key='save'
                            onClick={
                                () => {
                                    // console.log('row', row);
                                    // console.log('config', config);
                                    config.form.validateFields(); //解决新增的时候直接点击保存不校验是否位空的错误

                                    if (config.form.getFieldsValue()[row.id].unit || config.form.getFieldsValue()[row.id].material_properties
                                        || config.form.getFieldsValue()[row.id].subitem_type || config.form.getFieldsValue()[row.id].material_finishedproduct_type) {
                                        let newdata = {}
                                        if (config.form.getFieldValue()[row.id].unit) {
                                            newdata = {
                                                id: row.id,
                                                unit: config.form.getFieldValue()[row.id].unit
                                            }
                                        }
                                        else if (config.form.getFieldValue()[row.id].material_properties) {
                                            newdata = {
                                                id: row.id,
                                                material_properties: config.form.getFieldValue()[row.id].material_properties
                                            }
                                        }
                                        else if (config.form.getFieldValue()[row.id].subitem_type) {
                                            newdata = {
                                                id: row.id,
                                                subitem_type: config.form.getFieldValue()[row.id].subitem_type
                                            }
                                        }
                                        else if (config.form.getFieldValue()[row.id].material_finishedproduct_type) {
                                            newdata = {
                                                id: row.id,
                                                material_finishedproduct_type: config.form.getFieldValue()[row.id].material_finishedproduct_type
                                            }
                                        }

                                        config.onSave(row, newdata)   //row为该行所有数据，传递给onsave的第一个参数。newdata传递给onsave的第二个参数
                                        config?.cancelEditable?.(config.recordKey)
                                    }


                                }}
                        >
                            保存
                        </a>,
                        <a
                            key='save'
                            onClick={
                                () => {
                                    config?.cancelEditable?.(config.recordKey)
                                }
                            }
                        >
                            取消
                        </a>,
                    ]
                }}
            />
        </>
    )

}