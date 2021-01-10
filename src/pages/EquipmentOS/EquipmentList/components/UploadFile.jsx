import React, { Component } from 'react';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

// import React, { Component } from 'react'

class UploadFile extends Component {
	state = {
		uploadConfig: {
			name: 'file',
			action: 'http://127.0.0.1:3000/upload',
			onChange(info) {
				const { status } = info.file;
				if (status !== 'uploading') {
					// console.log(info.file, info.fileList);
					let path = info.file.response.path;
					this.props.setAvatarFn(path);
				}
				if (status === 'done') {
					message.success(`${info.file.name} file uploaded successfully.`);
				} else if (status === 'error') {
					message.error(`${info.file.name} file upload failed.`);
				}
			},
		},
	};

	render() {
		return (
			<Dragger
				name={this.state.uploadConfig.name}
				action={this.state.uploadConfig.action}
				onChange={this.state.uploadConfig.onChange.bind(this)}>
				<p className='ant-upload-drag-icon'>
					<InboxOutlined />
				</p>
				<p className='ant-upload-text'>点击或拖动文件到此区域进行上传</p>
				<p className='ant-upload-hint'>
					支持单次或批量上传，严格禁止上传公司数据或其他带文件
				</p>
			</Dragger>
		);
	}
}

export default UploadFile;
