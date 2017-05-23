"use strict"
const React = require("react");
const navList = require("./../config/adminNav");
const MenuList = require("../module/menuList");
const AdminForm = require("../module/adminForm");
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;

const SubjectAction = require('../action/subjectAction');
const SubjectStore = require('../store/subjectStore');
const connectToStores = require("alt-utils/lib/connectToStores");
const AdminAction = require('../action/adminAction');
const AdminStore = require('../store/adminStore');

const IndexAction = require("../action/indexAction");
const IndexStore = require("../store/indexStore");

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageHeight: 0,
      funPage: undefined
    };
    this.count = 0;
    this.flag = 0;
    this.three = [];
  }

  static getStores() {
    return [SubjectStore, AdminStore];
  }

  static getPropsFromStores() {
    return {
      ...SubjectStore.getState(),
      ...AdminStore.getState()
    }
  }

  componentWillMount() {
    SubjectAction.getAll();
    SubjectAction.getAllTest();
  }

  componentDidMount() {
    let pageH = document.body.scrollHeight;
    if (this.state.pageHeight != pageH) {
      this.setState({pageHeight: pageH});
    }
  }



  handleClick(e) {
    this.setState({
      funPage: e.key,
    });
  }

  menuClick(e) {
    let itemId = e.key;
    this.clickId = itemId;
    console.log(this.clickId);
    this.setState();
  }


  handleSubmit(num, one, two, title, subTime, testTime, question, option, answer, detail, score, one_id ,cascader,test_new_name) {
    switch (num) {
      case 1:
        AdminAction.changOne(one, one_id);
        break;
      case 2:
        AdminAction.changeTwo(cascader[1],cascader[0],two);
        break;

      case 3:
        AdminAction.changeTestName(title,cascader[1],test_new_name,subTime,testTime);
        break;
      case 4:

        AdminAction.creatLOne(one);
        break;
      case 5 :
        AdminAction.creatLTwo(one, two);
        break;
      case 6:
        AdminAction.creatTest(title, subTime, two, testTime);
        break;
      case 7:
        AdminAction.creatSubject(title, question, option, answer, detail, score);

      case 8:
        IndexAction.chooseRecmd(title);
    }
  }


  render() {
    let {subject,testList} = this.props;
    if (!subject) {
      return null;
    }
    let {funPage} = this.state;
    // let getFieldDecorator = form.getFieldDecorator;

    return <div className="f-page admin">
      <Menu onClick={this.handleClick.bind(this)}
            style={{width: 240, height: this.state.pageHeight}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['change', 'creat','recommend']}
            mode="inline"
            className="admin-menu"
            theme="dark"
      >
        <SubMenu key="change"
                 title={<span><Icon type="edit"/>
                                    <span>修改</span>
                                </span>}>
          {navList.map((obj, n) => {
            if (obj.type == 'change') {
              return <Menu.Item key={n}>{obj.content}</Menu.Item>

            }
          })}
        </SubMenu>
        <SubMenu key="creat"
                 title={<span><Icon type="folder-add"/>
                                    <span>添加</span>
                                </span>}>
          {navList.map((obj, n) => {
            if (obj.type == 'creat') {
              return <Menu.Item key={n}>{obj.content}</Menu.Item>

            }
          })}
        </SubMenu>
        <SubMenu key="recommend"
                 title={<span><Icon type="folder-add"/>
                                    <span>推荐</span>
                                </span>}>
          {navList.map((obj, n) => {
            if (obj.type == 'recommend') {
              return <Menu.Item key={n}>{obj.content}</Menu.Item>

            }
          })}
        </SubMenu>
      </Menu>

      <div className="w-changeMian">
        {this.state.funPage < 6 && this.state.funPage > 3 ?
          <div className="title">现有的一级 && 二级目录</div>
          : null}


        {this.state.funPage < 6 && this.state.funPage > 3 ?
          <MenuList subject={subject}
                    menuClick={this.menuClick.bind(this)}/>
          : null}


        <hr/>

        <AdminForm funPage={funPage}
                   handleSubmit={this.handleSubmit.bind(this)}
                   clickId={this.clickId}
                   subject={subject}
                   testList ={testList}
        />

      </div>
    </div>;
  }
}

module.exports = connectToStores(Admin);