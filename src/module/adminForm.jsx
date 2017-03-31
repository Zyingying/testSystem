"use strict"
const React = require("react");
import {Form, Input, Button, Checkbox ,Icon} from 'antd';
const FormItem = Form.Item;
const CreateForm = Form.create;

class AdminForm extends React.Component {


  render() {
    // let {} = this.props;
    const { getFieldDecorator,fun_num,handleSubmit } = this.props.form;
    return <Form onSubmit={handleSubmit} key="5">
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
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button" key="5">
                添加
              </Button>
            </FormItem>
          </Form>;
  }
}
module.exports = CreateForm()(AdminForm);