import React, { useState, useRef, useEffect } from 'react';
import { Button, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { EditableProTable } from '@ant-design/pro-table';
import style from '../css/showtable.less'

const { Option } = Select;

export default (props) => {


  const columns = [
    {
      title: '供应商名称',
      dataIndex: 'supplier_name',
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
      title: '供应商电话',
      dataIndex: 'supplier_phone',
      align: 'center',
    },
    {
      title: '供应商地址',
      dataIndex: 'supplier_address',
      align: 'center',
    },
    {
      title: '供应商类型',
      dataIndex: 'supplier_type',
      align: 'center',
      valueType: 'select',
      valueEnum: props.valuetype,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      }
    },
    {
      title: '供应商级别',
      dataIndex: 'supplier_level',
      align: 'center',
      valueType: 'select',
      valueEnum: props.valuelevel,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      }
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      align: 'center',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action.startEditable?.(record.id);
          }}
        >
          编辑
            </a>,
        <a
          key="delete"
          onClick={() => {
            props.update_list(['delete', record])
          }}
        >
          删除
            </a>
      ],
    }
  ]


  const actionRef = useRef();
  const input_name = useRef();
  const input_phone = useRef();
  const select_type = useRef();
  const [editableKeys, setEditableRowKeys] = useState([]);
  const [xuanran, setXuanran] = useState(0);
  const [search_type, setSearch_type] = useState(null);
  const [search_level, setSearch_level] = useState();


  useEffect(() => {
    setTimeout(() => {
      setXuanran(xuanran + 1);  //令组件挂载后多渲染一次，解决点击按钮获取不到actionref.current的bug
    }, 200);

  }, [])

  return (
    <>
      <div style={{ backgroundColor: '#fafafa', padding: '10px' }} className='clearfix'>
        <div className={style.searchHeader}>
          <Button className={style.radius_btn} size='large' type='primary' style={{ float: 'right' }} onClick={
            () => {
              setSearch_type(null);
              setSearch_level(null);
              input_name.current.state.value = null;
              input_phone.current.state.value = null;
              props.getsupplier_list();
            }
          }>清空</Button>
          <Button onClick={
            () => {
              let searchname = input_name.current.state.value, searchphone = input_phone.current.state.value;
              let post = {
                supplier_name: searchname,
                supplier_phone: searchphone,
                supplier_type: search_type,
                supplier_level: search_level
              }
              if (post.supplier_name || post.supplier_phone || post.supplier_level || post.supplier_type) {
                props.search_list(['search', post])
              }
            }
          } size='large' className={style.radius_btn}
            style={{ backgroundColor: '#009966', color: 'white', float: 'right' }}>查询</Button>
          <Select style={{ width: '10%' }} allowClear placeholder='供应商级别' value={search_level}
            className={style.floatAndMargin}
            onChange={(val) => {
              setSearch_level(val);
            }}
          >
            {
              (() => {
                let options = [];
                Array.isArray(props.level) && props.level.map(val => {
                  options.push(<Option key={val.id} value={val.supplier_level}>{val.supplier_level}</Option>)
                })
                return options;
              })()
            }
          </Select>
          <Select style={{ width: '10%' }} allowClear placeholder='供应商类型' ref={select_type} value={search_type}
            className={style.floatAndMargin}
            onChange={(val) => {
              setSearch_type(val);
            }}
          >
            {
              (() => {
                let options = [];
                Array.isArray(props.type) && props.type.map(val => {
                  options.push(<Option key={val.id} value={val.supplier_type}>{val.supplier_type}</Option>)
                })
                return options;
              })()
            }
          </Select>
          <Input allowClear placeholder='供应商电话' style={{ width: '10%' }} ref={input_phone} className={style.floatAndMargin} />
          <Input allowClear placeholder='供应商名称' style={{ width: '10%' }} ref={input_name} className={style.floatAndMargin} />
        </div>
        <Button type='primary' size='large' className={style.radius_btn}
          style={{ float: 'left' }}
          onClick={() => {
            actionRef.current?.addEditRecord?.({
              id: (Math.random() * 1000000).toFixed(0),
              supplier_level: "",
              supplier_type: ""
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
        columns={columns}
        value={props.data}
        onChange={(next, prev) => {
          // console.log('onchange的next,prev', next, prev);
        }}
        editable={{
          type: 'multiple',
          editableKeys,
          onSave: async (a, the_change) => {
            // console.log('onsave的a,b ya', a, the_change);
            let flag = true;//用于判断添加还是修改
            props.data.map(val => {
              if (the_change.id === val.id) {
                props.update_list(['update', the_change])
                flag = false;
              }
            })
            if (flag) {
              //添加操作
              props.update_list(['add', the_change])
            }


          },
          onChange: (a) => { setEditableRowKeys(a) },
          actionRender: (row, config) => [
            <a
              key='save'
              onClick={
                () => {
                  let newdata = config.form.getFieldValue()[row.id];
                  // console.log('row', row);
                  // console.log('config', config);
                  if (!newdata.supplier_type || !newdata.supplier_level || !newdata.supplier_name) {
                    config.form.validateFields(); //解决新增的时候直接点击保存不校验是否位空的错误
                  }
                  else {
                    let postdata = {
                      id: row.id,
                      supplier_name: newdata.supplier_name,
                      supplier_phone: newdata.supplier_phone,
                      supplier_address: newdata.supplier_address,
                      supplier_type: newdata.supplier_type,
                      supplier_level: newdata.supplier_level
                    }
                    config.onSave(row, postdata)
                    config?.cancelEditable?.(config.recordKey)
                  }

                }}
            >保存</a>,
            <a
              key='save'
              onClick={
                () => {
                  config?.cancelEditable?.(config.recordKey)
                }
              }
            >取消</a>,
          ]
        }}
      />
    </>
  )






}

