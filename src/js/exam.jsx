"use strict"
const React = require("react");
const Nav = require("../module/nav");
const IndexItem = require("../subItem/indexItem");

// const {Link} = require("react-router");
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class exam extends React.Component {

    handleClick(e) {
        console.log('click', e);
    }

    render() {

        return <div className="f-page exam">
            <div className="w-categories">
                <Nav/>
            </div>
            <div className="main-exam">
                <Menu onClick={this.handleClick} style={{width:240}} mode="vertical">
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>课内</span></span>}>
                        {/*<MenuItemGroup title="专业">*/}
                            <Menu.Item key="1">算法</Menu.Item>
                            <Menu.Item key="2">计算机网络</Menu.Item>
                        {/*</MenuItemGroup>*/}
                        {/*<MenuItemGroup title="通识">*/}
                            <Menu.Item key="3">高等数学</Menu.Item>
                            <Menu.Item key="4">大学英语</Menu.Item>
                        {/*</MenuItemGroup>*/}
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>职业方向</span></span>}>
                        <Menu.Item key="5">C++工程师</Menu.Item>
                        <Menu.Item key="6">前端工程师</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><icon type="setting" /><span>时间</span></span>}>
                        <Menu.Item key="9">2017</Menu.Item>
                        <Menu.Item key="10">2016</Menu.Item>
                    </SubMenu>
                </Menu>

                <div className="nk-content">

                    <IndexItem/>
                    <IndexItem/>
                    <IndexItem/>
                    <IndexItem/>

                </div>
            </div>


        </div>;

    }
}
module.exports = exam;