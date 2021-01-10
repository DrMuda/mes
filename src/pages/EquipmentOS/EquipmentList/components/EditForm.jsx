import React, { Component } from 'react';
import { Modal } from 'antd';

class CreateForm extends Component {
	// { modalVisible = true, onCancel } = props;

	// state

	render() {
		return (
			<Modal
				destroyOnClose
				title='编辑'
				visible={this.props.modalVisible}
				onCancel={() => this.props.onCancel()}
				footer={null}>
				{this.props.children}
			</Modal>
		);
	}
}

export default CreateForm;
