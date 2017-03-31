"use strict"
const React = require("react");
const {Link} = require("react-router");
const Nav = require("../module/nav");
import {Tabs,Button } from 'antd';
const TabPane = Tabs.TabPane;

const LoginAction = require('../action/loginAction');
const LoginStore = require('../store/loginStore');
const connectToStores = require("alt-utils/lib/connectToStores");

class Personal extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      user:'',
      isLogin:undefined
    };

  }

  static getStores() {
    return [LoginStore];
  }

  static getPropsFromStores() {
    return LoginStore.getState();
  }

  callback(){

  }

  componentWillMount() {
    LoginStore.listen(this.getLoginStore());
    LoginAction.isLogin();
  }

  logout(){
    LoginAction.logOut();
    LoginAction.isLogin();
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

    return <div className="f-page person">
      <div className="w-categories">
        <Nav isLogin={isLogin}
             user={user}
             logout={this.logout.bind(this)}/>
      </div>

      <div className="main-person">
        <div className="user">
            <img src="" alt="" className="user-img"/>

          <div className="psg-btn">
            <Link to="/">
              <Button type="primary">返回首页</Button>
            </Link>
            {isLogin ? <Link to="/personMsg">
              <Button type="danger">编辑资料</Button>
            </Link>:
            <Link to="/personMsg">
              <Button type="danger">回我资料</Button>
            </Link>
            }

          </div>
        </div>

        <Tabs defaultActiveKey="1"
              onChange={this.callback}
              className="show-person-list">
          <TabPane tab="已阅试题" key="1">
            已阅试题
          </TabPane>
          <TabPane tab="已交试题" key="2">
            已交试题
          </TabPane>
        </Tabs>
      </div>


    </div>;
  }
}
module.exports = connectToStores(Personal);