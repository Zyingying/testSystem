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
        // console.log('click', e);
        let itemId = e.key;
        SubjectAction.nameListById(itemId);
    }

    showTest(id){
        SubjectAction.ftechTest(id);
    }

    render() {

        let {subject,nameList} = this.props;
        if(!subject){
            return null;
        }
        console.log(this.props)


        return <div className="f-page exam">
            <div className="w-categories">
                <Nav/>
            </div>
            <div className="main-exam">
                <Menu onClick={this.handleClick} style={{width:240}} mode="vertical">
                    {subject.length > 0 && subject.map((sub,n)=>{
                        let subjectsItem = sub.subjects;
                        return <SubMenu key={n} title={sub.typename}>

                                {subjectsItem && subjectsItem.map((item,n)=>{
                                    return <Menu.Item key={item._id} data-id={item._id}>{item.subjectName}</Menu.Item>;
                                })}
                        </SubMenu>
                    })}

                </Menu>

                <div className="nk-content">
                    {nameList && nameList.map((item,n)=>{
                        return <IndexItem title={item.title}
                                          key={n}
                                          id={item._id}
                                          showTest={this.showTest.bind(this)}/>;
                    }) }


                </div>
            </div>


        </div>;

    }
}
module.exports = connectToStores(exam);