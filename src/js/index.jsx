"use strict"
const React = require("react");
const Nav = require("../module/nav");
const {Link} = require("react-router");
const connectToStores = require("alt-utils/lib/connectToStores");
const IndexAction = require("../action/indexAction");
const IndexStore = require("../store/indexStore");
const LoginAction = require('../action/loginAction');
const LoginStore = require('../store/loginStore');

const IndexItem = require("../subItem/indexItem");

import { Carousel } from 'antd';



class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin:false
        }
        LoginAction.isLogin();


    }

    static getStores() {
        return [IndexStore];
    }

    static getPropsFromStores() {
        return IndexStore.getState();
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


    render() {
        let state = this.state;
        return <div className="f-page index">

                <div className="w-categories">
                    <Nav isLogin={state.isLogin}/>
                </div>

                <Carousel autoplay="true" className="w-sildshow">
                    <div>
                        <a href=""
                           className="w-banner">
                            <img src="" alt=""/>
                        </a>
                    </div>
                    <div>
                        <a href=""  className="w-banner" >
                        </a>
                    </div>
                </Carousel>

                <div className="w-main">
                    <div className="w-topic">
                        <h1>这是一个标题</h1>
                        <h2>这是一个副标题</h2>

                        <IndexItem/>
                        <IndexItem/>
                        <IndexItem/>
                        <IndexItem/>

                    </div>
                </div>




        </div>;
    }
}

module.exports = connectToStores(Index);