"use strict"
const React = require("react");
import {Form, Input, Button, Checkbox ,Icon ,message} from 'antd';
const FormItem = Form.Item;
const CreateForm = Form.create;
const AdminAction = require('../action/adminAction');
const AdminStore = require('../store/adminStore');


class AdminForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      option:1,
      level_one:'',
      level_two:''
    };
  }

  addOption(option){
    if(option < 4 && option > 0){
        this.setState({option:option+1})
    }else{
        message.error('选项数量不符，超过4个选项')
    }
  }

  cutOption(option){
      if(option > 2){
          this.setState({option:option - 1})
      }else{
          message.error('选项数量不符，不能低于两个选项')
      }
  }

  setValue(key, value) {
    this.state[key] = value;
    this.setState(this.state);
  }




  render() {
    let items = [],count = 0,
        {funPage,handleSubmit} = this.props;
    let state = this.state;
    let {option} = state;

    funPage = funPage-0;
    console.log(funPage)
    let { getFieldDecorator } = this.props.form;
    return <Form>
        {
          (()=>{
          switch (funPage){
            case 4:
              return  <FormItem label="一级目录名称：" required>
                        <Input value={state.level_one}
                               onChange={(e)=> {
                                   this.setValue('level_one', e.target.value)
                                 }}/>
                      </FormItem>
              break;
            case 5:
              return <div>
                <FormItem label="一级目录名称：">
                  <Input value={state.level_one}
                         onChange={(e)=> {
                           this.setValue('level_one', e.target.value)
                         }}/>
                </FormItem>
                  <FormItem label="二级目录名称：">
                  <Input value={state.level_two}
                         onChange={(e)=> {
                           this.setValue('level_two', e.target.value)
                         }}/> />

                </FormItem>
              </div>
              break;
            case 6:
              return <div>
                <FormItem>
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '您输入的试题名称为空!' }],
                  })(
                    <Input addonBefore={<Icon type="file-text" />} placeholder="试题名称" />
                  )}
                </FormItem>
                <FormItem>{getFieldDecorator('time', {
                  rules: [{ required: true, message: '您输入的二级目录为空!' }],
                })(
                  <Input addonBefore={<Icon type="clock-circle" />} placeholder="出题时间" />
                )}
                </FormItem>
                <FormItem>{getFieldDecorator('lever_two', {
                rules: [{ required: true, message: '您输入的二级类目为空!' }],
              })(
                <Input addonBefore={<Icon type="menu-unfold" />} placeholder="所属二级类目" />
              )}
              </FormItem>
              </div>
              break;
            case 7:
              let chooseNum = 1;
              return <div>
                <FormItem>
                  {getFieldDecorator('title', {
                    rules: [{ required: true, message: '必须要是课程列表里面存在的试题!' }],
                  })(
                    <Input addonBefore={<Icon type="file-text" />} placeholder="试题名称" />
                  )}
                </FormItem>
                <input type="text" placeholder="课程id"/>

                <FormItem>{getFieldDecorator('time', {
                  rules: [{ required: true, message: '您输入的二级目录为空!' }],
                })(
                  <Input addonBefore={<Icon type="clock-circle" />} placeholder="题目" />
                )}
                </FormItem>
                <FormItem>
                    <h3>答案选项</h3>

                  {(()=>{

                    for(count;count < option;count++){
                        items.push(<Input placeholder={"选项"+(count+1)} className="input-option" ref={"option"} /> );
                    }
                  })()}
                    {items}
                    <Icon type="plus-square" onClick={()=>{this.addOption(option)}}/>
                    <Icon type="minus-square" onClick={()=>{this.cutOption(option)}}/>
                  <br/>
                </FormItem>
                <FormItem>
                  <h3>答案</h3>
                  <Input placeholder="必须和选项其中一个值相等" />
                  <br/>
                  <Input type="textarea" rows={4} placeholder="答案解析，选填"/>
                </FormItem>

                <FormItem>
                   <h3>此题分值</h3>
                   <Input placeholder="eg:2/4/6/8,不填则默认答卷剩余分数平均到不填的题目中" />
                  </FormItem>
              </div>
          }
        })()
        }


            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button"  onClick={()=>{handleSubmit(funPage,state.level_one,state.level_two)}}>
                添加
              </Button>
            </FormItem>
          </Form>;
  }
}
module.exports = CreateForm()(AdminForm);