import React from 'react';
import { delWorkplaceConfig, queryWorkplaceConfig, editWorkplaceConfig } from '@/services/ConfigOS/configOS';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, message } from 'antd';
const { confirm } = Modal;

import ConfigList from './components/ConfigList';

// 删除配置的对话框配置
/**
 *
 * @param {object} record 要删除的设备信息
 * @param {function} reload 重新加载数据的回调函数
 */
function showDeleteConfirm(record, reload) {
	return confirm({
		title: '确定删除这条工位配置吗?',
		icon: <ExclamationCircleOutlined />,
		content: `工位名：${record.name}   编号：${record.number}`,
		okType: 'danger',
		okText: '是',
		cancelText: '否',
		async onOk() {
			await delWorkplaceConfig(record);
			message.success('删除成功！');
			reload();
		},
	});
}

const valueEnum = {
	belong1: {id: 'belong1', text: '打铁部'},
	belong2: {id: 'belong2', text: '搬砖部'},
	belong3: {id: 'belong3', text: '水泥部'},
	belong4: {id: 'belong4', text: '精神小伙部'},
};

const columns = [
	{
		title: '序号',
		dataIndex: 'index',
		valueType: 'index',
		width: 80,
	},
	{
		title: '工位名称',
		dataIndex: 'name',
		formItemProps: {
			rules: [
				{
					required: true,
					message: '此项为必填项',
				},
			],
		},
		width: '30%',
	},
	{
		title: '工位编号',
		dataIndex: 'number',
		formItemProps: {
			rules: [
				{
					required: true,
					message: '此项为必填项',
				},
			],
		},
	},
	{
		title: '隶属车间',
		valueType: 'select',
        dataIndex: 'belong',
        initialValue: ['belong4'],
        valueEnum,
		formItemProps: {
			rules: [
				{
					required: true,
					message: '此项为必填项',
				},
			],
		},
	},
	{
		title: '操作',
		valueType: 'option',
		width: 200,
		render: (text, record, _, action) => [
			<a
				key='editable'
				onClick={() => {
					action.startEditable?.(record.id);
				}}>
				编辑
			</a>,
			<a
				key='deleteRow'
				onClick={() => {
					showDeleteConfirm(record, action.reload);
				}}>
				删除
			</a>,
		],
	},
];

export default () => {
	return (
		<>
			<ConfigList
				columns={columns}
				editAndSaveFn={editWorkplaceConfig}
				queryFn={queryWorkplaceConfig}
			/>
		</>
	);
};
