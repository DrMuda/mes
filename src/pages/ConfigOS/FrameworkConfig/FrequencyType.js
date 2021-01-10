import { Component } from 'react';
import {
	Button, Card, Col, Input, Row,
	Table, Form, Modal, TimePicker
} from 'antd';
import { delFrequencyType, editFrequencyType } from '@/services/ConfigOS/configOS';
import { EditableProTable } from '@ant-design/pro-table';
import moment from 'moment'
import { connect } from 'dva'

const namespace = 'configOS_frameworkConfig_frequencyType';
const mapStateToProps = (state) => {
	let frequencyTypeList = state[namespace].frequencyTypeList;
	frequencyTypeList.map((frequencyType, index) => {
		frequencyType.key = index
	})
	return {
		frequencyTypeList,
	};
};
const mapDispatchToprops = (dispatch) => {
	return {
		getFrequencyTypeList: () => {
			dispatch({
				type: `${namespace}/getFrequencyTypeList`,
			});
		},
	};
};
const defaultEditing = {
	type: "",
	name: "",
	timeSlot: []
}
class FrequencyType extends Component {
	myFormRef = React.createRef()
	frequencyTypeColumns = [
		{
			title: "序号",
			dataIndex: "squenceNumber",
			key: "squenceNumber",
			width: 80,
			render: (text, record, index) => {
				return index + 1
			}
		},
		{
			title: "班次名称",
			dataIndex: "name",
			key: "name",
			width: "40%"
		},
		{
			title: "班次类型",
			dataIndex: "timeSlot",
			key: "timeSlot",
			width: "40%",
			render: (text, record) => {
				return record.timeSlotList.map((timeSlot, index) => {
					return (
						<Row justify="left"
							key={index}>
							<Col style={{ marginRight: "8px" }}>
								{timeSlot + "班"}
							</Col>
							<Col>
								{record.timeSlotByTime[index]}
							</Col>
						</Row>
					)
				})
			}
		},
		{
			title: "操作",
			dataIndex: "operation",
			key: "operation",
			width: 200,
			render: (text, record, rowIndex, action) => {
				return (
					<>
						<Button type="link"
							style={{ paddingLeft: 0 }}
							onClick={() => {
								this.edit(record)
							}}>
							编辑
					</Button>
						<Button type="link"
							style={{ paddingLeft: 0 }}
							onClick={() => {
								this.del(record)
							}}>
							删除
					</Button>
					</>
				)
			}
		},
	]
	timeSlotColumns = [
		{
			title: "班次类型",
			dataIndex: "timeSlot",
			key: "timeSlot",
			align: "center",
			render: (text, record, index) => {
				return (
					<Input value={record.timeSlot}
					onChange={(e) => {
						this.editOnChange(e.target.value, "timeSlot" + "-" + index)
					}}/>
				)
			}
		},
		{
			title: "开始时间",
			dataIndex: "startTime",
			key: "startTime",
			align: "center",
			render: (text, record, index) => {
				return (
					<TimePicker value={moment("2020/1/1 "+record.startTime,"YYYY/MM/DD hh:mm")}
						onChange={(time, timeStr) => {
							timeStr = timeStr.split(":")[0] + ":" + timeStr.split(":")[1]
							this.editOnChange(timeStr, "startTime" + "-" + index)
					}} />
				)
			}
		},
		{
			title: "结束时间",
			dataIndex: "endTime",
			key: "endTime",
			align: "center",
			render: (text, record, index) => {
				return (
						<TimePicker value={moment("2020/1/1 "+record.endTime,"YYYY/MM/DD hh:mm")}
								onChange={(time, timeStr) => {
								timeStr = timeStr.split(":")[0] + ":" + timeStr.split(":")[1]
								this.editOnChange(timeStr, "endTime" + "-" + index)
						}} />
				)
			}
		},
		{
			title: "操作",
			dataIndex: "operation",
			key: "operation",
			align: "center",
			render: (text, record, index) => {
				return <Button type="link"
					onClick={() => {
						let tempEdting = JSON.parse(JSON.stringify(this.state.editing))
						tempEdting.timeSlot.splice(index, 1)
						this.setState({
							editing: tempEdting
						})
					}}>
					删除
				</Button>
			}
		}
	]
	constructor(props) {
		super(props);
		this.edit = this.edit.bind(this)
		this.add = this.add.bind(this)
		this.del = this.del.bind(this)
		this.save = this.save.bind(this);
		this.state = {
			addModalIsShow: false,
			editModalIsShow: false,
			frequencyTypeList: [],
			editing: {
				type: "",
				name: "",
				timeSlot: []
			}
		}
		this.props.getFrequencyTypeList();
	}
	editOnChange(value, fields) {
		let field = fields.split("-")[0]
		let index = fields.split("-")[1]
		let newEditing = JSON.parse(JSON.stringify(this.state.editing))
		if (index) {
			index = parseInt(index)
			if (this.state.editing.timeSlot[index]) {
				newEditing.timeSlot[index][field] = value
			} else {
				newEditing.timeSlot[index] = {}
				newEditing.timeSlot[index][field] = value
			}
		} else {
			newEditing[field] = value
		}
		this.setState({
			editing: newEditing
		})
	}
	edit(record) {
		let newTimeSlot = []
		record.timeSlotList.map((timeSlot, index) => {
			let startTime = record.timeSlotByTime[index].split("-")[0]
			let endTime = record.timeSlotByTime[index].split("-")[1]
			newTimeSlot.push({
				timeSlot,
				startTime,
				endTime,
				key: index
			})
		})
		this.setState({
			editing: {
				type: record.type,
				name: record.name,
				timeSlot: newTimeSlot
			},
			editModalIsShow: true
		})
	}
	add() {
		this.setState({
			addModalIsShow: true,
			editing: defaultEditing
		})
	}
	del(record) {
		delFrequencyType({ type: record.type })
		this.props.getFrequencyTypeList()
		this.setState({
			editing: defaultEditing
		})
	}
	save() {
		let newFrequencyType = {
			type: this.state.editing.type,
			name: this.state.editing.name,
			timeSlotList: [],
			timeSlotByTime: [],
		}
		this.state.editing.timeSlot.map((timeSlot, index) => {
			newFrequencyType.timeSlotList.push(timeSlot.timeSlot)
			newFrequencyType.timeSlotByTime.push(timeSlot.startTime + "-" + timeSlot.endTime)
		})
		editFrequencyType({
			newFrequencyType
		});
		this.props.getFrequencyTypeList()
		this.setState({
			editModalIsShow: false,
			addModalIsShow: false,
			editing: defaultEditing
		})
	}
	static getDerivedStateFromProps(nextProps, preState) {
		if (nextProps.frequencyTypeList !== preState.frequencyTypeList) {
			return {
				frequencyTypeList: nextProps.frequencyTypeList
			}
		} else {
			return null
		}
	}
	render() {
		return (
			<Card>
				<Row justify="space-between" align="middle">
					<Col>
						<strong>班次模式</strong>
					</Col>
					<Col>
						<Button onClick={() => {
							this.add()
						}}>添加班次</Button>
					</Col>
				</Row>
				<Table columns={this.frequencyTypeColumns} dataSource={this.state.frequencyTypeList} />
				<Modal title="添加班次" visible={this.state.addModalIsShow}
					onCancel={() => {
						this.setState({
							addModalIsShow: false
						})
					}}
					okButtonProps={{ hidden: true }}
					cancelButtonProps={{ hidden: true }}>
					<Form ref={this.addFormRef}>
						<Form.Item label="班次名称"
							name="frequencyTypeName"
							rules={[
								{
									required: true,
									message: "此项为必填项"
								},
								() => ({
									validator(rule, value) {
										if (value.replace(/(^\s*)|(\s*$)/g, "") == "") {
											return Promise.reject("不能全为空格")
										} else {
											return Promise.resolve();
										}
									}
								})
							]}>
							<Input onChange={(e) => {
								this.editOnChange(e.target.value, "name")
							}} />
						</Form.Item>
						<Row justify="end" align="middle">
							<Col>
								<Button htmlType="submit" onClick={() => {
									this.save();
								}}>保存</Button>
								<Button onClick={() => {
									this.setState({
										addModalIsShow: false
									})
								}}>取消</Button>
							</Col>
						</Row>
					</Form>
				</Modal>
				<Modal visible={this.state.editModalIsShow}
					title="编辑"
					onCancel={() => {
						this.setState({
							editModalIsShow: false
						})
					}}
					okButtonProps={{ hidden: true }}
					cancelButtonProps={{ hidden: true }}>
					
					<Row justify="end" align="middle">
						<Col>
							<Button onClick={() => {
								let tempEditing=JSON.parse(JSON.stringify(this.state.editing));
								tempEditing.timeSlot.push({
									key:tempEditing.timeSlot.length+1,
									timeSlot:"新",
									startTime:"0:00",
									endTime:"8:00"
								})
								this.setState({
									editing:tempEditing
								})
							}}>添加</Button>
						</Col>
					</Row>
					<Table columns={this.timeSlotColumns}
						dataSource={this.state.editing.timeSlot}
					/>
					<Row justify="end" align="middle">
						<Col>
							<Button htmlType="submit" onClick={() => {
								this.save();
							}}>保存</Button>
						</Col>
					</Row>

				</Modal>
			</Card>
		)
	}
}
export default connect(mapStateToProps, mapDispatchToprops)(FrequencyType);
