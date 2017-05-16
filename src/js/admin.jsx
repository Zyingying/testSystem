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

class Admin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pageHeight: 0,
      funPage: undefined
    };
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
    console.log(e)
  }

  menuClick(e) {
    // console.log('click', e);
    let itemId = e.key;
    SubjectAction.nameListById(itemId);
    this.clickId = itemId;
    console.log(this.clickId);
    this.setState();
  }

  handleSubmit(num, one, two, title, subTime, question, option, answer, detail, score) {
    switch (num) {
      case 4:

        AdminAction.creatLOne(one);
        break;
      case 5 :
        AdminAction.creatLTwo(one, two);

      case 6:
        AdminAction.creatTest(title, subTime, two);

      case 7:
        AdminAction.creatSubject(title, question, option, answer, detail, score);
    }
  }


  render() {
    let {subject} = this.props;
    if (!subject) {
      return null;
    }
    let {funPage} = this.state;
    // let getFieldDecorator = form.getFieldDecorator;

    return <div className="f-page admin">
      <Menu onClick={this.handleClick.bind(this)}
            style={{width: 240, height: this.state.pageHeight}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['change', 'creat']}
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
      </Menu>

      <div className="w-changeMian">
        {this.state.funPage < 7 && this.state.funPage > 0 ? <div className="title">现有的一级 && 二级目录</div> : null}


        {this.state.funPage < 7 && this.state.funPage > 0? <MenuList subject={subject}
                                            menuClick={this.menuClick}/> : null}


        <hr/>

        <AdminForm funPage={funPage}
                   handleSubmit={this.handleSubmit.bind(this)}
                   clickId={this.clickId}
        />

      </div>
    </div>;
  }
}

module.exports = connectToStores(Admin);