import React, { useState, useRef } from 'react';
import ProTable from '@ant-design/pro-table';
import { Form, Button, Space, Modal, message } from 'antd';
import { queryMaintenanceList, addMaintenanceOrder } from '@/services/EquipmentOS/maintenance';
import setIndexColumns from './utils/setIndexColumns';
import AddForm from './components/AddForm';
import './Index.less';

const EquipmentMaintenance = () => {
	let tableRef = useRef(null);
	let [maintainState, setMaintainState] = useState('-1');
	let [handleState, setHandleState] = useState('-1');
	const [visibleAddModel, setVisibleAddModel] = useState(false);
	const [form] = Form.useForm();

	// 重新加载数据
	const reloadData = (type, val) => {
		if (type === 'maintainState') {
			setMaintainState(val);
		} else if (type === 'handleState') {
			setHandleState(val);
		}
		tableRef.current.reload();
	};

	// 筛选栏
	const FilterBar = () => {
		return (
			<div className='filter-bar'>
				<Space direction='vertical'>
					<Space>
						<span
							className={`action ${maintainState === '-1' && 'active'}`}
							onClick={() => reloadData('maintainState', '-1')}>
							全部
						</span>
						<span
							className={`action ${maintainState === '0' && 'active'}`}
							onClick={() => reloadData('maintainState', '0')}>
							预防维护
						</span>
						<span
							className={`action ${maintainState === '1' && 'active'}`}
							onClick={() => reloadData('maintainState', '1')}>
							定期维护
						</span>
						<span
							className={`action ${maintainState === '2' && 'active'}`}
							onClick={() => reloadData('maintainState', '2')}>
							故障维护
						</span>
					</Space>
					<Space>
						<span
							className={`action ${handleState === '-1' && 'active'}`}
							onClick={() => reloadData('handleState', '-1')}>
							全部
						</span>
						<span
							className={`action ${handleState === '0' && 'active'}`}
							onClick={() => reloadData('handleState', '0')}>
							待处理
						</span>
						<span
							className={`action ${handleState === '1' && 'active'}`}
							onClick={() => reloadData('handleState', '1')}>
							处理中
						</span>
						<span
							className={`action ${handleState === '2' && 'active'}`}
							onClick={() => reloadData('handleState', '2')}>
							已处理
						</span>
					</Space>
				</Space>
			</div>
		);
	};

	// 获取数据
	const requestData = async () => {
		let { data, success } = await queryMaintenanceList({
			maintainState,
			handleState,
		});
		if (success) {
			return {
				data,
				success,
			};
		}
	};

	// 模态框确定函数
	const ModalOK = async () => {
		try {
			await form.validateFields();
		} catch (error) {
			return;
		}
		let params = form.getFieldsValue();

		let { success } = await addMaintenanceOrder(params);

		if (!success) return message.error('添加失败');

		message.success('添加成功');

		tableRef.current.reload();

		setVisibleAddModel(false);
	};

	return (
		<div>
			<ProTable
				actionRef={tableRef}
				columns={setIndexColumns(tableRef)}
				request={requestData}
				search={false}
				rowKey='key'
				headerTitle={<FilterBar />}
				toolbar={{
					actions: [
						<Button key='key' type='primary' onClick={() => setVisibleAddModel(true)}>
							添加
						</Button>,
					],
				}}
			/>

			{/* --------------------------------------------- */}

			<Modal
				centered
				visible={visibleAddModel}
				onOk={() => ModalOK()}
				onCancel={() => setVisibleAddModel(false)}
				width={1000}>
				<AddForm actionRef={form} />
			</Modal>
		</div>
	);
};

export default EquipmentMaintenance;
