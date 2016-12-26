"use strict"
const React = require("react");
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
import {Form, Input, Button, Checkbox, Radio, Row, Col, message} from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;


const Login = React.createClass({
    mixins: [Form.ValueMixin],

    getInitialState() {
        return {
            formData: {
                email: undefined,
                password: undefined,
                psdAgain:undefined,
                agreement: undefined,
            }
        };
    },

    handleSubmit(e) {
        e.preventDefault();
        message.success('收到表单值~~~ ：' + JSON.stringify(this.state.formData, function(k, v) {
                if (typeof v === 'undefined') {
                    return '';
                }
                return v;
            }));
    },

    callback(key){
        console.log(key);
    },

    setValue(key,value){
        this.state[key] = value,
        this.setState(this.state);
    },


    render() {
        const formData = this.state.formData;
        return (
            <div className="login">
                <Tabs type="card" >
                    <TabPane tab="登录" key="1" className="loginTitle">
                        <Form horizontal onSubmit={this.handleSubmit}>
                            <FormItem
                                label="电子邮箱："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 14}}
                                required>
                                <Input type="text" id="email"
                                       name="email"
                                       placeholder="请输入邮箱"
                                       value={this.state.email} onChange={(e)=>{this.setValue('email',e.target.value)}} />
                            </FormItem>
                            <FormItem
                                id="password"
                                label="密码："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 14}}
                                required>
                                <Input type="password" id="password"
                                       name="password"
                                       placeholder="请输入密码"
                                       value={this.state.password}
                                       onChange={(e)=>{this.setValue( 'password',e.target.value)}} />
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
                                            className="ant-btn-submit">
                                        确定
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>

                    <TabPane tab="注册" key="2">
                        <Form horizontal onSubmit={this.handleSubmit}>
                            <FormItem
                                label="电子邮箱："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 14}}
                                required>
                                <Input type="text" id="userid" name="userid" placeholder="请输入邮箱" value={this.state.userid} onChange={(e)=>{this.setValue('userid',e.target.value)}} />
                            </FormItem>
                            <FormItem
                                id="password"
                                label="密码："
                                labelCol={{span: 6}}
                                wrapperCol={{span: 14}}
                                required>
                                <Input type="password"
                                       id="password"
                                       name="password"
                                       placeholder="请输入密码"
                                       value={this.state.password}
                                       onChange={(e)=>{this.setValue('password',e.target.value)}}  />
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
                                            className="ant-btn-submit">
                                        确定
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </TabPane>
                </Tabs>
            </div>


        );
    }
});

module.exports = Login;