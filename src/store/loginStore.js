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

    onLoginSuccess(results){
        this.userMsg = results;
    }

    onLoginFail(){}
}
module.exports = Flux.createStore(LoginStore);
