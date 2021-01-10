import { Button, Modal, Select, Form, message } from 'antd';
import { Link } from 'umi';
import { requestChangeDirector, queryMaintenanceDirectors, complateMaintenanceOrder } from '@/services/EquipmentOS/maintenance'

const { confirm } = Modal;
const { Option } = Select;

// 提交数据至后台
async function sendRequest(params) {
    let { director = '' } = params;

    director = director.trim();

    if (director.length === 0) return message.error('请选择负责人');

    let { success } = await requestChangeDirector(params);

    if (!success) return message.error('操作失败');

    message.success('操作成功');

    this.current?.reload();
}

// 显示派单对话框
async function showDispatchModel(row) {
    let { data: directors, success } = await queryMaintenanceDirectors();

    if (!success) return message.error('获取负责人失败');

    let director = '';
    const checkDirector = (val) => {
        director = val;
    };

    const config = {
        icon: null,
        content: (
            <>
                <Form
                    layout='horizontal'
                >
                    <Form.Item label='负责人：'>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder='请选择负责人'
                            optionFilterProp='children'
                            onChange={checkDirector}
                        >
                            {
                                directors.map(director => {
                                    return <Option key={`director-dispatch-key-${director.id}`} value={director.id}>{director.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </>
        ),
        onOk: (close) => {
            // 提交 date, content 至后端
            sendRequest.call(this, { type: '0', director, key: row.key });
            close();
        },
    }
    confirm(config)
}

// 显示转单对话框
async function showTransferModel(row) {
    let { data: directors, success } = await queryMaintenanceDirectors();

    if (!success) return message.error('获取负责人失败');

    let director = '';
    const checkDirector = (val) => {
        director = val;
    };

    const config = {
        icon: null,
        content: (
            <>
                <Form
                    layout='horizontal'
                >
                    <Form.Item label='负责人：'>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder='请选择负责人'
                            optionFilterProp='children'
                            onChange={checkDirector}
                        >
                            {
                                directors.map(director => {
                                    return <Option key={`director-transfer-key-${director.id}`} value={director.id}>{director.name}</Option>
                                })
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </>
        ),
        onOk: (close) => {
            // 提交 date, content 至后端
            sendRequest.call(this, { type: '1', director, key: row.key });
            close();
        },
    }

    confirm(config);
}

// 点击完成时
async function complete(row) {
    let { key, maintainNumber } = row;
    let { success } = await complateMaintenanceOrder({ key, maintainNumber });
    if (!success) return message.error('操作失败');
    message.success('操作成功');
    this.current?.reload();
}

const setIndexColumns = (tableRef) => {
    const columns = [
        {
            title: '维护单号',
            dataIndex: 'maintainNumber',
            key: 'maintainNumber',
            render: (text, row) => {
                return (<Link to={`/EquipmentOS/EquipmentMaintenance/detail/${row.key}`}>{text}</Link>)
            }
        },
        {
            title: '维护类型',
            dataIndex: 'maintenanceType',
            key: 'maintenanceType',
        },
        {
            title: '设备编号',
            dataIndex: 'equipmentNumber',
            key: 'equipmentNumber',
        },
        {
            title: '设备名称',
            dataIndex: 'equipmentName',
            key: 'equipmentName',
        },
        {
            title: '计划维护时间',
            dataIndex: 'plannedMaintenanceTime',
            key: 'plannedMaintenanceTime',
        },
        {
            title: '实际维护实际',
            dataIndex: 'actualMaintenanceTime',
            key: 'actualMaintenanceTime',
        },
        {
            title: '维护单当前状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '负责人',
            dataIndex: 'director',
            key: 'director',
        },
        {
            title: '操作',
            key: 'option',
            width: 220,
            valueType: 'option',
            align: 'center',
            render: (_, row) => {
                let el = [];
                if (row.status === '待处理') {
                    el.push(
                        <Button
                            type='primary'
                            size='small'
                            key='3'
                            style={{ backgroundColor: '#096', borderColor: '#096' }}
                            onClick={() => showDispatchModel.call(tableRef, row)}
                        >
                            派单
                        </Button>,
                    );
                } else if (row.status === '处理中') {
                    el = [
                        <Button
                            type='primary'
                            size='small'
                            key='1'
                            style={{ backgroundColor: '#096', borderColor: '#096' }}
                            onClick={() => showTransferModel.call(tableRef, row)}
                        >
                            转单
                        </Button>,
                        <Button type='primary' size='small' key='2' onClick={() => complete.call(tableRef, row)}>
                            完成
                        </Button>,
                    ];
                }

                return el;
            },
        },
    ];

    return columns;
}


export default setIndexColumns;

