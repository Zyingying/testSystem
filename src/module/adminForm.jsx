"use strict"
const React = require("react");
import {Form, Input, Button, Checkbox ,Icon} from 'antd';
const FormItem = Form.Item;
const CreateForm = Form.create;

class AdminForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      option:1
    };
  }


  render() {
    let funPage = 0;
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
              return  <FormItem>
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
                <div> 选项
                  <br/>

                  {(()=>{
                    for( var i=1;i <= funPage;i++){
                      <Input placeholder={"选项"+i} />
                    }
                  })()}


                </div>
                <FormItem>{getFieldDecorator('lever_two', {
                  rules: [{ required: true, message: '您输入的二级类目为空!' }],
                })(
                  <Input addonBefore={<Icon type="menu-unfold" />} placeholder="所属二级类目" />
                )}
                </FormItem>
              </div>
          }
        })()
        }


            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button" key="5">
                添加
              </Button>
            </FormItem>
          </Form>;
  }
}
module.exports = CreateForm()(AdminForm);