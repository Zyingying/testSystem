"use strict"
const React = require("react");
const Nav = require("../module/nav");
const {Link} = require("react-router");
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class exam extends React.Component {

    render() {

        return <div className="f-page exam">
            <div className="w-categories">
                <Nav/>
            </div>
            <div className="main-exam"></div>


        </div>;

    }
}
module.exports = exam;