"use strict"
const React = require("react");
const {Link} = require("react-router");
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LoginAction = require('../action/loginAction');
const LoginStore = require('../store/loginStore');
const connectToStores = require("alt-utils/lib/connectToStores");


class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      firstCateId: this.props.currentCateId,
      showCateId: this.props.currentCateId,
      theme: "dark",
      user:''
    };
    LoginAction.isLogin();
  }

  static getStores() {
    return [LoginStore];
  }

  static getPropsFromStores() {
    return LoginStore.getState();
  }

  componentWillMount() {
    LoginStore.listen(this.getLoginStore());
  }

  componentWillUnmount() {
    LoginStore.unlisten(this.logLinsten);

  }

  getLoginStore() {
    return this.logLinsten = (store) => {
      let status = store.isLogin.type;
      if (status == 1) {
        this.setState({isLogin: true,user:store.isLogin.user.email});
      } else {
        this.state.isLogin = false;
      }
    }
  }

  render() {
    let {isLogin,user} = this.state;
    console.log(this.props);

    return <Menu onClick={this.handleClick}

                 theme={this.state.theme}
                 mode="horizontal">
      <Menu.Item key="mail">
        <Link to="/">首页</Link>
      </Menu.Item>
      <SubMenu title={<Link to="/exam">
        <Icon type="appstore"/>题库
      </Link>}>
      </SubMenu>

      {isLogin ?
        <SubMenu className="li-personal"
                 title={
                   <Link to="/personal">
                     <Icon type="user"/>{user}
                   </Link>}>

          <Menu.Item key="setting:1">
            <Link to="/personal">
              <Icon type="user"/>个人主页
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:2">
            <Link to="/personMsg">
              <Icon type="setting"/>账号设置
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:3">
            <Link to="/admin">
              <Icon type="setting"/>管理后台
            </Link>
          </Menu.Item>
          <Menu.Item key="setting:4">
            <Icon type="poweroff"/>退出登录</Menu.Item>
        </SubMenu>
        :
        <Menu.Item key="login" className="li-login">
          <Link to="/login">
            <Icon type="user"/>登录
          </Link>
        </Menu.Item>

      }
    </Menu>;
    /**/
  }
}
module.exports = Nav;