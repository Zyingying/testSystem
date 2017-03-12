"use strict"
const React = require("react");
const Nav = require("../module/nav");
import {Tabs,Button } from 'antd';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

class Personal extends React.Component {
  render() {
    return <div className="f-page person">
      <div className="w-categories">
        <Nav/>
      </div>

      <div className="main-person">
        <div className="user">
            <img src="" alt="" className="user-img"/>

          <div className="psg-btn">
            <Button type="primary">返回首页</Button>
            <Button type="danger">编辑资料</Button>
          </div>
        </div>

        <Tabs defaultActiveKey="1"
              onChange={callback}
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
module.exports = Personal;