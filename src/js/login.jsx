"use strict"
const React = require("react");
const { Tabs }  = require('antd');
const TabPane = Tabs.TabPane;
const {Form, Input, Button, Checkbox, Row, Col}  = require('antd');
const FormItem = Form.Item;
const LoginAction = require('../action/loginAction');
const LoginStore = require('../store/loginStore');
const connectToStores = require("alt-utils/lib/connectToStores");


class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            email: undefined,
            loginPsd: undefined,
            regPsd:undefined,
            psdAgain:undefined,
            agreement: undefined
        };
    }

    static getStores() {
        return [LoginStore];
    }

    static getPropsFromStores() {
        return LoginStore.getState();
    }


    loginSubmit() {
        let {email,loginPsd} = this.state;
        if(/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)){

        }
        LoginAction.login(email,loginPsd);
    }

    resSubmit(){
        let {email,regPsd} = this.state;
        LoginAction.register(email,regPsd);
    }

    setValue(key,value){
        this.state[key] = value,
        this.setState(this.state);
    }


    render() {
        const state = this.state;
        return <div className="login">
                <Tabs type="card" >
                    <TabPane tab="登录" key="1" className="loginTitle">
                        <Form horizontal >
                            <FormItem
                                label="电子邮箱："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 14}}
                                required>
                                <Input type="text" id="email"
                                       name="email"
                                       placeholder="请输入邮箱"
                                       value={state.email} onChange={(e)=>{this.setValue('email',e.target.value)}} />
                            </FormItem>
                            <FormItem
                                id="loginPsd"
                                label="密码："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 14}}
                                required>
                                <Input type="password" id="loginPsd"
                                       name="loginPsd"
                                       placeholder="请输入密码"
                                       value={state.loginPsd}
                                       onChange={(e)=>{this.setValue( 'loginPsd',e.target.value)}} />
                            </FormItem>
                            <FormItem
                                wrapperCol={{span: 14, offset: 6}} >
                                <label>
                                    <Checkbox name="agreement" value={this.state.agreement} onChange={this.setValue.bind(this, 'agreement')} /> 记住登录
                                </label>
                            </FormItem>
                            <Row>
                                <Col span="14" offset="6">
                                    <Button type="primary"
                                            htmlType="submit"
                                            span="14"
                                            className="ant-btn-submit"
                                            onClick={()=>{this.loginSubmit()}}>
                                        确定登陆
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>

                    <TabPane tab="注册" key="2">
                        <Form horizontal>
                            <FormItem
                                label="电子邮箱："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 14}}
                                required>
                                <Input type="text" id="userid" name="userid" placeholder="请输入邮箱" value={state.userid} onChange={(e)=>{this.setValue('userid',e.target.value)}} />
                            </FormItem>
                            <FormItem
                                id="regPsd"
                                label="密码："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 14}}
                                required>
                                <Input type="password"
                                       id="regPsd"
                                       name="regPsd"
                                       placeholder="请输入密码"
                                       value={state.regPsd}
                                       onChange={(e)=>{this.setValue('regPsd',e.target.value)}}  />
                            </FormItem>
                            <FormItem
                                id="password"
                                label="重新密码："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 14}}
                                required>
                                <Input type="password" id="psdAgain" name="psdAgain" placeholder="请重复输入密码" value={this.state.psdAgain} onChange={(e)=>{this.setValue('psdAgain',e.target.value)}}/>
                            </FormItem>
                            <Row>
                                <Col span="14" offset="6">
                                    <Button type="primary"
                                            htmlType="submit"
                                            className="ant-btn-submit"
                                            onClick={()=>{this.resSubmit()}}>
                                        确定注册
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>


        ;
    }
};

module.exports = connectToStores(Login);