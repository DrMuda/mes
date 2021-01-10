import React, { Component } from 'react';
import detailCSS from './Detail.less';
import { Button, Image, Form, Input, Select } from 'antd';
import { queryRule } from './service';
import EquipmentDetail from './components/EquipmentDetail';
import UploadFile from './components/UploadFile';
import Charts from './components/Charts';
import EditForm from './components/EditForm';

const StatusMap = {
	0: {
		text: '未工作',
		color: 'gray',
	},
	1: {
		text: '工作中',
		color: 'green',
	},
	2: {
		text: '故障中',
		color: 'red',
	},
};

export class detail extends Component {
	state = {
		equipmentDetail: {},
		stateText: '',
		stateColor: '',
		chart1Conf: null,
		chart2Conf: null,
		modalVisible: false,
	};

	constructor(props) {
		super(props);
		this.setAvatar = this.setAvatar.bind(this);
		this.editDetail = this.editDetail.bind(this);
		this.handleCancel = this.handleCancel.bind(this);
		this.openModal = this.openModal.bind(this);
	}

	componentDidMount() {
		// 获取产品信息
		queryRule({
			filter: {
				key: this.props.match.params.id,
			},
			sorter: {},
		}).then((res) => {
			if (res.data.length > 0) {
				let data = res.data[0];
				let code = data.status;
				let stateText = StatusMap[code].text;
				let stateColor = StatusMap[code].color;
				this.setState({
					equipmentDetail: res.data[0],
					stateText,
					stateColor,
					chart1Conf: res.chart1,
					chart2Conf: res.chart2,
				});
			}
		});
	}

	setAvatar(imgPath) {
		let data = this.state.equipmentDetail;
		data.avatar = imgPath;
		this.setState({
			equipmentDetail: data,
		});
	}

	openModal() {
		this.setState({
			modalVisible: true,
		});
	}

	editDetail() {}

	handleCancel() {
		this.setState({
			modalVisible: false,
		});
	}

	onFormLayoutChange(obj) {
		console.log(obj);
	}

	render() {

		let initValues = {...this.state.equipmentDetail};

		return (
			<>
				{/* 头部 */}
				<div className={detailCSS['head-bar']}>
					<h2>XXX设备信息</h2>
					<Button type='primary' size='middle' onClick={this.openModal}>
						编辑
					</Button>
				</div>
				{/* 主体区域 */}
				<div className={detailCSS['detail-main']}>
					<div className={detailCSS['left-area']}>
						<div className={detailCSS['upload-area']}>
							{/* 图片展示区域 */}
							<div className={detailCSS['upload-form']}>
								{/* { */}
								{/* // !this.state.equipmentDetail.avatar ? */}
								<div className={detailCSS['upload']}>
									<UploadFile setAvatarFn={this.setAvatar} />
								</div>
								<Image
									style={{
										margin: '0 auto',
										borderRadius: '5px',
										boxShadow: '0px 0px 10px rgba(0,0,0,.4)',
										overflow: 'hidden',
									}}
									width={300}
									height='200px'
									preview={false}
									src={this.state.equipmentDetail.avatar}
								/>
								{/* // } */}
							</div>
							<div className={detailCSS['state-info']}>
								<p>当前订单：{this.state.equipmentDetail.currentOrderNo}</p>
								<p>
									当前状态：
									<span style={{ color: `${this.state.stateColor}` }}>
										{this.state.stateText}
									</span>
								</p>
							</div>
						</div>
						<div className={detailCSS['chart-area']}>
							{/* 图表1 */}
							{this.state.chart1Conf && <Charts {...this.state.chart1Conf} />}
						</div>
					</div>
					<div className={detailCSS['right-area']}>
						<div className={detailCSS['info-area']}>
							{/* 展示设备的详细信息 */}
							<EquipmentDetail data={this.state.equipmentDetail} />
						</div>
						<div className={detailCSS['chart-area']}>
							{/* 图表2 */}
							{this.state.chart2Conf && <Charts {...this.state.chart2Conf} />}
						</div>
					</div>
				</div>

				{/* 编辑框 */}
				<EditForm modalVisible={this.state.modalVisible} onCancel={this.handleCancel}>
					<Form
						labelCol={{ span: 6 }}
						wrapperCol={{ span: 14 }}
						layout='horizontal'
						onValuesChange={this.onFormLayoutChange}
						initialValues={initValues}
						>
						<Form.Item label='设备名称' name='equipmentName'>
							<Input />
						</Form.Item>

						<Form.Item label='隶属工序' name='belong'>
							<Select>
								<Select.Option value='0' key='梳棉工序'>梳棉工序</Select.Option>
								<Select.Option value='1' key='并条工序'>并条工序</Select.Option>
								<Select.Option value='2' key='粗纱工序'>粗纱工序</Select.Option>
								<Select.Option value='3' key='细纱工序'>细纱工序</Select.Option>
								<Select.Option value='4' key='络筒工序'>络筒工序</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item label='所在位置' name='currentAddress'>
							<Input />
						</Form.Item>

						<Form.Item label='生产厂商' name='manufacturer'>
							<Select>
								<Select.Option value='demo' key='cs1'>
									生产厂商1
								</Select.Option>
							</Select>
						</Form.Item>

						<Form.Item label='设备型号' name='equipmentModel'>
							<Select>
								<Select.Option value='demo' key='xh1'>
									设备型号1
								</Select.Option>
							</Select>
						</Form.Item>

								<Form.Item label='设备产能' name='capacity'>
									<div style={{ display: 'flex', alignItems:'baseline'}} className='capacity'>
										<Input style={{ marginRight: 15 }} placeholder='请输入数字'/>

										<Form.Item name='capacityUnit'>
											<Select>
												<Select.Option value='demo' key='unit1'>件</Select.Option>
												<Select.Option value='demo' key='unit2'>斤</Select.Option>
												<Select.Option value='demo' key='unit3'>吨</Select.Option>
											</Select>
										</Form.Item>
									</div>
								</Form.Item>


						<Form.Item label='设备生产时间' name='productionTime'>
							<Input />
						</Form.Item>

						<Form.Item label='投入使用时间' name='usageTime'>
							<Input />
						</Form.Item>

						<Form.Item label='经销商' name='distributor'>
							<Select>
								<Select.Option value='demo' key='jxs1'>
									经销商1
								</Select.Option>
							</Select>
						</Form.Item>

						<div
							style={{
								display: 'flex',
								justifyContent: 'space-around',
								alignItems: 'center',
								width: '300px',
								margin: '0 auto',
							}}>
							<Button type='primary' htmlType='submit' onClick={this.handleCancel}>
								确定
							</Button>
							<Button htmlType='button' onClick={this.handleCancel}>
								取消
							</Button>
						</div>
					</Form>
				</EditForm>
			</>
		);
	}
}

export default detail;
