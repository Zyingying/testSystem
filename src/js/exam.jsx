"use strict"
const React = require("react");
const Nav = require("../module/nav");
const MenuList = require("../module/menuList");
const IndexItem = require("../subItem/indexItem");


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

    menuClick(e) {
        // console.log('click', e);
        let itemId = e.key;
        SubjectAction.nameListById(itemId);
    }

    showTest(id){
        let history = this.props.history;
        history.pushState(null,'/test?testId='+ id)
    }

    render() {

        let {subject,nameList} = this.props;
        if(!subject){
            return null;
        }


        return <div className="f-page exam">
                <Nav/>
            <div className="main-exam">
                <MenuList subject={subject}
                          menuClick={this.menuClick}/>

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