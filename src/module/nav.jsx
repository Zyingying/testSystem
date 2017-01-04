"use strict"
const React = require("react");
const {Link} = require("react-router");
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const LoginAction = require('../action/loginAction');
const LoginStore = require('../store/loginStore');
const connectToStores = require("alt-utils/lib/connectToStores");


class Nav extends  React.Component{

    constructor(props){
        super(props);
        this.state = {
            firstCateId: this.props.currentCateId,
            showCateId: this.props.currentCateId,
            theme:"dark"
        };
        LoginAction.isLogin();
    }

    componentWillMount(){
        LoginStore.listen(this.getLoginStore());
    }
    componentWillUnmount(){
        LoginStore.unlisten(this.logLinsten);

    }
    getLoginStore(){
        return this.logLinsten = (store) =>{
            if(store.result){
                this.setState({isLogin:true});
            }else{
                this.state.isLogin=false;
            }
        }
    }

    render(){
        let {isLogin} = this.state;
        console.log(isLogin);

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