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
                        <MenuItemGroup title="专业">
                            <Menu.Item key="1">算法</Menu.Item>
                            <Menu.Item key="2">计算机网络</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="通识">
                            <Menu.Item key="3">高等数学</Menu.Item>
                            <Menu.Item key="4">大学英语</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
                        <Menu.Item key="5">选项5</Menu.Item>
                        <Menu.Item key="6">选项6</Menu.Item>
                        <SubMenu key="sub3" title="三级导航">
                            <Menu.Item key="7">选项7</Menu.Item>
                            <Menu.Item key="8">选项8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><icon type="setting" /><span>导航三</span></span>}>
                        <Menu.Item key="9">选项9</Menu.Item>
                        <Menu.Item key="10">选项10</Menu.Item>
                        <Menu.Item key="11">选项11</Menu.Item>
                        <Menu.Item key="12">选项12</Menu.Item>
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