import { Button } from 'antd';
import { Link } from 'umi';
import { createOrderExcel, downloadOrderExcel, uploadExcel, reviewCheckOrder, delCheckOrder } from './stockCheck';
import style from '../css/StockCheck.less';

const setStockCheckColumns = (refTable) => {
    const columns = [
        {
            title: '盘点单号',
            key: 'numbers',
            dataIndex: 'numbers',
            render: (_, row) => {
                return (
                    <Link
                        to={`/DepositoryOS/Stock/OrderDetails?number=${_}&date=${row.date}&warehouse=${row.warehouse}`}>
                        {_}
                    </Link>
                );
            },
        },
        {
            title: '审核状态',
            key: 'auditStatus',
            dataIndex: 'auditStatus',
        },
        {
            title: '盘点日期',
            key: 'date',
            dataIndex: 'date',
            sorter: (a, b) => a.containers - b.containers,
        },
        {
            title: '盘点仓库',
            key: 'warehouse',
            dataIndex: 'warehouse',
        },
        {
            title: '制单人',
            key: 'producer',
            dataIndex: 'producer',
        },
        {
            title: '审核人',
            key: 'reviewerm',
            dataIndex: 'reviewerm',
        },
        {
            title: '审核日期',
            key: 'validateDate',
            dataIndex: 'validateDate',
            sorter: (a, b) => a.containers - b.containers,
        },
        {
            title: '操作',
            key: 'option',
            width: 120,
            valueType: 'option',
            render: (
                {
                    props: {
                        text: { passed },
                    },
                },
                row,
            ) => {
                if (!passed) {
                    // 通过
                    return [
                        <Button
                            key='download'
                            type='primary'
                            size='small'
                            className={style.download}
                            onClick={() => downloadOrderExcel(row)}>
                            下载
                        </Button>,
                        <Button
                            key='upload'
                            type='primary'
                            size='small'
                            onClick={() => uploadExcel(row)}>
                            上传
                        </Button>,
                        <Button
                            key='createOrder'
                            type='primary'
                            size='small'
                            onClick={() => createOrderExcel(row)}>
                            生产盘点单
                        </Button>,
                        <Button key='examine' type='primary' size='small' className={style.examine}
                            onClick={() => reviewCheckOrder.call(refTable, row)}>
                            审核
                        </Button>,
                        <Button
                            key='del'
                            type='primary'
                            size='small'
                            className={style.del}
                            onClick={() => delCheckOrder.call(refTable, row)}>
                            删除
                        </Button>,
                    ];
                }
            },
        },
    ];

    return columns;
}


export default setStockCheckColumns;