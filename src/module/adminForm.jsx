"use strict"
const React = require("react");
import {Form, Input, Button, Checkbox, Icon, message} from 'antd';
const FormItem = Form.Item;
const CreateForm = Form.create;
const AdminAction = require('../action/adminAction');
const AdminStore = require('../store/adminStore');


class AdminForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            option: 2,
            level_one: '',
            level_two: '',
            test_name: '',
            test_time:' ',
            subject_name:' ',

        };
    }

    addOption(option) {
        if (option < 4 && option > 0) {
            this.setState({option: option + 1})
        } else {
            message.error('选项数量不符，超过4个选项')
        }
    }

    cutOption(option) {
        if (option > 2) {
            this.setState({option: option - 1})
        } else {
            message.error('选项数量不符，不能低于两个选项')
        }
    }

    setValue(key, value) {
        this.state[key] = value;
        this.setState(this.state);
    }


    render() {
        let items = [],
            {funPage, handleSubmit} = this.props;
        let state = this.state;
        let {option} = state;

        funPage = funPage - 0;
        console.log(funPage)
        let {getFieldDecorator} = this.props.form;
        return <Form>
            {
                (() => {
                    switch (funPage) {
                        case 4:
                            return <FormItem label="一级目录名称：" required>
                                <Input value={state.level_one}
                                       onChange={(e) => {
                                           this.setValue('level_one', e.target.value)
                                       }}/>
                            </FormItem>
                            break;
                        case 5:
                            return <div>
                                <FormItem label="所在的一级目录的名称：">
                                    <Input value={state.level_one}
                                           placeholder="一定是已存在的一级目录的值，错别，漏字不可识别"
                                           onChange={(e) => {
                                               this.setValue('level_one', e.target.value)
                                           }}/>
                                </FormItem>
                                <FormItem label="创建的二级目录名称：">
                                    <Input value={state.level_two}
                                           onChange={(e) => {
                                               this.setValue('level_two', e.target.value)
                                           }}/>

                                </FormItem>
                            </div>
                            break;
                        case 6:
                            return <div>
                                <FormItem label="试题名称：">
                                    <Input value={state.test_name}
                                           onChange={(e) => {
                                               this.setValue('test_name', e.target.value)
                                           }}/>
                                </FormItem>
                                <FormItem label="出题时间：">
                                    <Input value={state.test_time}
                                           onChange={(e) => {
                                               this.setValue('test_time', e.target.value)
                                           }}/>
                                </FormItem>
                                <FormItem label="所属二级类目：">
                                    <Input value={state.level_two}
                                           onChange={(e) => {
                                               this.setValue('level_two', e.target.value)
                                           }}/>
                                </FormItem>
                            </div>
                            break;
                        case 7:
                            let chooseNum = 1;
                            return <div>
                                <FormItem label="必须要是课程列表里面存在的试题：">
                                    <Input value={state.test_name}
                                           onChange={(e) => {
                                               this.setValue('test_name', e.target.value)
                                           }}/>
                                </FormItem>
                                <input type="text" placeholder="课程id"/>

                                <FormItem label="题目：">
                                    <Input value={state.subject_name}
                                           onChange={(e) => {
                                               this.setValue('subject_name', e.target.value)
                                           }}/>
                                </FormItem>
                                <FormItem >
                                    <h3>答案选项</h3>
                                    {(() => {
                                        if(option == 2){
                                            return <div>
                                                        <Input placeholder={"选项1"}
                                                               className="input-option"
                                                               value={state.option_one}
                                                               onChange={(e) => {
                                                                   this.setValue('option_one', e.target.value)
                                                               }}/>
                                                        <Input placeholder={"选项2"}
                                                               className="input-option"
                                                               value={state.option_two}
                                                               onChange={(e) => {
                                                                   this.setValue('option_two', e.target.value)
                                                               }}/>
                                                    </div>

                                        }else if(option == 3){
                                            return <div>
                                                <Input placeholder={"选项1"}
                                                       className="input-option"
                                                       value={state.option_one}
                                                       onChange={(e) => {
                                                           this.setValue('option_one', e.target.value)
                                                       }}/>
                                                <Input placeholder={"选项2"}
                                                       className="input-option"
                                                       value={state.option_two}
                                                       onChange={(e) => {
                                                           this.setValue('option_two', e.target.value)
                                                       }}/>
                                                <Input placeholder={"选项3"}
                                                       className="input-option"
                                                       value={state.option_three}
                                                       onChange={(e) => {
                                                           this.setValue('option_three', e.target.value)
                                                       }}/>
                                            </div>
                                        }else if(option == 4){
                                            return <div>
                                                <Input placeholder={"选项1"}
                                                       className="input-option"
                                                       value={state.option_one}
                                                       onChange={(e) => {
                                                           this.setValue('option_one', e.target.value)
                                                       }}/>
                                                <Input placeholder={"选项2"}
                                                       className="input-option"
                                                       value={state.option_two}
                                                       onChange={(e) => {
                                                           this.setValue('option_two', e.target.value)
                                                       }}/>
                                                <Input placeholder={"选项3"}
                                                       className="input-option"
                                                       value={state.option_three}
                                                       onChange={(e) => {
                                                           this.setValue('option_three', e.target.value)
                                                       }}/>
                                                <Input placeholder={"选项3"}
                                                       className="input-option"
                                                       value={state.option_four}
                                                       onChange={(e) => {
                                                           this.setValue('option_four', e.target.value)
                                                       }}/>
                                            </div>
                                        }
                                    })()}
                                    <Icon type="plus-square" onClick={() => {
                                        this.addOption(option)
                                    }}/>
                                    <Icon type="minus-square" onClick={() => {
                                        this.cutOption(option)
                                    }}/>
                                    <br/>
                                </FormItem>
                                <FormItem label="答案：">
                                    <Input placeholder="必须和选项其中一个值相等"/>
                                    <br/>
                                    <Input type="textarea" rows={4} placeholder="答案解析，选填"/>
                                </FormItem>

                                <FormItem label="此题分值：">
                                    <Input placeholder="eg:2/4/6/8,不填则默认答卷剩余分数平均到不填的题目中"/>
                                </FormItem>
                            </div>
                    }
                })()
            }

            <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => {
                    handleSubmit(funPage, state.level_one, state.level_two,state.test_name,state.test_time,state.subject_name)
                }}>
                    添加
                </Button>
            </FormItem>
        </Form>;
    }
}
module.exports = CreateForm()(AdminForm);