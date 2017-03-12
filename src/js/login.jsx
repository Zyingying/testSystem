"use strict"
const React = require("react");
const {Tabs}  = require('antd');
const TabPane = Tabs.TabPane;
const {Form, Input, Button, Checkbox, Row, Col,Radio ,message}  = require('antd');
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const LoginAction = require('../action/loginAction');
const LoginStore = require('../store/loginStore');
const connectToStores = require("alt-utils/lib/connectToStores");


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logEmail: undefined,
            loginPsd: undefined,
            regEmail: undefined,
            regPsd: undefined,
            psdAgain: undefined,
            agreement: undefined,

            isLogMail: undefined,
            isLogPsd: undefined,
            isRegMail: undefined,
            isRegPsd: undefined,
            isPsdAgain:undefined
        };

    }
    componentWillMount(){
        LoginStore.listen(this.getListener());
    }

    getListener(){
        let history = this.props.history;
        return this.listener = (store) =>{
            let result = store.result;
            if(result.type == 1){
                message.success(result.msg + ',即将跳往首页',2);
                setTimeout(function () {
                    history.pushState(null,'/')
                },3000)
            }

        }
    }

    componentWillUnmount(){
        LoginStore.unlisten(this.listener);
    }

    static getStores() {
        return [LoginStore];
    }

    static getPropsFromStores() {
        return LoginStore.getState();
    }


    loginSubmit() {
        let {logEmail, loginPsd} = this.state;
        LoginAction.login(logEmail, loginPsd);
    }

    resSubmit() {
        let {regEmail, regPsd} = this.state;
        LoginAction.register(regEmail, regPsd);
    }

    setValue(key, value) {
        this.state[key] = value;
        this.setState(this.state);
    }

    testReg(key) {
        let value = this.state[key];
        if (key == "logEmail" || key == 'regEmail'){


            if (/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value)) {
                if (key == 'logEmail') {
                    this.setState({isLogMail:true});
                }else{
                    this.setState({isRegMail:true});
                }
            }else{
                if (key == 'logEmail') {
                    this.setState({isLogMail:false});
                }else{
                    this.setState({isRegMail:false});
                }
            }
        }else if(key == 'loginPsd' || key == 'regPsd'){
            if(value.length <= 20 && value.length >= 6){
                key == 'loginPsd'?
                    this.setState({isLogPsd:true})
                    :
                    this.setState({isRegPsd:true});
            }else{
                key == 'loginPsd'?
                    this.setState({isLogPsd:false})
                    :
                    this.setState({isRegPsd:false});
            }
        }else {
            if((value.length <= 20 && value.length >= 6) && value === this.state.regPsd){
                this.setState({isPsdAgain:true});
            }else{
                this.setState({isPsdAgain:false});

            }
        }
    }


    render() {
        const state = this.state;
        return <div className="login">
            <Tabs type="card">
                <TabPane tab="登录" key="1" className="loginTitle">
                    <Form horizontal>
                        <FormItem
                            label="电子邮箱："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required
                            hasFeedback
                            validateStatus={state.isLogMail==undefined ?"":(state.isLogMail?'success':'error')}
                            >
                            <Input type="text" id="logEmail"
                                   name="logEmail"
                                   placeholder="请输入邮箱"
                                   value={state.logEmail}
                                   onChange={(e)=> {
                                       this.setValue('logEmail', e.target.value)
                                   }}
                                   onBlur={()=> {
                                       this.testReg('logEmail')
                                   }}/>
                        </FormItem>
                        <FormItem
                            id="loginPsd"
                            label="密码："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required
                            hasFeedback
                            validateStatus={state.isLogPsd==undefined ?"":(state.isLogPsd?'success':'error')}
                        >
                            <Input type="password" id="loginPsd"
                                   name="loginPsd"
                                   placeholder="请输入6-20位密码"
                                   value={state.loginPsd}
                                   onChange={(e)=> {
                                       this.setValue('loginPsd', e.target.value)
                                   }}
                                   onBlur={()=> {
                                       this.testReg('loginPsd')
                                   }}/>
                        </FormItem>
                        <FormItem
                            wrapperCol={{span: 14, offset: 6}}>
                            <label>
                                <Checkbox name="agreement" value={this.state.agreement}
                                          onChange={this.setValue.bind(this, 'agreement')}/> 记住登录
                            </label>
                        </FormItem>
                        <Row>
                            <Col span="14" offset="6">
                                <Button type="primary"
                                        htmlType="submit"
                                        span="14"
                                        className="ant-btn-submit"
                                        disable={state.isLogMail && state.isLogPsd ? 'false':'true'}
                                        onClick={()=> {
                                            this.loginSubmit()
                                        }}>
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
                            required
                            hasFeedback
                            validateStatus={state.isRegMail==undefined ? '': (state.isRegMail?"success": "error")}
                        >
                            <Input type="text"
                                   id="regEmail"
                                   name="regEmail"
                                   placeholder="请输入邮箱"
                                   value={state.regEmail}
                                   onChange={(e)=> {
                                       this.setValue('regEmail', e.target.value)
                                   }}
                                   onBlur={()=> {
                                       this.testReg('regEmail')
                                   }}
                            />
                        </FormItem>
                        <FormItem
                            id="regPsd"
                            label="密码："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required
                            hasFeedback
                            validateStatus={state.isRegPsd==undefined ?'':(state.isRegPsd?'success':'error')}
                        >
                            <Input type="password"
                                   id="regPsd"
                                   name="regPsd"
                                   placeholder="请输入密码"
                                   value={state.regPsd}
                                   onChange={(e)=> {
                                       this.setValue('regPsd', e.target.value)
                                   }}
                                   onBlur={()=> {
                                       this.testReg('regPsd')
                                   }}
                            />
                        </FormItem>
                        <FormItem
                            id="psdAgain"
                            label="重新密码："
                            labelCol={{span: 6}}
                            wrapperCol={{span: 14}}
                            required
                            hasFeedback
                            validateStatus={state.isPsdAgain==undefined ?'':(state.isPsdAgain?'success':'error')}
                        >
                            <Input type="password"
                                   id="psdAgain"
                                   name="psdAgain"
                                   placeholder="请重复输入密码"
                                   value={this.state.psdAgain}
                                   onChange={(e)=> {
                                        this.setValue('psdAgain', e.target.value)
                                   }}
                                   onBlur={()=> {
                                       this.testReg('psdAgain')
                                   }}
                            />
                        </FormItem>
                        <Row>
                            <Col span="14" offset="6">
                                <Button type="primary"
                                        htmlType="submit"
                                        className="ant-btn-submit"
                                        disabled={state.isRegMail && state.isRegPsd && state.isPsdAgain ? false: true}
                                        onClick={()=> {
                                            this.resSubmit()
                                        }}>
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
}
;

module.exports = connectToStores(Login);