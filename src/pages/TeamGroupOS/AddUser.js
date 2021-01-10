import {Component} from 'react'
import {Button, Card, Form, Input,Row,Col,
    Select,Modal,Table} from 'antd'
import {history} from "umi"
import {connect} from "dva"

const namespace="UserList"
const mapStateToProps = (state) => {
    let newUserList=state[namespace].newUserList;
    let groupList=state[namespace].groupList;
    return {
        newUserList,
        groupList
    }
}
const mapDispatchToprops = (dispatch) => {
    return {
        getNewUserList: () => {
            dispatch({
                type: `${namespace}/getNewUserList`,
            })
        },
        getGroupList: () => {
            dispatch({
                type: `${namespace}/getGroupList`,
            })
        }
    }
}
class AddUser extends Component{
    formRef = React.createRef();
    constructor(props){
        super(props);
        this.submit=this.submit.bind(this);
        this.onChange=this.onChange.bind(this);
        this.state={
            modalIsShow:false,
            newUser:{
                name:'',
                id:'',
                group:""
            }
        }
    }
    componentDidMount(){
        this.props.getNewUserList()
        this.props.getGroupList()
    }
    submit(){
        this.setState({
            newUser:{
                name:this.state.newUser.name.replace(/(^\s*)|(\s*$)/g, ""),
                id:this.state.newUser.id.replace(/(^\s*)|(\s*$)/g, ""),
                group:this.state.newUser.group.replace(/(^\s*)|(\s*$)/g, ""),
            }
        },()=>{
            for(let field in this.state.newUser){
                if(this.state.newUser[field]==''){
                    alert("信息未填写完整");
                    return;
                }
            }
            new Promise((resolve,reject)=>{
                let xhr=new XMLHttpRequest();
                xhr.open("POST","/addNewUser")
                xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=UTF-8");
                let newUser=JSON.stringify(this.state.newUser);
                xhr.send("user="+newUser);
                xhr.onreadystatechange=()=>{
                    if (xhr.readyState==4){
                        if(xhr.status==200){
                            let msg=xhr.responseText;
                            resolve(msg);
                        }else{
                            reject();
                        }
                    }
                };
            }).then(value=>{
                alert(value)
                history.push("/TeamGroupOS/UserList")
            },reason=>{
                alert("新增失败")
            })
        })
    }
    onChange(value){
        let name=this.formRef.current.getFieldValue("name");
        let id=this.formRef.current.getFieldValue("id");
        let group=this.formRef.current.getFieldValue("group");
        if(!name){
            name=""
        }
        if(!id){
            id=""
        }
        if(!group){
            group=""
        }
        this.setState({
            newUser:{
                id:id,
                name:name,
                group:group
            }
        },()=>{
            if(this.formRef.current){
                this.formRef.current.setFieldsValue({
                    id: this.state.newUser.id,
                    name: this.state.newUser.name,
                    group: this.state.newUser.group,
                });
            }
        })
    }
    render(){
        let form=
            <Form style={{width:'400px',margin:"0 auto",marginTop:"10px"}}
            ref={this.formRef}>
                <Form.Item label={"姓名"}
                name="name"
                required={true}>
                    <Input onChange={this.onChange}/>
                </Form.Item>
                <Form.Item label={"工号"}
                name="id"
                required={true}>
                    <Input onChange={this.onChange}/>
                </Form.Item>
                <Form.Item label={"组别"}
                name="group"
                required={true}>
                    <Select onChange={this.onChange}>
                        {(()=>{
                            let options=[]
                            if(this.props.groupList.length!=0){
                                this.props.groupList.map((group)=>{
                                    group.team.map((team,index)=>{
                                        options.push(
                                            <Select.Option value={group.id+"-"+(index+1)}
                                                key={group.id+"-"+(index+1)}>
                                                {group.name+team}
                                            </Select.Option>
                                        )
                                    })
                                    
                                })
                            }
                            return options
                        })()}
                    </Select>
                </Form.Item>
                <Row justify="space-around">
                    <Col>
                        <Button style={{marginRight:'10px'}} onClick={this.submit}>确定</Button>
                        <Button style={{marginLeft:'10px'}} onClick={()=>{
                            history.push("/TeamGroupOS/UserList");
                        }}>取消</Button>
                    </Col>
                </Row>
            </Form>
        return(
            <Card style={{minWidth:'600px'}}>
                <Row>
                    <Col span={"1"} offset={"20"}>
                        <Button onClick={()=>{
                            this.props.getNewUserList()
                            this.setState({
                                modalIsShow:true
                            })
                        }}>从表格导入</Button>
                        <Modal visible={this.state.modalIsShow}
                        footer={
                            <Button onClick={()=>{
                                this.setState({modalIsShow:false})
                            }}>确定</Button>
                        }
                        onCancel={()=>{
                            this.setState({modalIsShow:false})
                        }}>
                            <Table
                            columns={[
                                {
                                    title:"工号",
                                    dataIndex:'id',
                                    align:'center'
                                },
                                {
                                    title:"姓名",
                                    dataIndex:'name',
                                    align:'center'
                                },
                                {
                                    title:"组别",
                                    dataIndex:'group',
                                    align:'center'
                                }
                            ]} 
                            dataSource={this.props.newUserList}
                            onRow={(record)=>{
                                return {
                                    onClick:(e)=>{
                                        this.setState({
                                            newUser:{
                                                id: record.id,
                                                name: record.name,
                                                group: record.group,
                                            },
                                            selectedRowKeys:[record.key]
                                        },()=>{
                                            if(this.formRef.current){
                                                this.formRef.current.setFieldsValue({
                                                    id: this.state.newUser.id,
                                                    name: this.state.newUser.name,
                                                    group: this.state.newUser.group,
                                                });
                                            }
                                        })
                                    }
                                }
                            }}
                            rowSelection={{
                                type:"radio",
                                selectedRowKeys:this.state.selectedRowKeys,
                                onChange:(selectedRowKeys, selectedRows)=>{
                                    this.setState({
                                        newUser:{
                                            name:selectedRows[0].name,
                                            id:selectedRows[0].id,
                                            group:selectedRows[0].group
                                        },
                                        selectedRowKeys:selectedRowKeys
                                    },()=>{
                                        if(this.formRef.current){
                                            this.formRef.current.setFieldsValue({
                                                id: this.state.newUser.id,
                                                name: this.state.newUser.name,
                                                group: this.state.newUser.group,
                                            });
                                        }
                                    })
                                }
                            }}></Table>
                        </Modal>
                    </Col>
                </Row>
                {form}
            </Card>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToprops)(AddUser)