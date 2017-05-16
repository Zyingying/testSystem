/**
 * Created by Zyingying on 2017/4/17 0017.
 */
"use strict";
const Flux = require("pin-alt/src/flux");
const AdminAction = require("../action/adminAction");
class AdminStore{
    constructor(){
        this.bindActions(AdminAction);

    }

    creatLOneSuccess(result){
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

    onCreatTestSuccess(result){
      this.result = results;
    }

}
module.exports = Flux.createStore(AdminAction);

