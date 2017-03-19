"use strict";
const React = require("react");
const Nav = require("../module/nav");
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, DatePicker,Radio} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const connectToStores = require("alt-utils/lib/connectToStores");
const PerMsgAction = require("../action/perMsgAction");
const PerMsgStore = require("../store/perMsgStore");

class personMsg extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  static getStores() {
    return [PerMsgStore];
  }

  static getPropsFromStores() {
    return {
      ...PerMsgStore.getState()
    }
  }

  handleSubmit() {

  }


  render() {

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
          <Input />
        </FormItem>
        <FormItem label="用户名"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}
                  required="true">
          <Input />
        </FormItem>
        <FormItem label="性别"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <RadioGroup>
            <Radio value="a">保密</Radio>
            <Radio value="b">男</Radio>
            <Radio value="c">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="绑定手机"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <Input />
        </FormItem>
        <FormItem label="生日"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <DatePicker />
        </FormItem>

        <FormItem label="学校"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <Input />
        </FormItem>
        <FormItem label="学历"
                  labelCol={{span: 5}}
                  wrapperCol={{span: 12}}>
          <Select>
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
                  wrapperCol={{span: 12}}>
          <Button type="primary"
                  htmlType="submit"
                  className="change-sure">确认修改</Button>
        </FormItem>

      </Form>
    </div>
  }
}

module.exports = connectToStores(personMsg);