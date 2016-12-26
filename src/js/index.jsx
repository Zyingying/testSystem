"use strict"
const React = require("react");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexAction = require("../action/indexAction");
const IndexStore = require("../store/indexStore");
const IndexItem = require("../subItem/indexItem");
const {Link} = require("react-router");

import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCateId: this.props.currentCateId,
            showCateId: this.props.currentCateId,
            theme:"dark"
        };
    }

    static getStores() {
        return [IndexStore];
    }

    static getPropsFromStores() {
        return IndexStore.getState();
    }


    render() {
        return <div className="f-page index">
            <div className="f-header fixed shadowed">
                <div className="w-categories">
                    <Menu onClick={this.handleClick}
                          selectedKeys={[this.state.current]}
                          theme={this.state.theme}
                          mode="horizontal" >
                        <Menu.Item key="mail">首页</Menu.Item>
                        <SubMenu title={<span><Icon type="appstore"/>题库</span>}>
                            <MenuItemGroup title="课内">
                                <Menu.Item key="appstore:1">高数</Menu.Item>
                                <Menu.Item key="appstore:2">大英</Menu.Item>
                            </MenuItemGroup>
                            <MenuItemGroup title="课外">
                                <Menu.Item key="appstore:3">C</Menu.Item>
                                <Menu.Item key="appstore:4">Javascript</Menu.Item>
                            </MenuItemGroup>
                        </SubMenu>

                        <SubMenu title={
                            <Link to="/personal">
                                <span><Icon type="user"/>个人中心</span>
                            </Link>}>
                            <Menu.Item key="setting:1"><Icon type="user"/>个人主页</Menu.Item>
                            <Menu.Item key="setting:2">
                                <Link to="/personal/personMsg">
                                    <Icon type="setting"/>账号设置
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="setting:3"><Icon type="poweroff"/>退出登录</Menu.Item>
                        </SubMenu>
                        <Menu.Item key="login">
                            <Link to="/login">
                                <Icon type="user" />登录
                            </Link>

                        </Menu.Item>
                    </Menu>
                </div>
                {/*<SlideShow/>*/}
            </div>


            {/*<div className="f-footer fixed">*/}
                {/*<Nav activeOn={0}/>*/}
                {/*<Shortcuts/>*/}
            {/*</div>*/}
        </div>;
    }
}

module.exports = connectToStores(Index);