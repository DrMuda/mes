import { Form, Row, Col, Input, Select } from 'antd';

const AddForm = (props) => {
	return (
		<Form form={props.actionRef} name='advanced_search' className='ant-advanced-search-form'>
			<Row gutter={24}>
				<Col span={11}>
					<Form.Item name={`maintenanceNumber`} label={`维护单号：`}>
						<Input placeholder='系统自动生成' />
					</Form.Item>
				</Col>
				<Col span={11}>
					<Form.Item
						name={`maintenanceType`}
						label={`维护类型：`}
						rules={[
							{
								required: true,
								message: '内容不能为空',
							},
						]}>
						<Select placeholder='请选择维护类型'>
							<Select.Option value='0'>预防维护</Select.Option>
							<Select.Option value='1'>定期维护</Select.Option>
							<Select.Option value='2'>故障维护</Select.Option>
						</Select>
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={11}>
					<Form.Item
						name={`equipmentNumber`}
						label={`设备编号：`}
						rules={[
							{
								required: true,
								message: '内容不能为空',
							},
						]}>
						<Input placeholder='请输入设备编号' />
					</Form.Item>
				</Col>
				<Col span={11}>
					<Form.Item
						name={`plannedMaintenanceTime`}
						label={`计划维护时间：`}
						rules={[
							{
								required: true,
								message: '内容不能为空',
							},
						]}>
						<Input placeholder='请悬着计划维护时间' />
					</Form.Item>
				</Col>
			</Row>
			<Row gutter={24}>
				<Col span={22}>
					<Form.Item
						name={`content`}
						label={`维护内容：`}
						rules={[
							{
								required: true,
								message: 'Input something!',
							},
						]}>
						<Input.TextArea placeholder='请输入维护内容' />
					</Form.Item>
				</Col>
			</Row>
		</Form>
	);
};

export default AddForm;
