"use strict"
const React = require("react");
const {Link} = require("react-router");
const Nav = require("../module/nav");
import {Tabs,Button } from 'antd';
const TabPane = Tabs.TabPane;
const IndexItem = require('../subItem/indexItem');

const LoginAction = require('../action/loginAction');
const LoginStore = require('../store/loginStore');
const SubjectAction = require('../action/subjectAction');
const SubjectStore = require('../store/subjectStore');
const connectToStores = require("alt-utils/lib/connectToStores");

const img1 = require('../img/github-1.png');
const img2 = require('../img/github-2.png');
const img3 = require('../img/github-3.png');
const img4 = require('../img/github-4.png');
const img5 = require('../img/github-5.png');
const img6 = require('../img/github-6.png');
const img7 = require('../img/github-7.png');


class Personal extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      user:'',
      isLogin:undefined
    };
    SubjectAction.listRead();
    SubjectAction.listFinish();
  }

  static getStores() {
    return [LoginStore,SubjectStore];
  }

  static getPropsFromStores() {
    return {
      ...LoginStore.getState(),
      ...SubjectStore.getState()
    }
  }

  callback(){

  }


  componentWillUnmount() {
    LoginStore.unlisten(this.logLinsten);

  }

  // getLoginStore() {
  //   return this.logLinsten = (store) => {
  //     let status = store.isLogin.type;
  //     if (status == 1) {
  //       this.setState({isLogin: true,user:store.isLogin.user.email});
  //     } else {
  //       this.state.isLogin = false;
  //     }
  //   }
  // }


  render() {
    let {isLogin,user} = this.state,day,img;
    let {readlist,finishList} = this.props;
    let date = new Date();
    day = date.getDay()+1;
    switch (day){
      case 1:
        img = img1;
        break;
      case 2:
        img = img2;
        break;
      case 3:
        img = img3;
        break;
      case 4:
        img = img4;
        break;
      case 5:
        img = img5;
        break;
      case 6:
        img = img6;
        break;
      case 7:
        img = img7;
        break;


    }

    return <div className="f-page person">
        <Nav/>

      <div className="main-person">
        <div className="user">
            <img src={img} alt="" className="user-img"/>

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

            {readlist && readlist.map((item,n)=>{
              return <IndexItem title={item.title}
                                key={n}
                                id={item._id}/>;
            }) }
          </TabPane>
          <TabPane tab="已交试题" key="2">
            {finishList && finishList.map((item,n)=>{
              return <IndexItem title={item.title}
                                key={n}
                                id={item._id}/>;
            })}
          </TabPane>
        </Tabs>
      </div>


    </div>;
  }
}
module.exports = connectToStores(Personal);