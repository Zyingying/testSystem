"use strict"
const React = require("react");
import {Form, Input, Button, Cascader , Icon, message, Select,Table, Popconfirm} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;
const CreateForm = Form.create;
const EditableTable = require('./editableTable');

class AdminForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      option: 2,
      change_one_id: '',
      level_one: '',
      level_two: '',
      test_name: '',
      test_year: ' ',
      subject_name: ' ',
      test_time: '',
      cascader_value:'',
      test_new_name:''
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

  handleChange(value) {
    this.state.change_one_id = value;
  }

  onChange(value) {
    this.state.cascader_value = value;
    this.state.level_one = value[1];
  }

  testNameSelect(value,option){
    this.state.test_name = option.props.title;
  }

  render() {
    let optionAll,cascader =[],item=[],
      {funPage, handleSubmit, clickId, subject,three,testList} = this.props;
    let state = this.state;
    let {option} = state;
    funPage = funPage - 0;

    subject && subject.map((n)=>{
      let child = [];
      if(n.subjects && n.subjects.length > 0){

        item = n.subjects;

        item && item.map((i)=>{

            child.push({value:i._id,label:i.subjectName});
        })
      }
      cascader.push({value:n._id,label:n.typename,children:child});
    })
    return <Form>
      {
        (() => {
          switch (funPage) {
            case 0:
              return <EditableTable/>;
              break;
            case 1:
              return <FormItem label="点击以上一级目录以修改：" required>
                <Select
                  showSearch
                  style={{width: 200}}
                  placeholder="选择要修改的一级目录"
                  optionFilterProp="children"
                  onChange={this.handleChange.bind(this)}
                  filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {subject && subject.length > 0 && subject.map((sub) => {
                    return <Option value={sub._id}>{sub.typename}</Option>
                  })}
                </Select>
                <Input value={state.level_one}
                       onChange={(e) => {
                         this.setValue('level_one', e.target.value)
                       }}/>
              </FormItem>;
              break;

            case 2:
              return  <FormItem label="点击以上二级目录以修改：" required>
                <Cascader options={cascader} onChange={this.onChange.bind(this)} changeOnSelect size="large" placeholder="选择二级目录"/>
                <Input value={state.level_two}
                       placeholder="修改后的二级目录"
                       onChange={(e) => {
                         this.setValue('level_two', e.target.value)
                       }}/>
              </FormItem>;
              break;

            case 3:
              return <div>
                <FormItem label="试题名称：">
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    optionFilterProp="children"
                    onSelect={this.testNameSelect.bind(this)}
                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {
                      testList && testList.map((n)=>{
                      return <Option value={n.title} title={n._id}>{n.title}</Option>;
                    })}
                  </Select>
                </FormItem>
                <FormItem label="新试题名">
                  <Input value={state.test_new_name}
                         onChange={(e) => {
                           this.setValue('test_new_name', e.target.value)
                         }}/>
                </FormItem>
                <FormItem label="出题时间：">
                  <Input value={state.test_year}
                         onChange={(e) => {
                           this.setValue('test_year', e.target.value)
                         }}/>
                </FormItem>
                <FormItem label="考试时长：">
                  <Input value={state.test_time}
                         onChange={(e) => {
                           this.setValue('test_time', e.target.value)
                         }}/>
                </FormItem>
                <FormItem label="所属二级类目：">
                  <Cascader options={cascader} onChange={this.onChange.bind(this)} changeOnSelect size="large" placeholder="选择二级目录"/>
              </FormItem>

              </div>;
              break;
                         
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
                  <Input value={state.test_year}
                         onChange={(e) => {
                           this.setValue('test_year', e.target.value)
                         }}/>
                </FormItem>
                <FormItem label="考试时长：">
                  <Input value={state.test_time}
                         onChange={(e) => {
                           this.setValue('test_time', e.target.value)
                         }}/>
                </FormItem>
                <FormItem label="所属二级类目：">
                  <Cascader options={cascader} onChange={this.onChange.bind(this)} changeOnSelect size="large" placeholder="选择二级目录"/>
                </FormItem>
              </div>;
              break;

            case 7:
              let chooseNum = 1;
              return <div>
                <FormItem label="必须要是课程列表里面存在的试题：">
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    optionFilterProp="children"
                    onSelect={this.testNameSelect.bind(this)}
                    filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                  >
                    {testList && testList.map((n)=>{
                      return <Option value={n.title} title={n._id}>{n.title}</Option>;
                    })}
                  </Select>
                </FormItem>


                <FormItem label="题目：">
                  <Input value={state.question}
                         onChange={(e) => {
                           this.setValue('question', e.target.value)
                         }}/>
                </FormItem>
                <FormItem >
                  <h3>答案选项</h3>
                  {(() => {
                    if (option == 2) {
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

                    } else if (option == 3) {
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
                    } else if (option == 4) {
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
                  <Input placeholder="必须和选项其中一个值相等"
                         value={state.answer}
                         onChange={(e) => {
                           this.setValue('answer', e.target.value)
                         }}/>
                  <br/>
                  <Input type="textarea" rows={4}
                         placeholder="答案解析，选填"
                         value={state.detail}
                         onChange={(e) => {
                           this.setValue('detail', e.target.value)
                         }}/>
                </FormItem>

                <FormItem label="此题分值：">
                  <Input placeholder="eg:2/4/6/8,不填则默认答卷剩余分数平均到不填的题目中"
                         value={state.score}
                         onChange={(e) => {
                           this.setValue('score', e.target.value)
                         }}/>
                </FormItem>
              </div>

            case 8:
              return <FormItem label="选择要推荐的题目：">
              <Select
                showSearch
                style={{ width: 200 }}
                optionFilterProp="children"
                onSelect={this.testNameSelect.bind(this)}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {
                  testList && testList.map((n)=>{
                    return <Option value={n.title} key={n._id} title={n._id}>{n.title}</Option>;
                  })}
              </Select>
              </FormItem>
            break;
          }
        })()
      }

      <FormItem>
        <Button type="primary" htmlType="submit" className="login-form-button" onClick={() => {
          optionAll = [state.option_one, state.option_two, state.option_three, state.option_four];
          handleSubmit(funPage, state.level_one, state.level_two, state.test_name, state.test_year, state.test_time, state.question, optionAll, state.answer, state.detail, state.score, state.change_one_id,state.cascader_value,state.test_new_name)
        }}>
          确定
        </Button>
      </FormItem>
    </Form>;
  }
}
module.exports = CreateForm()(AdminForm);