"use strict"
const React = require("react");
const navList = require("./../config/adminNav");
const MenuList = require("../module/menuList");
const AdminForm = require("../module/adminForm");
import {Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;

const SubjectAction = require('../action/subjectAction');
const SubjectStore = require('../store/subjectStore');
const connectToStores = require("alt-utils/lib/connectToStores");

// const adminForm = CreateForm()( React.creatClass({
class Admin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pageHeight : 0,
            funPage : undefined
        };
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

    componentDidMount(){
        let pageH = document.body.scrollHeight;
        if(this.state.pageHeight != pageH){
            this.setState({pageHeight:pageH});
        }

    }

    handleClick(e) {
        // this.setState({
        //     funPage: e.key,
        // });
    }

    handleSubmit(e) {
      let value , {fun_num} = this.props;
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
        value = values;
      });

      switch (fun_num){
        case 1:
      }

    }



    render() {
        let {subject} = this.props;
        if(!subject){
            return null;
        }
        // let getFieldDecorator = form.getFieldDecorator;

        return <div className="f-page admin">
            <Menu onClick={this.handleClick.bind(this)}
                  style={{ width: 240 ,height:this.state.pageHeight}}
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['change','creat']}
                  mode="inline"
                  className="admin-menu"
                  theme="dark"
            >
                <SubMenu key="change"
                         title={<span><Icon type="edit" />
                                    <span>修改</span>
                                </span>}>
                    {navList.map((obj,n)=>{
                        if(obj.type == 'change'){
                            return  <Menu.Item key={n}>{obj.content}</Menu.Item>

                        }
                    })}
                </SubMenu>
                <SubMenu key="creat"
                         title={<span><Icon type="folder-add" />
                                    <span>添加</span>
                                </span>}>
                    {navList.map((obj,n)=>{
                        if(obj.type == 'creat'){
                            return  <Menu.Item key={n}>{obj.content}</Menu.Item>

                        }
                    })}
                </SubMenu>
            </Menu>

            <div className="w-changeMian">
                <div className="title">现有的一级 && 二级目录</div>

                {/*{this.state.funPage == 1 ? 1:2}*/}
                <MenuList subject={subject}
                          menuClick={this.menuClick}/>

                <hr/>

                <AdminForm c={this.handleSubmit.bind(this)}/>

            </div>
        </div>;
    }
}

module.exports = connectToStores(Admin);