import React, { useState, useRef } from 'react';
import { EditableProTable } from '@ant-design/pro-table';
import { queryEquipmentConfig, editEquipmentConfig } from '@/services/ConfigOS/configOS';
import { PlusOutlined } from '@ant-design/icons';
import { Spin, Button } from 'antd';

const HeadToolBarCss = {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '5px 0',
    padding: '5px',
    backgroundColor: '#fff',
}

export default (props) => {
	const actionRef = useRef();
	const [editableKeys, setEditableRowKeys] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [loading, setLoading] = useState(false);
	// 记录上一次生成的key，解决添加新数据并保存后，会多出一条初始数据的bug
	const [prevKey, setPrevKey] = useState();

	return (
		<>
			<div style={HeadToolBarCss}>
				<Button
					type='primary'
					onClick={() => {
						let row = {
							id: (Math.random() * 99999 + Math.random() * 99999) | 0,
						};
						setPrevKey(row.id);
						actionRef.current?.addEditRecord?.(row);
						window.scrollTo(0, document.body.scrollHeight);
					}}
					icon={<PlusOutlined />}>
					添加
				</Button>
			</div>
			<Spin tip='Loading...' spinning={loading}>
				<EditableProTable
					rowKey='id'
					actionRef={actionRef}
					recordCreatorProps={false}
					columns={props.columns}
					request={() => props.queryFn()}
					value={dataSource}
					onChange={async () => {
                        // 取消界面上所有的编辑行
						actionRef.current?.cancelEditable?.(prevKey);
						let { data } = await props.queryFn();
                        setDataSource(data);
                        setPrevKey(data[0]?.id)
					}}
					editable={{
						type: 'multiple',
						editableKeys,
						// 点击编辑时
						onChange: (editKeys, row) => {
							setEditableRowKeys(editKeys);
						},
						// 保存时
						onSave: async (newConfig) => {
							let { success } = await props.editAndSaveFn({
								newConfig,
                            });
							if (success) {
								setDataSource([]);
								setEditableRowKeys([]);
							}
						},
						actionRender: (row, config) => [
							<a
								key='save'
								onClick={async () => {
									const values = await config?.form?.validateFields();
									setLoading(true);
									await config?.onSave?.({ ...values });
									setLoading(false);
								}}>
								保存
							</a>,
							<a
								key='save'
								onClick={async () => {
									await config?.cancelEditable?.(config.recordKey);
								}}>
								取消
							</a>,
						],
					}}
				/>
			</Spin>
		</>
	);
};
