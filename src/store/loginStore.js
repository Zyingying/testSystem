/**
 * Created by zyy on 2016/12/29.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
const LoginAction = require("../action/loginAction");
class LoginStore{
    constructor(){
        this.bindActions(LoginAction);
    }

    onLoginSuccess(result){
        this.result = result;
    }

    onRegisterSuccess(results){
        this.result = results;
    }

    onLogoutSuccess(result){
        this.result = result;
    }

    onIsLoginSuccess(result){
        this.isLogin = result;

    }



    onRegisterFail(){}
    onLoginFail(){}
}
module.exports = Flux.createStore(LoginStore);
