"use strict"
const React = require("react");
const Nav = require("../module/nav");
import {Form, Input, Button,message} from 'antd';
const FormItem = Form.Item;
const LoginAcion = require('../action/loginAction');
const LoginStore = require('../store/loginStore');

class ChangePsd extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      old_psd:'',
      new_psd:'',
      new_psd_again:''
    }

  }

  handleSubmit = (e) => {
    e.preventDefault();
    let {old_psd,new_psd,new_psd_again} = this.state;
    if(!old_psd || !new_psd || !new_psd_again ){
      message.error('三个输入框不能为空',3)
    }else if(new_psd != new_psd_again){
      message.error('两次密码输入不一致',3)
    }else if((old_psd.length < 6 && old_psd.length > 25)
            || (new_psd.length < 6 && new_psd.length > 25)
            || (new_psd_again.length < 6 && new_psd_again.length > 25)){
      message.error('密码长度应该在6~25个字符',3)
    }else{
      LoginAcion.changePsd(old_psd,new_psd);
    }
    console.log('click ', e);
  }

  render() {

    return <div className="f-page personMsg">
      <Nav />
      <Form onSubmit={this.handleSubmit}
            className="personMsg-Form"
            layout="inline">
        <FormItem label="旧密码"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}
                  required="true">
          <Input value={this.state.old_psd} onChange={(e)=>{this.setState({old_psd: e.target.value})}}/>
        </FormItem>
        <FormItem label="新密码"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}
                  required="true">
          <Input value={this.state.new_psd} onChange={(e)=>{this.setState({new_psd: e.target.value})}} placeholder="长度在6~25字符之间"/>
        </FormItem>
        <FormItem label="重复输入新密码"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <Input value={this.state.new_psd_again} onChange={(e)=>{this.setState({new_psd_again: e.target.value})}}/>
        </FormItem>
        <FormItem labelCol={{span: 5}}
                  wrapperCol={{span: 12}} className="submit-btn">
          <Button type="primary"
                  htmlType="submit"
                  className="change-sure" >确认修改</Button>
        </FormItem>

      </Form>
    </div>
  }
}
module.exports = ChangePsd;