"use strict"
const React = require("react");
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Admin extends React.Component {
    render() {
        return <div className="f-page admin">
            <Menu
                onClick={this.handleClick}
                style={{ width: 240 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1','sub2']}
                mode="inline"
            >
                <SubMenu key="sub1"
                         title={<span><Icon type="edit" />
                                    <span>修改</span>
                                </span>}>
                    <Menu.Item key="1">管理banner</Menu.Item>
                    <Menu.Item key="2">修改一级目录</Menu.Item>
                    <Menu.Item key="3">修改二级目录</Menu.Item>
                    <Menu.Item key="4">修改试题名称</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2"
                         title={<span><Icon type="folder-add" />
                                    <span>添加</span>
                                </span>}>
                    <Menu.Item key="5">添加一级目录</Menu.Item>
                    <Menu.Item key="6">添加二级目录</Menu.Item>
                    <Menu.Item key="7">添加试题名称</Menu.Item>
                </SubMenu>
            </Menu>
        </div>;
    }
}
module.exports = Admin;