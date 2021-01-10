import React from 'react';
import { delEquipmentConfig, queryEquipmentConfig, editEquipmentConfig } from '@/services/ConfigOS/configOS';
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
		title: '确定删除这条设备配置吗?',
		icon: <ExclamationCircleOutlined />,
		content: `设备名：${record.name}   型号：${record.model}`,
		okType: 'danger',
		okText: '是',
		cancelText: '否',
		async onOk() {
			await delEquipmentConfig(record);
			message.success('删除成功！');
			reload();
		},
	});
}

const columns = [
	{
		title: '序号',
		dataIndex: 'index',
		valueType: 'index',
		width: 80,
	},
	{
		title: '设备名称',
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
		title: '设备型号',
		dataIndex: 'model',
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
			<ConfigList columns={columns} editAndSaveFn={editEquipmentConfig} queryFn={queryEquipmentConfig}/>
		</>
	);
};
