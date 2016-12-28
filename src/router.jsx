"use strict"
//const Router = require("react-router/Router");
//const Route = require("react-router/Route");
require("./css/style.scss");
const React = require("react");
const {IndexRoute,Route,Router} = require("react-router");
const ReactDom = require("react-dom");
const createHashHistory = require( 'history/lib/createHashHistory');

const App = require("./app.jsx");
const Index = require("./js/index");
const personMsg = require("./js/personalMsg");
const Login = require("./js/login");
const Exam = require("./js/exam");


const mobileUtil = require("./mobileUtil");

function requireLogin(nextState, replace){
    if(!mobileUtil.isLogin()){
        if(window.__needReloadForLogin){
            // replace(null, nextState.location.pathname);
            window.location.reload();
        } else {
            replace({nextState: nextState}, '/login');
        }
    }
}

let routes = <Router history={createHashHistory()}>
                <Route path="/" component={App}>
                    <IndexRoute component={Index} />
                    <Route path="login" components={Login}/>
                    <Route path="personMsg" component={personMsg} onEnter={requireLogin}/>
                    <Route path="Exam" component={Exam}/>
                </Route>
            </Router>;
ReactDom.render(routes,document.getElementById("App"));
