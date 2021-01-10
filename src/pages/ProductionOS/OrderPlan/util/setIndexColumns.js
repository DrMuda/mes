import { Space, Button, Modal, message } from 'antd';
import { WarningOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { changeProductionStatus } from '@/services/ProductionOS/productionOS';
import { history } from 'umi'

// 排程状态
const ScheduleStateEnum = {
    0: <span style={{ color: 'red' }}>未排程</span>,
    1: <span style={{ color: '#20BE33' }}>已排程</span>,
};

// 进度条组件
const ProgressBar = ({ current, total }) => {
    let percentage = ((current / total) * 100) | 0;

    if (percentage > 100) percentage = 100;

    const parentStyle = {
        position: 'relative',
        border: '1px solid #20BE33',
        textAlign: 'center',
        overflow: 'hidden',
    };

    const maskStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: -1,
        width: `${percentage}%`,
        height: '100%',
        backgroundColor: '#20BE33',
    };

    return (
        <div style={parentStyle}>
            {current} / {total}
            <span style={maskStyle}></span>
        </div>
    );
};

// 显示模态框
const showModalDialog = ({ title, okText, content, onOk }) => {
    const config = {
        title: <strong>{title}</strong>,
        centered: true,
        closable: true,
        maskClosable: true,
        width: 516,
        okText,
        className: 'modal-box',
        icon: null,
        content: <>{content}</>,
        onOk,
    };

    Modal.confirm(config);
};

// 跳转订单详情
const toOrderDetail = (orderNumber) => {
    history.push({
        pathname: '/ProductionOS/OrderPlan/OrderInfo',
        query: { orderNumber },
    });
}

// 跳转计划方案
const toArrange = (orderNumber) => {
    history.push({
        pathname: '/ProductionOS/OrderPlan/Arrange',
        query: { orderNumber },
    });
}



// 设置列
const setColumns = (findDataList) => {
    const columns = [
        {
            title: '订单编号',
            dataIndex: 'orderNumber',
            render: (text, data) => {
                return <span style={{ color: '#0099FF', cursor: 'pointer' }} onClick={toOrderDetail.bind(this, data.orderNumber)}>{text}</span>;
            },
        },
        {
            title: '成品编码',
            dataIndex: 'orderCode',
        },
        {
            title: '成品名称',
            dataIndex: 'productName',
        },
        {
            title: '规格型号',
            dataIndex: 'model',
        },
        {
            title: '订单数量',
            dataIndex: 'orders',
        },
        {
            title: '客户要求日期',
            dataIndex: 'endDate',
        },
        {
            title: '排程状态',
            dataIndex: 'scheduleState',
            render: (text, row) => {
                return ScheduleStateEnum[text] || '';
            },
        },
        {
            title: '生产状态',
            dataIndex: 'productionStatus',
            render: (text) => {
                return text.desc || '';
            },
        },
        {
            title: '完工数量',
            dataIndex: 'completions',
            render: (text, { completions }) => {
                return <ProgressBar current={completions.current} total={completions.total} />;
            },
        },
        {
            title: '产量计划对比',
            dataIndex: 'contrast',
            render: (text, { contrast }) => {
                let sctualOutput = (
                    <span style={{ color: '#20BE33' }}>{contrast.sctualOutput}</span>
                );
                let goalOutput = <span style={{ color: '#0099FF' }}>{contrast.goalOutput}</span>;
                let isDecline = contrast.sctualOutput === contrast.goalOutput;
                return (
                    <div>
                        {sctualOutput}/{goalOutput}
                        {isDecline ? (
                            <span style={{ marginLeft: 12, color: '#20BE33' }}>&rarr; </span>
                        ) : (
                                <span style={{ marginLeft: 12, color: '#20BE33' }}>&darr; </span>
                            )}
                    </div>
                );
            },
        },
        {
            title: '操作',
            key: 'action',
            width: 300,
            render: (_, { scheduleState, productionStatus: { stateCode }, orderNumber }) => {
                // 暂停成功的模态框配置
                const pauseSuccessConf = {
                    title: '暂停',
                    okText: '确认',
                    content: (
                        <div style={{ lineHeight: 2, textAlign: 'center' }}>
                            <CheckCircleOutlined className='big-icon success' />
                            <h4>暂停成功</h4>
                            <p>该订单将于2020-01-05暂停生产</p>
                            <p>预计累计生产XX产品XX数量</p>
                            <p style={{ marginTop: 15, color: '#666' }}>
                                注意：暂停后，该订单成品将锁定，不可调配至其他订单
							</p>
                        </div>
                    ),
                };

                // 暂停前模态框配置
                const pauseBeforeConf = {
                    title: '暂停',
                    okText: '确认暂停',
                    content: (
                        <div style={{ lineHeight: 2, textAlign: 'center' }}>
                            <WarningOutlined className='big-icon wraning' />
                            <p>该订单将于2020-01-05暂停生产</p>
                            <p>预计累计生产XX产品XX数量</p>
                            <p>确认该订单计划是否要暂停?</p>
                            <p style={{ marginTop: 15, color: '#666' }}>
                                注意：暂停后，该订单成品将锁定，不可调配至其他订单
							</p>
                        </div>
                    ),
                    onOk: async (closeFn) => {
                        let { orderNumber, orderCode } = _;

                        let { success } = await changeProductionStatus({
                            stateKey: 'pause',
                            orderNumber,
                            orderCode,
                        });

                        if (success) {
                            findDataList();
                            showModalDialog(pauseSuccessConf);
                            closeFn();
                        } else {
                            message.error('操作失败！');
                        }
                    },
                };

                // 终止成功的模态框配置
                const stopSuccessConf = {
                    title: '终止',
                    okText: '确认',
                    content: (
                        <div style={{ lineHeight: 2, textAlign: 'center' }}>
                            <CheckCircleOutlined className='big-icon success' />
                            <h4>终止成功</h4>
                            <p>该订单将于2020-01-05停止生产</p>
                            <p>预计累计生产XX产品XX数量</p>
                            <p>该订单成品将由系统调配至其他订单</p>
                        </div>
                    ),
                };

                // 终止前模态框配置
                const stopBeforeConf = {
                    title: '终止',
                    okText: '确认终止',
                    content: (
                        <div style={{ lineHeight: 2, textAlign: 'center' }}>
                            <WarningOutlined className='big-icon wraning' />
                            <p>该订单将于2020-01-05停止生产</p>
                            <p>预计累计生产XX产品XX数量</p>
                            <p>确认该订单计划是否要终止?</p>
                            <p style={{ marginTop: 15, color: '#666' }}>
                                注意：终止后，该订单成品将由系统调配至其他订单
							</p>
                        </div>
                    ),
                    onOk: async (closeFn) => {
                        let { orderNumber, orderCode } = _;

                        let { success } = await changeProductionStatus({
                            stateKey: 'stop',
                            orderNumber,
                            orderCode,
                        });

                        if (success) {
                            findDataList();
                            showModalDialog(stopSuccessConf);
                            closeFn();
                        } else {
                            message.error('操作失败！');
                        }
                    },
                };

                // 重排按钮
                const RearrangeBtn = (
                    <Button size='small' type='primary' onClick={toArrange.bind(this, orderNumber)}>
                        重排
                    </Button>
                );

                // 暂停按钮
                const PauseBtn = (
                    <Button size='small' onClick={showModalDialog.bind(this, pauseBeforeConf)}>
                        暂停
                    </Button>
                );

                // 终止按钮
                const StopBtn = (
                    <Button
                        size='small'
                        type='primary'
                        danger
                        onClick={showModalDialog.bind(this, stopBeforeConf)}>
                        终止
                    </Button>
                );

                // 已完成，什么都不渲染
                if (scheduleState === 5) return '';

                // 未排程，只渲染排程按钮
                if (scheduleState === 0) {
                    const ArrangeBtn = (
                        <Button size='small' type='primary' onClick={toArrange.bind(this, orderNumber)}>
                            排程
                        </Button>
                    );
                    return <Space size='middle'>{ArrangeBtn}</Space>;
                }

                // 未开始、生产中
                if (stateCode === 1 || stateCode === 2) {
                    return (
                        <Space size='middle'>
                            {PauseBtn}
                            {RearrangeBtn}
                            {StopBtn}
                        </Space>
                    );
                }

                // 暂停
                if (stateCode === 3) {
                    return (
                        <Space size='middle'>
                            {RearrangeBtn}
                            {StopBtn}
                        </Space>
                    );
                }

                // 终止
                if (stateCode === 4) {
                    return <Space size='middle'>{RearrangeBtn}</Space>;
                }
            },
        },
    ];

    return columns;
};


export default setColumns;