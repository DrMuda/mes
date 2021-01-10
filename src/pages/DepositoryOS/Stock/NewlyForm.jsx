import React, { Component } from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Select } from 'antd';
import { history } from 'umi';
import './css/NewlyForm.less';

export default class NewlyForm extends Component {
	render() {
		return (
			<div className='newly-page'>
				<Form className='newly-form-box'>
					<Row>
						<Col xs={{ span: 5 }} lg={{ span: 6, offset: 1 }}>
							<Form.Item label='盘点单号'>
								<Input />
							</Form.Item>
						</Col>
						<Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
							<Form.Item label='盘点日期'>
								<DatePicker className='date-picker' />
							</Form.Item>
						</Col>
					</Row>
					<Row>
						<Col xs={{ span: 5 }} lg={{ span: 6, offset: 1 }}>
							<Form.Item label='盘点仓库'>
								<Select>
									<Select.Option value='demo1'>Demo1</Select.Option>
									<Select.Option value='demo2'>Demo2</Select.Option>
									<Select.Option value='demo3'>Demo3</Select.Option>
									<Select.Option value='demo4'>Demo4</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
							<Form.Item label='盘点库位'>
								<Select>
									<Select.Option value='demo1'>Demo1</Select.Option>
									<Select.Option value='demo2'>Demo2</Select.Option>
									<Select.Option value='demo3'>Demo3</Select.Option>
									<Select.Option value='demo4'>Demo4</Select.Option>
								</Select>
							</Form.Item>
						</Col>
					</Row>

					<Row style={{ marginTop: '50px' }}>
						<Col xs={{ span: 5 }} lg={{ span: 6, offset: 1 }}>
							<Form.Item style={{ textAlign: 'right' }}>
								<Button type='primary' htmlType='submit'>
									确定
								</Button>
							</Form.Item>
						</Col>
						<Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}>
							<Form.Item>
								<Button
									htmlType='button'
									onClick={() => {
										history.goBack();
									}}>
									取消
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		);
	}
}
