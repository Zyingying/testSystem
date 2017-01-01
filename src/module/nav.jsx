"use strict"
const React = require("react");
const {Link} = require("react-router");
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Nav extends  React.Component{

    constructor(props){
        super(props);
        this.state = {
            firstCateId: this.props.currentCateId,
            showCateId: this.props.currentCateId,
            theme:"dark"
        };
    }

    render(){
        let {isLogin} = this.props;

        return <Menu onClick={this.handleClick}
                     
                     theme={this.state.theme}
                     mode="horizontal" >
            <Menu.Item key="mail">首页</Menu.Item>
            <SubMenu title={<Link to="/exam">
                            <Icon type="appstore"/>题库
                </Link>}>
                {/*<MenuItemGroup title="课内">*/}
                    {/*<Menu.Item key="appstore:1">高数</Menu.Item>*/}
                    {/*<Menu.Item key="appstore:2">大英</Menu.Item>*/}
                {/*</MenuItemGroup>*/}
                {/*<MenuItemGroup title="课外">*/}
                    {/*<Menu.Item key="appstore:3">C</Menu.Item>*/}
                    {/*<Menu.Item key="appstore:4">Javascript</Menu.Item>*/}
                {/*</MenuItemGroup>*/}
            </SubMenu>

            {isLogin ?
                <SubMenu className="li-personal"
                         title={
                             <Link to="/personal">
                                 <Icon type="user"/>个人中心
                             </Link>} >
                    <Menu.Item key="setting:1">
                        <Icon type="user"/>个人主页</Menu.Item>
                    <Menu.Item key="setting:2">
                        <Link to="/personal/personMsg">
                            <Icon type="setting"/>账号设置
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="setting:3">
                        <Icon type="poweroff"/>退出登录</Menu.Item>
                </SubMenu>
                :
                <Menu.Item key="login" className="li-login">
                    <Link to="/login">
                        <Icon type="user" />登录
                    </Link>
                </Menu.Item>

            }



        </Menu>;
    }
}
module.exports = Nav;