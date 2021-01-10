import React from 'react';
import { Modal } from 'antd';

const CreateForm = (props) => {
	const { modalVisible, onCancel } = props;
	return (
		<Modal
			destroyOnClose
			title='新增'
			// width={1000}
			visible={modalVisible}
			onCancel={() => onCancel()}
			footer={null}>
			<div style={{ overflow: 'hidden' }}>
				<span
					style={{
						float: 'right',
						marginBottom: '15px',
						padding: '2px 10px',
						color: 'white',
						backgroundColor: '#1890ff',
					}}>
					文件导入
				</span>
			</div>
			{props.children}
		</Modal>
	);
};

export default CreateForm;
