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
      option:1
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
  submit(funPage){
      switch (funPage){
          case 4:
              AdminAction.creatLOne()
      }
  }


  render() {
    let funPage = 0,items = [],count = 0;
        funPage = this.props.funPage;
    let {option} = this.state;

    funPage = funPage-0;
    console.log(funPage)
    const { getFieldDecorator,handleSubmit } = this.props.form;
    return <Form onSubmit={handleSubmit} key="5">
        {
          (()=>{
          switch (funPage){
            case 4:
              return  <FormItem >
                {getFieldDecorator('level_one', {
                  rules: [{ required: true, message: '您输入的一级目录为空!' }],
                })(
                  <Input addonBefore={<Icon type="plus" />} placeholder="一级目录名称" />
                )}
              </FormItem>

            case 5:
              return <div>
                <FormItem>
                  {getFieldDecorator('level_one', {
                    rules: [{ required: true, message: '您输入的一级目录为空!' }],
                  })(
                    <Input addonBefore={<Icon type="plus" />} placeholder="一级目录名称" />
                  )}
                </FormItem>
                <FormItem>{getFieldDecorator('level_two', {
                  rules: [{ required: true, message: '您输入的二级目录为空!' }],
                })(
                  <Input addonBefore={<Icon type="plus-circle" />} placeholder="二级目录名称" />
                )}
                </FormItem>
              </div>

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
                        items.push(<Input placeholder={"选项"+(count+1)} className="input-option"/> );
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
              <Button type="primary" htmlType="submit" className="login-form-button" key="5" onClick={this.submit(funPage)}>
                添加
              </Button>
            </FormItem>
          </Form>;
  }
}
module.exports = CreateForm()(AdminForm);