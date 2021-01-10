import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Space } from 'antd';
import React, { useState, useRef } from 'react';
import { FooterToolbar } from '@ant-design/pro-layout';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import { Link } from 'umi';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from './service';
import './Index.less';
/**
 * 添加节点
 * @param fields
 */

const handleAdd = async (fields) => {
	const hide = message.loading('正在添加');

	try {
		await addRule({ ...fields });
		hide();
		message.success('添加成功');
		return true;
	} catch (error) {
		hide();
		message.error('添加失败请重试！');
		return false;
	}
};
/**
 * 更新节点
 * @param fields
 */

const handleUpdate = async (fields) => {
	const hide = message.loading('正在配置');

	try {
		await updateRule({
			name: fields.name,
			desc: fields.desc,
			key: fields.key,
		});
		hide();
		message.success('配置成功');
		return true;
	} catch (error) {
		hide();
		message.error('配置失败请重试！');
		return false;
	}
};
/**
 *  删除节点
 * @param selectedRows
 */

const handleRemove = async (selectedRows) => {
	if (selectedRows.length === 0) {
		message.error('请选择要删除的行');
		return;
	}

	const hide = message.loading('正在删除');
	if (!selectedRows) return true;

	try {
		await removeRule({
			key: selectedRows.map((row) => row.key),
		});
		hide();
		message.success('删除成功，即将刷新');
		return true;
	} catch (error) {
		hide();
		message.error('删除失败，请重试');
		return false;
	}
};

const TableList = () => {
	const [createModalVisible, handleModalVisible] = useState(false);
	const [updateModalVisible, handleUpdateModalVisible] = useState(false);
	const [stepFormValues, setStepFormValues] = useState({});
	const actionRef = useRef();
	const [row, setRow] = useState();
	const [selectedRowsState, setSelectedRows] = useState([]);
	const [activeWork, setActiveWork] = useState(3);
	const [activeProcess, setActiveProcess] = useState(0);

	const columns = [
		{
			title: '设备名称',
			dataIndex: 'equipmentName',
			render(_, _row) {
				return (
					<Link to={`/EquipmentOS/EquipmentList/Detail/${_row.key}`}>
						{_row.equipmentName}
					</Link>
				);
			},
		},
		{
			title: '隶属工序',
			dataIndex: 'belong',
			valueEnum: {
				0: {
					text: '工序1',
				},
				1: {
					text: '工序2',
				},
			},
		},
		{
			title: '所在位置',
			dataIndex: 'currentAddress',
		},
		{
			title: '生产厂商',
			dataIndex: 'manufacturer',
			valueEnum: {
				0: {
					text: '厂商1',
				},
				1: {
					text: '厂商2',
				},
			},
		},
		{
			title: '设备型号',
			dataIndex: 'equipmentModel',
			valueEnum: {
				0: {
					text: '型号1',
				},
				1: {
					text: '型号2',
				},
			},
		},
		{
			title: '设备生产时间',
			dataIndex: 'productionTime',
			hideInTable: true,
		},
		{
			title: '调试使用时间',
			dataIndex: 'usageTime',
			hideInTable: true,
		},
		{
			title: '当前订单',
			dataIndex: 'currentOrderNo',
			hideInForm: true,
		},
		{
			title: '经销商',
			dataIndex: 'manufacturer',
			hideInTable: true,
			valueEnum: {
				0: {
					text: '经销商 1',
				},
				1: {
					text: '经销商 2',
				},
			},
		},
		{
			title: '状态',
			dataIndex: 'status',
			filters: true,
			hideInForm: true,
			valueEnum: {
				0: {
					text: '未工作',
					status: 'Default',
					color: 'gray',
				},
				1: {
					text: '工作中',
					status: 'Processing',
					color: 'green',
				},
				2: {
					text: '故障中',
					status: 'Error',
					color: 'red',
				},
			},
			render(_) {
				return (
					<span style={{ color: _.props.valueEnum[_.props.text].color }}>
						{_.props.valueEnum[_.props.text].text}
					</span>
				);
			},
		},
	];

	// 渲染筛选条区域
	const RenderHeaderFilterBar = () => {
		// 筛选工作状态
		const filterTableWorkState = async (type, active) => {
			setActiveWork(active);
			actionRef.current?.reloadAndRest?.();
		};
		// 筛选工序
		const filterTableProcessData = async (type, active) => {
			setActiveProcess(active);
			actionRef.current?.reloadAndRest?.();
		};

		// ----------------------

		// 渲染筛选按钮
		const RenderButton = (type, active, text) => {
			let activeIndex;
			let activeFn = null;

			if (type === 'work') {
				activeIndex = activeWork;
				activeFn = filterTableWorkState.bind(this, type, active);
			} else if (type === 'process') {
				activeIndex = activeProcess;
				activeFn = filterTableProcessData.bind(this, type, active);
			} else {
				return;
			}

			const el = (
				<span
					onClick={activeFn}
					className={`filter-btn ${activeIndex === active && 'active'}`}>
					{text}
				</span>
			);

			return el;
		};

		return (
			<div>
				<Space direction='vertical'>
					<Space>
						{RenderButton('work', 3, '全部')}
						{RenderButton('work', 1, '工作中')}
						{RenderButton('work', 2, '故障中')}
						{RenderButton('work', 0, '未工作')}
					</Space>
					<Space>
						{RenderButton('process', 5, '全部')}
						{RenderButton('process', 0, '梳棉工序')}
						{RenderButton('process', 1, '并条工序')}
						{RenderButton('process', 2, '粗纱工序')}
						{RenderButton('process', 3, '细纱工序')}
						{RenderButton('process', 4, '络筒工序')}
					</Space>
				</Space>
			</div>
		);
	};

	return (
		<>
			<ProTable
				actionRef={actionRef}
				rowKey='key'
				search={false}
				headerTitle={RenderHeaderFilterBar()}
				toolBarRender={() => [
					<Input
						placeholder='输入关键字'
						key='tools-1'
						onPressEnter={(e) =>
							queryRule({
								filter: { equipmentName: e.target.value },
								sorter: {},
							})
						}
					/>,
					// -------------------------新增
					<Button type='primary' onClick={() => handleModalVisible(true)} key='tools-2'>
						<PlusOutlined /> 新增
					</Button>,
					// -------------------------删除
					<Button
						type='primary'
						key='tools-3'
						onClick={async () => {
							await handleRemove(selectedRowsState);
							setSelectedRows([]);
							actionRef.current?.reloadAndRest?.();
						}}>
						<MinusOutlined /> 删除
					</Button>,
				]}
				request={(params, sorter, filter) =>
					queryRule({ ...params, sorter, filter, activeWork, activeProcess })
				}
				columns={columns}
				rowSelection={{
					onChange: (_, selectedRows) => setSelectedRows(selectedRows),
				}}
			/>

			{selectedRowsState?.length > 0 && (
				<FooterToolbar
					extra={
						<div>
							已选择{' '}
							<a
								style={{
									fontWeight: 600,
								}}>
								{selectedRowsState.length}
							</a>{' '}
							项&nbsp;&nbsp;
							<span>
								设备个数总计{' '}
								{selectedRowsState.reduce((pre, item, index) => pre + index, 1)} 个
							</span>
						</div>
					}>
					<Button
						onClick={async () => {
							await handleRemove(selectedRowsState);
							setSelectedRows([]);
							actionRef.current?.reloadAndRest?.();
						}}>
						批量删除
					</Button>
					<Button type='primary'>批量审批</Button>
				</FooterToolbar>
			)}

			<CreateForm
				onCancel={() => handleModalVisible(false)}
				modalVisible={createModalVisible}>
				<ProTable
					onSubmit={async (value) => {
						const success = await handleAdd(value);

						if (success) {
							handleModalVisible(false);

							if (actionRef.current) {
								actionRef.current.reload();
							}
						}
					}}
					rowKey='key'
					type='form'
					columns={columns}
				/>
			</CreateForm>

			{stepFormValues && Object.keys(stepFormValues).length ? (
				<UpdateForm
					onSubmit={async (value) => {
						const success = await handleUpdate(value);

						if (success) {
							handleUpdateModalVisible(false);
							setStepFormValues({});

							if (actionRef.current) {
								actionRef.current.reload();
							}
						}
					}}
					onCancel={() => {
						handleUpdateModalVisible(false);
						setStepFormValues({});
					}}
					updateModalVisible={updateModalVisible}
					values={stepFormValues}
				/>
			) : null}

			<Drawer
				width={600}
				visible={!!row}
				onClose={() => {
					setRow(undefined);
				}}
				closable={false}>
				{row?.name && (
					<ProDescriptions
						column={2}
						title={row?.name}
						request={async () => ({
							data: row || {},
						})}
						params={{
							id: row?.name,
						}}
						columns={columns}
					/>
				)}
			</Drawer>
		</>
	);
};

export default TableList;
