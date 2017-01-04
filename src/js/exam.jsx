"use strict"
const React = require("react");
const Nav = require("../module/nav");
const IndexItem = require("../subItem/indexItem");
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const SubjectAction = require('../action/subjectAction');
const SubjectStore = require('../store/subjectStore');
const connectToStores = require("alt-utils/lib/connectToStores");


class exam extends React.Component {
    constructor(props) {
        super(props);

    }
    static getStores() {
        return [SubjectStore];
    }

    static getPropsFromStores() {
        return SubjectStore.getState();
    }

    componentWillMount(){
        SubjectAction.getAll();
    }

    handleClick(e) {
        console.log('click', e);
    }

    render() {

        let {subject} = this.props;
        if(!subject){
            return null;
        }

        return <div className="f-page exam">
            <div className="w-categories">
                <Nav/>
            </div>
            <div className="main-exam">
                <Menu onClick={this.handleClick} style={{width:240}} mode="vertical">
                    {subject.length > 0 && subject.map((item,n)=>{
                        let subjects = item.subjects;
                        return <SubMenu key={n} title={item.typename}>
                            <Menu.Item key="1">算法</Menu.Item>

                        </SubMenu>
                    })}

                </Menu>

                <div className="nk-content">

                    <IndexItem title='计算机学科专业基础综合'/>
                    <IndexItem title="2016校招真题练习"/>
                    <IndexItem title="2016校招真题练习"/>
                    <IndexItem title="ACM训练"/>

                </div>
            </div>


        </div>;

    }
}
module.exports = connectToStores(exam);