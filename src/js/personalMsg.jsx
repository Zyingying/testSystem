"use strict";
const React = require("react");
const Nav = require("../module/nav");
import {Form, Input, Select, Button, DatePicker,Radio, notification} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const connectToStores = require("alt-utils/lib/connectToStores");
const PerMsgAction = require("../action/perMsgAction");
const PerMsgStore = require("../store/perMsgStore");
const LoginAction = require('../action/loginAction');
const LoginStore = require('../store/loginStore');

class personMsg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name:undefined,
      gender:undefined,
      tel:undefined,
      birth:undefined,
      school:undefined,
      education:undefined
    }
    LoginAction.isLogin();
    PerMsgAction.getMsg();
  }

  static getStores() {
    return [PerMsgStore,LoginStore];
  }

  static getPropsFromStores() {
    return {
      ...PerMsgStore.getState(),
      ...LoginStore.getState()
    }
  }

  componentDidMount(){
    // PerMsgStore.listen(this.getUserMsg())
  }

  // getUserMsg(){
  //   this.listen = ()=>{
  //
  //   }
  // }

  handleSubmit() {

  }

  openNotification = () => {
    notification.open({
      message: '您还未登陆',
      description: '即将跳转到登陆页登陆',
      duration: 2,
    });
  };

  render() {

    let {isLogin,history} = this.props;
    if(!isLogin){
      return null;
    }
    if(isLogin.type!=1){
      this.openNotification();
      setTimeout(function(){history.pushState(null,'/login');},2000)
      return null;
    }

    let {user,type} = isLogin;

    return <div className="f-page personMsg" ref="personalMsg">
      <div className="w-categories">
        <Nav/>
      </div>

      <Form onSubmit={this.handleSubmit}
            className="personMsg-Form"
            layout="inline">
        <FormItem label="账号邮箱"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}
                  required="true">
          <Input value={user.email} disabled="true"/>
        </FormItem>
        <FormItem label="用户名"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}
                  required="true">
          <Input value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}}/>
        </FormItem>
        <FormItem label="性别"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <RadioGroup onChange={(e)=>{this.setState({gender: e.target.value})}} value={this.state.gender}>
            <Radio value={0}>保密</Radio>
            <Radio value={1}>男</Radio>
            <Radio value={2}>女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="绑定手机"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <Input value={this.state.tel} onChange={(e)=>{this.setState({tel: e.target.value})}}/>
        </FormItem>
        <FormItem label="生日"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <DatePicker value={this.state.birth} onChange={(date, dateString)=>{this.setState({birth: date})}}/>
        </FormItem>

        <FormItem label="学校"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <Input value={this.state.school} onChange={(e)=>{this.setState({school: e.target.value})}}/>
        </FormItem>
        <FormItem label="学历"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <Select onChange={(value)=>{this.setState({education:value})}} value={this.state.education} >
            <Option value="中专">中专</Option>
            <Option value="大专">大专</Option>
            <Option value="本科">本科</Option>
            <Option value="硕士">硕士</Option>
            <Option value="博士">博士</Option>
          </Select>
        </FormItem>
        <FormItem label="简介"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <Input type="textarea" rows={4} />
        </FormItem>

        <FormItem labelCol={{span: 5}}
                  wrapperCol={{span: 12}} className="submit-btn">
          <Button type="primary"
                  htmlType="submit"
                  className="change-sure">确认修改</Button>
        </FormItem>

      </Form>
    </div>
  }
}

module.exports = connectToStores(personMsg);